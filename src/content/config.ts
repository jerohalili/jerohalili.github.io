import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  // Use 'content' for Markdown/MDX
  type: 'content', 
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    impact: z.string(),
    buttonText: z.string().optional(),
  }),
});

export const collections = { projects };