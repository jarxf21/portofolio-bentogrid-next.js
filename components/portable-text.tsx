import { urlForImage } from '@/sanity/lib/image'
import { PortableText as PortableTextComponent } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'

// Custom components for Portable Text rendering
const components = {
    types: {
        image: ({ value }: { value: { asset: { _ref: string }; caption?: string } }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <figure className="my-8">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={urlForImage(value).width(1200).height(675).url()}
                            alt={value.caption || 'Image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-400 mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },
        code: ({ value }: { value: { code: string; language?: string } }) => (
            <pre className="my-6 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                <code className={`language-${value.language || 'javascript'} text-sm`}>
                    {value.code}
                </code>
            </pre>
        ),
    },
    block: {
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-xl font-bold text-primary-950 mt-8 mb-4">{children}</h3>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 my-6 italic text-primary-900/80">
                {children}
            </blockquote>
        ),
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-primary-950 leading-relaxed mb-4">{children}</p>
        ),
    },
    marks: {
        link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target ? 'noopener noreferrer' : undefined}
                    className="text-primary-600 hover:text-primary-500 underline transition-colors"
                >
                    {children}
                </a>
            )
        },
        code: ({ children }: { children?: React.ReactNode }) => (
            <code className="bg-primary-100 px-1.5 py-0.5 rounded text-primary-700 text-sm font-semibold">
                {children}
            </code>
        ),
    },
}

interface PortableTextProps {
    value: PortableTextBlock[]
}

export function PortableText({ value }: PortableTextProps) {
    return <PortableTextComponent value={value} components={components} />
}
