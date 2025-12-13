import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of web development projects and case studies.',
}

async function getProjects() {
    const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    featured,
    "techStack": techStack[]->{ name, slug }
  }`
    return client.fetch(query)
}

export default async function ProjectsPage() {
    const projects = await getProjects() || []

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary-950">
                    All <span className="text-primary-500">Projects</span>
                </h1>
                <p className="mt-4 text-primary-900/60 max-w-2xl text-lg leading-relaxed">
                    A collection of projects I&apos;ve worked on, ranging from web applications to open-source contributions. Each project includes a detailed case study.
                </p>
            </div>

            {/* Projects Grid */}
            {projects && projects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project: ProjectType) => (
                        <Link
                            key={project._id}
                            href={`/projects/${project.slug.current}`}
                            className="group block bg-white border border-primary-100 rounded-3xl overflow-hidden hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative aspect-video bg-primary-50 overflow-hidden">
                                {project.mainImage ? (
                                    <Image
                                        src={urlForImage(project.mainImage).width(800).height(450).url()}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl text-primary-200">
                                        folder_open
                                    </div>
                                )}

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-semibold rounded-full border border-primary-100 shadow-sm">
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-primary-950 group-hover:text-primary-500 transition-colors">
                                    {project.title}
                                </h2>
                                <p className="mt-3 text-primary-900/60 line-clamp-2 leading-relaxed">
                                    {project.excerpt}
                                </p>

                                {/* Tech Stack */}
                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-primary-50">
                                        {project.techStack.map((tech: TechType) => (
                                            <span
                                                key={tech.slug.current}
                                                className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-100 font-medium"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 flex items-center text-primary-500 font-bold text-sm tracking-wide uppercase">
                                    View Case Study
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white border border-primary-100 rounded-3xl shadow-sm">
                    <div className="text-6xl mb-4 text-primary-200">folder_open</div>
                    <h3 className="text-xl font-bold text-primary-950">No projects yet</h3>
                    <p className="text-primary-900/60 mt-2">
                        Add your first project in the{' '}
                        <a href="/studio" className="text-primary-500 hover:underline">
                            Admin Studio
                        </a>
                    </p>
                </div>
            )}
        </div>
    )
}

// Types
interface TechType {
    name: string
    slug: { current: string }
}

interface ProjectType {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: unknown
    excerpt?: string
    featured?: boolean
    techStack?: TechType[]
}
