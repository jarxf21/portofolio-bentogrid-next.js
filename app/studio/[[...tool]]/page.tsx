'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js Catch-all Segments,
 * Docs: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments
 */

import config from '@/sanity.config'
import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'

export default function StudioPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

    if (!projectId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 text-center">
                <h1 className="text-3xl font-bold mb-4 text-red-500">Configuration Required</h1>
                <p className="max-w-md text-gray-300 mb-8">
                    Please configure your Sanity Project ID to access the Studio.
                </p>
                <div className="bg-gray-800 p-6 rounded-lg text-left max-w-lg w-full border border-gray-700">
                    <p className="mb-2 font-semibold">1. Create a project at:</p>
                    <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline block mb-4">
                        sanity.io/manage
                    </a>

                    <p className="mb-2 font-semibold">2. Update your <code className="bg-black px-2 py-1 rounded text-sm">.env.local</code> file:</p>
                    <pre className="bg-black p-4 rounded text-sm overflow-x-auto text-green-400">
                        NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
                    </pre>
                </div>
            </div>
        )
    }

    if (!mounted) return null

    return <NextStudio config={config} />
}

