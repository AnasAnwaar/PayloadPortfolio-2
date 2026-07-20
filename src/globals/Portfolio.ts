import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const sectionFields = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    { name: 'heading', type: 'text' as const, required: true },
    { name: 'description', type: 'textarea' as const, required: true },
  ],
})

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  label: 'Portfolio Website',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Portfolio' },
  fields: [
    {
      name: 'identity',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'initials', type: 'text', required: true },
        { name: 'professionalTitle', type: 'text', required: true },
        { name: 'shortBio', type: 'textarea' },
        { name: 'profileImage', type: 'upload', relationTo: 'media' },
        { name: 'resume', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'availability', type: 'text' },
        { name: 'eyebrow', type: 'text', defaultValue: "Hi, I'm" },
        { name: 'headline', type: 'text', required: true },
        {
          name: 'taglines',
          type: 'array',
          admin: { description: 'Typed out one at a time under the headline, then erased and replaced by the next.' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'roles', type: 'array', fields: [{ name: 'role', type: 'text', required: true }] },
        { name: 'primaryButtonLabel', type: 'text', defaultValue: 'View My Work' },
        { name: 'secondaryButtonLabel', type: 'text', defaultValue: "Let's Connect" },
        { name: 'techLabel', type: 'text', defaultValue: 'Tech I love working with' },
        { name: 'featuredSkills', type: 'relationship', relationTo: 'skills', hasMany: true },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'experienceBadge', type: 'text' },
        { name: 'location', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    sectionFields('experienceSection', 'Experience Section'),
    sectionFields('skillsSection', 'Skills Section'),
    sectionFields('projectsSection', 'Projects Section'),
    sectionFields('achievementsSection', 'Achievements Section'),
    {
      name: 'achievementStats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'color', type: 'select', defaultValue: 'cyan', options: ['cyan', 'purple', 'amber', 'green'] },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'formHeading', type: 'text', defaultValue: 'Send a Message' },
        { name: 'responseNote', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'location', type: 'text' },
        { name: 'availabilityHeading', type: 'text' },
        { name: 'availabilityText', type: 'textarea' },
        { name: 'availabilityTags', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'description', type: 'textarea' },
        { name: 'copyright', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
