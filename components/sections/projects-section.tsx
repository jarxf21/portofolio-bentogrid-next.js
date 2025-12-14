'use client'

import { urlForImage } from '@/sanity/lib/image'
import { ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface Project {
    _id: string
    title: string
    slug: { current: string }
    mainImage: any
    excerpt: string
    techStack: { name: string; icon: any }[]
    demoUrl?: string
    repoUrl?: string
}

interface ProjectsSectionProps {
    projects: Project[]
}

const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2
        }
    }
}

const cardVariants: any = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15
        }
    }
}

const titleVariants: any = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

// Reusable Project Card Component
function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-primary-600 rounded-2xl overflow-hidden shadow-lg border border-primary-500 hover:shadow-2xl transition-shadow duration-300 h-full"
        >
            {/* Project Image */}
            <Link href={`/projects/${project.slug.current}`} className="block relative h-48 overflow-hidden">
                {project.mainImage ? (
                    <Image
                        src={urlForImage(project.mainImage).width(600).height(400).url()}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full bg-primary-200 flex items-center justify-center text-primary-950">
                        <CodeBracketIcon className="w-16 h-16 opacity-50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Project Info */}
            <div className="p-6">
                <Link href={`/projects/${project.slug.current}`}>
                    <h3 className="text-xl font-bold text-primary-950 mb-2 hover:text-primary-500 transition-colors">
                        {project.title}
                    </h3>
                </Link>
                <p className="text-primary-950/70 text-sm mb-4 line-clamp-2">
                    {project.excerpt}
                </p>

                {/* Tech Stack Badges */}
                {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech.name}
                                className="px-2 py-1 bg-primary-500 text-primary-950 rounded-md text-xs font-semibold"
                            >
                                {tech.name}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="px-2 py-1 bg-primary-500/50 text-primary-950 rounded-md text-xs font-semibold">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {project.demoUrl && (
                        <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#9EBC8A] text-primary-950 rounded-lg font-bold hover:bg-primary-500 transition-colors shadow-md border border-primary-500"
                        >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                            Live Demo
                        </motion.a>
                    )}
                    {project.repoUrl && (
                        <motion.a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-950 text-primary-50 rounded-lg font-bold hover:bg-primary-900 transition-colors shadow-md"
                        >
                            <CodeBracketIcon className="w-4 h-4" />
                            Code
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.offsetWidth * 0.85 // 85% of container width
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth : cardWidth,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section id="projects" className="w-full py-12 bg-primary-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Title with slide animation */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-primary-950/70 max-w-2xl mx-auto">
                        A showcase of my recent work and side projects
                    </p>
                </motion.div>

                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-primary-950/50 text-lg">
                            No projects available. Connect to Sanity CMS to load projects.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* MOBILE: Horizontal Swipeable Cards */}
                        <div className="md:hidden relative">
                            {/* Scroll Buttons */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 -ml-2">
                                <button
                                    onClick={() => scroll('left')}
                                    disabled={!canScrollLeft}
                                    className={`p-2 rounded-full bg-white shadow-lg border border-primary-200 ${canScrollLeft ? 'opacity-100' : 'opacity-30'}`}
                                >
                                    <ChevronLeftIcon className="w-5 h-5 text-primary-950" />
                                </button>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 -mr-2">
                                <button
                                    onClick={() => scroll('right')}
                                    disabled={!canScrollRight}
                                    className={`p-2 rounded-full bg-white shadow-lg border border-primary-200 ${canScrollRight ? 'opacity-100' : 'opacity-30'}`}
                                >
                                    <ChevronRightIcon className="w-5 h-5 text-primary-950" />
                                </button>
                            </div>

                            {/* Scrollable Container */}
                            <div
                                ref={scrollRef}
                                onScroll={checkScroll}
                                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="flex-shrink-0 w-[85%] snap-center"
                                    >
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex justify-center gap-2 mt-4">
                                {projects.map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-2 h-2 rounded-full bg-primary-300"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* DESKTOP: Grid Layout */}
                        <motion.div
                            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                        >
                            {projects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -10 }}
                                    className="group"
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}

                {/* View All Projects Link */}
                {projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg border border-primary-500"
                            >
                                View All Projects
                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
