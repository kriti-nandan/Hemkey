"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, TrendingUp, Award, Building2, Target, Lightbulb } from "lucide-react"
import Link from "next/link"

// Custom hook for animated counter
function useCounterAnimation(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(target * easeOutQuart)
        
        setCount(currentCount)
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, target, duration])

  return { count, ref }
}

export default function AboutPage() {
  // Counter animation for Happy Clients
  const { count: happyClientsCount, ref: happyClientsRef } = useCounterAnimation(1000, 2500)

  const values = [
    {
      icon: Globe,
      title: "Global Presence",
      description:
        "Operating across three dynamic markets with deep local knowledge and international perspective. Our strategic presence in UAE, Australia, and India allows us to provide unparalleled cross-border real estate solutions.",
      features: [
        "Multi-market expertise",
        "Local market insights",
        "International standards",
        "Cultural understanding",
      ],
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description:
        "Every decision we make is centered around our clients' success. We believe in building long-term relationships through transparency, trust, and delivering exceptional results that exceed expectations.",
      features: ["Personalized service", "Transparent communication", "Dedicated support", "Results-driven approach"],
    },
    {
      icon: TrendingUp,
      title: "Long-Term Value Creation",
      description:
        "We focus on sustainable growth and value creation that benefits all stakeholders. Our strategic approach ensures that every partnership and investment contributes to lasting success and prosperity.",
      features: ["Sustainable growth", "Strategic planning", "Value optimization", "Future-focused solutions"],
    },
  ]

  const achievements = [
    {
      icon: Building2,
      number: "500+",
      title: "Properties Managed",
      description: "Successfully managed luxury properties across three continents",
    },
    {
      icon: Globe,
      number: "3",
      title: "Global Markets",
      description: "Established presence in UAE, Australia, and India",
    },
    {
      icon: Users,
      number: "1000+",
      title: "Happy Clients",
      description: "Satisfied investors and property owners worldwide",
      isAnimated: true,
    },
    {
      icon: Award,
      number: "5+",
      title: "Years Experience",
      description: "Proven track record in international real estate",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-10 md:pb-12 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container-responsive">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 text-gradient responsive-text-3xl sm:responsive-text-4xl lg:responsive-text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About HEMKEY
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 sm:mb-5 md:mb-6 text-justify responsive-text-base sm:responsive-text-lg lg:responsive-text-xl">
              Your trusted channel partner bridging global real estate markets with local expertise and international
              standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 responsive-text-2xl sm:responsive-text-3xl lg:responsive-text-4xl">Bridging Global Real Estate Markets</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-justify responsive-text-sm sm:responsive-text-base md:responsive-text-lg leading-relaxed">
                  HEMKEY stands as a premier Real Estate Channel Partner, strategically positioned across three of the
                  world's most dynamic property markets: the United Arab Emirates, Australia, and India. Our unique
                  positioning allows us to offer unparalleled insights and opportunities in these rapidly evolving
                  markets.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-justify responsive-text-sm sm:responsive-text-base md:responsive-text-lg leading-relaxed">
                  Founded on the principles of trust, transparency, and excellence, we have built a reputation for
                  delivering exceptional results through innovative solutions and strategic partnerships. Our deep
                  understanding of local markets, combined with international best practices, enables us to provide
                  comprehensive real estate services that drive sustainable growth and value creation.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-justify responsive-text-sm sm:responsive-text-base md:responsive-text-lg leading-relaxed">
                  Whether you're an investor seeking lucrative opportunities, a developer looking to expand
                  internationally, or a property owner wanting to maximize returns, HEMKEY provides the expertise,
                  network, and support you need to achieve your real estate goals.
                </p>
              </div>
              <div className="mt-4 sm:mt-5 md:mt-6">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] btn-responsive touch-target">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden">
                <img
                  src="/luxury-cityscape-bg.png"
                  alt="Global real estate markets"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-3 sm:left-4 md:left-5 text-white">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 responsive-text-base sm:responsive-text-lg lg:responsive-text-xl">Global Excellence</h3>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base">Connecting markets, creating opportunities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 text-gradient responsive-text-2xl sm:responsive-text-3xl lg:responsive-text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-justify responsive-text-sm sm:responsive-text-base lg:responsive-text-xl">
              The principles that guide our approach to real estate partnerships and drive our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-accent/20 hover:border-accent/40 group">
                  <CardHeader className="text-center pb-3 sm:pb-4">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                      <value.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-accent transition-colors duration-300 responsive-text-lg sm:responsive-text-xl lg:responsive-text-2xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <CardDescription className="text-muted-foreground text-center text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base leading-relaxed">{value.description}</CardDescription>
                    <div className="space-y-1 sm:space-y-2">
                      {value.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-muted-foreground responsive-text-xs sm:responsive-text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 text-gradient responsive-text-2xl sm:responsive-text-3xl lg:responsive-text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Achievements
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-justify responsive-text-sm sm:responsive-text-base lg:responsive-text-xl">
              Numbers that reflect our commitment to excellence and the trust our clients place in us.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                ref={achievement.title === "Happy Clients" ? happyClientsRef : undefined}
              >
                <motion.div
                  className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-accent/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "var(--accent)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <achievement.icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-accent" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2 responsive-text-2xl sm:responsive-text-3xl lg:responsive-text-4xl">
                  {achievement.title === "Happy Clients" ? `${happyClientsCount}+` : achievement.number}
                </h3>
                <h4 className="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 md:mb-3 responsive-text-sm sm:responsive-text-lg lg:responsive-text-xl">{achievement.title}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader className="text-center">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold responsive-text-xl sm:responsive-text-2xl lg:responsive-text-3xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground text-center responsive-text-sm sm:responsive-text-base md:responsive-text-lg leading-relaxed">
                    To empower real estate growth across borders by providing exceptional channel partnership services
                    that bridge global markets with local expertise, creating sustainable value for investors,
                    developers, and property owners worldwide.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent/20">
                <CardHeader className="text-center">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold responsive-text-xl sm:responsive-text-2xl lg:responsive-text-3xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground text-center responsive-text-sm sm:responsive-text-base md:responsive-text-lg leading-relaxed">
                    To become the leading global real estate channel partner, recognized for innovation, integrity, and
                    excellence in connecting international markets and creating opportunities that transform communities
                    and lives.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 responsive-text-2xl sm:responsive-text-3xl lg:responsive-text-5xl">Ready to Partner with Us?</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-5 md:mb-6 text-justify responsive-text-sm sm:responsive-text-base lg:responsive-text-xl">
                Join our network of successful partners and discover the opportunities that await in global real estate
                markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/become-partner">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] btn-responsive touch-target">
                    Become a Partner
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent min-h-[44px] btn-responsive touch-target"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground footer-responsive">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
                <img src="/hemkey-icon-logo.png" alt="HEMKEY Icon" className="h-6 w-auto sm:h-8 md:h-10 lg:h-12 brightness-0 invert" />
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold responsive-text-lg sm:responsive-text-xl lg:responsive-text-2xl">HEMKEY</h3>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm">Real Estate Excellence</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-4 sm:mb-6 max-w-md text-justify text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm">
                Empowering real estate growth across borders. Your trusted channel partner in UAE, Australia, and India,
                delivering exceptional investment opportunities since 2020.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer min-h-[44px] min-w-[44px] touch-target">
                  <span className="text-xs sm:text-sm font-bold">f</span>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer min-h-[44px] min-w-[44px] touch-target">
                  <span className="text-xs sm:text-sm font-bold">in</span>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer min-h-[44px] min-w-[44px] touch-target">
                  <span className="text-xs sm:text-sm font-bold">@</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 responsive-text-base sm:responsive-text-lg">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-accent font-medium text-sm sm:text-base responsive-text-sm sm:responsive-text-base min-h-[44px] flex items-center touch-target">
                  About Us
                </Link>
                <Link href="/services" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm sm:text-base responsive-text-sm sm:responsive-text-base min-h-[44px] flex items-center touch-target">
                  Our Services
                </Link>
                <Link href="/markets" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm sm:text-base responsive-text-sm sm:responsive-text-base min-h-[44px] flex items-center touch-target">
                  Global Markets
                </Link>
                <Link href="/contact" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm sm:text-base responsive-text-sm sm:responsive-text-base min-h-[44px] flex items-center touch-target">
                  Contact Us
                </Link>
                <Link
                  href="/become-partner"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm sm:text-base responsive-text-sm sm:responsive-text-base min-h-[44px] flex items-center touch-target"
                >
                  Become a Partner
                </Link>
              </div>
            </div>

            {/* Markets */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 responsive-text-base sm:responsive-text-lg">Our Markets</h4>
              <div className="space-y-3">
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇦🇪</span>
                    <span className="font-medium text-sm sm:text-base responsive-text-sm sm:responsive-text-base">UAE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 responsive-text-xs sm:responsive-text-sm">Dubai & Abu Dhabi</p>
                </div>
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇦🇺</span>
                    <span className="font-medium text-sm sm:text-base responsive-text-sm sm:responsive-text-base">Australia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 responsive-text-xs sm:responsive-text-sm">Sydney & Melbourne</p>
                </div>
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇮🇳</span>
                    <span className="font-medium text-sm sm:text-base responsive-text-sm sm:responsive-text-base">India</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 responsive-text-xs sm:responsive-text-sm">Mumbai & Bangalore</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-primary-foreground/60 text-xs sm:text-sm responsive-text-xs sm:responsive-text-sm">
                  &copy; 2025 HEMKEY. All rights reserved. | Empowering Global Real Estate Investment
                </p>
              </div>
              <div className="flex space-x-6 text-xs sm:text-sm responsive-text-xs sm:responsive-text-sm">
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors min-h-[44px] flex items-center touch-target">
                  Privacy Policy
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors min-h-[44px] flex items-center touch-target">
                  Terms of Service
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors min-h-[44px] flex items-center touch-target">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
