'use client'

import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'

interface GitHubActivityItem {
    id: string
    type: string
    repo: string
    repoUrl: string
    createdAt: string
    action: string
}

interface GitHubData {
    username: string
    activity: GitHubActivityItem[]
}

export function GitHubActivity() {
    const [data, setData] = useState<GitHubData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchActivity() {
            try {
                const res = await fetch('/api/github')
                if (!res.ok) throw new Error('Failed to fetch')
                const json = await res.json()
                setData(json)
            } catch (err) {
                setError('Could not load GitHub activity')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchActivity()
    }, [])

    if (loading) {
        return (
            <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-primary-100 rounded-lg" />
                ))}
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="text-primary-900/60 text-center py-6">
                {error || 'No activity available'}
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {data.activity.map((item) => (
                <a
                    key={item.id}
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white border border-primary-100 rounded-xl hover:border-primary-300 hover:shadow-md transition-all group"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-primary-950 font-semibold truncate group-hover:text-primary-500 transition-colors">
                                {item.repo}
                            </p>
                            <p className="text-primary-900/60 text-sm mt-1">
                                {item.action}
                            </p>
                        </div>
                        <time className="text-xs text-primary-900/40 whitespace-nowrap font-medium">
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                        </time>
                    </div>
                </a>
            ))}
        </div>
    )
}
