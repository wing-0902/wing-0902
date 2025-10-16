import { z, defineCollection } from 'astro:content';

const widgetCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    path: z.string(),
    image: z.string(),
  }),
});

const goodAtCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  'widget': widgetCollection,
  'goot-at': goodAtCollection,
};