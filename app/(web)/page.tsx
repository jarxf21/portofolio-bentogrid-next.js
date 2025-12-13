import { BentoGrid } from '@/components/bento-grid'
import { AboutSection } from '@/components/sections/about-section'
import { CTASection } from '@/components/sections/cta-section'
import { GitHubSection } from '@/components/sections/github-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ServicesSection } from '@/components/sections/services-section'
import { TechMarquee } from '@/components/sections/tech-marquee'
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
    "projects": *[_type == "project" && featured == true] | order(publishedAt desc) [0...6] {
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
      icon
    }
  }`
  return client.fetch(query)
}

export default async function HomePage() {
  const data = await getData()
  const { profile, projects, allTech } = data || { profile: null, projects: [], allTech: [] }

  // Extract GitHub username from profile
  const githubUsername = profile?.socialLinks?.github?.split('github.com/')[1]?.replace('/', '')

  return (
    <main className="relative bg-primary-100">

      {/* 1. HERO SECTION (Layer Bawah - z-0) */}
      <div className="relative z-0">
        <BentoGrid profile={profile} />
      </div>

      {/* 2. KONTEN PENUTUP (Layer Atas - z-10) */}
      {/* Wrapper dengan background solid + rounded top + shadow */}
      <div
        className="relative z-10 -mt-[20vh] rounded-t-[3rem] bg-primary-100 shadow-2xl"
      >
        {/* Spacer agar konten tidak menempel di bibir lengkungan */}
        <div className="pt-16 pb-10">

          {/* Tech Stack Marquee */}
          <div className="mb-16">
            <TechMarquee technologies={allTech} />
          </div>

          {/* About Section */}
          <div className="mb-16">
            <AboutSection profile={profile} />
          </div>

          {/* Projects Section */}
          <div className="mb-16">
            <ProjectsSection projects={projects} />
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <ServicesSection />
          </div>

          {/* GitHub Activity */}
          <div className="mb-16">
            <GitHubSection githubUsername={githubUsername} />
          </div>

          {/* CTA Section */}
          <CTASection />

        </div>
      </div>

    </main>
  )
}
