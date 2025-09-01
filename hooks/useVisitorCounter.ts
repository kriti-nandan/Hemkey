import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface VisitorCounterResponse {
  success: boolean
  count: number
  message?: string
  error?: string
  details?: any
}

export function useVisitorCounter() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasIncremented, setHasIncremented] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Get fallback count from localStorage
  const getFallbackCount = (): number => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('hemkey-visitor-count')
        return stored ? parseInt(stored, 10) : 0
      } catch {
        return 0
      }
    }
    return 0
  }

  // Set fallback count to localStorage
  const setFallbackCount = (newCount: number): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hemkey-visitor-count', newCount.toString())
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  // Fetch current count with retry logic
  const fetchCount = async (retryAttempt = 0) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/visitor-counter')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: VisitorCounterResponse = await response.json()
      
      if (data.success) {
        setCount(data.count)
        setFallbackCount(data.count) // Update localStorage with server count
        setRetryCount(0) // Reset retry count on success
      } else {
        throw new Error(data.error || 'Server returned error')
      }
    } catch (err) {
      console.error('Error fetching visitor count:', err)
      
      // Retry logic for network errors
      if (retryAttempt < 3 && err instanceof Error && err.message.includes('HTTP error')) {
        console.log(`Retrying fetch attempt ${retryAttempt + 1}/3`)
        setTimeout(() => fetchCount(retryAttempt + 1), 1000 * (retryAttempt + 1))
        return
      }
      
      // Fallback to localStorage if server fails
      const fallbackCount = getFallbackCount()
      setCount(fallbackCount)
      setError('Using local count due to server error')
      setRetryCount(retryAttempt)
    } finally {
      setIsLoading(false)
    }
  }

  // Increment count with retry logic
  const incrementCount = async (retryAttempt = 0) => {
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: VisitorCounterResponse = await response.json()
      
      if (data.success) {
        setCount(data.count)
        setFallbackCount(data.count) // Update localStorage
        setRetryCount(0) // Reset retry count on success
      } else {
        throw new Error(data.error || 'Server returned error')
      }
    } catch (err) {
      console.error('Error incrementing visitor count:', err)
      
      // Retry logic for network errors
      if (retryAttempt < 3 && err instanceof Error && err.message.includes('HTTP error')) {
        console.log(`Retrying increment attempt ${retryAttempt + 1}/3`)
        setTimeout(() => incrementCount(retryAttempt + 1), 1000 * (retryAttempt + 1))
        return
      }
      
      // Fallback: increment local count
      const newCount = count + 1
      setCount(newCount)
      setFallbackCount(newCount)
      setError('Incremented local count due to server error')
      setRetryCount(retryAttempt)
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
    refetch: () => fetchCount(),
    retryCount,
  }
}
