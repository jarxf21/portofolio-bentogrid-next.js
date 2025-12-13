'use client'

import { EnvelopeIcon, FolderIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface CommandPaletteProps {
    isOpen: boolean
    onClose: () => void
}

const pages = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
]

const socials = [
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
]

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleSelect = useCallback((href: string) => {
        onClose()
        if (href.startsWith('http')) {
            window.open(href, '_blank')
        } else {
            router.push(href)
        }
    }, [onClose, router])

    // Close on escape
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Command Dialog */}
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-full max-w-xl">
                <Command
                    className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                    loop
                >
                    {/* Input */}
                    <div className="flex items-center gap-3 px-4 border-b border-gray-700">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                        <Command.Input
                            value={search}
                            onValueChange={setSearch}
                            placeholder="Search pages, projects, or actions..."
                            className="flex-1 py-4 bg-transparent text-white placeholder-gray-500 outline-none"
                        />
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded">
                            ESC
                        </kbd>
                    </div>

                    {/* Results */}
                    <Command.List className="max-h-80 overflow-y-auto p-2">
                        <Command.Empty className="py-6 text-center text-gray-500">
                            No results found.
                        </Command.Empty>

                        {/* Pages */}
                        <Command.Group heading="Pages" className="text-xs text-gray-500 px-2 py-2">
                            {pages.map((page) => (
                                <Command.Item
                                    key={page.href}
                                    value={page.name}
                                    onSelect={() => handleSelect(page.href)}
                                    className="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg cursor-pointer data-[selected=true]:bg-gray-800 data-[selected=true]:text-white"
                                >
                                    <page.icon className="w-5 h-5" />
                                    {page.name}
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {/* Social Links */}
                        <Command.Group heading="Social" className="text-xs text-gray-500 px-2 py-2 mt-2">
                            {socials.map((social) => (
                                <Command.Item
                                    key={social.href}
                                    value={social.name}
                                    onSelect={() => handleSelect(social.href)}
                                    className="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg cursor-pointer data-[selected=true]:bg-gray-800 data-[selected=true]:text-white"
                                >
                                    <UserIcon className="w-5 h-5" />
                                    {social.name}
                                    <span className="ml-auto text-xs text-gray-500">↗</span>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    )
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    // Open on Ctrl+K or Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return (
        <>
            {children}
            <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
