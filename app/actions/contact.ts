'use server'

import { z } from 'zod'

// Validation schema
const ContactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormState = {
    success: boolean
    message: string
    errors?: {
        name?: string[]
        email?: string[]
        message?: string[]
    }
}

export async function submitContactForm(
    _prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    // Parse and validate form data
    const validatedFields = ContactFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })

    // Return early if validation fails
    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, message } = validatedFields.data

    try {
        // In production, you would send an email here using Resend, SendGrid, etc.
        // For now, we'll just log to the console
        console.log('📧 Contact Form Submission:')
        console.log('Name:', name)
        console.log('Email:', email)
        console.log('Message:', message)

        // Simulate a small delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Example: Send email with Resend (uncomment when API key is available)
        // const { Resend } = await import('resend')
        // const resend = new Resend(process.env.RESEND_API_KEY)
        // await resend.emails.send({
        //   from: 'Portfolio <onboarding@resend.dev>',
        //   to: 'your-email@example.com',
        //   subject: `New Contact from ${name}`,
        //   text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        // })

        return {
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
        }
    } catch (error) {
        console.error('Contact form error:', error)
        return {
            success: false,
            message: 'Something went wrong. Please try again later.',
        }
    }
}
