import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'techStack',
    title: 'Tech Stack',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            description: 'Technology logo/icon',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Frontend', value: 'frontend' },
                    { title: 'Backend', value: 'backend' },
                    { title: 'Database', value: 'database' },
                    { title: 'DevOps', value: 'devops' },
                    { title: 'Tools', value: 'tools' },
                    { title: 'Other', value: 'other' },
                ],
                layout: 'radio',
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'icon',
            subtitle: 'category',
        },
    },
})
