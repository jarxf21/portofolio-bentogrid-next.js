'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GitHubEvent {
    repo: string
    message: string
    timestamp: string
}

interface GitHubSectionProps {
    githubUsername?: string
}

export function GitHubSection({ githubUsername }: GitHubSectionProps) {
    const [events, setEvents] = useState<GitHubEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!githubUsername) {
            setLoading(false)
            return
        }

        // Fetch GitHub events
        fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=5`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch')
                return res.json()
            })
            .then((data) => {
                const formattedEvents: GitHubEvent[] = data
                    .filter((event: any) => event.type === 'PushEvent')
                    .slice(0, 3)
                    .map((event: any) => ({
                        repo: event.repo.name,
                        message: event.payload.commits?.[0]?.message || 'No message',
                        timestamp: new Date(event.created_at).toLocaleDateString(),
                    }))
                setEvents(formattedEvents)
                setLoading(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }, [githubUsername])

    return (
        <section id="github" className="w-full py-20 bg-primary-100">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-primary-600 rounded-3xl p-8 md:p-10 shadow-xl border border-primary-500"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                            <h2 className="text-2xl md:text-3xl font-bold text-primary-950">
                                GitHub Activity
                            </h2>
                        </div>
                        {githubUsername && (
                            <a
                                href={`https://github.com/${githubUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-4 py-2 bg-[#9EBC8A] text-primary-950 rounded-lg font-semibold hover:bg-primary-500 transition-all text-sm shadow-md border border-primary-500"
                            >
                                View Profile <ArrowRightIcon className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-20 bg-primary-500/30 rounded-xl" />
                                </div>
                            ))}
                        </div>
                    ) : error || !githubUsername ? (
                        <div className="space-y-3">
                            {/* Fallback static data */}
                            <div className="p-4 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                                    <div className="flex-1">
                                        <p className="text-primary-950 font-bold mb-1">portfolio-website</p>
                                        <p className="text-primary-950/80 text-sm mb-1">
                                            feat: add floating dock navigation
                                        </p>
                                        <p className="text-primary-950/50 text-xs">Today</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                                    <div className="flex-1">
                                        <p className="text-primary-950 font-bold mb-1">web-app-project</p>
                                        <p className="text-primary-950/80 text-sm mb-1">
                                            fix: responsive layout on mobile
                                        </p>
                                        <p className="text-primary-950/50 text-xs">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                                    <div className="flex-1">
                                        <p className="text-primary-950 font-bold mb-1">api-service</p>
                                        <p className="text-primary-950/80 text-sm mb-1">
                                            refactor: optimize database queries
                                        </p>
                                        <p className="text-primary-950/50 text-xs">1 week ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 bg-[#9EBC8A] rounded-xl border border-primary-500 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                                        <div className="flex-1">
                                            <p className="text-primary-950 font-bold mb-1">{event.repo}</p>
                                            <p className="text-primary-950/80 text-sm mb-1 line-clamp-1">
                                                {event.message}
                                            </p>
                                            <p className="text-primary-950/50 text-xs">{event.timestamp}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
