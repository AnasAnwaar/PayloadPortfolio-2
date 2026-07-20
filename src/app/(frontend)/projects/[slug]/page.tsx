import configPromise from '@payload-config'
import { ArrowLeft, CheckCircle2, ExternalLink, Github, Linkedin } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { PortfolioHeader } from '@/components/portfolio/PortfolioHome'
import { portfolioSeed } from '@/data/portfolioDefaults'
import type { Media, PortfolioProject, ProjectCategory } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

const mediaURL = (value?: Media | number | null) => typeof value === 'object' && value?.url ? value.url : undefined
const categoryTitle = (value: number | ProjectCategory) => typeof value === 'object' ? value.title : 'Project'

async function getProject(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'portfolio-projects', depth: 2, limit: 1, where: { slug: { equals: slug } } })
  return result.docs[0]
}

export default async function ProjectDetailPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const [project, portfolio] = await Promise.all([getProject(slug), payload.findGlobal({ slug: 'portfolio', depth: 2 })])
  if (!project) notFound()
  const content = portfolio?.identity?.name ? portfolio : portfolioSeed
  const hero = mediaURL(project.heroMedia)

  return (
    <main className="min-h-screen bg-[#020214] text-slate-100">
      <PortfolioHeader content={content} />
      <article className="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
        <Link className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400" href="/#projects"><ArrowLeft size={16} /> Back to Portfolio</Link>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm"><span className="rounded-full bg-violet-500/20 px-3 py-1 font-bold text-violet-300">{categoryTitle(project.category)}</span><span className="text-slate-500">{project.dateRange}</span></div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">{project.title}</h1>
        <p className="mt-4 text-lg text-slate-400 md:text-xl">{project.tagline || project.shortDescription}</p>
        <div className="mt-7 flex flex-wrap gap-2">{project.technologies?.map((skill) => typeof skill === 'object' && <span className="rounded-full border border-white/10 bg-[#24241e] px-3 py-1.5 text-sm font-medium" key={skill.id}>{skill.name}</span>)}</div>
        <div className="mt-8 flex flex-wrap gap-3">{project.externalLinks?.map((link) => <a className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold transition hover:border-cyan-400/40 hover:text-cyan-300" href={link.url} key={link.id || link.url} rel="noreferrer" target="_blank">{link.label.toLowerCase().includes('source') ? <Github size={18} /> : <ExternalLink size={18} />}{link.label}</a>)}</div>

        <div className="mt-20 overflow-hidden rounded-2xl border border-white/15 bg-[#0a0f19]">{hero ? <Image alt={project.title} className="aspect-[16/9] w-full object-cover" height={900} priority src={hero} unoptimized width={1600} /> : <div className="grid aspect-[16/9] place-items-center bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-7xl font-black text-white/10">{project.title.slice(0, 2)}</div>}</div>

        {project.externalLinks && project.externalLinks.length > 0 && <section className="mt-8 rounded-2xl border border-cyan-300/15 bg-[#0b1e2e] p-6"><h2 className="flex items-center gap-2 font-bold"><ExternalLink size={18} /> Project Links</h2><div className="mt-4 flex flex-wrap gap-3">{project.externalLinks.map((link) => <a className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm" href={link.url} key={link.id || link.url} target="_blank"><b className="block">{link.label}</b><span className="text-xs text-slate-400">{link.note || link.url}</span></a>)}</div></section>}

        <div className="mt-12 space-y-10">
          {project.caseStudy?.overview && <CaseStudySection heading="Project Overview" text={project.caseStudy.overview} />}
          {project.caseStudy?.technicalImplementation && <CaseStudySection heading="Technical Implementation" text={project.caseStudy.technicalImplementation} />}
          {!!project.features?.length && <section><h2 className="text-2xl font-bold text-white">Key Features</h2><ul className="mt-5 space-y-3">{project.features.map((feature) => <li className="flex gap-3 text-slate-300" key={feature.id || feature.text}><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={18} />{feature.text}</li>)}</ul></section>}
          {project.caseStudy?.impact && <CaseStudySection heading="Impact & Results" text={project.caseStudy.impact} />}
        </div>

        {!!project.screenshots?.length && <section className="mt-20"><div className="text-center"><h2 className="text-3xl font-bold">Project Screenshots</h2><p className="mt-3 text-slate-400">A visual walkthrough of the application&apos;s key screens and features</p></div><div className="mt-9 space-y-8">{project.screenshots.map((screenshot, index) => { const image = mediaURL(screenshot.image); return <figure key={screenshot.id || index}>{image && <Image alt={screenshot.caption || `${project.title} screenshot`} className="h-auto w-full rounded-2xl border border-white/15 bg-[#0a0f19]" height={900} src={image} unoptimized width={1600} />}<figcaption className="mt-3 text-center text-sm text-slate-400">{screenshot.caption}</figcaption></figure> })}</div></section>}

        {!!project.contributors?.length && <section className="mt-20"><h2 className="text-2xl font-bold">Contributors & Team</h2><div className="mt-6 flex flex-wrap gap-4">{project.contributors.map((person) => <div className="min-w-64 rounded-2xl border border-cyan-300/15 bg-[#0b1e2e] p-5" key={person.id || person.name}><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-slate-600 font-bold">{person.name.charAt(0)}</span><div><b>{person.name}</b><span className="block text-xs text-slate-400">{person.role}</span></div></div><p className="mt-4 text-xs text-slate-500">{person.type}</p>{person.linkedIn && <a className="mt-2 inline-flex items-center gap-2 text-sm text-cyan-400" href={person.linkedIn} target="_blank"><Linkedin size={15} /> LinkedIn</a>}</div>)}</div></section>}

        {!!project.relatedProjects?.length && <section className="mt-20"><h2 className="text-2xl font-bold">Related Projects</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{project.relatedProjects.map((related) => typeof related === 'object' && <RelatedProject project={related} key={related.id} />)}</div></section>}
      </article>
      <section className="mt-8 border-t border-white/10 px-5 py-14 text-center"><p className="text-slate-400">Want to discuss this project or work together?</p><Link className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-[#020214]" href="/#contact">Get in Touch</Link></section>
    </main>
  )
}

function CaseStudySection({ heading, text }: { heading: string; text: string }) {
  return <section><h2 className="text-2xl font-bold text-white">{heading}</h2><p className="mt-4 whitespace-pre-line leading-8 text-slate-300">{text}</p></section>
}

function RelatedProject({ project }: { project: PortfolioProject }) {
  return <Link className="rounded-2xl border border-cyan-300/15 bg-[#0b1e2e] p-5 transition hover:border-cyan-400/40" href={`/projects/${project.slug}`}><span className="text-xs font-bold text-violet-300">{categoryTitle(project.category)}</span><h3 className="mt-3 font-bold">{project.title}</h3><p className="mt-2 line-clamp-2 text-sm text-slate-400">{project.shortDescription}</p></Link>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  return project ? { title: `${project.title} | Portfolio`, description: project.shortDescription } : {}
}
