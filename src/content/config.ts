import { z, defineCollection } from 'astro:content';

const widgetCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    path: z.string(),
    image: z.string(),
  }),
});

export const collections = {
  'widget': widgetCollection,
};