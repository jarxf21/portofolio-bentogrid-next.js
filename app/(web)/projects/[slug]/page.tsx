import { PortableText } from '@/components/portable-text'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const project = await getProject(slug)
    if (!project) return { title: 'Project Not Found' }

    return {
        title: project.title,
        description: project.excerpt,
    }
}

// Fetch single project
async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    demoUrl,
    repoUrl,
    publishedAt,
    "techStack": techStack[]->{ name, slug, icon, category },
    caseStudy {
      problem,
      solution,
      results,
      gallery
    }
  }`
    return client.fetch(query, { slug })
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getProject(slug)

    if (!project) {
        notFound()
    }

    return (
        <article className="max-w-4xl mx-auto px-6 py-12">
            {/* Back Link */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary-900/60 hover:text-primary-950 transition-colors mb-8"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Projects
            </Link>

            {/* Header */}
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary-950 mb-4">
                    {project.title}
                </h1>
                <p className="text-xl text-primary-900/60 leading-relaxed">
                    {project.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mt-6">
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900 text-white font-medium rounded-xl hover:bg-primary-950 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            Live Demo
                        </a>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-primary-200 text-primary-900 font-medium rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all"
                        >
                            <CodeBracketIcon className="w-5 h-5" />
                            Source Code
                        </a>
                    )}
                </div>
            </header>

            {/* Main Image */}
            {project.mainImage && (
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-primary-100 shadow-lg">
                    <Image
                        src={urlForImage(project.mainImage).width(1200).height(675).url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-primary-950 mb-6">Tech Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.techStack.map((tech: TechType) => (
                            <div
                                key={tech.slug.current}
                                className="flex items-center gap-3 p-4 bg-white border border-primary-100 rounded-xl hover:shadow-md transition-shadow"
                            >
                                {tech.icon ? (
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={urlForImage(tech.icon).width(40).height(40).url()}
                                            alt={tech.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500">
                                        💻
                                    </div>
                                )}
                                <div>
                                    <p className="text-primary-950 font-medium">{tech.name}</p>
                                    <p className="text-xs text-primary-900/50 capitalize">{tech.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Case Study */}
            {project.caseStudy && (
                <div className="space-y-12">
                    {/* Problem */}
                    {project.caseStudy.problem && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                    🎯
                                </div>
                                <h2 className="text-2xl font-bold text-primary-950">The Problem</h2>
                            </div>
                            <div className="prose prose-lg prose-stone max-w-none text-primary-900/80">
                                <PortableText value={project.caseStudy.problem} />
                            </div>
                        </section>
                    )}

                    {/* Solution */}
                    {project.caseStudy.solution && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    💡
                                </div>
                                <h2 className="text-2xl font-bold text-primary-950">The Solution</h2>
                            </div>
                            <div className="prose prose-lg prose-stone max-w-none text-primary-900/80">
                                <PortableText value={project.caseStudy.solution} />
                            </div>
                        </section>
                    )}

                    {/* Results */}
                    {project.caseStudy.results && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                    📈
                                </div>
                                <h2 className="text-2xl font-bold text-primary-950">Results & Impact</h2>
                            </div>
                            <div className="prose prose-lg prose-stone max-w-none text-primary-900/80">
                                <PortableText value={project.caseStudy.results} />
                            </div>
                        </section>
                    )}

                    {/* Gallery */}
                    {project.caseStudy.gallery && project.caseStudy.gallery.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-primary-950 mb-6">Gallery</h2>
                            <div className="grid gap-6">
                                {project.caseStudy.gallery.map((image: GalleryImage, index: number) => (
                                    <figure key={index} className="relative aspect-video rounded-2xl overflow-hidden border border-primary-100 shadow-md">
                                        <Image
                                            src={urlForImage(image).width(1200).height(675).url()}
                                            alt={image.caption || `Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        {image.caption && (
                                            <figcaption className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 text-center text-sm text-primary-900 border-t border-primary-100">
                                                {image.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}

            {/* CTA */}
            <div className="mt-16 p-8 bg-primary-50 border border-primary-100 rounded-3xl text-center">
                <h3 className="text-2xl font-bold text-primary-950 mb-2">
                    Interested in working together?
                </h3>
                <p className="text-primary-900/60 mb-6">
                    Let&apos;s discuss your next project
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 text-white font-semibold rounded-xl hover:bg-primary-950 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Get in Touch
                </Link>
            </div>
        </article>
    )
}

// Types
interface TechType {
    name: string
    slug: { current: string }
    icon?: unknown
    category?: string
}

interface GalleryImage {
    asset: { _ref: string }
    caption?: string
}
