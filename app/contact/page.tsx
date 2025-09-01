"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, X } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    budget: "",
    propertyType: "",
    message: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Helper function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }

  // Helper function to validate field on blur
  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        return value.trim() ? null : 'Name is required'
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format'
        return null
      case 'phone':
        if (!value.trim()) return 'Phone is required'
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '')
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(cleanPhone)) return 'Invalid phone format'
        return null
      case 'subject':
        return value.trim() ? null : 'Subject is required'
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        return null
      default:
        return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset states
    setShowSuccess(false)
    setShowError(false)
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      // Enhanced validation
      if (!contactForm.name.trim()) {
        throw new Error("Please enter your full name")
      }
      
      if (!contactForm.email.trim()) {
        throw new Error("Please enter your email address")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(contactForm.email)) {
        throw new Error("Please enter a valid email address")
      }

      if (!contactForm.phone.trim()) {
        throw new Error("Please enter your phone number")
      }

      // Basic phone validation (allows international formats)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      const cleanPhone = contactForm.phone.replace(/[\s\-\(\)]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        throw new Error("Please enter a valid phone number")
      }

      if (!contactForm.subject.trim()) {
        throw new Error("Please enter a subject for your message")
      }

      if (!contactForm.message.trim()) {
        throw new Error("Please enter your message")
      }

      if (contactForm.message.trim().length < 10) {
        throw new Error("Please enter a message with at least 10 characters")
      }

      // Send email
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          phone: contactForm.phone.trim(),
          subject: contactForm.subject.trim(),
          message: contactForm.message.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      // Success
      setShowSuccess(true)
      setContactForm({ name: "", email: "", phone: "", subject: "", budget: "", propertyType: "", message: "" })
      
      // Hide success message after 8 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 8000)

    } catch (error) {
      // Error handling
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
      setShowError(true)
      
      // Hide error message after 8 seconds
      setTimeout(() => {
        setShowError(false)
        setErrorMessage("")
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const offices = [
    {
      country: "UAE",
      city: "Dubai",
      address: "Tamani Art Tower, Business Bay, Dubai, UAE",
      phone: "+971 58 506 3124",
      email: "business@hemkey.com",
      hours: "Sunday - Thursday: 9:00 AM - 6:00 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1234567890!2d55.2708!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBusiness%20Bay%20Dubai!5e0!3m2!1sen!2sae!4v1234567890",
      flag: "🇦🇪",
      timezone: "GMT+4",
    },
    {
      country: "Australia",
      city: "Melbourne",
      address: "Corio Village Commercial Complex, Bacchus Marsh Road, Geelong, Melbourne, Australia",
      phone: "+61 466 303 350",
      email: "business@hemkey.com",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.1234567890!2d144.3644!3d-38.1499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGeelong%20Melbourne!5e0!3m2!1sen!2sau!4v1234567890",
      flag: "🇦🇺",
      timezone: "GMT+10",
    },
    {
      country: "India",
      city: "Gurugram",
      address: "DLF Corporate Greens, Sector 74 A, Gurugram, Haryana, India",
      phone: "+91 7015723082",
      email: "business@hemkey.com",
      hours: "Monday - Saturday: 9:30 AM - 6:30 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.1234567890!2d77.0688!3d28.3852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDLF%20Corporate%20Greens%20Gurugram!5e0!3m2!1sen!2sin!4v1234567890",
      flag: "🇮🇳",
      timezone: "GMT+5:30",
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Connect with our global team of real estate experts across UAE, Australia, and India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Quick Contact */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background rounded-2xl shadow-lg border border-accent/10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form - 60% width */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-accent/20 shadow-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold">Your Query</CardTitle>
                    <CardDescription className="text-base">
                      Ready to explore global real estate opportunities? Send us a message and we'll get back to you
                      within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {showSuccess ? (
                      <motion.div
                        className="text-center py-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-600 mb-3">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. Our team will contact you within 24 hours.
                        </p>
                      </motion.div>
                    ) : showError ? (
                      <motion.div
                        className="text-center py-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <X className="h-8 w-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-red-600 mb-3">Message Failed to Send</h3>
                        <p className="text-muted-foreground mb-4">
                          {errorMessage}
                        </p>
                        <Button
                          onClick={() => setShowError(false)}
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Try Again
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Input
                              placeholder="Full Name *"
                              value={contactForm.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              onBlur={(e) => {
                                const error = validateField('name', e.target.value)
                                if (error) {
                                  setErrorMessage(error)
                                  setShowError(true)
                                  setTimeout(() => setShowError(false), 3000)
                                }
                              }}
                              required
                              className="h-11"
                            />
                          </div>
                          <div>
                            <Input
                              type="email"
                              placeholder="Email Address *"
                              value={contactForm.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              onBlur={(e) => {
                                const error = validateField('email', e.target.value)
                                if (error) {
                                  setErrorMessage(error)
                                  setShowError(true)
                                  setTimeout(() => setShowError(false), 3000)
                                }
                              }}
                              required
                              className="h-11"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Input
                              type="tel"
                              placeholder="Phone Number *"
                              value={contactForm.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              onBlur={(e) => {
                                const error = validateField('phone', e.target.value)
                                if (error) {
                                  setErrorMessage(error)
                                  setShowError(true)
                                  setTimeout(() => setShowError(false), 3000)
                                }
                              }}
                              required
                              className="h-11"
                            />
                          </div>
                          <div>
                            <Input
                              placeholder="Subject *"
                              value={contactForm.subject}
                              onChange={(e) => handleInputChange('subject', e.target.value)}
                              onBlur={(e) => {
                                const error = validateField('subject', e.target.value)
                                if (error) {
                                  setErrorMessage(error)
                                  setShowError(true)
                                  setTimeout(() => setShowError(false), 3000)
                                }
                              }}
                              required
                              className="h-11"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Select onValueChange={(value) => handleInputChange('budget', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Your Budget" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-500k">Under $500K</SelectItem>
                                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                                <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                                <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                                <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                                <SelectItem value="over-10m">Over $10M</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Property Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="both">Both Residential & Commercial</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Textarea
                          placeholder="Your Message *"
                          value={contactForm.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          onBlur={(e) => {
                            const error = validateField('message', e.target.value)
                            if (error) {
                              setErrorMessage(error)
                              setShowError(true)
                              setTimeout(() => setShowError(false), 3000)
                            }
                          }}
                          required
                          rows={5}
                          className="resize-none"
                        />
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Contact Info - 40% width */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3">Quick Contact</h2>
                  <p className="text-muted-foreground text-sm">
                    Prefer to speak directly? Choose the office closest to your timezone for immediate assistance.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {offices.map((office, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="hover:shadow-md transition-all duration-300 border-accent/20 hover:border-accent/40">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-xl">{office.flag}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base mb-2">
                                {office.country} - {office.city}
                              </h3>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-accent flex-shrink-0" />
                                  <span className="text-xs font-medium truncate">{office.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-accent flex-shrink-0" />
                                  <span className="text-xs font-medium truncate">{office.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-accent flex-shrink-0" />
                                  <span className="text-xs text-muted-foreground">{office.hours}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-2">24/7 Support</h3>
                        <p className="text-muted-foreground text-xs mb-3">
                          For urgent matters outside business hours, our global support team is available around the
                          clock.
                        </p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-accent" />
                          <span className="font-medium text-xs">Emergency: +91 7015723082 HEMKEY</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations with Maps */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Global Offices
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Visit us at any of our strategically located offices across three continents.
            </p>
          </motion.div>

          <div className="space-y-12">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{office.flag}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{office.country} Office</h3>
                      <p className="text-lg text-muted-foreground">{office.city}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Address</p>
                        <p className="text-muted-foreground text-sm">{office.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Phone</p>
                        <p className="text-muted-foreground text-sm">{office.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-muted-foreground text-sm">{office.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Business Hours</p>
                        <p className="text-muted-foreground text-sm">{office.hours}</p>
                        <p className="text-xs text-muted-foreground">({office.timezone})</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <motion.div
                    className="relative h-80 rounded-xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Google Maps Embed */}
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What are your consultation fees?",
                answer:
                  "Initial consultations are complimentary. We believe in building relationships first and demonstrating value before any financial commitment.",
              },
              {
                question: "Do you assist with international property financing?",
                answer:
                  "Yes, we have partnerships with leading financial institutions across all our markets to help secure competitive financing options for international investors.",
              },
              {
                question: "How long does the property acquisition process take?",
                answer:
                  "Timeline varies by market and property type. Typically, UAE transactions take 30-45 days, Australia 45-60 days, and India 60-90 days from offer acceptance to completion.",
              },
              {
                question: "Do you provide property management services?",
                answer:
                  "Absolutely. We offer comprehensive property management services including tenant sourcing, rent collection, maintenance coordination, and regular property inspections.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-accent/20 hover:border-accent/40 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                <Link href="/markets" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  Global Markets
                </Link>
                <Link href="/contact" className="block text-accent font-medium">
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
