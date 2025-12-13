import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

// Only create a real client if projectId is configured
// This allows the build to pass without actual Sanity credentials
export const client = projectId
    ? createClient({
        apiVersion,
        dataset,
        projectId,
        useCdn,
        perspective: 'published',
    })
    : {
        // Stub client for build time when no projectId is available
        fetch: async () => null,
    }
