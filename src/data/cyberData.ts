import type { SocialLink, Technology } from '../types';

export const SUPPORTED_TECHS: Technology[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    color: '#FFFFFF',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14L12 11V16H10V8h2l4.5 8z'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178c6',
    svgPath: 'M2 2v20h20V2H2zm6.2 12.8c1 .6 2 1.1 3 .6 1-.5.8-2 .3-2.6-.9-1.1-2.9-1-2.9-3 0-1.6 1.3-2.3 2.7-2.3 1.2 0 2.2.4 3 .9l-.9 1.5c-.7-.4-1.4-.7-2.1-.7-.8 0-1.2.3-1.2.8s.5.7 1.1 1c1.5.7 3.1 1.2 3.1 3.1 0 1.8-1.4 2.8-3.4 2.8-1.5 0-2.8-.5-3.6-1.1l1-1.5zm11.6-7.8h-5v1.8h1.6v7.7H16V9.6h1.6V7.8z'
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    color: '#18bec7',
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12a4 4 0 1 1-4 4 4 4 0 0 1 4-4z'
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    category: 'frontend',
    color: '#38bdf8',
    svgPath: 'M12 6c-2.8 0-4.5 1.4-5.2 4.2 1.4-1.9 3.1-2.6 5.2-2.1.8.2 1.4.8 2 1.4 1 1.1 2.2 2.5 5 2.5 2.8 0 4.5-1.4 5.2-4.2-1.4 1.9-3.1 2.6-5.2 2.1-.8-.2-1.4-.8-2-1.4-1-1.1-2.2-2.5-5-2.5zM6.8 11.5c-2.8 0-4.5 1.4-5.2 4.2 1.4-1.9 3.1-2.6 5.2-2.1.8.2 1.4.8 2 1.4 1 1.1 2.2 2.5 5 2.5 2.8 0 4.5-1.4 5.2-4.2-1.4 1.9-3.1 2.6-5.2 2.1-.8-.2-1.4-.8-2-1.4-1-1.1-2.2-2.5-5-2.5z'
  },
  {
    id: 'zustand',
    name: 'Zustand',
    category: 'frontend',
    color: '#EAB308',
    svgPath: 'M12 3a3 3 0 0 0-3 3c0 .65.21 1.24.56 1.73a7 7 0 0 0-4.56 6.5C5 18 8.13 21 12 21s7-3 7-6.77a7 7 0 0 0-4.56-6.5C14.79 7.24 15 6.65 15 6a3 3 0 0 0-3-3zm-4 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z'
  },
  {
    id: 'vitest',
    name: 'Vitest',
    category: 'frontend',
    color: '#FFB800',
    svgPath: 'M12 2.69l-10 17.31h20l-10-17.31zm0 3.82l6.8 11.79h-13.6l6.8-11.79z'
  },
  {
    id: 'testinglibrary',
    name: 'Testing Lib',
    category: 'frontend',
    color: '#FC455D',
    svgPath: 'M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2v-1.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4zm-1.5 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z'
  },
  {
    id: 'playwright',
    name: 'Playwright',
    category: 'frontend',
    color: '#2EAD33',
    svgPath: 'M4 4h9a5 5 0 0 1 5 5c0 2.5-1.8 4.6-4.2 4.9C13 15.5 12 17 12 19H4V4zm3 3v4h5a2 2 0 1 0 0-4H7z'
  },
  {
    id: 'zod',
    name: 'Zod',
    category: 'frontend',
    color: '#3E63DD',
    svgPath: 'M3 4h18l-3 4H9.5L18 16l-3 4H3l3-4h8.5L6 8l3-4z'
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    category: 'devops',
    color: '#fd1eb1',
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    color: '#39a84d',
    svgPath: 'M12 2L3 7v10l9 5 9-5V7l-9-5zm7 13.5l-7 3.9-7-3.9v-7l7-3.9 7 3.9v7z'
  },
  {
    id: 'groq',
    name: 'Groq',
    category: 'backend',
    color: '#FF4D4D',
    svgPath: 'M12 2L2 12l10 10 10-10L12 2zm0 4.5l5.5 5.5-5.5 5.5L6.5 12 12 6.5z'
  },
  {
    id: 'ratelimiting',
    name: 'Rate Limit',
    category: 'backend',
    color: '#FF8A00',
    svgPath: 'M12 2a10 10 0 0 0-10 10h2a8 8 0 0 1 13.14-6.22l1.42-1.42A10 10 0 0 0 12 2zm0 4v6l4.25 2.5.75-1.25-3.5-2V6H12z'
  },
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'devops',
    color: '#E1567C',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-3.23 1.9-6.01 4.65-7.27l1.37 1.37'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'devops',
    color: '#FFFFFF',
    svgPath: 'M12 2L2 20h20L12 2z'
  },
  {
    id: 'githubactions',
    name: 'GH Actions',
    category: 'devops',
    color: '#2F88FF',
    svgPath: 'M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15,13l-4,3v-2H9v-2h2V9l4,3V13z'
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    category: 'devops',
    color: '#F48E21',
    svgPath: 'M2 2h8v8H2V2zm12 0h8v8h-8V2zM2 14h8v8H2v-8zm12 0h8v8h-8v-8z'
  }
];

export const DEFAULT_LINKS: SocialLink[] = [
  {
    id: 'lnk-01',
    label: 'GITHUB',
    url: 'https://github.com/Josmaryppirelag17',
    icon: 'Github',
    description: 'Código fuente, repositorios, open source',
    color: '#18bec7',
    active: true
  },
  {
    id: 'lnk-02',
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/josmary-pirela',
    icon: 'Linkedin',
    description: 'Red profesional y conexiones industriales',
    color: '#fd1eb1',
    active: true
  },
  {
    id: 'lnk-03',
    label: 'CODEPEN',
    url: 'https://codepen.io/Josmaryppirelag17',
    icon: 'CodePen',
    description: 'Experimentos interactivos y prototipos',
    color: '#dcf10b',
    active: true
  },
  {
    id: 'lnk-04',
    label: 'PORTFOLIO',
    url: 'https://josmarypirela.dev',
    icon: 'Globe',
    description: 'Portfolio completo y casos de estudio',
    color: '#18bec7',
    active: true
  }
];

export const DEFAULT_TECH_IDS = [
  'nextjs', 'typescript', 'react', 'tailwind', 'zustand',
  'vitest', 'testinglibrary', 'playwright', 'zod', 'sonarqube',
  'nodejs', 'groq', 'ratelimiting', 'sentry', 'vercel',
  'githubactions', 'pnpm'
];

export const SYS_SOUNDS = {
  click: 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==',
};
