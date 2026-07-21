'use client'

import type { Achievement, Experience, ExperienceCategory, Media, Portfolio, PortfolioProject, ProjectCategory, Skill, SkillCategory } from '@/payload-types'
import {
  ArrowUp, Award, BrainCircuit, BriefcaseBusiness, CalendarDays, CheckCircle2, ChevronDown,
  Code2, Database, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, MessageSquare,
  Phone, Send, Server, Shield, ShoppingBag, Smartphone, Trophy, Users, Wrench, X,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { FormEvent, memo, useEffect, useMemo, useState } from 'react'

import { Reveal } from './Reveal'
import { ThemeToggle } from './ThemeToggle'

// WebGL is client-only and ~150KB, so it loads after paint and never blocks the hero copy.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

type Seed = typeof import('@/data/portfolioDefaults').portfolioSeed

type Props = {
  achievements: Achievement[]
  experienceCategories: ExperienceCategory[]
  experiences: Experience[]
  fallback: Seed
  portfolio: Portfolio
  projectCategories: ProjectCategory[]
  projects: PortfolioProject[]
  skillCategories: SkillCategory[]
  skills: Skill[]
}

const iconMap = { BrainCircuit, Code2, Database, Server, Shield, ShoppingBag, Smartphone, Users, Wrench }
const mediaURL = (value?: Media | number | null) => typeof value === 'object' && value?.url ? value.url : undefined
const relationTitle = <T extends { title: string }>(value: number | T) => typeof value === 'object' ? value.title : ''
const categorySlug = <T extends { slug: string }>(value: number | T) => typeof value === 'object' ? value.slug : ''

const TYPE_MS = 85
const ERASE_MS = 40
const HOLD_MS = 1700

// Own component so a character tick re-renders this line only, never the rest of the page.
const Typewriter = memo(function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [erasing, setErasing] = useState(false)
  const current = phrases.length ? phrases[index % phrases.length] : ''

  useEffect(() => {
    if (!current) return
    if (!erasing && count === current.length) {
      const timer = setTimeout(() => setErasing(true), HOLD_MS)
      return () => clearTimeout(timer)
    }
    if (erasing && count === 0) {
      setErasing(false)
      setIndex((value) => value + 1)
      return
    }
    const timer = setTimeout(() => setCount((value) => value + (erasing ? -1 : 1)), erasing ? ERASE_MS : TYPE_MS)
    return () => clearTimeout(timer)
  }, [count, current, erasing])

  return (
    <p aria-label={phrases.join(', ')} className="mt-6 flex min-h-[2rem] items-center justify-center text-xl font-semibold text-ink sm:min-h-[2.25rem] sm:text-2xl">
      <span aria-hidden>{current.slice(0, count)}</span>
      <span aria-hidden className="ml-1 h-[1.15em] w-0.5 animate-pulse bg-mint" />
    </p>
  )
})

const SectionHeading = ({ description, heading }: { description: string; heading: string }) => (
  <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
    <span className="mx-auto mb-5 block h-1 w-16 rounded-full bg-gradient-to-r from-mint to-mint-bright" />
    <h2 className="text-3xl font-black tracking-tighter text-ink md:text-5xl">{heading}</h2>
    <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{description}</p>
  </Reveal>
)

