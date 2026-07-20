import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { group: 'Portfolio', useAsTitle: 'title', defaultColumns: ['title', 'company', 'category', 'period'] },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'category', type: 'relationship', relationTo: 'experience-categories', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'employmentType', type: 'text', required: true },
    { name: 'current', type: 'checkbox', defaultValue: false },
    { name: 'period', type: 'text', required: true },
    { name: 'location', type: 'text' },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'achievements', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'technologies', type: 'relationship', relationTo: 'skills', hasMany: true },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
