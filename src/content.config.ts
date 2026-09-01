import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; 

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    isFlagship: z.boolean().default(false),
    impact: z.string().default('Create'),
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services" }),
  schema: z.object({
    titleTop: z.string(),
    titleBottom: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    isFeatured: z.boolean().default(false),
    iconPath: z.string(),
    order: z.number().default(99),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { projects, blog, services, testimonials };
