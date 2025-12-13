'use client'

import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function CTASection() {
    return (
        <section id="contact" className="w-full py-20 bg-primary-100">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-3xl p-12 md:p-16 shadow-2xl border border-primary-500 relative overflow-hidden text-center"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="relative z-10"
                    >
                        <SparklesIcon className="w-16 h-16 text-primary-950 mx-auto mb-6" />
                    </motion.div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-950 mb-4">
                            Have a project in mind?
                        </h2>
                        <p className="text-lg md:text-xl text-primary-950/80 mb-8 max-w-2xl mx-auto">
                            Let's collaborate and bring your ideas to life. I'm always excited to work on new and challenging projects.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-950 text-primary-50 rounded-xl font-bold hover:bg-primary-900 transition-all shadow-xl hover:shadow-2xl text-lg"
                            >
                                Let's Talk
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="mailto:your.email@example.com"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-primary-950 border-2 border-primary-950 rounded-xl font-bold hover:bg-primary-950 hover:text-primary-50 transition-all text-lg"
                            >
                                Send Email
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
