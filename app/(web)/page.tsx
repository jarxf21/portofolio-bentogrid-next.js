import { BentoGrid } from '@/components/bento-grid'
import { CTASection } from '@/components/sections/cta-section'
import { GitHubSection } from '@/components/sections/github-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ServicesSection } from '@/components/sections/services-section'
import { TechAboutSection } from '@/components/sections/tech-about-section'
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
    "projects": *[_type == "project"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      demoUrl,
      repoUrl,
      "techStack": techStack[]->{ name, slug, icon }
    },
    "allTech": *[_type == "techStack"] | order(name asc) {
      name,
      slug,
      icon,
      category
    }
  }`
  return client.fetch(query, {}, { next: { revalidate: 10 } })
}

export default async function HomePage() {
  const data = await getData()
  const { profile, projects, allTech } = data || { profile: null, projects: [], allTech: [] }

  // Extract GitHub username from profile
  const githubUsername = profile?.socialLinks?.github?.split('github.com/')[1]?.replace('/', '')

  return (
    <main className="relative">
      {/* Hero Section */}
      <BentoGrid profile={profile} />

      {/* Combined Tech + About Section with Wave Separators */}
      <TechAboutSection profile={profile} technologies={allTech} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Services Section */}
      <ServicesSection />

      {/* GitHub Activity */}
      <GitHubSection githubUsername={githubUsername} />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}
