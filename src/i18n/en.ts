import type { TranslationDictionary, LocalizedProject, LocalizedMilestone } from './types';

export const translations: TranslationDictionary = {
  hud_telemetry: 'TELEMETRY',
  hud_links: 'LINKS',
  hud_projects: 'PROJECTS',
  hud_techs: 'TECHS',

  header_title: 'OP_CONSOLE',
  header_mute: 'MUTED',
  header_unmute: 'SOUND_ACTIVE',
  header_mute_title: 'Toggle quantum sound',

  bio_tagline: 'CREATIVE DEVELOPER — DESIGNER — OPTIMIZER',
  bio_label: 'BIOS.DAT',
  bio_bio:
    'I build digital products that work, feel right, and scale. From system design to the last line of CSS. Next.js, TypeScript, PostgreSQL, Groq, A+ security, and frictionless CI/CD. Every project starts with a question: what else?',

  tab_links: 'CONNECTIONS',
  tab_projects: 'WORK',
  tab_contact: 'TRANSMIT',

  link_copy: 'COPY',
  link_copied: 'COPIED',

  project_enter: 'ACCESS_REPO',

  contact_name_label: '[SENDER_ID_SIGNAL]',
  contact_name_placeholder: 'ENTER YOUR_ NETWORK IDENTITY...',
  contact_message_label: '[ENCRYPTED_MSG_ORDER]',
  contact_message_placeholder:
    'TYPE YOUR COORDINATES OR CONNECTION REQUEST HERE...',
  contact_submit: 'SEND COORDINATES',
  contact_submitting: 'TRANSMITTING LINK...',
  contact_terminal_label: '[DIAGNOSTIC_TERMINAL]: LINK LOGGED',
  contact_log_1: '[SYSTEM]: Initializing transmission protocol...',
  contact_log_2: '[COV_NET]: Building encrypted quantum tunnel...',
  contact_log_3: '[ENCRYPTED]: AES-256 algorithm loaded successfully.',
  contact_log_4: '[PACKET]: Packaging data for:',
  contact_log_5: '[SUBPROCESS]: Finding relay data gateway...',
  contact_log_6: '[LINK]: Transmitting electromagnetic sync pulses...',
  contact_log_7: '[SYSTEM]: Transmission complete. Connection closed.',

  footer_sys: 'PERMANENT_NET_COVER',
  footer_access: '// DIRECTOR_ACCESS_ACTIVE //',

  hud_loc: 'SYS_LOC: 34.0522° N, 118.2437° W [ENCRYPTED_CHANNEL]',
  hud_status: 'COGNITIVE_ARRAY: ACTIVE // PHYSICS_REPEL: OPERATIONAL',
  hud_latency: 'LATENCY: 12ms // RESOLVED_NET: INFRASTRUCTURE_STABLE',

  stat_links_label: 'CORE_DATA',
  stat_projects_label: 'TERMINALS',
  stat_techs_label: 'REPELLENTS_ACT',

  lang_es: 'ES',
  lang_en: 'EN',
  lang_aria: 'Switch language to Español',

  // GlassHeader
  header_nav_links: 'LINKS',
  header_nav_projects: 'PROJECTS',
  header_nav_experience: 'EXPERIENCE',
  header_nav_contact: 'CONTACT',

  // HeroRotatingWords
  hero_words: 'CREATIVE DEVELOPER, DESIGNER, OPTIMIZER',

  // ExperienceTimeline
  exp_system_file: '[ TIMELINE: CAREER_LOG.SYS ]',
  exp_heading: 'EXPERIENCE',
  exp_subtitle: 'PROFESSIONAL TIMELINE',
  exp_empty: 'NO EXPERIENCE RECORDS',
  exp_empty_desc: 'Career milestone data is currently unavailable.',
  exp_period_label: 'PERIOD:',
  exp_tags_label: 'TAGS:',

  // StatsModal
  stats_title: 'TELEMETRY',
  stats_section_links: 'LINKS',
  stats_section_projects: 'PROJECTS',
  stats_section_techs: 'TECHS',
  stats_total: 'TOTAL',
  stats_active: 'ACTIVE',
  stats_close: 'CLOSE',
  stats_performance: 'PERFORMANCE',
  stats_load: 'LOAD',
};

