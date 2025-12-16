import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'resumeURL',
            title: 'Resume URL',
            type: 'url',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                defineField({
                    name: 'github',
                    title: 'Github URL',
                    type: 'url',
                }),
                defineField({
                    name: 'linkedin',
                    title: 'Linkedin URL',
                    type: 'url',
                }),
                defineField({
                    name: 'threads',
                    title: 'Threads URL',
                    type: 'url',
                }),
                defineField({
                    name: 'instagram',
                    title: 'Instagram URL',
                    type: 'url',
                }),
                defineField({
                    name: 'upwork',
                    title: 'Upwork URL',
                    type: 'url',
                }),
                defineField({
                    name: 'youtube',
                    title: 'Youtube URL',
                    type: 'url',
                }),
            ]
        }),
        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
