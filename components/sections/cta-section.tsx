'use client'

import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const scaleUp: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
}

const slideUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

export function CTASection() {
    return (
        <section id="contact" className="w-full py-12 bg-primary-100">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-3xl p-12 md:p-16 shadow-2xl border border-primary-500 relative overflow-hidden text-center"
                >
                    {/* Decorative elements - animated */}
                    <motion.div
                        variants={scaleUp}
                        className="absolute top-0 right-0 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                    />
                    <motion.div
                        variants={scaleUp}
                        className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
                    />

                    {/* Icon with spring animation */}
                    <motion.div
                        variants={scaleUp}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        <SparklesIcon className="w-16 h-16 text-primary-950 mx-auto mb-6" />
                    </motion.div>

                    <div className="relative z-10">
                        {/* Title */}
                        <motion.h2
                            variants={slideUp}
                            className="text-3xl md:text-5xl font-extrabold text-primary-950 mb-4"
                        >
                            Have a project in mind?
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            variants={slideUp}
                            className="text-lg md:text-xl text-primary-950/80 mb-8 max-w-2xl mx-auto"
                        >
                            Let's collaborate and bring your ideas to life. I'm always excited to work on new and challenging projects.
                        </motion.p>

                        {/* Buttons with hover animations */}
                        <motion.div
                            variants={slideUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-950 text-primary-50 rounded-xl font-bold hover:bg-primary-900 transition-colors shadow-xl text-lg"
                                >
                                    Let's Talk
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </motion.span>
                                </Link>
                            </motion.div>
                            <motion.a
                                href="mailto:fajar.career01@gmail.com"
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#9EBC8A] text-primary-950 border-2 border-primary-950 rounded-xl font-bold hover:bg-primary-950 hover:text-primary-50 transition-all text-lg"
                            >
                                Send Email
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
