'use client'

import { scrollToSection } from '@/lib/utils/scroll-to-section'
import { CodeBracketIcon, CommandLineIcon, EnvelopeIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'about', icon: UserIcon, label: 'About' },
    { id: 'projects', icon: CodeBracketIcon, label: 'Projects' },
    { id: 'github', icon: CommandLineIcon, label: 'GitHub' },
    { id: 'contact', icon: EnvelopeIcon, label: 'Contact' },
]

export function FloatingDock() {
    const [activeSection, setActiveSection] = useState('home')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Track scroll position for auto-hide/show
        const handleScroll = () => {
            // Show dock only when scrolled past navbar (>100px)
            setIsVisible(window.scrollY > 100)
        }

        // Track active section with IntersectionObserver
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        // Observe all sections
        navItems.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        // Add scroll listener
        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial state

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClick = (sectionId: string) => {
        scrollToSection(sectionId)
        setActiveSection(sectionId)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="flex items-center gap-2 bg-primary-600/95 backdrop-blur-md px-4 py-3 rounded-full border border-primary-500 shadow-2xl">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeSection === item.id

                            return (
                                <div key={item.id} className="relative">
                                    <motion.button
                                        onClick={() => handleClick(item.id)}
                                        className={`relative p-3 rounded-full transition-colors ${isActive ? 'text-primary-950' : 'text-primary-950/60 hover:text-primary-950'
                                            }`}
                                        whileHover={{ scale: 1.2, y: -8 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeDockItem"
                                                className="absolute inset-0 bg-[#9EBC8A] rounded-full -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="bg-primary-950 text-primary-50 text-xs px-2 py-1 rounded whitespace-nowrap">
                                            {item.label}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
