import { StickyScroll, StickyScrollItem } from '@/components/ui/sticky-parallax-scroll'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
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
    demoUrl,
    repoUrl,
    "techStack": techStack[]->{ name, slug }
  }`
    return client.fetch(query, {}, { next: { revalidate: 10 } })
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
    mainImage?: any
    excerpt?: string
    featured?: boolean
    techStack?: TechType[]
    demoUrl?: string
    repoUrl?: string
}

export default async function ProjectsPage() {
    const projects = await getProjects() || []

    // Use only real projects
    const displayProjects = projects;

    // Transform to StickyScroll format
    const stickyContent: StickyScrollItem[] = displayProjects.map((project: ProjectType) => ({
        title: project.title,
        description: project.excerpt || '',
        imageUrl: project.mainImage ? urlForImage(project.mainImage).url() : undefined,
        content: (
            <div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack?.map((tech) => (
                        <span
                            key={tech.slug.current}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-semibold border border-primary-200"
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#9EBC8A] text-slate-900 rounded-lg font-bold hover:bg-[#8da87b] transition-colors text-sm"
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
                            className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-primary-50 rounded-lg font-bold hover:bg-primary-800 transition-colors text-sm"
                        >
                            <CodeBracketIcon className="w-4 h-4" />
                            Code
                        </a>
                    )}
                    <Link
                        href={`/projects/${project.slug.current}`}
                        className="flex items-center gap-2 px-4 py-2 border border-primary-900 text-primary-900 rounded-lg font-bold hover:bg-green-300 hover:border-green-300 hover:text-white transition-colors text-sm"
                    >
                        View Case
                    </Link>
                </div>
            </div>
        )
    }));

    return (
        <div className="w-full bg-primary-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="mb-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-950 mb-6">
                        All <span className="text-primary-600">Projects</span>
                    </h1>
                    <p className="text-primary-950/60 max-w-2xl mx-auto text-lg leading-relaxed">
                        A collection of projects I&apos;ve worked on, ranging from web applications to open-source contributions.
                    </p>
                </div>

                {/* Sticky Scroll Component */}
                <StickyScroll content={stickyContent} />
            </div>
        </div>
    )
}
