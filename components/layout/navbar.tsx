'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
]

export function Navbar() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="w-full z-40">
            <nav className="mx-auto max-w-7xl px-6 py-4">
                <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-bold text-primary-950 hover:opacity-80 transition-opacity flex items-center gap-2"
                    >
                        <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-900">P</span>
                        <span>Portfolio</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${pathname === link.href
                                    ? 'bg-primary-950 text-primary-100'
                                    : 'text-primary-950 hover:text-primary-600 hover:bg-primary-100'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Command Palette Hint */}
                        <button
                            onClick={() => {
                                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
                                document.dispatchEvent(event)
                            }}
                            className="ml-4 flex items-center gap-2 px-3 py-1.5 text-xs text-primary-900/60 bg-primary-50 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
                        >
                            <span>Search</span>
                            <kbd className="px-1.5 py-0.5 bg-primary-100 rounded text-primary-500 font-sans">⌘K</kbd>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-primary-900 hover:bg-primary-100 rounded-full"
                    >
                        {mobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-2 glass rounded-2xl p-4 shadow-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${pathname === link.href
                                    ? 'bg-primary-950 text-primary-100'
                                    : 'text-primary-950 hover:bg-primary-100'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}
