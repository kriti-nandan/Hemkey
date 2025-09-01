"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Home, Users, CheckCircle, ArrowRight, Building2, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function MarketsPage() {
  const markets = [
    {
      country: "UAE",
      cities: "Dubai & Abu Dhabi",
      image: "/dubai-luxury-skyline.png",
      flag: "🇦🇪",
      description:
        "The UAE stands as the Middle East's premier real estate destination, offering tax-free investments, world-class infrastructure, and strategic connectivity between East and West.",
      highlights: [
        "Tax-free environment",
        "Strategic global location",
        "Luxury developments",
        "Investment visa programs",
        "High rental yields",
        "Political stability",
      ],
      stats: [
        { icon: TrendingUp, value: "8-12%", label: "Annual ROI" },
        { icon: DollarSign, value: "$2.5B+", label: "Market Volume" },
        { icon: Home, value: "15,000+", label: "New Units Annually" },
        { icon: Users, value: "200+", label: "Nationalities" },
      ],
      opportunities: [
        {
          title: "Downtown Dubai",
          description: "Iconic luxury developments with Burj Khalifa views",
          priceRange: "$500K - $5M+",
        },
        {
          title: "Dubai Marina",
          description: "Waterfront living with premium amenities",
          priceRange: "$400K - $3M+",
        },
        {
          title: "Business Bay",
          description: "Commercial hub with mixed-use developments",
          priceRange: "$300K - $2M+",
        },
      ],
      color: "from-amber-500/20 to-orange-500/10",
      accentColor: "text-amber-600",
    },
    {
      country: "Australia",
      cities: "Sydney & Melbourne",
      image: "/sydney-luxury-real-estate.png",
      flag: "🇦🇺",
      description:
        "Australia offers one of the world's most stable property markets, backed by strong economic fundamentals, excellent quality of life, and robust legal frameworks.",
      highlights: [
        "Stable market conditions",
        "High rental yields",
        "Quality lifestyle",
        "Strong legal framework",
        "Growing population",
        "Economic stability",
      ],
      stats: [
        { icon: TrendingUp, value: "6-9%", label: "Annual Growth" },
        { icon: DollarSign, value: "$1.8B+", label: "Market Volume" },
        { icon: Home, value: "12,000+", label: "New Units Annually" },
        { icon: Users, value: "25M+", label: "Population" },
      ],
      opportunities: [
        {
          title: "Sydney CBD",
          description: "Premium apartments with harbour views",
          priceRange: "$800K - $4M+",
        },
        {
          title: "Melbourne Docklands",
          description: "Modern developments with city connectivity",
          priceRange: "$600K - $2.5M+",
        },
        {
          title: "Gold Coast",
          description: "Beachfront properties with tourism appeal",
          priceRange: "$500K - $3M+",
        },
      ],
      color: "from-blue-500/20 to-cyan-500/10",
      accentColor: "text-blue-600",
    },
    {
      country: "India",
      cities: "Mumbai & Bangalore",
      image: "/mumbai-luxury-skyline.png",
      flag: "🇮🇳",
      description:
        "India represents one of the world's fastest-growing real estate markets, driven by rapid urbanization, tech sector growth, and government infrastructure initiatives.",
      highlights: [
        "Emerging market potential",
        "High growth trajectory",
        "Tech hub development",
        "Government initiatives",
        "Young demographics",
        "Infrastructure boom",
      ],
      stats: [
        { icon: TrendingUp, value: "12-18%", label: "Annual Growth" },
        { icon: DollarSign, value: "$3.2B+", label: "Market Volume" },
        { icon: Home, value: "25,000+", label: "New Units Annually" },
        { icon: Users, value: "1.4B+", label: "Population" },
      ],
      opportunities: [
        {
          title: "Mumbai Financial District",
          description: "Commercial and residential towers in BKC",
          priceRange: "$200K - $1.5M+",
        },
        {
          title: "Bangalore Tech Corridor",
          description: "Modern apartments near IT hubs",
          priceRange: "$150K - $800K+",
        },
        {
          title: "Gurgaon New Town",
          description: "Luxury developments with modern amenities",
          priceRange: "$180K - $1M+",
        },
      ],
      color: "from-green-500/20 to-emerald-500/10",
      accentColor: "text-green-600",
    },
  ]

  const globalTrends = [
    {
      icon: Building2,
      title: "Sustainable Development",
      description: "Green building initiatives across all markets",
    },
    {
      icon: Globe,
      title: "Smart Cities",
      description: "Technology integration in urban planning",
    },
    {
      icon: Shield,
      title: "Investment Security",
      description: "Enhanced legal frameworks for foreign investors",
    },
    {
      icon: TrendingUp,
      title: "Market Growth",
      description: "Consistent appreciation across emerging markets",
    },
  ]

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gradient"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Global Markets
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover exceptional real estate opportunities across three of the world's most dynamic markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Markets Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {markets.map((market, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* Market Image */}
                  <motion.div
                    className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={market.image || "/placeholder.svg"}
                        alt={`${market.country} skyline`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-3xl font-bold">{market.country}</h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Market Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div>
                      <h2 className="text-4xl font-bold mb-4 text-left">{market.country} Real Estate</h2>
                      <p className="text-lg text-muted-foreground text-justify leading-relaxed">{market.description}</p>
                    </div>

                    {/* Market Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {market.stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="text-center p-4 bg-muted/50 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <stat.icon className={`h-8 w-8 mx-auto mb-2 ${market.accentColor}`} />
                          <div className={`text-2xl font-bold ${market.accentColor}`}>{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Market Highlights */}
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-left">Market Highlights</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {market.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className={`h-4 w-4 ${market.accentColor} flex-shrink-0`} />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href="/contact">
                      <Button className={`bg-primary text-primary-foreground hover:bg-primary/90`}>
                        Explore {market.country} Opportunities
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Trends */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Global Real Estate Trends
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-justify">
              Key trends shaping the future of real estate across our markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {globalTrends.map((trend, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 hover:bg-accent/20 transition-colors duration-300">
                  <trend.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-left">{trend.title}</h3>
                <p className="text-muted-foreground text-justify">{trend.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Market Comparison
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-justify">
              Compare key metrics across our three primary markets to make informed investment decisions.
            </p>
          </motion.div>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <table className="w-full bg-background border border-accent/20 rounded-lg overflow-hidden">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-bold">Market</th>
                  <th className="text-left p-4 font-bold">ROI Range</th>
                  <th className="text-left p-4 font-bold">Entry Level</th>
                  <th className="text-left p-4 font-bold">Key Advantage</th>
                  <th className="text-left p-4 font-bold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    market: "UAE",
                    roi: "8-12%",
                    entry: "$300K+",
                    advantage: "Tax-free returns",
                    bestFor: "Luxury investors",
                  },
                  {
                    market: "Australia",
                    roi: "6-9%",
                    entry: "$500K+",
                    advantage: "Market stability",
                    bestFor: "Conservative investors",
                  },
                  {
                    market: "India",
                    roi: "12-18%",
                    entry: "$150K+",
                    advantage: "High growth potential",
                    bestFor: "Growth investors",
                  },
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-t border-accent/10 hover:bg-muted/30 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="p-4 font-medium">{row.market}</td>
                    <td className="p-4 text-accent font-bold">{row.roi}</td>
                    <td className="p-4">{row.entry}</td>
                    <td className="p-4">{row.advantage}</td>
                    <td className="p-4">{row.bestFor}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-left">Ready to Invest Globally?</h2>
            <p className="text-xl text-muted-foreground mb-8 text-justify">
              Let our experts guide you through the best investment opportunities across UAE, Australia, and India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Schedule Market Consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Empowering real estate growth across borders. Your trusted channel partner in UAE, Australia, and India,
                delivering exceptional investment opportunities since 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-sm font-bold">@</span>
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
                <Link href="/services" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  Our Services
                </Link>
                <Link href="/markets" className="block text-accent font-medium">
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
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-primary-foreground/60">
                  &copy; 2025 HEMKEY. All rights reserved. | Empowering Global Real Estate Investment
                </p>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
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
