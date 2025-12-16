import { FloatingDock } from '@/components/floating-dock'
import { Navbar } from '@/components/layout/navbar'


export default function WebLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-5">
                {children}
            </main>
            <FloatingDock />
        </div>
    )
}
