'use client'

import { urlForImage } from '@/sanity/lib/image'
import { ArrowDownTrayIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface TechItem {
    name: string
    slug: { current: string }
    icon?: any
    category?: string // Added category field
}

interface TechAboutSectionProps {
    profile?: {
        fullName?: string
        bio?: any
        resumeURL?: string
        skills?: string[]
        profileImage?: any
    }
    technologies: TechItem[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
}

// Komponen text dengan hover highlight (Simpler logic since we now use DB categories)
// We'll map hover keywords to CMS categories
const keywordToCategory: Record<string, string[]> = {
    'Backend': ['backend'], // Maps "Backend" keyword to these CMS categories
    'Frontend': ['frontend'],
    'Full Stack': ['backend', 'frontend', 'database'],
    'Database': ['database'],
    'API': ['backend'],
}

function HighlightText({
    children,
    keyword,
    onHover
}: {
    children: string
    keyword: string
    onHover: (category: string[] | null) => void
}) {
    return (
        <span
            onMouseEnter={() => onHover(keywordToCategory[keyword] || [keyword])}
            onMouseLeave={() => onHover(null)}
            className="relative cursor-pointer font-bold text-primary-800 hover:text-primary-600 transition-colors underline decoration-dotted decoration-primary-400 underline-offset-4"
        >
            {children}
        </span>
    )
}

export function TechAboutSection({ profile, technologies }: TechAboutSectionProps) {
    const [highlightedCategories, setHighlightedCategories] = useState<string[] | null>(null)

    // Check if tech should be highlighted based on category
    const isTechHighlighted = (tech: TechItem) => {
        if (!highlightedCategories) return false
        if (!tech.category) return false

        // Case-insensitive comparison
        return highlightedCategories.some(cat =>
            cat.toLowerCase() === tech.category!.toLowerCase()
        )
    }

    return (
        <section id="about" className="w-full bg-primary-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-3">
                        About Me
                    </h2>
                    <p className="text-lg text-primary-800 max-w-2xl mx-auto">
                        Get to know me and my tech stack
                    </p>
                </motion.div>

                {/* Split Layout Container */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* LEFT SIDE - 40% - STICKY */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start"
                    >
                        <div className="space-y-6">
                            {/* Profile Image - Fixed for mobile */}
                            <div className="flex justify-center lg:justify-start">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-primary-400 rounded-2xl rotate-6 w-32 h-32 md:w-40 md:h-40" />
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                        {profile?.profileImage ? (
                                            <Image
                                                src={urlForImage(profile.profileImage).width(200).height(200).url()}
                                                alt="Profile"
                                                width={200}
                                                height={200}
                                                className="object-cover w-full h-full"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary-100">
                                                <span className="text-6xl">👤</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Bio with Hover Spotlight */}
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl font-bold text-primary-950 mb-4">
                                    Hello, I'm Fajar👋
                                </h3>
                                <p className="text-lg text-primary-800 leading-relaxed mb-6">
                                    A <HighlightText keyword="Full Stack" onHover={setHighlightedCategories}>Full Stack Developer</HighlightText> passionate
                                    about building modern web applications. Specialized in{' '}
                                    <HighlightText keyword="Backend" onHover={setHighlightedCategories}>Backend</HighlightText> with
                                    Laravel and currently diving into modern{' '}
                                    <HighlightText keyword="Frontend" onHover={setHighlightedCategories}>Frontend</HighlightText> with
                                    React & Next.js. Also interested in{' '}
                                    <HighlightText keyword="Database" onHover={setHighlightedCategories}>Database</HighlightText> design.
                                </p>

                                {/* Location */}
                                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-700 mb-6">
                                    <MapPinIcon className="w-5 h-5" />
                                    <span className="font-medium">Pontianak, Indonesia</span>
                                </div>

                                {/* Download Resume Button */}
                                <motion.a
                                    href={profile?.resumeURL || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`inline-flex items-center gap-2 px-6 py-3 bg-primary-950 text-primary-950  rounded-xl font-bold shadow-lg transition-colors ${!profile?.resumeURL ? 'opacity-50 pointer-events-none' : 'hover:bg-primary-800'}`}
                                >
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    Download Resume
                                </motion.a>

                                {/* Hint text */}
                                <p className="text-sm text-primary-600 mt-6 italic">
                                    💡 Hover kata yang bergaris untuk melihat skill terkait
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - 60% - SCROLLABLE TECH */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="lg:w-[60%]"
                    >
                        <h3 className="text-xl font-bold text-primary-950 mb-6 text-center lg:text-left">
                            🛠️ Tech Stack
                        </h3>


                        {/* Mobile: Grouped Tech Stack (Dynamic from CMS) */}
                        <div className="md:hidden space-y-8">
                            {(() => {
                                // Group items by their 'category' field
                                const groups: Record<string, TechItem[]> = {}

                                technologies.forEach(tech => {
                                    const cat = tech.category || 'Other'
                                    if (!groups[cat]) groups[cat] = []
                                    groups[cat].push(tech)
                                })

                                // Sort categories in preferred order if possible, or alphabetical
                                const preferredOrder = ['Backend', 'Frontend', 'Database', 'DevOps', 'Mobile', 'Tools', 'Other']
                                const sortedCategories = Object.keys(groups).sort((a, b) => {
                                    const indexA = preferredOrder.indexOf(a)
                                    const indexB = preferredOrder.indexOf(b)
                                    // If both found in preferred list
                                    if (indexA !== -1 && indexB !== -1) return indexA - indexB
                                    // If only A found
                                    if (indexA !== -1) return -1
                                    // If only B found
                                    if (indexB !== -1) return 1
                                    // Keep alphabet order for others
                                    return a.localeCompare(b)
                                })

                                return sortedCategories.map(category => (
                                    <div key={category}>
                                        <h4 className="font-bold text-primary-600 mb-3 uppercase tracking-wider text-xs">
                                            {category}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {groups[category].map((tech, index) => {
                                                const isHighlighted = isTechHighlighted(tech)
                                                return (
                                                    <motion.div
                                                        key={tech.slug?.current || index}
                                                        variants={itemVariants}
                                                        className={`
                                                            flex items-center gap-2 p-3 rounded-xl border cursor-default
                                                            ${isHighlighted
                                                                ? 'bg-[#9AB89D]/30 border-[#9AB89D]'
                                                                : 'bg-white border-primary-100/50 shadow-sm'
                                                            }
                                                        `}
                                                    >
                                                        {tech.icon ? (
                                                            <div className="relative w-6 h-6 flex-shrink-0">
                                                                <Image
                                                                    src={urlForImage(tech.icon).width(40).url()}
                                                                    alt={tech.name}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-primary-100 text-primary-900 text-xs font-bold">
                                                                {tech.name?.charAt(0) || '?'}
                                                            </div>
                                                        )}
                                                        <span className="text-xs font-bold text-primary-900">
                                                            {tech.name}
                                                        </span>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))
                            })()}
                        </div>

                        {/* Desktop: Grid Layout */}
                        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {technologies.map((tech, index) => {
                                const isHighlighted = isTechHighlighted(tech)

                                return (
                                    <motion.div
                                        key={tech.slug?.current || index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        animate={{
                                            scale: isHighlighted ? 1.1 : 1,
                                            boxShadow: isHighlighted
                                                ? '0 10px 40px -10px rgba(0,0,0,0.3)'
                                                : '0 4px 6px -1px rgba(0,0,0,0.1)',
                                            borderColor: isHighlighted ? '#9AB89D' : 'transparent'
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className={`
                                            flex flex-col items-center gap-3 p-4 rounded-2xl border-2 cursor-default
                                            ${isHighlighted
                                                ? 'bg-[#9AB89D]/30 border-[#9AB89D]'
                                                : 'bg-white border-transparent shadow-md hover:shadow-lg'
                                            }
                                        `}
                                    >
                                        {tech.icon ? (
                                            <div className={`relative w-12 h-12 transition-all duration-200 ${isHighlighted ? 'scale-110' : ''}`}>
                                                <Image
                                                    src={urlForImage(tech.icon).width(60).url()}
                                                    alt={tech.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold transition-all duration-200 ${isHighlighted ? 'bg-primary-600 scale-110' : 'bg-primary-500'}`}>
                                                {tech.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                        <span className={`text-sm font-semibold text-center transition-colors duration-200 ${isHighlighted ? 'text-primary-900' : 'text-primary-800'}`}>
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Skills Pills (if available) */}
                        {profile?.skills && profile.skills.length > 0 && (
                            <motion.div
                                variants={itemVariants}
                                className="mt-10"
                            >
                                <h4 className="text-lg font-bold text-primary-950 mb-4 text-center lg:text-left">
                                    💪 Core Skills
                                </h4>
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                    {profile.skills.map((skill, index) => (
                                        <motion.span
                                            key={index}
                                            whileHover={{ scale: 1.1 }}
                                            className="px-4 py-2 bg-primary-100 text-primary-900 rounded-full text-sm font-semibold border border-primary-200"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
