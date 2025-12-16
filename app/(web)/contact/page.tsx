import { ContactForm } from '@/components/contact-form'
import { client } from '@/sanity/lib/client'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch for project inquiries, collaboration opportunities, or just to say hello.',
}

async function getProfile() {
    const query = `*[_type == "profile"][0]{ email, socialLinks }`
    return client.fetch(query, {}, { next: { revalidate: 10 } })
}

export default async function ContactPage() {
    const profile = await getProfile()
    const socials = profile?.socialLinks

    return (
        <div className="max-w-7xl mx-auto px-6 py-12  bg-white/20 min-h-screen">
            <div className="grid lg:grid-cols-2 gap-12 pt-12">
                {/* Left Column - Info */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-950 mb-4">
                        Let&apos;s <span className="text-white">Connect</span>
                    </h1>
                    <p className="text-xl text-primary-950/80 mb-8 leading-relaxed font-medium">
                        Have a project in mind? Want to collaborate? Or just want to say hi? I&apos;d love to hear from you.
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#9EBC8A] rounded-xl flex items-center justify-center text-primary-950 shrink-0 border border-primary-950/10">
                                <EnvelopeIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-primary-950 font-bold">Email</h3>
                                <p className="text-primary-950/80 font-medium">{profile?.email || 'fajar.career01@gmail.com'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#9EBC8A] rounded-xl flex items-center justify-center text-primary-950 shrink-0 border border-primary-950/10">
                                <MapPinIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-primary-950 font-bold">Location</h3>
                                <p className="text-primary-950/80 font-medium">Pontianak, Indonesia</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-12">
                        <h3 className="text-sm font-bold text-primary-950/60 uppercase tracking-wider mb-4">
                            Find me on
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {socials?.github && (
                                <a
                                    href={socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white border border-transparent rounded-xl flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-all shadow-sm"
                                    title="GitHub"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                </a>
                            )}
                            {socials?.linkedin && (
                                <a
                                    href={socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white border border-transparent rounded-xl flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-all shadow-sm"
                                    title="LinkedIn"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                            )}
                            {socials?.threads && (
                                <a
                                    href={socials.threads}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white border border-transparent rounded-xl flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-all shadow-sm"
                                    title="Threads"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.46 6.36c.64.01 1.25.04 1.83.08-1.74 3.79-1.39 8.01 1.76 10.7a6.22 6.22 0 0 1-3.66 1.18c-3.15 0-5.46-2.27-5.46-5.87 0-3.55 2.5-6.05 6.07-6.09H11.46zM13.29 2c-5.7 0-10.45 4.31-10.45 10.35 0 6.09 4.38 10.46 9.87 10.46 2.82 0 5.46-1.15 7.02-3.16l-2.04-1.78a6.56 6.56 0 0 1-4.98 2.29c-2.45 0-5.11-1.33-5.73-4.38h10.96c.06-.52.1-1.07.1-1.63 0-5.73-3.63-10.15-8.99-10.15zm.25 2.65c3.08 0 5.3 2.1 5.3 5.3 0 .54-.05 1.07-.12 1.58H7.7c.65-3.08 3.14-4.88 5.84-4.88z" /></svg>
                                </a>
                            )}
                            {socials?.instagram && (
                                <a
                                    href={socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white border border-transparent rounded-xl flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-all shadow-sm"
                                    title="Instagram"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            )}

                            {socials?.youtube && (
                                <a
                                    href={socials.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white border border-transparent rounded-xl flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-all shadow-sm"
                                    title="YouTube"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                </a>
                            )}

                            {socials?.upwork && (
                                <a
                                    href={socials.upwork}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white border border-transparent rounded-xl flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-primary-50 transition-all shadow-sm"
                                    title="Upwork"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-.937c1.007.228 1.993.454 2.846.454 1.155 0 1.554-.316 1.554-1.353V6.04h2.824v12.016h-2.824v-4.898ZM1.895 6.04H4.72v6.236c0 1.037.4 1.353 1.554 1.353.947 0 1.942-.224 2.946-.453l.235.945c-1.045.748-2.072 1.215-3.181 1.215-2.842 0-4.379-1.258-4.379-4.045V6.04Zm11.375 7.02c-1.055.772-2.185 1.25-3.372 1.25-2.665 0-4.225-1.503-4.225-4.632V6.04h2.824v2.793c0 1.769.7 2.41 1.942 2.41 1.054 0 2.05-.349 2.894-.88l-.063-8.86 2.824-.002v6.622c.003 1.83.693 2.942 2.227 3.655l-1.102 2.373c-2.355-1.077-3.413-2.73-3.95-3.92Z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="glass rounded-3xl p-8 bg-white/60 border-primary-100 shadow-md">
                    <h2 className="text-2xl font-bold text-primary-950 mb-6">Send a Message</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
