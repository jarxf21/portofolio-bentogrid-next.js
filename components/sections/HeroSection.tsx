import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-primary-50 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-100/50 -skew-x-12 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary-100 rounded-full text-primary-900 text-sm font-medium shadow-sm">
                            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            Available for new projects
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-primary-950">
                            Engineering <br />
                            <span className="text-primary-500 italic">Natural Growth</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl md:text-2xl text-primary-900/80 max-w-lg leading-relaxed">
                            I am a Full Stack Engineer building scalable web applications that blend technical precision with organic user experiences.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-900 text-white font-semibold rounded-2xl hover:bg-primary-950 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
                            >
                                View My Work
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-900 text-primary-900 font-semibold rounded-2xl hover:bg-primary-900 hover:text-white transition-all duration-300"
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </div>

                    {/* Visual Element (Abstract Representation) */}
                    <div className="relative hidden lg:block">
                        <div className="relative aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-primary-500 rounded-[2rem] rotate-6 opacity-20 transition-transform duration-700 hover:rotate-12" />
                            <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-primary-100 flex items-center justify-center group">
                                <div className="text-center p-8">
                                    <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                                        🌿
                                    </div>
                                    <h3 className="text-2xl font-serif text-primary-950 mb-2">
                                        Natural Flow
                                    </h3>
                                    <p className="text-primary-900/60">
                                        Design that breathes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