export function PortfolioHeader({ content }: { content: Portfolio | Seed }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const identity = content.identity as Portfolio['identity']
  const resumeURL = mediaURL(identity.resume)
  const navigation = content.navigation || []
  // Section anchors live on the home page, so from /projects/[slug] they need to
  // navigate home first rather than resolving against the current URL.
  const sectionHref = (href: string) => (href.startsWith('#') && pathname !== '/' ? `/${href}` : href)
  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-brand/95 text-brand-fg shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <a className="flex items-center gap-3" href={sectionHref('#home')}>
          <span className="grid size-12 place-items-center rounded-2xl bg-brand-fg text-xl font-bold text-brand shadow-sm">{content.identity.initials}</span>
          <span><b className="block text-brand-fg">{content.identity.name}</b><small className="text-brand-muted">{content.identity.professionalTitle}</small></span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => <a className="rounded-lg px-4 py-2 text-sm text-brand-muted transition hover:bg-brand-fg/12 hover:text-brand-fg" href={sectionHref(item.href)} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {(content.contact.socialLinks || []).map((link) => <a aria-label={link.label} className="text-brand-muted transition hover:text-brand-fg" href={link.url} key={link.label} rel="noreferrer" target="_blank">{link.label.toLowerCase().includes('github') ? <Github size={19} /> : <Linkedin size={19} />}</a>)}
          <ThemeToggle />
          <a className="inline-flex items-center gap-2 rounded-xl bg-brand-fg px-5 py-2.5 text-sm font-bold text-brand transition hover:opacity-90" href={resumeURL || sectionHref('#contact')}><Download size={16} /> Resume</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button aria-label="Toggle navigation" className="rounded-lg border border-brand-fg/25 p-2 text-brand-fg" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="border-t border-brand-line bg-brand px-5 py-4 lg:hidden">{navigation.map((item) => <a className="block rounded-lg px-4 py-3 text-brand-muted hover:bg-brand-fg/10 hover:text-brand-fg" href={sectionHref(item.href)} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}</nav>}
    </header>
  )
}

