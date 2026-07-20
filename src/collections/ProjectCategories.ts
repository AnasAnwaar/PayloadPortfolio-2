import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { group: 'Portfolio', useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'color', type: 'select', defaultValue: 'purple', options: ['cyan', 'blue', 'purple', 'amber', 'green'] },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
