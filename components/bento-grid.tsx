'use client'

import { urlForImage } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface BentoGridProps {
    profile?: {
        fullName?: string
        headline?: string
        profileImage?: any
        socialLinks?: {
            github?: string
            linkedin?: string
            twitter?: string
        }
    }
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const heroCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.2 }
    }
}

const profileCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.4 }
    }
}

export function BentoGrid({ profile }: BentoGridProps) {
    return (
        <motion.section
            id="home"
            className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-6 bg-primary-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-5xl w-full">
                {/* Mobile Layout */}
                <div className="flex flex-col gap-4 lg:hidden">
                    <motion.div
                        variants={heroCardVariants}
                        className="bg-primary-600 rounded-3xl p-8 flex flex-col text-primary-950 shadow-xl border border-primary-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-primary-500 backdrop-blur-sm rounded-full text-xs mb-6 shadow-sm"
                            >
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                                <span className="text-primary-950 font-medium">Available for work</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-primary-950">
                                Hey, I'm Fajar<br />
                                <span className="text-primary-950">{profile?.fullName || 'Full Stack Engineer'}</span>
                            </h1>

                            <p className="text-primary-950 text-lg font-medium mb-8">
                                {profile?.headline || 'Building scalable web apps with natural UX'}
                            </p>

                            <div className="flex gap-3">
                                <Link
                                    href="#projects"
                                    className="px-6 py-3 bg-[#9EBC8A] text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg"
                                >
                                    View Projects
                                </Link>
                                <Link
                                    href="#contact"
                                    className="px-6 py-3 bg-transparent text-primary-950  border-primary-950 rounded-xl font-bold hover:bg-primary-950 hover:text-primary-50 transition-all"
                                >
                                    Book a Call
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            variants={profileCardVariants}
                            className="aspect-square bg-primary-600 rounded-2xl overflow-hidden shadow-lg border border-primary-500 relative"
                        >
                            {profile?.profileImage ? (
                                <Image
                                    src={urlForImage(profile.profileImage).width(400).height(400).url()}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary-200 text-primary-950">
                                    <span className="text-6xl">👤</span>
                                </div>
                            )}
                        </motion.div>

                        <div className="aspect-square">
                            <ExperienceFlipCard />
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
                    <motion.div
                        variants={heroCardVariants}
                        className="col-span-7 bg-primary-600 rounded-3xl p-10 flex flex-col justify-between text-primary-950 shadow-xl border border-primary-500 relative overflow-hidden min-h-[500px]"
                    >
                        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary-500 backdrop-blur-sm rounded-full text-sm mb-8 shadow-sm"
                            >
                                <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
                                <span className="text-primary-950 font-medium">Available for work</span>
                            </motion.div>

                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4 text-primary-950">
                                Hey, I'm Fajar<br />
                                <span className="text-primary-950">{profile?.fullName || 'Full Stack Engineer'}</span>
                            </h1>

                            <p className="text-primary-950 text-xl font-medium mb-8 max-w-lg">
                                {profile?.headline || 'Building scalable web apps with natural UX'}
                            </p>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <Link
                                href="#projects"
                                className="px-8 py-3.5 bg-[#9EBC8A] text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all text-lg shadow-lg"
                            >
                                View Projects
                            </Link>
                            <Link
                                href="#contact"
                                className="px-8 py-3.5 bg-transparent text-primary-950 border-2 border-primary-950 rounded-xl font-bold hover:bg-primary-950 hover:text-primary-50 transition-all text-lg"
                            >
                                Book a Call
                            </Link>
                        </div>
                    </motion.div>

                    <div className="col-span-5 grid grid-rows-2 gap-4">
                        <motion.div
                            variants={profileCardVariants}
                            className="bg-primary-600 rounded-3xl overflow-hidden shadow-lg border border-primary-500 relative group"
                        >
                            {profile?.profileImage ? (
                                <Image
                                    src={urlForImage(profile.profileImage).width(500).height(500).url()}
                                    alt="Profile"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary-200 text-primary-950">
                                    <span className="text-8xl">👤</span>
                                </div>
                            )}
                        </motion.div>

                        <div>
                            <ExperienceFlipCard />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

function ExperienceFlipCard() {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div
            className="w-full h-full relative perspective-1000"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full absolute inset-0 [transform-style:preserve-3d]"
            >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full bg-primary-600 rounded-3xl p-8 shadow-lg border border-primary-500 flex flex-col justify-center items-center [backface-visibility:hidden]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(158,188,138,0.2),transparent)]" />
                    <span className="text-6xl font-extrabold text-primary-950 relative z-10">1+</span>
                    <span className="text-lg text-primary-950 mt-3 font-bold relative z-10">Years Experience</span>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full bg-primary-950 rounded-3xl p-6 shadow-xl border border-primary-500 flex flex-col justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-800 rounded-full blur-2xl opacity-50" />

                    <div className="relative z-10 space-y-4">
                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9EBC8A]" />
                                <span className="text-xs font-bold text-primary-200 uppercase tracking-wider">Education</span>
                            </div>
                            <h4 className="text-white font-bold text-sm">Politeknik Negeri Pontianak</h4>
                            <p className="text-primary-300 text-xs">D3 Informatika Engineering 2022 - 2025</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-primary-800" />

                        {/* Experience */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9EBC8A]" />
                                <span className="text-xs font-bold text-primary-200 uppercase tracking-wider">Internship</span>
                            </div>
                            <h4 className="text-white font-bold text-sm">Backend Developer</h4>
                            <p className="text-primary-300 text-xs">3 Month Airnav Indonesia Cabang Pontianak</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
