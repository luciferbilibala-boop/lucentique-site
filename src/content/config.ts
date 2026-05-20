import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const galleryImage = z.object({
  src: z.string(),
  alt: z.string().default(''),
  caption: z.string().optional(),
  altText: z.string().optional(),
  medium: z.string().optional(),
  designer: z.string().optional(),
  year: z.string().optional(),
  artworkType: z.string().optional(),
  description: z.string().optional(),
});

const baseSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string().optional(),
  enDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
  coverAltText: z.string().optional(),
  gallery: z.array(galleryImage).optional(),
  published: z.boolean().default(false),
  author: z.string().optional(),
  updatedDate: z.date().optional(),
  period: z.string().optional(),
  designers: z.array(z.string()).optional(),
  canonicalURL: z.string().optional(),
});

const aClass = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/a_class' }),
  schema: baseSchema,
});

const bClass = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/b_class' }),
  schema: baseSchema,
});

export const collections = {
  a_class: aClass,
  b_class: bClass,
};
