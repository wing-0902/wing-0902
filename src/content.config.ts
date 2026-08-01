import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projSchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    category: z.array(z.string()).default([]),
    startDate: z.date(),
    featured: z.boolean().default(false),
    techStack: z.array(z.string()).default([]),
    appUrl: z.url().optional(),
    codeUrl: z.url().optional(),
    image: image().optional()
  });

const projectsJa = defineCollection({
  loader: glob({ pattern: '**/ja.md', base: './src/projects' }),
  schema: projSchema
});

const projectsEn = defineCollection({
  loader: glob({ pattern: '**/en.md', base: './src/projects' }),
  schema: projSchema
});

export const collections = {
  projectsJa,
  projectsEn
};
