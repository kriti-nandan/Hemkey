"use client"

import { motion } from 'framer-motion'
import { Users, TrendingUp, Globe } from 'lucide-react'
import { useVisitorCounter } from '@/hooks/useVisitorCounter'
import { AnimatedCounter } from './AnimatedCounter'

export function VisitorCounter() {
  const { count, isLoading, error, ref, isInView } = useVisitorCounter()

  // Start from 12,500 and add the dynamic count on top
  const totalVisitors = 12500 + count

  const stats = [
    {
      icon: Users,
      label: "Total Visitors",
      value: totalVisitors,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: 75, // Fixed 75%
      suffix: "%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Globe,
      label: "Countries",
      value: 3, // Fixed 3 countries
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ]

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load visitor statistics</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-blue-500 hover:text-blue-700 underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container-responsive">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient responsive-text-3xl sm:responsive-text-4xl lg:responsive-text-5xl">
            Join Our Growing Community
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto responsive-text-base sm:responsive-text-lg lg:responsive-text-xl">
            Discover why thousands of investors and property owners trust Hemkey for their real estate needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className={`
                relative overflow-hidden rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300
                ${stat.bgColor} ${stat.borderColor} hover:scale-105
              `}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                  <stat.icon className="w-full h-full" />
                </div>
              </div>

              <div className="relative p-6 sm:p-8 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`
                    mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4
                    ${stat.bgColor} border-2 ${stat.borderColor}
                  `}
                >
                  <stat.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color}`} />
                </motion.div>

                {/* Counter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.5
                  }}
                  className="mb-2"
                >
                  {isLoading ? (
                    <div className="text-2xl sm:text-3xl font-bold text-muted-foreground">
                      ...
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">
                      <AnimatedCounter 
                        value={stat.value} 
                        duration={2.5}
                        delay={index * 0.1 + 0.8}
                        className={stat.color}
                      />
                      {stat.suffix && (
                        <span className={stat.color}>{stat.suffix}</span>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Label */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.7
                  }}
                  className="text-sm sm:text-base font-semibold text-muted-foreground"
                >
                  {stat.label}
                </motion.h3>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 rounded-xl ${stat.bgColor} blur-sm`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            Real-time visitor statistics • Updated automatically
          </p>
        </motion.div>
      </div>
    </section>
  )
}
