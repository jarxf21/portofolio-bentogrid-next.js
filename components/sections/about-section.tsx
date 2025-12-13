'use client'

import { ArrowDownTrayIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'

interface AboutSectionProps {
    profile?: {
        fullName?: string
        bio?: any
        resumeURL?: string
        skills?: string[]
    }
}

export function AboutSection({ profile }: AboutSectionProps) {
    return (
        <section id="about" className="w-full py-20 bg-primary-100">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-primary-600 rounded-3xl p-8 md:p-12 shadow-xl border border-primary-500 relative overflow-hidden"
                >
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-primary-950 mb-6"
                        >
                            About Me
                        </motion.h2>

                        <div className="prose prose-lg max-w-none text-primary-950 mb-8">
                            {profile?.bio ? (
                                <PortableText value={profile.bio} />
                            ) : (
                                <p className="text-lg leading-relaxed font-medium">
                                    Passionate about building intuitive, high-performance web applications.
                                    I specialize in modern JavaScript ecosystems and love turning complex
                                    problems into elegant solutions.
                                </p>
                            )}
                        </div>

                        {/* Skills section */}
                        {profile?.skills && profile.skills.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-primary-950 mb-4">Core Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.map((skill, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 py-2 bg-[#9EBC8A] text-primary-950 rounded-full text-sm font-semibold border border-primary-500"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-primary-500/30">
                            <a
                                href={profile?.resumeURL || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 px-6 py-3 bg-[#9EBC8A] text-primary-950 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg border border-primary-500 ${!profile?.resumeURL ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                Download Resume
                            </a>

                            <div className="flex items-center gap-2 text-primary-950 px-4">
                                <MapPinIcon className="w-5 h-5" />
                                <span className="font-semibold">Based in Jakarta, Indonesia</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
