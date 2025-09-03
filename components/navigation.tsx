"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const scrollToTop = () => {
    // If we're not on the home page, navigate to it first
    if (pathname !== "/") {
      window.location.href = "/"
    } else {
      // If we're already on the home page, just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const isActivePage = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/markets", label: "Markets" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-accent/20 nav-responsive">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center gap-0">
              <img 
                src="/hemkey-complete-logo.png" 
                alt="HEMKEY" 
                className="block h-10 w-auto sm:h-12 md:h-14 lg:h-16" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.href === "/" ? (
                  <button
                    onClick={scrollToTop}
                    className={`relative transition-colors group py-2 px-3 min-h-[44px] flex items-center touch-target ${
                      isActivePage(item.href) 
                        ? "text-accent font-medium" 
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    className={`relative transition-colors group py-2 px-3 min-h-[44px] flex items-center touch-target ${
                      isActivePage(item.href) 
                        ? "text-accent font-medium" 
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/become-partner" className="hidden sm:block">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 min-h-[44px] btn-responsive">
                Get Started
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-foreground hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-target"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-accent/20 bg-background/95 backdrop-blur-sm"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.href}>
                    {item.href === "/" ? (
                      <button
                        onClick={() => {
                          scrollToTop()
                          setMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left transition-colors py-3 px-2 border-b border-accent/10 min-h-[44px] flex items-center touch-target ${
                          isActivePage(item.href) 
                            ? "text-accent font-medium" 
                            : "text-foreground hover:text-accent"
                        }`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block transition-colors py-3 px-2 border-b border-accent/10 min-h-[44px] flex items-center touch-target ${
                          isActivePage(item.href) 
                            ? "text-accent font-medium" 
                            : "text-foreground hover:text-accent"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <Link href="/become-partner" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 min-h-[44px] btn-responsive">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
