import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { group: 'Portfolio', useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'icon', type: 'text', admin: { description: 'Lucide icon name, e.g. Server, Code2, Database.' } },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
