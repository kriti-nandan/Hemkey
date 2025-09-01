"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  TrendingUp,
  Globe,
  Key,
  Shield,
  Hammer,
  CheckCircle,
  ArrowRight,
  Handshake,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const coreServices = [
    {
      icon: Handshake,
      title: "Developer Alliances",
      description:
        "Strategic partnerships with leading developers across UAE, Australia, and India to bring exclusive opportunities to our clients.",
      features: [
        "Exclusive project access",
        "Pre-launch opportunities",
        "Developer financing options",
        "Quality assurance programs",
      ],
      benefits: "Access to premium developments before public launch",
      color: "from-blue-500/20 to-blue-600/10",
      hoverColor: "group-hover:from-blue-500/30 group-hover:to-blue-600/20",
    },
    {
      icon: BarChart3,
      title: "Property Sales & Marketing",
      description:
        "Comprehensive sales strategies and cutting-edge marketing campaigns designed to maximize property value and accelerate sales.",
      features: [
        "Digital marketing campaigns",
        "Sales funnel optimization",
        "Market analysis & pricing",
        "Lead generation systems",
      ],
      benefits: "Proven strategies that increase sales velocity by 40%",
      color: "from-green-500/20 to-green-600/10",
      hoverColor: "group-hover:from-green-500/30 group-hover:to-green-600/20",
    },
    {
      icon: TrendingUp,
      title: "Investment Consulting",
      description:
        "Expert guidance on real estate investments with comprehensive market analysis and risk assessment to optimize your portfolio.",
      features: ["Portfolio optimization", "Risk assessment", "Market trend analysis", "ROI projections"],
      benefits: "Data-driven insights for superior investment returns",
      color: "from-purple-500/20 to-purple-600/10",
      hoverColor: "group-hover:from-purple-500/30 group-hover:to-purple-600/20",
    },
    {
      icon: Globe,
      title: "Cross-Border Real Estate Solutions",
      description:
        "Seamless international real estate transactions with expert navigation of legal, financial, and regulatory requirements.",
      features: ["International compliance", "Currency hedging strategies", "Legal documentation", "Tax optimization"],
      benefits: "Simplified global real estate investments",
      color: "from-orange-500/20 to-orange-600/10",
      hoverColor: "group-hover:from-orange-500/30 group-hover:to-orange-600/20",
    },
  ]

  const additionalServices = [
    {
      icon: Building2,
      title: "Construction & Development",
      description: "End-to-end construction management and luxury development projects",
      features: ["Project Management", "Quality Assurance", "Timeline Optimization", "Cost Control"],
    },
    {
      icon: Key,
      title: "Property Rental & Management",
      description: "Full-service rental management and tenant relations",
      features: ["Tenant Screening", "Rent Collection", "Property Maintenance", "Legal Compliance"],
    },
    {
      icon: Shield,
      title: "Legal & Compliance",
      description: "Complete legal support for international real estate transactions",
      features: ["Contract Review", "Regulatory Compliance", "Due Diligence", "Documentation"],
    },
    {
      icon: Hammer,
      title: "Renovation & Upgrades",
      description: "Property enhancement and modernization services",
      features: ["Interior Design", "Structural Upgrades", "Smart Home Integration", "Energy Efficiency"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Core Services - Main Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 text-gradient responsive-text-3xl sm:responsive-text-4xl lg:responsive-text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Core Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 sm:mb-5 md:mb-6 text-justify responsive-text-base sm:responsive-text-lg lg:responsive-text-xl">
              Our flagship services that drive success for developers, investors, and property owners worldwide.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-accent/20 hover:border-accent/60 group cursor-pointer overflow-hidden bg-transparent">
                  <div className="relative z-10">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110">
                          <service.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-accent transition-colors duration-300 text-left responsive-text-lg sm:responsive-text-xl lg:responsive-text-2xl">
                            {service.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground text-sm sm:text-base md:text-lg text-justify leading-relaxed responsive-text-sm sm:responsive-text-base md:responsive-text-lg">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-5">
                      <div className="space-y-2 sm:space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 sm:gap-3">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                            <span className="text-xs sm:text-sm md:text-base text-muted-foreground responsive-text-xs sm:responsive-text-sm md:responsive-text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 sm:pt-4 border-t border-accent/20">
                        <div className="flex items-center gap-2 text-accent font-medium">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm responsive-text-xs sm:responsive-text-sm">{service.benefits}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="ghost"
                          className="group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300 p-0 h-auto font-medium text-xs sm:text-sm responsive-text-xs sm:responsive-text-sm"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
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
              Additional Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-justify responsive-text-sm sm:responsive-text-base lg:responsive-text-xl">
              Comprehensive support services to complement your real estate journey and ensure complete success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-accent/20 hover:border-accent/40 group cursor-pointer bg-transparent">
                  <CardHeader className="text-center pb-3 sm:pb-4">
                    <div className="mx-auto w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110">
                      <service.icon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-accent" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-accent transition-colors duration-300 text-left responsive-text-lg sm:responsive-text-xl">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-justify text-xs sm:text-sm md:text-base responsive-text-xs sm:responsive-text-sm md:responsive-text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
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

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gradient responsive-text-3xl sm:responsive-text-4xl lg:responsive-text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-justify responsive-text-base sm:responsive-text-lg lg:responsive-text-xl">
              A streamlined approach that ensures success at every step of your real estate journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Understanding your goals and requirements through detailed consultation",
              },
              {
                step: "02",
                title: "Strategy",
                description: "Developing a customized strategy based on market analysis and your objectives",
              },
              {
                step: "03",
                title: "Execution",
                description: "Implementing the strategy with our expert team and global network",
              },
              {
                step: "04",
                title: "Success",
                description: "Achieving your goals and maintaining long-term partnership for continued growth",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{process.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-accent/30 -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-left">{process.title}</h3>
                <p className="text-muted-foreground text-left">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 responsive-text-3xl sm:responsive-text-4xl lg:responsive-text-5xl">Ready to Get Started?</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-justify responsive-text-base sm:responsive-text-lg lg:responsive-text-xl">
                Let's discuss how our services can help you achieve your real estate goals across global markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] btn-responsive touch-target">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/become-partner">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent min-h-[44px] btn-responsive touch-target"
                  >
                    Become a Partner
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
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/hemkey loogo.jpg"
                  alt="HEMKEY Logo"
                  className="h-12 w-auto mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold">HEMKEY</h3>
                  <p className="text-primary-foreground/80">Real Estate Excellence</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-6 max-w-md text-sm sm:text-base responsive-text-sm sm:responsive-text-base">
                Empowering real estate growth across borders. Your trusted channel partner in UAE, Australia, and India,
                delivering exceptional investment opportunities since 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer min-h-[44px] min-w-[44px] touch-target">
                  <span className="text-xs sm:text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer min-h-[44px] min-w-[44px] touch-target">
                  <span className="text-xs sm:text-sm font-bold">in</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer min-h-[44px] min-w-[44px] touch-target">
                  <span className="text-xs sm:text-sm font-bold">@</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </Link>
                <Link href="/services" className="block text-accent font-medium">
                  Our Services
                </Link>
                <Link href="/markets" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  Global Markets
                </Link>
                <Link href="/contact" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact Us
                </Link>
                <Link
                  href="/become-partner"
                  className="block text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Become a Partner
                </Link>
              </div>
            </div>

            {/* Markets */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Markets</h4>
              <div className="space-y-3">
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇦🇪</span>
                    <span className="font-medium">UAE</span>
                  </div>
                  <p className="text-sm text-primary-foreground/60">Dubai & Abu Dhabi</p>
                </div>
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇦🇺</span>
                    <span className="font-medium">Australia</span>
                  </div>
                  <p className="text-sm text-primary-foreground/60">Sydney & Melbourne</p>
                </div>
                <div className="text-primary-foreground/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🇮🇳</span>
                    <span className="font-medium">India</span>
                  </div>
                  <p className="text-sm text-primary-foreground/60">Mumbai & Bangalore</p>
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
