import 'dotenv/config'

import config from '@payload-config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload, type File } from 'payload'

import {
  achievementSeeds,
  experienceCategorySeeds,
  experienceSeeds,
  portfolioSeed,
  projectCategorySeeds,
  projectSeeds,
  skillCategorySeeds,
  skillSeeds,
} from '@/data/portfolioDefaults'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetPath = (name: string) => path.join(dirname, 'assets', name)

const mimeTypes: Record<string, string> = {
  '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.png': 'image/png',
}

const asUpload = (name: string): File => {
  const absolutePath = assetPath(name)
  const data = fs.readFileSync(absolutePath)
  return { data, mimetype: mimeTypes[path.extname(name).toLowerCase()] || 'application/octet-stream', name, size: data.byteLength }
}

const payload = await getPayload({ config })
payload.logger.info('Seeding editable portfolio content...')

async function ensureMedia(filename: string, alt: string) {
  const existing = await payload.find({ collection: 'media', limit: 1, where: { filename: { equals: filename } } })
  if (existing.docs[0]) return existing.docs[0]
  return payload.create({ collection: 'media', data: { alt }, file: asUpload(filename) })
}

const media = {
  profile: await ensureMedia('profile.jpg', 'Syed Ibad Ali'),
  resume: await ensureMedia('resume.pdf', 'Syed Ibad Ali resume'),
  appearls: await ensureMedia('appearls.png', 'Appearls Technologies logo'),
  banoqabil: await ensureMedia('banoqabil.png', 'Bano Qabil logo'),
  solcoders: await ensureMedia('solcoders.png', 'SolCoders logo'),
  ned: await ensureMedia('ned.png', 'NED University logo'),
  teknofest: await ensureMedia('teknofest.png', 'Teknofest Pakistan logo'),
  floxriptDashboard: await ensureMedia('floxript-dashboard.png', 'FloXript dashboard'),
  floxriptTutorial: await ensureMedia('floxript-tutorial.png', 'FloXript generated tutorial'),
  floxriptPricing: await ensureMedia('floxript-pricing.png', 'FloXript pricing'),
  teamify: await ensureMedia('teamify.png', 'Teamify HRM dashboard'),
  hrmMobile: await ensureMedia('hrm-mobile.jpeg', 'HRM mobile dashboard'),
  oncocura: await ensureMedia('oncocura.png', 'OncoCura homepage'),
  exoplanetarium: await ensureMedia('exoplanetarium.png', 'ExoPlanetarium login'),
}

async function upsertBySlug(collection: 'skill-categories' | 'experience-categories' | 'project-categories', data: Record<string, unknown>) {
  const existing = await payload.find({ collection, limit: 1, where: { slug: { equals: data.slug } } })
  if (existing.docs[0]) return payload.update({ collection, id: existing.docs[0].id, data: data as never })
  return payload.create({ collection, data: data as never })
}

const skillCategories = new Map<string, number>()
for (const item of skillCategorySeeds) {
  const doc = await upsertBySlug('skill-categories', item)
  skillCategories.set(item.slug, doc.id)
}

const skills = new Map<string, number>()
for (const item of skillSeeds) {
  const existing = await payload.find({ collection: 'skills', limit: 1, where: { name: { equals: item.name } } })
  const data = { ...item, category: skillCategories.get(item.category) }
  const doc = existing.docs[0]
    ? await payload.update({ collection: 'skills', id: existing.docs[0].id, data: data as never })
    : await payload.create({ collection: 'skills', data: data as never })
  skills.set(item.name, doc.id)
}

const experienceCategories = new Map<string, number>()
for (const item of experienceCategorySeeds) {
  const doc = await upsertBySlug('experience-categories', item)
  experienceCategories.set(item.slug, doc.id)
}

const companyMedia: Record<string, number> = {
  'Appearls Technologies': media.appearls.id,
  'Bano Qabil (Alkhidmat)': media.banoqabil.id,
  'SolCoders Pvt Ltd': media.solcoders.id,
  'NED University of Engineering & Technology': media.ned.id,
  'Teknofest Pakistan': media.teknofest.id,
}

