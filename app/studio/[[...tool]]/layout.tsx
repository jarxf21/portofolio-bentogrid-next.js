export const metadata = {
    title: 'Admin Studio',
    description: 'Content management for portfolio',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Studio has its own styling, just pass through children
    // Do NOT add html/body here - the root layout already provides them
    return children
}
