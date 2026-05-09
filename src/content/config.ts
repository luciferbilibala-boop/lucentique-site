import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const galleryImage = z.object({
  src: z.string(),
  alt: z.string().default(''),
  caption: z.string().optional(),
});

const aClass = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/a_class' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    gallery: z.array(galleryImage).optional(),
    published: z.boolean().default(false),
  }),
});

const bClass = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/b_class' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    gallery: z.array(galleryImage).optional(),
    published: z.boolean().default(false),
  }),
});

export const collections = {
  a_class: aClass,
  b_class: bClass,
};
