'use client'

import { urlForImage } from '@/sanity/lib/image'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
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
    demoUrl?: string
    repoUrl?: string
}

interface ProjectsSectionProps {
    projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <section id="projects" className="w-full py-20 bg-primary-50">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-primary-600 rounded-2xl overflow-hidden shadow-lg border border-primary-500 hover:shadow-2xl transition-all duration-300">
                                    {/* Project Image */}
                                    <Link href={`/projects/${project.slug.current}`} className="block relative h-48 overflow-hidden">
                                        {project.mainImage ? (
                                            <Image
                                                src={urlForImage(project.mainImage).width(600).height(400).url()}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#9EBC8A] text-primary-950 rounded-lg font-bold hover:bg-primary-500 transition-all shadow-md border border-primary-500"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            )}
                                            {project.repoUrl && (
                                                <a
                                                    href={project.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-950 text-primary-50 rounded-lg font-bold hover:bg-primary-900 transition-all shadow-md"
                                                >
                                                    <CodeBracketIcon className="w-4 h-4" />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View All Projects Link */}
                {projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg border border-primary-500"
                        >
                            View All Projects
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
