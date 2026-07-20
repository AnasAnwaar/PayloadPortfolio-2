import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { PortfolioHome } from '@/components/portfolio/PortfolioHome'
import { portfolioSeed } from '@/data/portfolioDefaults'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const [portfolio, skills, skillCategories, experiences, experienceCategories, projects, projectCategories, achievements] = await Promise.all([
    payload.findGlobal({ slug: 'portfolio', depth: 2 }),
    payload.find({ collection: 'skills', depth: 1, limit: 100, sort: 'order' }),
    payload.find({ collection: 'skill-categories', limit: 100, sort: 'order' }),
    payload.find({ collection: 'experiences', depth: 2, limit: 100, sort: 'order' }),
    payload.find({ collection: 'experience-categories', limit: 100, sort: 'order' }),
    payload.find({ collection: 'portfolio-projects', depth: 2, limit: 100, sort: 'order' }),
    payload.find({ collection: 'project-categories', limit: 100, sort: 'order' }),
    payload.find({ collection: 'achievements', depth: 1, limit: 100, sort: 'order' }),
  ])

  return (
    <PortfolioHome
      achievements={achievements.docs}
      experienceCategories={experienceCategories.docs}
      experiences={experiences.docs}
      fallback={portfolioSeed}
      portfolio={portfolio}
      projectCategories={projectCategories.docs}
      projects={projects.docs}
      skillCategories={skillCategories.docs}
      skills={skills.docs}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const portfolio = await payload.findGlobal({ slug: 'portfolio', depth: 1 })
  return {
    title: portfolio.seo?.title || portfolioSeed.seo.title,
    description: portfolio.seo?.description || portfolioSeed.seo.description,
  }
}
