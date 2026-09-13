export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SectionMeta {
  id: "science" | "computing" | "anime-manga";
  name: string;
  title: string;
  description: string;
}

export const SITE = {
  url: "https://voldigoade.github.io",
  base: "/blog",
  title: "Voldigoade",
  titleMark: "墨",
  tagline: "Sciences, informatique & culture visuelle",
  description:
    "Publication personnelle consacrée aux sciences, aux mathématiques, à l'ingénierie logicielle, à l'intelligence artificielle, à la cybersécurité et aux analyses d'anime et manga.",
  lang: "fr",
  locale: "fr_FR",
  defaultOgImage: "/og-default.png",
} as const;

export const AUTHOR = {
  name: "Voldigoade",
  url: "https://voldigoade.github.io/blog/",
  bio: "Publication personnelle consacrée à l'exploration rigoureuse des sciences exactes, des architectures informatiques et des arts visuels.",
} as const;

export const NAV: NavItem[] = [
  { label: "Publications", href: "/publications" },
  { label: "Sections", href: "/sections" },
  { label: "À propos", href: "/about" },
];

export const SOCIAL: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Voldigoade" },
];

export const SECTIONS: Record<"science" | "computing" | "anime-manga", SectionMeta> = {
  science: {
    id: "science",
    name: "Sciences",
    title: "Sciences & Mathématiques",
    description: "Modélisation physique, mathématiques fondamentales, dynamique des fluides et méthodes formelles.",
  },
  computing: {
    id: "computing",
    name: "Informatique",
    title: "Informatique & Ingénierie",
    description: "Architecture logicielle, systèmes distribués, intelligence artificielle et sécurité.",
  },
  "anime-manga": {
    id: "anime-manga",
    name: "Anime & Manga",
    title: "Anime, Manga & Essais",
    description: "Analyses thématiques, structure narrative, réalisation visuelle et revues critiques.",
  },
} as const;

export const BLOG = {
  postsPerPage: 8,
  postsOnHome: 4,
  wordsPerMinute: 220,
  showReadingTime: true,
  showTableOfContents: true,
  tocMinHeadings: 2,
} as const;

export const INK = {
  hero: true,
  divider: true,
  strength: 1,
  autoFlow: true,
} as const;

export const OG = {
  enabled: true,
  width: 1200,
  height: 630,
} as const;
