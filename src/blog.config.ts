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
  theme: {
    default: {
      background: {
        homeImage: env.VITE_DEFAULT_HOME_IMAGE || "", // R2 path or external URL (hero on homepage)
        globalImage: env.VITE_DEFAULT_GLOBAL_IMAGE || "", // R2 path or external URL (all other pages + scroll target)
        light: { opacity: env.VITE_DEFAULT_LIGHT_OPACITY ?? 0.15 }, // opacity in light mode
        dark: { opacity: env.VITE_DEFAULT_DARK_OPACITY ?? 0.1 }, // opacity in dark mode
        backdropBlur: env.VITE_DEFAULT_BACKDROP_BLUR ?? 8, // px, Gaussian blur
        transitionDuration: env.VITE_DEFAULT_TRANSITION_DURATION ?? 600, // ms, route crossfade (0-3000)
      },
    },
    fuwari: {
      homeBg: env.VITE_FUWARI_HOME_BG || "/images/home-bg.webp",
      avatar: env.VITE_FUWARI_AVATAR || "/images/avatar.png",
    },
  },
};

export type BlogConfig = typeof blogConfig;
