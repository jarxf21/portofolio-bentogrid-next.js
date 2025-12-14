import { NextResponse } from 'next/server'

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'octocat'
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN

export async function GET() {
    try {
        const headers: HeadersInit = {
            Accept: 'application/vnd.github.v3+json',
        }

        // Add token if available for higher rate limits
        if (GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${GITHUB_TOKEN}`
        }

        // Fetch recent public events
        const eventsResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
            {
                headers,
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        )

        if (!eventsResponse.ok) {
            throw new Error(`GitHub API error: ${eventsResponse.status}`)
        }

        const events = await eventsResponse.json()

        // Transform events into a simpler format
        const activity = events.slice(0, 10).map((event: GitHubEvent) => {
            let message = '';
            // Extract message based on event type
            if (event.type === 'PushEvent') {
                message = event.payload?.commits?.[0]?.message || 'Pushed commits';
            } else if (event.type === 'CreateEvent') {
                message = `Created ${event.payload?.ref_type || 'repository'}`;
            } else if (event.type === 'PullRequestEvent') {
                message = `${event.payload?.action} pull request`;
            } else if (event.type === 'WatchEvent') {
                message = 'Starred repository';
            } else {
                message = event.type.replace('Event', '');
            }

            return {
                id: event.id,
                type: event.type,
                repo: event.repo.name,
                repoUrl: `https://github.com/${event.repo.name}`,
                timestamp: event.created_at, // Keep ISO string for frontend formatting
                message: message,
            }
        })

        return NextResponse.json({
            username: GITHUB_USERNAME,
            activity,
        })
    } catch (error) {
        console.error('GitHub API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch GitHub activity' },
            { status: 500 }
        )
    }
}

// Helper to get human-readable action
function getEventAction(event: GitHubEvent): string {
    switch (event.type) {
        case 'PushEvent':
            return `Pushed ${event.payload?.commits?.length || 0} commit(s)`
        case 'CreateEvent':
            return `Created ${event.payload?.ref_type || 'repository'}`
        case 'PullRequestEvent':
            return `${event.payload?.action || 'Updated'} pull request`
        case 'IssuesEvent':
            return `${event.payload?.action || 'Updated'} issue`
        case 'WatchEvent':
            return 'Starred repository'
        case 'ForkEvent':
            return 'Forked repository'
        default:
            return event.type.replace('Event', '')
    }
}

// Types
interface GitHubEvent {
    id: string
    type: string
    repo: { name: string }
    created_at: string
    payload?: {
        commits?: { message: string }[]
        ref_type?: string
        action?: string
    }
}
