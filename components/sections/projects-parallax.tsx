'use client'

import { urlForImage } from '@/sanity/lib/image'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import { animated, useTrail } from '@react-spring/web'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: any
    excerpt?: string
    demoUrl?: string
    repoUrl?: string
    techStack?: { name: string }[]
}

interface ProjectsSectionProps {
    projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const trail = useTrail(projects.length, {
        from: { opacity: 0, y: 50, scale: 0.9 },
        to: { opacity: 1, y: 0, scale: 1 },
        delay: 200,
        config: { tension: 200, friction: 25 }
    })

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-primary-950 mb-4">
                    Featured Projects
                </h2>
                <p className="text-lg text-primary-800 max-w-2xl mx-auto">
                    Some of my recent work
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trail.map((style, index) => {
                    const project = projects[index]
                    if (!project) return null

                    return (
                        <animated.div
                            key={project._id}
                            style={style}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-primary-200 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-primary-200 overflow-hidden">
                                {project.mainImage ? (
                                    <Image
                                        src={urlForImage(project.mainImage).width(500).url()}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-300 to-primary-500">
                                        <CodeBracketIcon className="w-16 h-16 text-primary-700" />
                                    </div>
                                )}

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-primary-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    {project.demoUrl && (
                                        <Link
                                            href={project.demoUrl}
                                            target="_blank"
                                            className="p-3 bg-white rounded-full hover:bg-primary-100 transition-colors"
                                        >
                                            <ArrowTopRightOnSquareIcon className="w-6 h-6 text-primary-950" />
                                        </Link>
                                    )}
                                    {project.repoUrl && (
                                        <Link
                                            href={project.repoUrl}
                                            target="_blank"
                                            className="p-3 bg-white rounded-full hover:bg-primary-100 transition-colors"
                                        >
                                            <CodeBracketIcon className="w-6 h-6 text-primary-950" />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary-950 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-primary-700 text-sm mb-4 line-clamp-2">
                                    {project.excerpt || 'No description available'}
                                </p>

                                {/* Tech Stack */}
                                {project.techStack && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </animated.div>
                    )
                })}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-950 text-white rounded-2xl font-bold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl"
                >
                    View All Projects
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </Link>
            </div>
        </div>
    )
}
