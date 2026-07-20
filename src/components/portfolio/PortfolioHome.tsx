'use client'

import type { Achievement, Experience, ExperienceCategory, Media, Portfolio, PortfolioProject, ProjectCategory, Skill, SkillCategory } from '@/payload-types'
import {
  ArrowUp, Award, BrainCircuit, BriefcaseBusiness, CalendarDays, CheckCircle2, ChevronDown,
  Code2, Database, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, MessageSquare,
  Phone, Send, Server, Shield, ShoppingBag, Smartphone, Trophy, Users, Wrench, X,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FormEvent, useMemo, useState } from 'react'

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

const SectionHeading = ({ description, heading }: { description: string; heading: string }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{heading}</h2>
    <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>
  </div>
)

export function PortfolioHeader({ content }: { content: Portfolio | Seed }) {
  const [open, setOpen] = useState(false)
  const identity = content.identity as Portfolio['identity']
  const resumeURL = mediaURL(identity.resume)
  const navigation = content.navigation || []
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020214]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <a className="flex items-center gap-3" href="#home">
          <span className="grid size-12 place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-xl font-bold text-cyan-400">{content.identity.initials}</span>
          <span><b className="block text-white">{content.identity.name}</b><small className="text-slate-400">{content.identity.professionalTitle}</small></span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => <a className="rounded-lg px-4 py-2 text-sm text-slate-200 transition hover:bg-cyan-400/10 hover:text-cyan-400" href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {(content.contact.socialLinks || []).map((link) => <a aria-label={link.label} className="text-slate-400 transition hover:text-cyan-400" href={link.url} key={link.label} rel="noreferrer" target="_blank">{link.label.toLowerCase().includes('github') ? <Github size={19} /> : <Linkedin size={19} />}</a>)}
          <a className="ml-2 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-[#020214] transition hover:bg-cyan-300" href={resumeURL || '#contact'}><Download size={16} /> Resume</a>
        </div>
        <button aria-label="Toggle navigation" className="rounded-lg border border-white/10 p-2 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-[#07111f] px-5 py-4 lg:hidden">{navigation.map((item) => <a className="block rounded-lg px-4 py-3 text-slate-200 hover:bg-white/5" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}</nav>}
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
    <main className="min-h-screen overflow-hidden bg-[#020214] text-slate-100">
      <PortfolioHeader content={content} />

      <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-24 text-center" id="home">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(6,182,212,0.12),transparent_32rem)]" />
        <div className="relative mx-auto max-w-5xl">
          {content.hero.availability && <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300"><span className="size-2 animate-pulse rounded-full bg-emerald-400" />{content.hero.availability}</div>}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">{content.hero.eyebrow} <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">{content.hero.headline}</span></h1>
          <div className="mt-6 flex flex-wrap justify-center gap-2">{(content.hero.roles || []).map((item) => <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300" key={item.role}>{item.role}</span>)}</div>
          <div className="mt-10 flex flex-wrap justify-center gap-4"><a className="rounded-xl bg-cyan-500 px-7 py-3.5 font-bold text-[#020214] transition hover:-translate-y-0.5 hover:bg-cyan-300" href="#projects">{content.hero.primaryButtonLabel}</a><a className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-bold transition hover:border-cyan-400/50 hover:text-cyan-300" href="#contact">{content.hero.secondaryButtonLabel}</a></div>
          <p className="mt-14 text-sm text-slate-500">{content.hero.techLabel}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">{(featuredSkills || []).map((skill: number | Skill) => typeof skill === 'object' && <span className="rounded-lg border border-white/10 bg-[#0b1e2e] px-4 py-2 text-sm font-medium" key={skill.id}>{skill.name}</span>)}</div>
        </div>
      </section>

      <section className="scroll-mt-24 px-5 py-24" id="about">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading description={content.about.description} heading={content.about.heading} />
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-5 rotate-3 rounded-3xl bg-violet-500/10" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-cyan-500/20 to-violet-500/20">{profileImage ? <Image alt={content.identity.name} className="object-cover" fill priority sizes="(max-width: 1024px) 28rem, 36vw" src={profileImage} unoptimized /> : <div className="grid size-full place-items-center text-8xl font-bold text-cyan-400">{content.identity.initials}</div>}</div>
                <span className="absolute -bottom-3 -right-4 rounded-2xl border border-cyan-300/20 bg-[#0d2132] px-6 py-4 text-center text-2xl font-bold"><small className="block text-xs font-normal text-slate-400">Experience</small>{content.about.experienceBadge}</span>
              </div>
              <div className="mt-12 space-y-3">{aboutInfo.map(({ Icon, label, value }) => <div className="flex items-center gap-4 rounded-2xl border border-cyan-300/15 bg-[#0b1e2e] p-4" key={label}><span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Icon size={21} /></span><span><small className="block text-slate-400">{label}</small><b>{value || ''}</b></span></div>)}</div>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-300 md:text-lg">{(content.about.paragraphs || []).map((paragraph, index) => <p key={index}>{paragraph.text}</p>)}<div className="flex flex-wrap gap-4 pt-4"><a className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-[#020214]" href="#contact"><Download size={18} /> Download Resume</a><a className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-bold" href={content.contact.socialLinks?.[0]?.url || '#'} target="_blank">LinkedIn Profile <ExternalLink size={16} /></a></div></div>
          </div>
          <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">{(content.about.stats || []).map((stat) => <div className="rounded-2xl border border-white/15 bg-[#0b1e2e] p-7 text-center" key={stat.label}><b className="text-4xl text-white md:text-5xl">{stat.value}</b><span className="mt-2 block text-sm text-slate-400">{stat.label}</span></div>)}</div>
        </div>
      </section>

      <section className="scroll-mt-24 px-5 py-24" id="experience">
        <div className="mx-auto max-w-5xl"><SectionHeading {...content.experienceSection} />
          <div className="mb-10 flex flex-wrap justify-center gap-2"><button className={`rounded-full px-5 py-2 text-sm ${experienceFilter === 'all' ? 'bg-cyan-500 font-bold text-[#020214]' : 'bg-white/5 text-slate-400'}`} onClick={() => setExperienceFilter('all')}>All Experience</button>{props.experienceCategories.map((category) => <button className={`rounded-full px-5 py-2 text-sm ${experienceFilter === category.slug ? 'bg-cyan-500 font-bold text-[#020214]' : 'bg-white/5 text-slate-400'}`} key={category.id} onClick={() => setExperienceFilter(category.slug)}>{category.title}</button>)}</div>
          <div className="relative space-y-6 before:absolute before:bottom-8 before:left-3 before:top-8 before:w-px before:bg-cyan-400/20 md:before:left-5">{filteredExperiences.map((experience) => { const expanded = expandedExperience === experience.id; return <article className="relative ml-10 rounded-2xl border border-cyan-300/15 bg-[#0a2840] p-6 md:ml-16" key={experience.id}><span className="absolute -left-[2.7rem] top-8 size-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,.8)] md:-left-[3.25rem]" /><div className="flex flex-col justify-between gap-4 md:flex-row"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><BriefcaseBusiness /></span><div><h3 className="text-xl font-bold">{experience.title}</h3><p className="font-medium text-cyan-400">{experience.company}</p></div></div><span className="self-start rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">{experience.employmentType}</span></div><div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400"><span className="inline-flex gap-2"><CalendarDays size={16} />{experience.period}</span><span className="inline-flex gap-2"><MapPin size={16} />{experience.location}</span></div><p className="mt-5 text-slate-300">{experience.summary}</p><button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-400" onClick={() => setExpandedExperience(expanded ? null : experience.id)}>Show {expanded ? 'less' : 'more'} <ChevronDown className={expanded ? 'rotate-180' : ''} size={16} /></button>{expanded && <div className="mt-5 border-t border-white/10 pt-5"><h4 className="font-bold">Key Achievements</h4><ul className="mt-3 space-y-2 text-sm text-slate-300">{experience.achievements?.map((item) => <li className="flex gap-2" key={item.id || item.text}><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={16} />{item.text}</li>)}</ul><div className="mt-5 flex flex-wrap gap-2">{experience.technologies?.map((skill) => typeof skill === 'object' && <span className="rounded-full bg-white/5 px-3 py-1 text-xs" key={skill.id}>{skill.name}</span>)}</div></div>}</article> })}</div>
        </div>
      </section>

      <section className="scroll-mt-24 px-5 py-24" id="skills"><div className="mx-auto max-w-[1280px]"><SectionHeading {...content.skillsSection} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{skills.filter((skill) => skill.featured).map((skill) => { const Icon = iconMap[(skill.icon || 'Code2') as keyof typeof iconMap] || Code2; return <article className="rounded-2xl border border-cyan-300/15 bg-[#0d2b3d] p-6" key={skill.id}><div className="flex items-start justify-between"><div className="flex gap-4"><span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Icon /></span><div><h3 className="text-lg font-bold">{skill.name}</h3><p className="text-sm text-slate-400">{skill.years}</p></div></div><span className="rounded-full border border-white/15 px-3 py-1 text-xs capitalize">{skill.level}</span></div><p className="mt-5 text-sm leading-6 text-slate-400">{skill.description}</p></article> })}</div>
        <h3 className="mb-8 mt-16 text-center text-2xl font-bold">All Skills by Category</h3><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{props.skillCategories.map((category) => { const categorySkills = skills.filter((skill) => typeof skill.category === 'object' && skill.category.id === category.id); const Icon = iconMap[(category.icon || 'Code2') as keyof typeof iconMap] || Code2; return <article className="rounded-2xl border border-violet-400/20 bg-[#18163f] p-6" key={category.id}><div className="flex items-center gap-4"><span className="rounded-xl bg-violet-500/20 p-3 text-violet-300"><Icon /></span><div><h4 className="text-lg font-bold">{category.title}</h4><span className="text-sm text-slate-400">{categorySkills.length} skills</span></div></div><div className="mt-5 flex flex-wrap gap-2">{categorySkills.map((skill) => <span className="rounded-full border border-white/10 bg-[#28271f] px-3 py-1.5 text-sm font-medium text-slate-300" key={skill.id}>{skill.name}</span>)}</div></article> })}</div>
      </div></section>

      <section className="scroll-mt-24 px-5 py-24" id="projects"><div className="mx-auto max-w-[1280px]"><SectionHeading {...content.projectsSection} />
        <div className="mb-10 flex flex-wrap justify-center gap-2"><button className={`rounded-full px-5 py-2 text-sm ${projectFilter === 'all' ? 'bg-cyan-500 font-bold text-[#020214]' : 'bg-white/5 text-slate-400'}`} onClick={() => setProjectFilter('all')}>All Projects</button>{props.projectCategories.map((category) => <button className={`rounded-full px-5 py-2 text-sm ${projectFilter === category.slug ? 'bg-cyan-500 font-bold text-[#020214]' : 'bg-white/5 text-slate-400'}`} key={category.id} onClick={() => setProjectFilter(category.slug)}>{category.title}</button>)}</div>
        <div className="grid gap-6 md:grid-cols-2">{filteredProjects.map((project) => <Link className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1e2e] transition hover:-translate-y-1 hover:border-cyan-400/40" href={`/projects/${project.slug}`} key={project.id}><div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-violet-500/20 to-cyan-500/10">{mediaURL(project.heroMedia) ? <Image alt={project.title} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 50vw" src={mediaURL(project.heroMedia)!} unoptimized /> : <div className="grid size-full place-items-center text-5xl font-black text-white/10">{project.title.slice(0, 2)}</div>}<span className="absolute left-4 top-4 rounded-full bg-violet-500/90 px-3 py-1 text-xs font-bold">{relationTitle(project.category)}</span>{project.featured && <span className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-[#020214]">Featured</span>}</div><div className="p-6"><h3 className="text-xl font-bold transition group-hover:text-cyan-300">{project.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{project.shortDescription}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies?.slice(0, 4).map((skill) => typeof skill === 'object' && <span className="rounded-full bg-white/5 px-3 py-1 text-xs" key={skill.id}>{skill.name}</span>)}</div><div className="mt-6 flex items-center justify-between text-sm"><span className="text-slate-500">{project.dateRange}</span><span className="font-bold text-cyan-400">View Details →</span></div></div></Link>)}</div>
      </div></section>

      <section className="scroll-mt-24 px-5 py-24" id="achievements"><div className="mx-auto max-w-[1280px]"><SectionHeading {...content.achievementsSection} />
        <h3 className="mb-7 flex items-center gap-3 text-2xl font-bold"><Trophy className="text-amber-400" /> Competition Wins & Highlights</h3><div className="grid gap-6 md:grid-cols-2">{props.achievements.filter((item) => item.kind === 'highlight').map((item, index) => <article className="rounded-2xl border border-violet-400/20 bg-[#211d53] p-6" key={item.id}><div className="flex gap-4"><span className={`grid size-12 shrink-0 place-items-center rounded-xl ${index < 2 ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>{index < 2 ? <Trophy /> : <Award />}</span><div className="min-w-0"><div className="flex flex-wrap items-start justify-between gap-2"><h4 className="text-lg font-bold">{item.title}</h4><span className="rounded-full border border-white/15 px-2 py-1 text-xs">{item.badge}</span></div><p className="mt-2 font-medium text-amber-300">{item.issuer}</p><p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p><p className="mt-3 text-xs text-slate-500">{item.date}</p></div></div></article>)}</div>
        <h3 className="mb-7 mt-14 flex items-center gap-3 text-2xl font-bold"><Award /> Certifications & Courses</h3><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{props.achievements.filter((item) => item.kind === 'certification').map((item) => <article className="flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-900/60 p-4" key={item.id}><Award className="shrink-0 text-emerald-400" size={20} /><div className="min-w-0"><b className="block truncate text-sm">{item.title}</b><span className="text-xs text-slate-400">{item.issuer}</span></div></article>)}</div>
        <div className="mt-16 grid grid-cols-2 rounded-2xl border border-violet-400/20 bg-[#121735] p-7 lg:grid-cols-4">{(content.achievementStats || []).map((stat) => <div className="p-4 text-center" key={stat.label}><b className="text-4xl text-cyan-400">{stat.value}</b><span className="mt-2 block text-sm text-slate-400">{stat.label}</span></div>)}</div>
      </div></section>

      <section className="scroll-mt-24 px-5 py-24" id="contact"><div className="mx-auto max-w-[1280px]"><SectionHeading description={content.contact.description} heading={content.contact.heading} /><div className="grid gap-8 lg:grid-cols-2">
        <form className="rounded-2xl border border-cyan-300/15 bg-[#091a2c] p-6 md:p-8" onSubmit={submitContact}><div className="flex items-center gap-4"><span className="rounded-xl bg-cyan-500 p-3 text-[#020214]"><MessageSquare /></span><div><h3 className="text-xl font-bold">{content.contact.formHeading}</h3><p className="text-sm text-slate-400">{content.contact.responseNote}</p></div></div><label className="mt-7 block text-sm font-medium">Your Name<input className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1e2e] px-4 py-3.5 outline-none focus:border-cyan-400" name="name" placeholder="John Doe" required /></label><label className="mt-5 block text-sm font-medium">Email Address<input className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1e2e] px-4 py-3.5 outline-none focus:border-cyan-400" name="email" placeholder="john@example.com" required type="email" /></label><label className="mt-5 block text-sm font-medium">Your Message<textarea className="mt-2 min-h-36 w-full rounded-xl border border-white/15 bg-[#0b1e2e] px-4 py-3.5 outline-none focus:border-cyan-400" name="message" placeholder="Tell me about your project or just say hello..." required /></label><button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3.5 font-bold text-[#020214]" type="submit"><Send size={18} /> Send Message</button></form>
        <div className="space-y-6"><div className="rounded-2xl border border-cyan-300/15 bg-[#091a2c] p-6"><h3 className="text-xl font-bold">Contact Information</h3><div className="mt-5 space-y-4">{contactInfo.map(({ Icon, label, value }) => <div className="flex items-center gap-4 rounded-xl bg-[#0a3045] p-4" key={label}><Icon className="text-cyan-400" /><span><small className="block text-slate-400">{label}</small><b>{value || ''}</b></span></div>)}</div></div><div className="rounded-2xl border border-cyan-300/15 bg-[#091a2c] p-6"><h3 className="text-xl font-bold">Connect With Me</h3><div className="mt-5 grid grid-cols-2 gap-4">{(content.contact.socialLinks || []).map((link) => <a className="flex items-center gap-3 rounded-xl border border-cyan-300/15 bg-[#0a3045] p-4 font-bold hover:text-cyan-400" href={link.url} key={link.label} target="_blank">{link.label.toLowerCase().includes('github') ? <Github /> : <Linkedin />}{link.label}</a>)}</div></div><div className="rounded-2xl border border-cyan-300/15 bg-[#091a2c] p-6"><h3 className="flex items-center gap-2 text-xl font-bold"><span className="size-3 rounded-full bg-cyan-400" />{content.contact.availabilityHeading}</h3><p className="mt-4 text-slate-400">{content.contact.availabilityText}</p><div className="mt-4 flex flex-wrap gap-2">{content.contact.availabilityTags?.map((tag) => <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-300" key={tag.label}>{tag.label}</span>)}</div></div></div>
      </div></div></section>

      <footer className="border-t border-white/10 px-5 py-12"><div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-3"><div><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">{content.identity.initials}</span><b>{content.identity.name}</b></div><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">{content.footer?.description}</p></div><div><h4 className="font-bold">Quick Links</h4><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-400">{(content.navigation || []).slice(1).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div></div><div><h4 className="font-bold">Contact</h4><div className="mt-4 space-y-2 text-sm text-slate-400"><p>{content.contact.email}</p><p>{content.contact.phone}</p><p>{content.contact.location}</p></div></div></div><p className="mx-auto mt-10 max-w-[1280px] border-t border-white/10 pt-6 text-xs text-slate-500">{content.footer?.copyright}</p></footer>
      <a aria-label="Back to top" className="fixed bottom-5 right-5 grid size-12 place-items-center rounded-xl bg-cyan-500 text-[#020214] shadow-lg" href="#home"><ArrowUp size={20} /></a>
    </main>
  )
}
