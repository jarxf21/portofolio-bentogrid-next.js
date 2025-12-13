import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Job Role',
            type: 'string',
            description: 'e.g. CEO, Product Manager',
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'quote',
            title: 'Testimonial Quote',
            type: 'text',
            validation: (Rule) => Rule.required().min(20).max(300),
        }),
        defineField({
            name: 'photo',
            title: 'Client Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show this on the home page?',
            initialValue: false,
        }),
    ],
})
