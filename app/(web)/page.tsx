import { BentoGrid } from '@/components/bento-grid'
import { client } from '@/sanity/lib/client'

// Fetch profile and featured projects
async function getData() {
  const query = `{
    "profile": *[_type == "profile"][0]{
      fullName,
      headline,
      bio,
      profileImage,
      email,
      resumeURL,
      skills,
      socialLinks
    },
    "projects": *[_type == "project" && featured == true] | order(publishedAt desc) [0...4] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      "techStack": techStack[]->{ name, slug, icon }
    },
    "testimonials": *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...3] {
      _id,
      name,
      role,
      company,
      quote,
      photo
    },
    "allTech": *[_type == "techStack"] | order(name asc) {
      name,
      slug,
      icon
    }
  }`
  return client.fetch(query)
}

export default async function HomePage() {
  const data = await getData()
  const { profile, projects, testimonials, allTech } = data || { profile: null, projects: [], testimonials: [], allTech: [] }

  return (
    <div className="min-h-screen bg-primary-100 pb-20">
      <BentoGrid projects={projects} testimonials={testimonials} profile={profile} allTech={allTech} />
    </div>
  )
}