export const projects: LocalizedProject[] = [
  {
    id: 'proj-01',
    title: 'VIL — Villainous Assistant',
    category: 'Distributed Systems & Interactive Experiences',
    description:
      'Immersive cyberpunk terminal integrating LLMs (Groq) for natural language processing and dynamic web search (Serper.dev).',
    longDescription:
      'Retro-aesthetic terminal interface that integrates LLMs via Groq API for a unique conversational experience. Orchestrates real-time data flows combining web search, speech recognition (Web Speech API), authentication with bcryptjs, httpOnly sessions, and PostgreSQL with Drizzle ORM for cross-device persistence.',
    techStack: [
      'Next.js 16',
      'TypeScript 5.8',
      'Tailwind CSS 4',
      'PostgreSQL + Drizzle ORM',
      'Groq API',
      'Serper.dev',
      'Web Speech API',
      'bcryptjs',
      'Framer Motion',
      'Vitest + Playwright',
    ],
    liveUrl: 'https://vil.josmarypirela.dev',
    githubUrl: 'https://github.com/Josmaryppirelag17/Vil-Ai-Assitant',
    imageGlowColor: '#18BEC7',
    accentColor: 'brand-cyan',
    features: [
      'LLM integration with System Prompt Engineering for role-based persona customization',
      'Real-time web search pipeline with grounded response processing',
      'High-performance component-based architecture for immersive CRT visual effects',
      'Data validation and security in API routes enforced by Zod schemas',
      'Speech recognition and synthesis speed control',
      'Authentication with register, login, forgot/reset password and IP-based rate limiting',
      'Cross-device conversation sync via PostgreSQL',
    ],
  },
  {
    id: 'proj-02',
    title: 'BeeHive — Productivity Dashboard',
    category: 'Web Application',
    description:
      'Gamified productivity dashboard with Pomodoro timer, Kanban board, XP quests and user authentication.',
    longDescription:
      'BeeHive is a full productivity dashboard featuring a configurable Pomodoro timer, drag-and-drop Kanban board, gamification system (XP, levels, quests), weekly SVG statistics charts, instant task search, CSV import/export, Markdown notes, and complete authentication (register, login, forgot/reset password) with bcryptjs and httpOnly cookies.',
    techStack: [
      'Next.js 15',
      'TypeScript 5.8',
      'Tailwind CSS v4',
      'PostgreSQL + Drizzle ORM',
      'Dexie.js (IndexedDB)',
      'Zustand',
      '@dnd-kit',
      'react-hook-form + Zod',
      'bcryptjs',
      'Framer Motion',
      'Vitest + Playwright',
    ],
    liveUrl: 'https://dashboard.josmarypirela.dev/',
    githubUrl: 'https://github.com/Josmaryppirelag17/Dashboard-Bee',
    imageGlowColor: '#FD1EB1',
    accentColor: 'brand-pink',
    features: [
      'Configurable Pomodoro timer with active task selector',
      'Drag-and-drop Kanban board (To do → In progress → Done)',
      'Gamification system with XP, levels and claimable quests',
      'Weekly SVG charts for focus time and daily efficiency',
      'Real-time task search and filtering',
      'CSV import/export for task backup and restore',
      'Authentication with register, login, forgot/reset password and IP-based rate limiting',
      'Markdown notes per task with live preview (lazy-loaded)',
      'Local persistence (IndexedDB) and cloud sync (PostgreSQL) based on auth state',
    ],
  },
];

export const milestones: LocalizedMilestone[] = [
  {
    id: 'exp-1',
    period: '2025 - PRESENT',
    role: 'Software Engineer',
    company: 'Independent Projects',
    description:
      'Owner of the full software lifecycle: from idea to the last metric in production.',
    bullets: [
      'Owner of the full software lifecycle: conceive, architect, build, test, secure, deploy, monitor, and iterate.',
      'Build full-stack applications with Next.js, React 19, TypeScript, PostgreSQL, Drizzle ORM, Tailwind CSS 4, and Framer Motion.',
      'Integrate conversational AI engines (Groq API), web search (Serper.dev), and speech recognition (Web Speech API).',
      'Create interactive experiences with Canvas API, Web Audio API, and Framer Motion animations.',
      'Implement complete authentication systems: bcryptjs, httpOnly cookies, DB sessions, IP-based rate limiting.',
      'Harden applications with nonce-based CSP, HSTS, X-Frame-Options, and Zod validation on every endpoint.',
      'Automate everything with GitHub Actions: typecheck, lint, tests, build, deploy.',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Framer Motion', 'Canvas API', 'CI/CD', 'Security'],
  },
  {
    id: 'exp-2',
    period: '2023 - 2025',
    role: 'Frontend Developer',
    company: 'Self-Taught Learning & Personal Projects',
    description:
      'Phase of building strong frontend foundations: design, layout, interaction, animation, and UX.',
    bullets: [
      'Built complete web interfaces with React, JavaScript, TypeScript, and modern CSS.',
      'Explored animations and micro-interactions with Framer Motion.',
      'Implemented version control with Git and technical documentation.',
      'Learned TypeScript strict and best practices for modular codebases.',
      'Developed web applications from scratch: layout, interaction, logic, and deployment.',
    ],
    tags: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Framer Motion', 'Responsive Design'],
  },
];
