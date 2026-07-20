import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Achievements: CollectionConfig = {
  slug: 'achievements',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { group: 'Portfolio', useAsTitle: 'title', defaultColumns: ['title', 'kind', 'issuer', 'date'] },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'kind', type: 'select', required: true, options: ['highlight', 'certification'] },
    { name: 'badge', type: 'text', admin: { description: 'e.g. competition, workshop, participation.' } },
    { name: 'issuer', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'date', type: 'text' },
    { name: 'media', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