for (const item of experienceSeeds) {
  const existing = await payload.find({ collection: 'experiences', limit: 1, where: { and: [{ title: { equals: item.title } }, { company: { equals: item.company } }] } })
  const data = {
    ...item,
    achievements: item.achievements.map((text) => ({ text })),
    category: experienceCategories.get(item.category),
    logo: companyMedia[item.company],
    technologies: item.technologies.map((name) => skills.get(name)).filter(Boolean),
  }
  if (existing.docs[0]) await payload.update({ collection: 'experiences', id: existing.docs[0].id, data: data as never })
  else await payload.create({ collection: 'experiences', data: data as never })
}

const projectCategories = new Map<string, number>()
for (const item of projectCategorySeeds) {
  const doc = await upsertBySlug('project-categories', item)
  projectCategories.set(item.slug, doc.id)
}

const projectMedia: Record<string, { hero: number; screenshots?: { image: number; caption: string }[] }> = {
  floxript: { hero: media.floxriptDashboard.id, screenshots: [{ image: media.floxriptDashboard.id, caption: 'User Dashboard — track tutorial generation and manage repositories' }, { image: media.floxriptTutorial.id, caption: 'Generated interactive tutorial experience' }, { image: media.floxriptPricing.id, caption: 'Flexible plans for individual developers and teams' }] },
  'hrm-system-teamify': { hero: media.teamify.id },
  'hrm-mobile-application': { hero: media.hrmMobile.id },
  oncocura: { hero: media.oncocura.id },
  exoplanetarium: { hero: media.exoplanetarium.id },
}

const projects = new Map<string, number>()
for (const item of projectSeeds) {
  const existing = await payload.find({ collection: 'portfolio-projects', limit: 1, where: { slug: { equals: item.slug } } })
  const visuals = projectMedia[item.slug]
  const data = {
    ...item,
    category: projectCategories.get(item.category),
    caseStudy: { overview: item.overview, technicalImplementation: item.technicalImplementation, impact: item.impact },
    contributors: item.contributors || [],
    externalLinks: item.externalLinks || [],
    features: item.features.map((text) => ({ text })),
    heroMedia: visuals?.hero,
    screenshots: visuals?.screenshots || [],
    technologies: item.technologies.map((name) => skills.get(name)).filter(Boolean),
  }
  const doc = existing.docs[0]
    ? await payload.update({ collection: 'portfolio-projects', id: existing.docs[0].id, data: data as never })
    : await payload.create({ collection: 'portfolio-projects', data: data as never })
  projects.set(item.slug, doc.id)
}

await payload.update({ collection: 'portfolio-projects', id: projects.get('floxript')!, data: { relatedProjects: ['oncocura', 'exoplanetarium', 'hrm-system-teamify'].map((slug) => projects.get(slug)).filter(Boolean) } })

for (const item of achievementSeeds) {
  const existing = await payload.find({ collection: 'achievements', limit: 1, where: { title: { equals: item.title } } })
  if (existing.docs[0]) await payload.update({ collection: 'achievements', id: existing.docs[0].id, data: item as never })
  else await payload.create({ collection: 'achievements', data: item as never })
}

await payload.updateGlobal({
  slug: 'portfolio',
  data: {
    ...portfolioSeed,
    identity: { ...portfolioSeed.identity, profileImage: media.profile.id, resume: media.resume.id },
    hero: { ...portfolioSeed.hero, featuredSkills: ['Node.js', 'Python', 'React.js', 'TypeScript', 'PostgreSQL', 'AWS'].map((name) => skills.get(name)).filter(Boolean) },
    seo: { ...portfolioSeed.seo, ogImage: media.profile.id },
  } as never,
})

payload.logger.info('Portfolio content seeded successfully.')
process.exit(0)
