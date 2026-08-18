import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      blurb: z.string(),
      thumbnail: image(),
      liveUrl: z.url().optional(),
      sourceUrl: z.url().optional(),
      order: z.number().optional(),
    }),
});

export const collections = { projects };
