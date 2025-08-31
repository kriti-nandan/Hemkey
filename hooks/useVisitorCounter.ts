import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface VisitorCounterResponse {
  success: boolean
  count: number
  message?: string
  error?: string
}

export function useVisitorCounter() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasIncremented, setHasIncremented] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  // Fetch current count
  const fetchCount = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/visitor-counter')
      const data: VisitorCounterResponse = await response.json()
      
      if (data.success) {
        setCount(data.count)
      } else {
        setError(data.error || 'Failed to fetch visitor count')
      }
    } catch (err) {
      setError('Network error while fetching visitor count')
      console.error('Error fetching visitor count:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Increment count
  const incrementCount = async () => {
    if (hasIncremented) return // Prevent multiple increments
    
    try {
      setError(null)
      setHasIncremented(true)
      
      const response = await fetch('/api/visitor-counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data: VisitorCounterResponse = await response.json()
      
      if (data.success) {
        setCount(data.count)
      } else {
        setError(data.error || 'Failed to increment visitor count')
      }
    } catch (err) {
      setError('Network error while incrementing visitor count')
      console.error('Error incrementing visitor count:', err)
    }
  }

  // Initialize counter on mount
  useEffect(() => {
    fetchCount()
  }, [])

  // Increment when counter comes into view
  useEffect(() => {
    if (isInView && !hasIncremented) {
      incrementCount()
    }
  }, [isInView, hasIncremented])

  return {
    count,
    isLoading,
    error,
    ref,
    isInView,
    refetch: fetchCount,
  }
}
