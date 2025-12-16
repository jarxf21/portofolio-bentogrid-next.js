'use client'

import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { useActionState } from 'react'

const initialState: ContactFormState = {
    success: false,
    message: '',
}

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

    return (
        <form action={formAction} className="space-y-6">
            {/* Success Message */}
            {state.success && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg">
                    {state.message}
                </div>
            )}

            {/* Error Message */}
            {!state.success && state.message && !state.errors && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                    {state.message}
                </div>
            )}

            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-950 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-[#9EBC8A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Your name"
                />
                {state.errors?.name && (
                    <p className="mt-1 text-sm text-red-400">{state.errors.name[0]}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-950 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-[#9EBC8A] border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="your@email.com"
                />
                {state.errors?.email && (
                    <p className="mt-1 text-sm text-red-400">{state.errors.email[0]}</p>
                )}
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-950 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-[#9EBC8A]  border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Your message..."
                />
                {state.errors?.message && (
                    <p className="mt-1 text-sm text-red-400">{state.errors.message[0]}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-3 bg-[#9EBC8A] text-primary-950 font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                    </span>
                ) : (
                    'Send Message'
                )}
            </button>
        </form>
    )
}
