'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GitHubEvent {
    repo: string
    repoUrl: string
    message: string
    timestamp: string
    type: string
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

        // Fetch GitHub events from internal API
        fetch('/api/github')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch')
                return res.json()
            })
            .then((data) => {
                // data.activity from our API route
                const formattedEvents: GitHubEvent[] = data.activity
                    .slice(0, 4) // Show top 4
                    .map((event: any) => ({
                        repo: event.repo,
                        repoUrl: event.repoUrl,
                        message: event.message,
                        timestamp: new Date(event.timestamp).toLocaleString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        }),
                        type: event.type
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
        <section id="github" className="w-full py-12 bg-primary-100">
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
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <a href={event.repoUrl} target="_blank" rel="noopener noreferrer" className="text-primary-950 font-bold hover:underline truncate">
                                                    {event.repo}
                                                </a>
                                                <span className="text-primary-950/40 text-xs whitespace-nowrap">{event.timestamp}</span>
                                            </div>
                                            <p className="text-primary-950/80 text-sm mb-1 line-clamp-1 break-all">
                                                {event.message}
                                            </p>
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
