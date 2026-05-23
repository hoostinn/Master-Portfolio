import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    team: z.string().nullable(),
    stack: z.array(z.string()),
    github: z.string().url().nullable(),
    demo: z.string().url().nullable(),
    status: z.enum(['shipped', 'in-progress', 'archived']),
    featured: z.boolean(),
    order: z.number(),
    image: z.string().nullable(),
    highlights: z.array(z.string()),
    tpmNote: z.string().nullable(),
  }),
});

export const collections = { projects };
