import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { group: 'Portfolio', useAsTitle: 'title', defaultColumns: ['title', 'category', 'featured', 'dateRange'] },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'category', type: 'relationship', relationTo: 'project-categories', required: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'dateRange', type: 'text' },
    { name: 'heroMedia', type: 'upload', relationTo: 'media' },
    { name: 'technologies', type: 'relationship', relationTo: 'skills', hasMany: true },
    {
      name: 'externalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'note', type: 'text' },
      ],
    },
    {
      name: 'caseStudy',
      type: 'group',
      fields: [
        { name: 'overview', type: 'textarea' },
        { name: 'technicalImplementation', type: 'textarea' },
        { name: 'impact', type: 'textarea' },
      ],
    },
    { name: 'features', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'screenshots',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'contributors',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'type', type: 'text' },
        { name: 'linkedIn', type: 'text' },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'portfolio-projects', hasMany: true },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