export function PortfolioHome(props: Props) {
  const content = props.portfolio?.identity?.name ? props.portfolio : props.fallback
  const skills = props.skills
  const [experienceFilter, setExperienceFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)
  const filteredExperiences = useMemo(() => experienceFilter === 'all' ? props.experiences : props.experiences.filter((item) => categorySlug(item.category) === experienceFilter), [experienceFilter, props.experiences])
  const filteredProjects = useMemo(() => projectFilter === 'all' ? props.projects : props.projects.filter((item) => categorySlug(item.category) === projectFilter), [projectFilter, props.projects])
  const identity = content.identity as Portfolio['identity']
  const profileImage = mediaURL(identity.profileImage)
  const resumeURL = mediaURL(identity.resume)
  const taglines = useMemo(() => {
    const items = (content.hero.taglines || []).map((item) => item.text).filter(Boolean)
    return items.length ? items : props.fallback.hero.taglines.map((item) => item.text)
  }, [content.hero.taglines, props.fallback.hero.taglines])
  const featuredSkills = 'featuredSkills' in content.hero ? content.hero.featuredSkills : []
  const aboutInfo = [
    { Icon: MapPin, label: 'Location', value: content.about.location },
    { Icon: Mail, label: 'Email', value: content.about.email },
    { Icon: Phone, label: 'Phone', value: content.about.phone },
  ]
  const contactInfo = [
    { Icon: Mail, label: 'Email', value: content.contact.email },
    { Icon: Phone, label: 'Phone', value: content.contact.phone },
    { Icon: MapPin, label: 'Location', value: content.contact.location },
  ]

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('email')}`)
    window.location.href = `mailto:${content.contact.email || ''}?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen overflow-hidden bg-page text-ink">
      <PortfolioHeader content={content} />

      <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-5 py-24 text-center" id="home">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,var(--p-glow),transparent_26rem)]" />
        <HeroCanvas />
        {/* Scrim: keeps the canvas readable behind the headline. Stepped alpha
            stops rather than one solid stop, which would band visibly. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_45%,var(--p-scrim-strong)_0%,var(--p-scrim-mid)_45%,var(--p-scrim-none)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-page" />
        <div className="relative mx-auto max-w-5xl">
          {content.hero.availability && <div className="glass mb-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-mint" /></span>{content.hero.availability}</div>}
          <h1 className="text-5xl font-black leading-[1.05] tracking-tighter text-ink sm:text-7xl lg:text-8xl">{content.hero.eyebrow} <span className="text-gradient">{content.hero.headline}</span></h1>
          <Typewriter phrases={taglines} />
          <div className="mt-6 flex flex-wrap justify-center gap-2">{(content.hero.roles || []).map((item) => <span className="glass rounded-full border border-line px-4 py-2 text-sm text-ink" key={item.role}>{item.role}</span>)}</div>
          <div className="mt-10 flex flex-wrap justify-center gap-4"><a className="glow rounded-xl bg-mint px-7 py-3.5 font-bold text-page transition duration-300 hover:-translate-y-1 hover:bg-mint-deep" href="#projects">{content.hero.primaryButtonLabel}</a><a className="glass rounded-xl border border-line px-7 py-3.5 font-bold transition duration-300 hover:-translate-y-1 hover:border-mint hover:text-mint" href="#contact">{content.hero.secondaryButtonLabel}</a></div>
          <p className="mt-14 text-sm text-ink-soft">{content.hero.techLabel}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">{(featuredSkills || []).map((skill: number | Skill) => typeof skill === 'object' && <span className="rounded-lg border border-line bg-raised px-4 py-2 text-sm font-medium" key={skill.id}>{skill.name}</span>)}</div>
        </div>
      </section>

      <section className="scroll-mt-24 px-5 py-24" id="about">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading description={content.about.description} heading={content.about.heading} />
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-24">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-5 rotate-3 rounded-3xl bg-line" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-raised to-line">{profileImage ? <Image alt={content.identity.name} className="object-cover" fill priority sizes="(max-width: 1024px) 28rem, 36vw" src={profileImage} unoptimized /> : <div className="grid size-full place-items-center text-8xl font-bold text-ink">{content.identity.initials}</div>}</div>
                <span className="absolute -bottom-3 -right-4 rounded-2xl border border-line bg-raised px-6 py-4 shadow-md text-center text-2xl font-bold"><small className="block text-xs font-normal text-ink-soft">Experience</small>{content.about.experienceBadge}</span>
              </div>
            </div>
            <div className="space-y-5 text-base leading-8 text-ink md:text-lg">{(content.about.paragraphs || []).map((paragraph, index) => <p key={index}>{paragraph.text}</p>)}<div className="flex flex-wrap gap-4 pt-4"><a className="glow inline-flex items-center gap-2 rounded-xl bg-mint px-6 py-3 font-bold text-page transition duration-300 hover:-translate-y-1 hover:bg-mint-deep" href={resumeURL || '#contact'} {...(resumeURL ? { download: true, target: '_blank' } : {})}><Download size={18} /> Download Resume</a><a className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised px-6 py-3 font-bold transition duration-300 hover:-translate-y-1 hover:border-mint hover:text-mint" href={content.contact.socialLinks?.[0]?.url || '#'} rel="noreferrer" target="_blank">LinkedIn Profile <ExternalLink size={16} /></a></div></div>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">{aboutInfo.map(({ Icon, label, value }) => <div className="flex items-center gap-4 rounded-2xl border border-line bg-raised p-5 transition hover:border-mint/50" key={label}><span className="shrink-0 rounded-xl bg-mint-soft p-3 text-mint"><Icon size={21} /></span><span className="min-w-0"><small className="block text-sm text-ink-soft">{label}</small><b className="block break-words text-ink">{value || ''}</b></span></div>)}</div>
          <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">{(content.about.stats || []).map((stat) => <div className="rounded-2xl border border-line bg-raised p-7 text-center" key={stat.label}><b className="text-4xl text-mint md:text-5xl">{stat.value}</b><span className="mt-2 block text-sm text-ink-soft">{stat.label}</span></div>)}</div>
        </div>
      </section>

      <section className="scroll-mt-24 px-5 py-24" id="experience">
        <div className="mx-auto max-w-5xl"><SectionHeading {...content.experienceSection} />
          <div className="mb-10 flex flex-wrap justify-center gap-2"><button className={`rounded-full px-5 py-2 text-sm transition duration-300 hover:-translate-y-0.5 ${experienceFilter === 'all' ? 'glow scale-105 bg-mint font-bold text-page' : 'bg-raised text-ink-soft hover:text-ink'}`} onClick={() => setExperienceFilter('all')}>All Experience</button>{props.experienceCategories.map((category) => <button className={`rounded-full px-5 py-2 text-sm transition duration-300 hover:-translate-y-0.5 ${experienceFilter === category.slug ? 'glow scale-105 bg-mint font-bold text-page' : 'bg-raised text-ink-soft hover:text-ink'}`} key={category.id} onClick={() => setExperienceFilter(category.slug)}>{category.title}</button>)}</div>
          <div className="swap-in relative space-y-6 before:absolute before:bottom-8 before:left-3 before:top-8 before:w-px before:bg-line-strong md:before:left-5" key={experienceFilter}>{filteredExperiences.map((experience) => { const expanded = expandedExperience === experience.id; return <article className="relative ml-10 rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl md:ml-16" key={experience.id}><span className="absolute -left-[2.7rem] top-8 size-3 rounded-full bg-mint ring-4 ring-mint/15 md:-left-[3.25rem]" /><div className="flex flex-col justify-between gap-4 md:flex-row"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-mint-soft text-mint"><BriefcaseBusiness /></span><div><h3 className="text-xl font-bold">{experience.title}</h3><p className="font-medium text-ink">{experience.company}</p></div></div><span className="self-start rounded-full bg-mint-soft px-3 py-1 text-xs font-bold text-mint">{experience.employmentType}</span></div><div className="mt-5 flex flex-wrap gap-4 text-sm text-ink-soft"><span className="inline-flex gap-2"><CalendarDays size={16} />{experience.period}</span><span className="inline-flex gap-2"><MapPin size={16} />{experience.location}</span></div><p className="mt-5 text-ink">{experience.summary}</p><button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink" onClick={() => setExpandedExperience(expanded ? null : experience.id)}>Show {expanded ? 'less' : 'more'} <ChevronDown className={expanded ? 'rotate-180' : ''} size={16} /></button>{expanded && <div className="mt-5 border-t border-line pt-5"><h4 className="font-bold">Key Achievements</h4><ul className="mt-3 space-y-2 text-sm text-ink">{experience.achievements?.map((item) => <li className="flex gap-2" key={item.id || item.text}><CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={16} />{item.text}</li>)}</ul><div className="mt-5 flex flex-wrap gap-2">{experience.technologies?.map((skill) => typeof skill === 'object' && <span className="rounded-full bg-raised px-3 py-1 text-xs" key={skill.id}>{skill.name}</span>)}</div></div>}</article> })}</div>
        </div>
      </section>

      <section className="scroll-mt-24 px-5 py-24" id="skills"><div className="mx-auto max-w-[1280px]"><SectionHeading {...content.skillsSection} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{skills.filter((skill) => skill.featured).map((skill) => { const Icon = iconMap[(skill.icon || 'Code2') as keyof typeof iconMap] || Code2; return <article className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl" key={skill.id}><div className="flex items-start justify-between"><div className="flex gap-4"><span className="rounded-xl bg-mint-soft p-3 text-mint"><Icon /></span><div><h3 className="text-lg font-bold">{skill.name}</h3><p className="text-sm text-ink-soft">{skill.years}</p></div></div><span className="rounded-full border border-line px-3 py-1 text-xs capitalize">{skill.level}</span></div><p className="mt-5 text-sm leading-6 text-ink-soft">{skill.description}</p></article> })}</div>
        <h3 className="mb-8 mt-16 text-center text-2xl font-bold">All Skills by Category</h3><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{props.skillCategories.map((category) => { const categorySkills = skills.filter((skill) => typeof skill.category === 'object' && skill.category.id === category.id); const Icon = iconMap[(category.icon || 'Code2') as keyof typeof iconMap] || Code2; return <article className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl" key={category.id}><div className="flex items-center gap-4"><span className="rounded-xl bg-mint-soft p-3 text-mint"><Icon /></span><div><h4 className="text-lg font-bold">{category.title}</h4><span className="text-sm text-ink-soft">{categorySkills.length} skills</span></div></div><div className="mt-5 flex flex-wrap gap-2">{categorySkills.map((skill) => <span className="rounded-full border border-line bg-line px-3 py-1.5 text-sm font-medium text-ink" key={skill.id}>{skill.name}</span>)}</div></article> })}</div>
      </div></section>

      <section className="scroll-mt-24 px-5 py-24" id="projects"><div className="mx-auto max-w-[1280px]"><SectionHeading {...content.projectsSection} />
        <div className="mb-10 flex flex-wrap justify-center gap-2"><button className={`rounded-full px-5 py-2 text-sm transition duration-300 hover:-translate-y-0.5 ${projectFilter === 'all' ? 'glow scale-105 bg-mint font-bold text-page' : 'bg-raised text-ink-soft hover:text-ink'}`} onClick={() => setProjectFilter('all')}>All Projects</button>{props.projectCategories.map((category) => <button className={`rounded-full px-5 py-2 text-sm transition duration-300 hover:-translate-y-0.5 ${projectFilter === category.slug ? 'glow scale-105 bg-mint font-bold text-page' : 'bg-raised text-ink-soft hover:text-ink'}`} key={category.id} onClick={() => setProjectFilter(category.slug)}>{category.title}</button>)}</div>
        <div className="swap-in grid gap-6 md:grid-cols-2" key={projectFilter}>{filteredProjects.map((project) => <Link className="group overflow-hidden rounded-2xl border border-line bg-raised shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-mint" href={`/projects/${project.slug}`} key={project.id}><div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-raised to-line">{mediaURL(project.heroMedia) ? <Image alt={project.title} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 50vw" src={mediaURL(project.heroMedia)!} unoptimized /> : <div className="grid size-full place-items-center text-5xl font-black text-line">{project.title.slice(0, 2)}</div>}<span className="absolute left-4 top-4 rounded-full bg-page/90 px-3 py-1 text-xs font-bold text-mint backdrop-blur">{relationTitle(project.category)}</span>{project.featured && <span className="absolute right-4 top-4 rounded-full bg-mint px-3 py-1 text-xs font-bold text-page">Featured</span>}</div><div className="p-6"><h3 className="text-xl font-bold transition group-hover:text-ink-soft">{project.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-soft">{project.shortDescription}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies?.slice(0, 4).map((skill) => typeof skill === 'object' && <span className="rounded-full bg-raised px-3 py-1 text-xs" key={skill.id}>{skill.name}</span>)}</div><div className="mt-6 flex items-center justify-between text-sm"><span className="text-ink-soft">{project.dateRange}</span><span className="font-bold text-mint">View Details →</span></div></div></Link>)}</div>
      </div></section>

      <section className="scroll-mt-24 px-5 py-24" id="achievements"><div className="mx-auto max-w-[1280px]"><SectionHeading {...content.achievementsSection} />
        <h3 className="mb-7 flex items-center gap-3 text-2xl font-bold"><Trophy className="text-mint" /> Competition Wins & Highlights</h3><div className="grid gap-6 md:grid-cols-2">{props.achievements.filter((item) => item.kind === 'highlight').map((item, index) => <article className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl" key={item.id}><div className="flex gap-4"><span className={`grid size-12 shrink-0 place-items-center rounded-xl ${index < 2 ? 'bg-mint text-page' : 'bg-mint-soft text-mint'}`}>{index < 2 ? <Trophy /> : <Award />}</span><div className="min-w-0"><div className="flex flex-wrap items-start justify-between gap-2"><h4 className="text-lg font-bold">{item.title}</h4><span className="rounded-full border border-line px-2 py-1 text-xs">{item.badge}</span></div><p className="mt-2 font-medium text-ink">{item.issuer}</p><p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p><p className="mt-3 text-xs text-ink-soft">{item.date}</p></div></div></article>)}</div>
        <h3 className="mb-7 mt-14 flex items-center gap-3 text-2xl font-bold"><Award /> Certifications & Courses</h3><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{props.achievements.filter((item) => item.kind === 'certification').map((item) => <article className="flex items-center gap-3 rounded-xl border border-line bg-raised p-4 transition hover:border-mint/50" key={item.id}><Award className="shrink-0 text-mint" size={20} /><div className="min-w-0"><b className="block truncate text-sm">{item.title}</b><span className="text-xs text-ink-soft">{item.issuer}</span></div></article>)}</div>
        <div className="mt-16 grid grid-cols-2 rounded-2xl border border-line bg-raised p-7 shadow-sm lg:grid-cols-4">{(content.achievementStats || []).map((stat) => <div className="p-4 text-center" key={stat.label}><b className="text-4xl text-mint">{stat.value}</b><span className="mt-2 block text-sm text-ink-soft">{stat.label}</span></div>)}</div>
      </div></section>

      <section className="scroll-mt-24 px-5 py-24" id="contact"><div className="mx-auto max-w-[1280px]"><SectionHeading description={content.contact.description} heading={content.contact.heading} /><div className="grid items-start gap-8 lg:grid-cols-2">
        <form className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl md:p-8" onSubmit={submitContact}><div className="flex items-center gap-4"><span className="rounded-xl bg-mint p-3 text-page"><MessageSquare /></span><div><h3 className="text-xl font-bold">{content.contact.formHeading}</h3><p className="text-sm text-ink-soft">{content.contact.responseNote}</p></div></div><label className="mt-7 block text-sm font-medium">Your Name<input className="mt-2 w-full rounded-xl border border-line bg-page px-4 py-3.5 text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-mint focus:ring-2 focus:ring-mint/20" name="name" placeholder="John Doe" required /></label><label className="mt-5 block text-sm font-medium">Email Address<input className="mt-2 w-full rounded-xl border border-line bg-page px-4 py-3.5 text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-mint focus:ring-2 focus:ring-mint/20" name="email" placeholder="john@example.com" required type="email" /></label><label className="mt-5 block text-sm font-medium">Your Message<textarea className="mt-2 min-h-36 w-full rounded-xl border border-line bg-page px-4 py-3.5 text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-mint focus:ring-2 focus:ring-mint/20" name="message" placeholder="Tell me about your project or just say hello..." required /></label><button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint py-3.5 font-bold text-page" type="submit"><Send size={18} /> Send Message</button></form>
        <div className="space-y-6"><div className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl"><h3 className="text-xl font-bold">Contact Information</h3><div className="mt-5 space-y-4">{contactInfo.map(({ Icon, label, value }) => <div className="flex items-center gap-4 rounded-xl bg-page p-4" key={label}><Icon className="text-mint" /><span><small className="block text-ink-soft">{label}</small><b>{value || ''}</b></span></div>)}</div></div><div className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl"><h3 className="text-xl font-bold">Connect With Me</h3><div className="mt-5 grid grid-cols-2 gap-4">{(content.contact.socialLinks || []).map((link) => <a className="flex items-center gap-3 rounded-xl border border-line bg-page p-4 font-bold transition hover:border-mint hover:text-mint" href={link.url} key={link.label} target="_blank">{link.label.toLowerCase().includes('github') ? <Github /> : <Linkedin />}{link.label}</a>)}</div></div><div className="rounded-2xl border border-line bg-raised p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-xl"><h3 className="flex items-center gap-2 text-xl font-bold"><span className="size-3 rounded-full bg-mint" />{content.contact.availabilityHeading}</h3><p className="mt-4 text-ink-soft">{content.contact.availabilityText}</p><div className="mt-4 flex flex-wrap gap-2">{content.contact.availabilityTags?.map((tag) => <span className="rounded-full bg-line px-3 py-1 text-xs text-ink" key={tag.label}>{tag.label}</span>)}</div></div></div>
      </div></div></section>

      <footer className="footer-aurora relative overflow-hidden border-t border-brand-line bg-brand px-5 py-12 text-brand-fg"><div className="relative mx-auto grid max-w-[1280px] gap-8 md:grid-cols-3"><div><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-brand-fg font-bold text-brand">{content.identity.initials}</span><b>{content.identity.name}</b></div><p className="mt-4 max-w-sm text-sm leading-6 text-brand-muted">{content.footer?.description}</p></div><div><h4 className="font-bold">Quick Links</h4><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-brand-muted">{(content.navigation || []).slice(1).map((item) => <a className="link-underline w-fit transition hover:text-brand-fg" href={item.href} key={item.href}>{item.label}</a>)}</div></div><div><h4 className="font-bold">Contact</h4><div className="mt-4 space-y-2 text-sm text-brand-muted"><p>{content.contact.email}</p><p>{content.contact.phone}</p><p>{content.contact.location}</p></div></div></div><p className="relative mx-auto mt-10 max-w-[1280px] border-t border-brand-fg/15 pt-6 text-xs text-brand-muted">{content.footer?.copyright}</p></footer>
      <a aria-label="Back to top" className="glow fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-xl bg-mint text-page transition hover:-translate-y-1" href="#home"><ArrowUp size={20} /></a>
    </main>
  )
}
