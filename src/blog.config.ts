import { clientEnv } from "@/lib/env/client.env";

const env = clientEnv();

export const blogConfig = {
  title: env.VITE_BLOG_TITLE || "MoGHenry Web",
  name: env.VITE_BLOG_NAME || "MoGHenry Web",
  author: env.VITE_BLOG_AUTHOR || "MoGHenry",
  description:
    env.VITE_BLOG_DESCRIPTION || "Technical accumulation via 'learning by writing.' I reject AI brain-substitution, preferring human-AI collaboration and versioned iteration. Documenting the path from errors to insights. Building the deep knowledge loop for true internalization.",
  social: {
    github: env.VITE_BLOG_GITHUB || "https://github.com/moghenry",
    email: env.VITE_BLOG_EMAIL || "moghenry@gmail.com",
  },
};

export type BlogConfig = typeof blogConfig;
