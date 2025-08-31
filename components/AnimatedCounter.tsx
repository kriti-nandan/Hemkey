"use client"

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  className?: string
}

export function AnimatedCounter({ 
  value, 
  duration = 2, 
  delay = 0.5,
  className = "" 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest))
      }
    })

    return controls.stop
  }, [value, count, duration, delay])

  return (
    <motion.span className={className}>
      {displayValue.toLocaleString()}
    </motion.span>
  )
}
