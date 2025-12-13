import { client } from '@/sanity/lib/client'
import { ImageResponse } from 'next/og'

export const alt = 'Project Preview'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

// Fetch project data
async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    excerpt,
    "techStack": techStack[]->{ name }
  }`
    return client.fetch(query, { slug })
}

export default async function Image({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug)

    if (!project) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    Project Not Found
                </div>
            ),
            { ...size }
        )
    }

    const techNames = project.techStack?.map((t: { name: string }) => t.name).slice(0, 4) || []

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 40,
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 60,
                    color: 'white',
                }}
            >
                {/* Top Bar */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        marginBottom: 40,
                    }}
                >
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#22d3ee',
                        }}
                    />
                    <span style={{ fontSize: 24, color: '#94a3b8' }}>Case Study</span>
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: 24,
                        background: 'linear-gradient(90deg, #22d3ee, #3b82f6)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    {project.title}
                </h1>

                {/* Excerpt */}
                <p
                    style={{
                        fontSize: 28,
                        color: '#94a3b8',
                        lineHeight: 1.4,
                        marginBottom: 40,
                        maxWidth: 800,
                    }}
                >
                    {project.excerpt?.slice(0, 120)}
                    {project.excerpt?.length > 120 ? '...' : ''}
                </p>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                    {techNames.map((tech: string) => (
                        <div
                            key={tech}
                            style={{
                                padding: '8px 20px',
                                background: 'rgba(34, 211, 238, 0.15)',
                                border: '1px solid rgba(34, 211, 238, 0.3)',
                                borderRadius: 9999,
                                fontSize: 20,
                                color: '#22d3ee',
                            }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    )
}
