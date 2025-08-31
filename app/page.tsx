"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Home,
  Key,
  PiggyBank,
  Shield,
  Hammer,
} from "lucide-react"
import Link from "next/link"
import { VisitorCounter } from "@/components/VisitorCounter"

export default function HemkeyHomepage() {
  const [showServices, setShowServices] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    {
      url: "/luxury-cityscape-bg.png",
      title: "Dubai Luxury Developments",
      subtitle: "Premium waterfront properties",
      country: "UAE",
    },
    {
      url: "/dubai-luxury-skyline.png",
      title: "UAE Real Estate Excellence",
      subtitle: "Iconic skyline investments",
      country: "UAE",
    },
    {
      url: "/sydney-luxury-real-estate.png",
      title: "Australian Premium Properties",
      subtitle: "Harbour city luxury living",
      country: "Australia",
    },
    {
      url: "/mumbai-luxury-skyline.png",
      title: "India Growth Markets",
      subtitle: "Emerging luxury developments",
      country: "India",
    },
  ]

  const marketLocations: Record<string, Array<{
    name: string;
    image: string;
    subtitle: string;
  }>> = {
    UAE: [
      {
        name: "Dubai",
        image: "/dubai-luxury-skyline.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
      {
        name: "Abu Dhabi",
        image: "/luxury-cityscape-bg.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
      {
        name: "Sharjah Waterfront City",
        image: "/sharjah-waterfront.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
    ],
    Australia: [
      {
        name: "Sydney",
        image: "/sydney-luxury-real-estate.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
      {
        name: "Melbourne",
        image: "/melbourne-skyline.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
      {
        name: "Brisbane",
        image: "/brisbane-cityscape.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
    ],
    India: [
      {
        name: "Gurgaon",
        image: "/gurgaon-skyline.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
      {
        name: "Mumbai",
        image: "/mumbai-luxury-skyline.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
      {
        name: "Bangalore",
        image: "/bangalore-cityscape.png",
        subtitle: "Premium Properties & Investment Opportunities",
      },
    ],
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carouselImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const services = [
    {
      icon: Building2,
      title: "Construction & Development",
      description: "End-to-end construction management and luxury development projects",
    },
    {
      icon: Home,
      title: "Property Sales & Marketing",
      description: "Comprehensive sales strategies and marketing campaigns for maximum ROI",
    },
    {
      icon: Key,
      title: "Property Rental & Management",
      description: "Full-service rental management and tenant relations",
    },
    {
      icon: PiggyBank,
      title: "Investment Advisory",
      description: "Strategic investment guidance and portfolio optimization",
    },
    {
      icon: Shield,
      title: "Legal & Compliance",
      description: "Complete legal support for international real estate transactions",
    },
    {
      icon: Hammer,
      title: "Renovation & Upgrades",
      description: "Property enhancement and modernization services",
    },
  ]

  const currentCountry = carouselImages[currentSlide].country
  const currentMarkets = marketLocations[currentCountry] || []

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative hero-responsive flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${carouselImages[currentSlide].url})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center touch-target"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center touch-target"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white shadow-lg" : "bg-white/30 hover:bg-white/50"
              }`}
              style={{ minWidth: '8px', minHeight: '8px' }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight responsive-text-4xl sm:responsive-text-5xl lg:responsive-text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Empowering Real Estate Growth Across Borders
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-6 sm:mb-8 text-center max-w-3xl mx-auto px-2 responsive-text-base sm:responsive-text-lg lg:responsive-text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Your Trusted Channel Partner in UAE, Australia, and India
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto min-h-[44px] text-sm sm:text-base px-4 sm:px-6 py-3 btn-responsive touch-target"
                onClick={() => setShowServices(!showServices)}
              >
                Explore Opportunities
                <ChevronDown className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform ${showServices ? "rotate-180" : ""}`} />
              </Button>

              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-background border border-accent/20 rounded-lg shadow-xl p-4 min-w-[280px] sm:min-w-[300px] z-50"
                >
                  <div className="grid gap-2">
                    {services.slice(0, 4).map((service, index) => (
                      <Link key={index} href="/services">
                        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors min-h-[44px] touch-target">
                          <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                          <span className="text-sm font-medium">{service.title}</span>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-accent/20 pt-2 mt-2">
                      <Link href="/services" className="text-sm text-accent hover:text-accent/80 font-medium">
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <Link href="/become-partner" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent w-full sm:w-auto min-h-[44px] text-sm sm:text-base px-4 sm:px-6 py-3 btn-responsive touch-target"
              >
                Become a Partner
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-16 sm:top-20 left-4 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-accent/20 rounded-full animate-float"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-full animate-float"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Markets Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCountry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 text-center responsive-text-xl sm:responsive-text-2xl lg:responsive-text-4xl">
                Our Key {currentCountry} Markets
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-2xl mx-auto px-4 responsive-text-sm sm:responsive-text-base lg:responsive-text-lg">
                Discover premium investment opportunities in our established markets
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCountry}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {currentMarkets.map((location, index) => (
                <motion.div
                  key={`${currentCountry}-${location.name}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                >
                  <div className="aspect-[16/9] relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${location.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 responsive-text-lg sm:responsive-text-xl lg:responsive-text-2xl">{location.name}</h3>
                      <p className="text-white/90 text-sm sm:text-base text-justify responsive-text-sm sm:responsive-text-base leading-relaxed">{location.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Visitor Counter Section */}
      <VisitorCounter />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground footer-responsive">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
                <img
                  src="/hemkey-icon-logo.png"
                  alt="HEMKEY Icon"
                  className="h-6 w-auto sm:h-8 md:h-10 lg:h-12 brightness-0 invert"
                />
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

            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 responsive-text-base sm:responsive-text-lg">Quick Links</h4>
              <div className="space-y-2 sm:space-y-3">
                <Link
                  href="/about"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm md:text-base py-1 min-h-[44px] flex items-center touch-target responsive-text-xs sm:responsive-text-sm md:responsive-text-base"
                >
                  About Us
                </Link>
                <Link
                  href="/services"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm md:text-base py-1 min-h-[44px] flex items-center touch-target responsive-text-xs sm:responsive-text-sm md:responsive-text-base"
                >
                  Our Services
                </Link>
                <Link
                  href="/markets"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm md:text-base py-1 min-h-[44px] flex items-center touch-target responsive-text-xs sm:responsive-text-sm md:responsive-text-base"
                >
                  Global Markets
                </Link>
                <Link
                  href="/contact"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm md:text-base py-1 min-h-[44px] flex items-center touch-target responsive-text-xs sm:responsive-text-sm md:responsive-text-base"
                >
                  Contact Us
                </Link>
                <Link
                  href="/become-partner"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm md:text-base py-1 min-h-[44px] flex items-center touch-target responsive-text-xs sm:responsive-text-sm md:responsive-text-base"
                >
                  Become a Partner
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 responsive-text-base sm:responsive-text-lg">Our Markets</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇦🇪</span>
                    <span className="font-medium text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base">UAE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 responsive-text-xs sm:responsive-text-sm">
                    Dubai, Abu Dhabi & Sharjah Waterfront City
                  </p>
                </div>
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇦🇺</span>
                    <span className="font-medium text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base">Australia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 responsive-text-xs sm:responsive-text-sm">Sydney & Melbourne</p>
                </div>
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇮🇳</span>
                    <span className="font-medium text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base">India</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 responsive-text-xs sm:responsive-text-sm">Mumbai & Bangalore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-primary-foreground/60 text-xs sm:text-sm responsive-text-xs sm:responsive-text-sm">
                  &copy; 2025 HEMKEY. All rights reserved. | Empowering Global Real Estate Investment
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm responsive-text-xs sm:responsive-text-sm">
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
