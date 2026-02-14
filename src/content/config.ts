import { defineCollection, z } from 'astro:content';

const labs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date().optional(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { labs };