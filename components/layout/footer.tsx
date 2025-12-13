export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-primary-100 bg-primary-50/50 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-primary-900/60 text-sm">
                        © {currentYear} Portfolio. All rights reserved.
                    </p>
                    <p className="text-primary-900/40 text-xs">
                        Press <kbd className="px-1.5 py-0.5 bg-primary-100 rounded text-primary-500 font-sans">⌘K</kbd> to search
                    </p>
                </div>
            </div>
        </footer>
    )
}
