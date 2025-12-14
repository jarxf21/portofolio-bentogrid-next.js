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
    return client.fetch(query)
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

// Dummy data for UX testing (Shared with Home Section)
const DUMMY_PROJECTS: ProjectType[] = [
    {
        _id: 'dummy-1',
        title: 'Neon Nexus',
        slug: { current: '#' }, // No link for dummy
        excerpt: 'A futuristic dashboard for managing IoT devices in smart cities. Features real-time data visualization and 3D mapping.',
        mainImage: null, // Placeholder will be used
        techStack: [{ name: 'React', slug: { current: 'react' } }, { name: 'Three.js', slug: { current: 'three' } }, { name: 'Tailwind', slug: { current: 'tailwind' } }],
        demoUrl: 'https://example.com',
        repoUrl: 'https://github.com',
    },
    {
        _id: 'dummy-2',
        title: 'Aether Finance',
        slug: { current: '#' },
        excerpt: 'DeFi platform with AI-driven investment analysis. Complete with wallet integration and secure transaction processing.',
        mainImage: null,
        techStack: [{ name: 'Next.js', slug: { current: 'next' } }, { name: 'Solidity', slug: { current: 'solidity' } }, { name: 'Framer', slug: { current: 'framer' } }],
        demoUrl: 'https://example.com',
        repoUrl: 'https://github.com',
    },
    {
        _id: 'dummy-3',
        title: 'Cyber Social',
        slug: { current: '#' },
        excerpt: 'A decentralized social media protocol allowing users to own their data. Built with performance and privacy in mind.',
        mainImage: null,
        techStack: [{ name: 'Vue', slug: { current: 'vue' } }, { name: 'GraphQL', slug: { current: 'graphql' } }, { name: 'Rust', slug: { current: 'rust' } }],
        demoUrl: 'https://example.com',
        repoUrl: 'https://github.com',
    }
]

export default async function ProjectsPage() {
    const projects = await getProjects() || []

    // Merge real projects with dummy projects to ensure at least 5 items
    const displayProjects = [...projects];
    if (displayProjects.length < 5) {
        const needed = 5 - displayProjects.length;
        // Cycle through dummy projects if we need more
        for (let i = 0; i < needed; i++) {
            displayProjects.push({
                ...DUMMY_PROJECTS[i % DUMMY_PROJECTS.length],
                _id: `dummy-gen-${i}`
            });
        }
    }

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
                        className="flex items-center gap-2 px-4 py-2 border border-primary-900 text-primary-900 rounded-lg font-bold hover:bg-primary-900 hover:text-white transition-colors text-sm"
                    >
                        Details
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
