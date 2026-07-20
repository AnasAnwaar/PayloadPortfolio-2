import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { group: 'Portfolio', useAsTitle: 'name', defaultColumns: ['name', 'category', 'level', 'featured'] },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'category', type: 'relationship', relationTo: 'skill-categories', required: true },
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: 'intermediate',
      options: ['expert', 'advanced', 'intermediate', 'beginner'],
    },
    { name: 'years', type: 'text', admin: { description: 'Display value, e.g. “2+ years”.' } },
    { name: 'description', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'icon', type: 'text', admin: { description: 'Optional Lucide icon name.' } },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
  ],
}
