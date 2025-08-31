"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, ArrowLeft, Users, TrendingUp, Globe, Award } from "lucide-react"
import Link from "next/link"

export default function BecomePartnerPage() {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      city: "",
    },
    partnership: {
      interestedMarkets: [] as string[],
      expectedVolume: "",
      partnershipGoals: "",
      additionalInfo: "",
    },
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const totalSteps = 2

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleArrayChange = (section: string, field: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentArray = prev[section as keyof typeof prev][field as keyof (typeof prev)[typeof section]] as string[]
      const newArray = checked ? [...currentArray, value] : currentArray.filter((item) => item !== value)

      return {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: newArray,
        },
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset states
    setShowSuccess(false)
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.personalInfo.firstName || !formData.personalInfo.lastName || 
          !formData.personalInfo.email || !formData.personalInfo.phone || 
          !formData.personalInfo.company || !formData.partnership.partnershipGoals) {
        throw new Error("Please fill in all required fields")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.personalInfo.email)) {
        throw new Error("Please enter a valid email address")
      }

      // Prepare data for email
      const emailData = {
        name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        company: formData.personalInfo.company,
        message: `Partnership Request Details:

Country: ${formData.personalInfo.country}
City: ${formData.personalInfo.city}
Interested Markets: ${formData.partnership.interestedMarkets.join(', ') || 'Not specified'}
Expected Volume: ${formData.partnership.expectedVolume || 'Not specified'}

Partnership Goals:
${formData.partnership.partnershipGoals}

Additional Information:
${formData.partnership.additionalInfo || 'None provided'}`,
        subject: "New Hemkey Partner Request"
      }

      // Send email
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send partner request')
      }

      // Success
      setShowSuccess(true)
      setFormData({
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          city: "",
        },
        partnership: {
          interestedMarkets: [],
          expectedVolume: "",
          partnershipGoals: "",
          additionalInfo: "",
        },
      })
      
      // Hide success message after 8 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 8000)

    } catch (error) {
      // Error handling
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
      
      // Hide error message after 8 seconds
      setTimeout(() => {
        setErrorMessage("")
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl mx-auto px-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-green-600 mb-4">Application Submitted Successfully!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your interest in partnering with HEMKEY. Our team will review your application and contact you
            within 48 hours.
          </p>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>What happens next?</strong>
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="font-semibold mb-2">1. Review Process</div>
                <div className="text-muted-foreground">Our team reviews your application and qualifications</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="font-semibold mb-2">2. Initial Interview</div>
                <div className="text-muted-foreground">We'll schedule a call to discuss partnership opportunities</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="font-semibold mb-2">3. Partnership Agreement</div>
                <div className="text-muted-foreground">Finalize terms and begin our successful partnership</div>
              </div>
            </div>
          </div>
          <Link href="/">
            <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Become a HEMKEY Partner</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our exclusive network of real estate professionals and unlock opportunities across UAE, Australia,
              and India.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="grid md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { icon: Globe, title: "Global Network", desc: "Access to international markets" },
              { icon: TrendingUp, title: "High Commissions", desc: "Competitive revenue sharing" },
              { icon: Users, title: "Marketing Support", desc: "Professional marketing materials" },
              { icon: Award, title: "Training & Certification", desc: "Ongoing professional development" },
            ].map((benefit, index) => (
              <Card key={index} className="text-center border-accent/20">
                <CardContent className="pt-6">
                  <benefit.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Partnership Preferences"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Define your partnership goals"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{errorMessage}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <Input
                          value={formData.personalInfo.firstName}
                          onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <Input
                          value={formData.personalInfo.lastName}
                          onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <Input
                          type="tel"
                          value={formData.personalInfo.phone}
                          onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name *</label>
                      <Input
                        value={formData.personalInfo.company}
                        onChange={(e) => handleInputChange("personalInfo", "company", e.target.value)}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Country *</label>
                        <Select onValueChange={(value) => handleInputChange("personalInfo", "country", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uae">United Arab Emirates</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <Input
                          value={formData.personalInfo.city}
                          onChange={(e) => handleInputChange("personalInfo", "city", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Partnership Preferences */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-4">
                        Interested Markets (Select all that apply)
                      </label>
                      <div className="grid md:grid-cols-3 gap-3">
                        {["UAE", "Australia", "India"].map((market) => (
                          <div key={market} className="flex items-center space-x-2">
                            <Checkbox
                              id={market}
                              onCheckedChange={(checked) =>
                                handleArrayChange("partnership", "interestedMarkets", market, checked as boolean)
                              }
                            />
                            <label htmlFor={market} className="text-sm">
                              {market}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Expected Annual Transaction Volume</label>
                      <Select onValueChange={(value) => handleInputChange("partnership", "expectedVolume", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select expected volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5m">$1M - $5M</SelectItem>
                          <SelectItem value="5-20m">$5M - $20M</SelectItem>
                          <SelectItem value="20-50m">$20M - $50M</SelectItem>
                          <SelectItem value="50m+">$50M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Partnership Goals *</label>
                      <Textarea
                        value={formData.partnership.partnershipGoals}
                        onChange={(e) => handleInputChange("partnership", "partnershipGoals", e.target.value)}
                        placeholder="What do you hope to achieve through this partnership?"
                        rows={4}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Information</label>
                      <Textarea
                        value={formData.partnership.additionalInfo}
                        onChange={(e) => handleInputChange("partnership", "additionalInfo", e.target.value)}
                        placeholder="Any additional information you'd like to share..."
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Next Step
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/hemkey-icon-logo.png" alt="HEMKEY Icon" className="h-12 w-auto mr-4 brightness-0 invert" />
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
                <Link href="/contact" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact Us
                </Link>
                <Link href="/become-partner" className="block text-accent font-medium">
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
