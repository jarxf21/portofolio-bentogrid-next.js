import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Brief description for cards and SEO',
        }),
        // Relational Data: Tech Stack References
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'techStack' }],
                },
            ],
            description: 'Technologies used in this project',
        }),
        // Case Study Structure (Narrative Format)
        defineField({
            name: 'caseStudy',
            title: 'Case Study',
            type: 'object',
            fields: [
                defineField({
                    name: 'problem',
                    title: 'The Problem',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                                { title: 'H3', value: 'h3' },
                                { title: 'Quote', value: 'blockquote' },
                            ],
                        },
                        { type: 'image' },
                    ],
                    description: 'What challenge did this project solve?',
                }),
                defineField({
                    name: 'solution',
                    title: 'The Solution',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                                { title: 'H3', value: 'h3' },
                                { title: 'Quote', value: 'blockquote' },
                            ],
                        },
                        { type: 'image' },
                        {
                            type: 'code',
                            options: {
                                language: 'javascript',
                                languageAlternatives: [
                                    { title: 'JavaScript', value: 'javascript' },
                                    { title: 'TypeScript', value: 'typescript' },
                                    { title: 'Python', value: 'python' },
                                    { title: 'HTML', value: 'html' },
                                    { title: 'CSS', value: 'css' },
                                    { title: 'Bash', value: 'bash' },
                                ],
                            },
                        },
                    ],
                    description: 'How did you approach the problem?',
                }),
                defineField({
                    name: 'results',
                    title: 'Results & Impact',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                                { title: 'H3', value: 'h3' },
                            ],
                        },
                    ],
                    description: 'What were the outcomes? Metrics, learnings, etc.',
                }),
                defineField({
                    name: 'videoUrl',
                    title: 'Video Demo (YouTube/Vimeo)',
                    type: 'url',
                    description: 'Paste a YouTube or Vimeo link here instead of a gallery.'
                }),
            ],
        }),
        defineField({
            name: 'demoUrl',
            title: 'Demo URL',
            type: 'url',
        }),
        defineField({
            name: 'repoUrl',
            title: 'Repository URL',
            type: 'url',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
            description: 'Show this project on the home page',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        }),
    ],
    orderings: [
        {
            title: 'Published Date, New',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'excerpt',
        },
    },
})
