'use client'

import { urlForImage } from '@/sanity/lib/image'
import { ArrowDownTrayIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
    _id: string
    title: string
    slug: { current: string }
    mainImage: any
    excerpt: string
    techStack: { name: string; icon: any }[]
}

interface Testimonial {
    _id: string
    name: string
    role: string
    company: string
    quote: string
    photo: any
}

interface TechItem {
    name: string
    slug: { current: string }
    icon?: any
}

interface BentoGridProps {
    projects: Project[]
    testimonials: Testimonial[]
    profile?: {
        fullName?: string
        headline?: string
        bio?: any
        skills?: string[]
        profileImage?: any
        resumeURL?: string
        socialLinks?: {
            github?: string
            linkedin?: string
            twitter?: string
        }
    }
    allTech?: TechItem[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
}

export function BentoGrid({ projects, testimonials, profile, allTech }: BentoGridProps) {
    const featuredProject = projects[0]

    return (
        <motion.section
            className="min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] max-w-[1920px] mx-auto px-4 lg:px-6 py-4 lg:py-6 overflow-y-auto lg:overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 
                MOBILE: Vertical stack with specific order
                DESKTOP: Original 3-column 12-grid layout
            */}

            {/* ===== DESKTOP LAYOUT (lg and up) ===== */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:h-full">

                {/* LEFT COLUMN - Hero + About (4 cols, full height) */}
                <div className="lg:col-span-4 grid grid-rows-2 gap-4 h-full">
                    {/* Hero Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                        className="bg-primary-600 rounded-3xl p-8 flex flex-col justify-between text-primary-950 shadow-xl border border-primary-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-primary-500 backdrop-blur-sm rounded-full text-sm mb-6 shadow-sm">
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                                <span className="text-primary-950 font-medium">Available for work</span>
                            </div>
                            <h1 className="text-5xl font-bold leading-tight mb-4 text-primary-950">
                                Hey, I'm<br />
                                <span className="text-primary-950">{profile?.fullName || 'Full Stack Engineer'}</span>
                            </h1>
                            <p className="text-primary-950 text-lg font-medium">
                                {profile?.headline || 'Building scalable web apps with natural UX'}
                            </p>
                        </div>

                        <div className="flex gap-3 relative z-10">
                            <Link href="/projects" className="px-5 py-2.5 bg-[#9EBC8A] text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all text-sm shadow-lg">
                                View Projects
                            </Link>
                            <Link href="/contact" className="px-5 py-2.5 bg-transparent text-primary-950 border border-primary-950 rounded-xl font-bold hover:bg-primary-950/10 transition-all text-sm">
                                Contact
                            </Link>
                        </div>
                    </motion.div>

                    {/* About Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                        className="bg-primary-600 rounded-3xl p-8 shadow-lg border border-primary-500 flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-500/20 rounded-full blur-2xl translate-x-1/3 translate-y-1/3" />
                        <div className="relative z-10 flex-grow">
                            <h2 className="text-2xl font-bold text-primary-950 mb-4">About Me</h2>
                            <p className="text-primary-950 leading-relaxed text-sm font-medium">
                                {profile?.bio || "Passionate about building intuitive, high-performance web applications. I specialize in modern JavaScript ecosystems and love turning complex problems into elegant solutions."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 relative z-10 mt-6 pt-4 border-t border-primary-500/30">
                            <a
                                href={profile?.resumeURL || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 text-primary-950 font-bold transition-colors w-fit px-4 py-2.5 bg-[#9EBC8A] rounded-lg border border-primary-500 hover:bg-primary-500 ${!profile?.resumeURL ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                <ArrowDownTrayIcon className="w-4 h-4" />
                                Download CV
                            </a>

                            <div className="flex items-center gap-2 text-primary-950 pb-2">
                                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                                <span className="text-sm font-semibold">Based in Jakarta, Indonesia</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* MIDDLE COLUMN - Stats + Featured Project (4 cols) */}
                <div className="lg:col-span-4 grid grid-rows-3 gap-4 h-full">
                    {/* Stats Grid */}
                    <div className="row-span-1 grid grid-cols-2 gap-4">
                        {/* Profile Picture Card */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                            className="bg-primary-600 rounded-2xl overflow-hidden shadow-md border border-primary-500 relative group"
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
                                    <span className="text-5xl">👤</span>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                            className="bg-primary-600 rounded-2xl p-6 shadow-md border border-primary-500 flex flex-col justify-center items-center"
                        >
                            <span className="text-4xl font-extrabold text-primary-950">1+</span>
                            <span className="text-sm text-primary-950 mt-1 font-bold">Years Experience</span>
                        </motion.div>
                    </div>

                    {/* Featured Project (2 rows) */}
                    {featuredProject ? (
                        <div className="row-span-2 relative group">
                            <Link href={`/projects/${featuredProject.slug.current}`} className="block h-full">
                                <motion.div
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className="h-full bg-primary-600 rounded-3xl overflow-hidden shadow-xl border border-primary-500 relative group"
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={urlForImage(featuredProject.mainImage).width(600).height(800).url()}
                                            alt={featuredProject.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/95 via-primary-600/40 to-transparent" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-950">
                                        <div className="inline-block px-3 py-1 bg-primary-500 border border-primary-500 rounded-md text-xs font-bold mb-3 text-primary-950">Latest Project</div>
                                        <h3 className="text-2xl font-extrabold mb-2 text-primary-950">{featuredProject.title}</h3>
                                        <p className="text-primary-950 text-sm font-medium line-clamp-2 mb-4">{featuredProject.excerpt}</p>
                                    </div>
                                </motion.div>
                            </Link>
                            <Link
                                href="/projects"
                                className="absolute top-4 right-4 z-20 p-2 bg-[#9EBC8A] backdrop-blur-md rounded-full text-primary-950 hover:bg-primary-500 transition-all shadow-sm border border-primary-500 opacity-0 group-hover:opacity-100"
                                title="View All Projects"
                            >
                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    ) : (
                        <motion.div
                            variants={cardVariants}
                            className="row-span-2 bg-primary-50 rounded-3xl border border-primary-200 flex items-center justify-center text-primary-400 font-medium"
                        >
                            No projects yet
                        </motion.div>
                    )}
                </div>

                {/* RIGHT COLUMN - Skills + GitHub + CTA (4 cols) */}
                <div className="lg:col-span-4 grid grid-rows-3 gap-4 h-full">
                    {/* Skills/Tech Stack */}
                    <motion.div
                        variants={cardVariants}
                        className="row-span-1 bg-primary-600 rounded-3xl p-6 shadow-lg border border-primary-500 overflow-y-auto custom-scrollbar"
                    >
                        <h3 className="text-lg font-bold text-primary-950 mb-4">Tech Specs</h3>
                        <div className="flex flex-wrap gap-2">
                            {allTech && allTech.length > 0 ? (
                                allTech.map((tech) => (
                                    <motion.div
                                        key={tech.slug.current}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1.5 bg-[#9EBC8A] text-primary-950 rounded-full text-sm font-semibold border border-primary-500 flex items-center gap-2"
                                    >
                                        {tech.icon && (
                                            <div className="relative w-4 h-4">
                                                <Image
                                                    src={urlForImage(tech.icon).width(20).url()}
                                                    alt={tech.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        {tech.name}
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-sm text-primary-950 font-medium">Loading tech stack...</p>
                            )}
                        </div>
                    </motion.div>

                    {/* GitHub Activity */}
                    <div className="row-span-1 relative group">
                        <motion.div
                            variants={cardVariants}
                            className="h-full bg-primary-600 rounded-3xl p-6 shadow-md border border-primary-500 overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                                    <h3 className="text-sm font-bold text-primary-950">GitHub Activity</h3>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-start gap-3 text-sm p-2.5 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-primary-950 font-semibold block truncate">portfolio</span>
                                        <span className="text-primary-950/80 text-xs block">feat: add bento grid</span>
                                        <span className="text-primary-950/50 text-xs">2h ago</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm p-2.5 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-primary-950 font-semibold block truncate">api-project</span>
                                        <span className="text-primary-950/80 text-xs block">fix: auth middleware</span>
                                        <span className="text-primary-950/50 text-xs">5h ago</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm p-2.5 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-primary-950 font-semibold block truncate">web-app</span>
                                        <span className="text-primary-950/80 text-xs block">refactor: components</span>
                                        <span className="text-primary-950/50 text-xs">1d ago</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {profile?.socialLinks?.github && (
                            <a
                                href={profile.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-4 right-4 p-1.5 bg-[#9EBC8A] text-primary-950 rounded-lg hover:bg-primary-500 transition-colors text-xs font-semibold flex items-center gap-1 shadow-sm border border-primary-500 z-10"
                            >
                                View All <ArrowRightIcon className="w-3 h-3" />
                            </a>
                        )}
                    </div>

                    {/* CTA Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                        className="row-span-1 bg-primary-600 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-xl border border-primary-500 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-200),0.3),transparent)]" />
                        <h3 className="text-2xl font-extrabold text-primary-950 mb-2 relative z-10">Have a project<br />in mind?</h3>
                        <Link
                            href="/contact"
                            className="mt-4 px-6 py-3 bg-[#9EBC8A] text-primary-950 rounded-full font-bold hover:bg-primary-500 transition-all shadow-lg relative z-10 text-sm flex items-center gap-2"
                        >
                            Let's Talk <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* ===== MOBILE LAYOUT (below lg) ===== */}
            <div className="flex flex-col gap-3 lg:hidden">

                {/* 1. HERO - Full width */}
                <motion.div
                    variants={cardVariants}
                    className="bg-primary-600 rounded-2xl p-6 flex flex-col text-primary-950 shadow-xl border border-primary-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-primary-500 backdrop-blur-sm rounded-full text-xs mb-4 shadow-sm">
                            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            <span className="text-primary-950 font-medium">Available for work</span>
                        </div>
                        <h1 className="text-3xl font-bold leading-tight mb-3 text-primary-950">
                            Hey, I'm<br />
                            <span className="text-primary-950">{profile?.fullName || 'Full Stack Engineer'}</span>
                        </h1>
                        <p className="text-primary-950 text-base font-medium mb-4">
                            {profile?.headline || 'Building scalable web apps with natural UX'}
                        </p>
                    </div>

                    <div className="flex gap-2 relative z-10">
                        <Link href="/projects" className="px-4 py-2 bg-[#9EBC8A] text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all text-sm shadow-lg">
                            View Projects
                        </Link>
                        <Link href="/contact" className="px-4 py-2 bg-transparent text-primary-950 border border-primary-950 rounded-xl font-bold hover:bg-primary-950/10 transition-all text-sm">
                            Contact
                        </Link>
                    </div>
                </motion.div>

                {/* 2. AVATAR + EXPERIENCE - Side by side */}
                <div className="grid grid-cols-2 gap-3">
                    <motion.div
                        variants={cardVariants}
                        className="aspect-square bg-primary-600 rounded-2xl overflow-hidden shadow-md border border-primary-500 relative"
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
                                <span className="text-4xl">👤</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        className="aspect-square bg-primary-600 rounded-2xl p-4 shadow-md border border-primary-500 flex flex-col justify-center items-center"
                    >
                        <span className="text-3xl font-extrabold text-primary-950">2+</span>
                        <span className="text-xs text-primary-950 mt-1 font-bold text-center">Years Experience</span>
                    </motion.div>
                </div>

                {/* 3. LATEST PROJECT - Full width */}
                {featuredProject && (
                    <div className="relative group min-h-[280px]">
                        <Link href={`/projects/${featuredProject.slug.current}`} className="block h-full">
                            <motion.div
                                variants={cardVariants}
                                className="h-full bg-primary-600 rounded-2xl overflow-hidden shadow-xl border border-primary-500 relative"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={urlForImage(featuredProject.mainImage).width(600).height(800).url()}
                                        alt={featuredProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600/95 via-primary-600/40 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-950">
                                    <div className="inline-block px-2 py-1 bg-primary-500 border border-primary-500 rounded-md text-xs font-bold mb-2 text-primary-950">Latest Project</div>
                                    <h3 className="text-xl font-extrabold mb-1 text-primary-950">{featuredProject.title}</h3>
                                    <p className="text-primary-950 text-sm font-medium line-clamp-2">{featuredProject.excerpt}</p>
                                </div>
                            </motion.div>
                        </Link>
                        <Link
                            href="/projects"
                            className="absolute top-3 right-3 z-20 p-2 bg-[#9EBC8A] backdrop-blur-md rounded-full text-primary-950 hover:bg-primary-500 transition-all shadow-sm border border-primary-500"
                            title="View All Projects"
                        >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* 4. TECH STACK - Full width */}
                <motion.div
                    variants={cardVariants}
                    className="bg-primary-600 rounded-2xl p-4 shadow-lg border border-primary-500"
                >
                    <h3 className="text-base font-bold text-primary-950 mb-3">Tech Specs</h3>
                    <div className="flex flex-wrap gap-2">
                        {allTech && allTech.length > 0 ? (
                            allTech.map((tech) => (
                                <div
                                    key={tech.slug.current}
                                    className="px-2.5 py-1 bg-[#9EBC8A] text-primary-950 rounded-full text-xs font-semibold border border-primary-500 flex items-center gap-1.5"
                                >
                                    {tech.icon && (
                                        <div className="relative w-3.5 h-3.5">
                                            <Image
                                                src={urlForImage(tech.icon).width(20).url()}
                                                alt={tech.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    {tech.name}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-primary-950 font-medium">Loading tech stack...</p>
                        )}
                    </div>
                </motion.div>

                {/* 5. ABOUT ME - Full width */}
                <motion.div
                    variants={cardVariants}
                    className="bg-primary-600 rounded-2xl p-5 shadow-lg border border-primary-500 relative overflow-hidden"
                >
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl translate-x-1/3 translate-y-1/3" />
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-primary-950 mb-3">About Me</h2>
                        <p className="text-primary-950 leading-relaxed text-sm font-medium">
                            {profile?.bio || "Passionate about building intuitive, high-performance web applications. I specialize in modern JavaScript ecosystems and love turning complex problems into elegant solutions."}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 relative z-10 mt-4 pt-3 border-t border-primary-500/30">
                        <a
                            href={profile?.resumeURL || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-primary-950 font-bold transition-colors w-fit px-3 py-2 bg-[#9EBC8A] rounded-lg border border-primary-500 hover:bg-primary-500 text-sm ${!profile?.resumeURL ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Download CV
                        </a>

                        <div className="flex items-center gap-2 text-primary-950">
                            <span className="w-2 h-2 bg-primary-500 rounded-full" />
                            <span className="text-xs font-semibold">Based in Jakarta, Indonesia</span>
                        </div>
                    </div>
                </motion.div>

                {/* 6. CTA - Full width */}
                <motion.div
                    variants={cardVariants}
                    className="bg-primary-600 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-xl border border-primary-500 relative overflow-hidden"
                >
                    <h3 className="text-xl font-extrabold text-primary-950 mb-2 relative z-10">Have a project in mind?</h3>
                    <Link
                        href="/contact"
                        className="mt-3 px-5 py-2.5 bg-primary-900 text-primary-950 rounded-full font-bold hover:bg-primary-500 transition-all shadow-lg relative z-10 text-sm flex items-center gap-2"
                    >
                        Let's Talk <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    )
}
