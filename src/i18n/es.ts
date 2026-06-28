import type { TranslationDictionary, LocalizedProject, LocalizedMilestone } from './types';

export const translations: TranslationDictionary = {
  hud_telemetry: 'TELEMETRÍA',
  hud_links: 'ENLACES',
  hud_projects: 'PROYECTOS',
  hud_techs: 'TECHS',

  header_title: 'CONSOLA_OPERACIONES',
  header_mute: 'SILENCIADO',
  header_unmute: 'SONIDO_ACTIVO',
  header_mute_title: 'Activar sonido cuántico',

  bio_tagline: 'CREATIVE DEVELOPER — DESIGNER — OPTIMIZER',
  bio_label: 'BIOS.DAT',
  bio_bio:
    'Construyo productos digitales que funcionan, se sienten bien y escalan. Desde el diseño del sistema hasta la última línea de CSS. Next.js, TypeScript, PostgreSQL, Groq, seguridad A+ y CI/CD sin fricción. Cada proyecto empieza con una pregunta: ¿y qué más?',

  tab_links: 'CONEXIONES',
  tab_projects: 'TRABAJOS',
  tab_contact: 'TRANSMISIÓN',

  link_copy: 'COPY',
  link_copied: 'COPIED',

  project_enter: 'ACCEDER_REPOSITORIO',

  contact_name_label: '[FIRMA_EMISOR_ID]',
  contact_name_placeholder: 'ESCRIBE TU IDENTIDAD_ DE RED...',
  contact_message_label: '[ORDEN_MENSAJE_ENCRIPTADO]',
  contact_message_placeholder:
    'ESCRIBE AQUÍ TUS COORDENADAS O SOLICITUD DE CONEXIÓN...',
  contact_submit: 'ENVIAR COORDENADAS',
  contact_submitting: 'TRANSMITIENDO ENLACE...',
  contact_terminal_label: '[TERMINAL_DIAGNÓSTICO]: ENLACE COMENTADO',
  contact_log_1: '[SISTEMA]: Inicializando protocolo de transmisión...',
  contact_log_2: '[COV_NET]: Armando túnel cuántico encriptado...',
  contact_log_3: '[ENCRIPTADO]: Algoritmo AES-256 cargado con éxito.',
  contact_log_4: '[PAQUETE]: Empaquetamiento de datos para:',
  contact_log_5: '[SUBPROCESO]: Buscando pasarela de datos de retransmisión...',
  contact_log_6:
    '[ENLACE]: Transmitiendo pulsos electromagnéticos en tiempo de sincronía...',
  contact_log_7: '[SISTEMA]: Envío completado. Conexión cerrada.',

  footer_sys: 'CUBIERTA_RED_PERMANENTE',
  footer_access: '// ACCESO_DIRECTOR_ACTIVO //',

  hud_loc: 'SYS_LOC: 34.0522° N, 118.2437° W [CANAL_ENCRIPTADO]',
  hud_status: 'COGNITIVE_ARRAY: ACTIVO // REPELENCIA_FISICA: OPERANDO',
  hud_latency: 'LATENCIA: 12ms // RESOLVED_NET: INFRAESTRUCTURA_ESTANCADA',

  stat_links_label: 'NÚCLEO_DATOS',
  stat_projects_label: 'TERMINALES',
  stat_techs_label: 'REPELENTES_ACT',

  lang_es: 'ES',
  lang_en: 'EN',
  lang_aria: 'Cambiar idioma a English',

  // GlassHeader
  header_nav_links: 'ENLACES',
  header_nav_projects: 'PROYECTOS',
  header_nav_experience: 'EXPERIENCIA',
  header_nav_contact: 'CONTACTO',

  // HeroRotatingWords
  hero_words: 'DESARROLLADORA CREATIVA, DISEÑADORA, OPTIMIZADORA',

  // ExperienceTimeline
  exp_system_file: '[ TIMELINE: HISTORIAL_LABORAL.SYS ]',
  exp_heading: 'EXPERIENCIA',
  exp_subtitle: 'LÍNEA DE TIEMPO PROFESIONAL',
  exp_empty: 'SIN REGISTROS DE EXPERIENCIA',
  exp_empty_desc: 'Los datos de experiencia no están disponibles actualmente.',
  exp_period_label: 'PERÍODO:',
  exp_tags_label: 'TECNOLOGÍAS:',

  // StatsModal
  stats_title: 'TELEMETRÍA',
  stats_section_links: 'ENLACES',
  stats_section_projects: 'PROYECTOS',
  stats_section_techs: 'TECHS',
  stats_total: 'TOTAL',
  stats_active: 'ACTIVOS',
  stats_close: 'CERRAR',
  stats_performance: 'RENDIMIENTO',
  stats_load: 'CARGA',
};

export const projects: LocalizedProject[] = [
  {
    id: 'proj-01',
    title: 'VIL — Asistente Villano',
    category: 'Sistemas Distribuidos y Experiencias Interactivas',
    description:
      'Terminal inmersiva con personalidad cyberpunk; integra LLMs (Groq) para procesamiento de lenguaje natural y búsqueda web dinámica (Serper.dev).',
    longDescription:
      'Interfaz de terminal retro-estética que integra LLMs vía Groq API para una experiencia conversacional única. Orquesta flujos de datos en tiempo real combinando búsqueda web, reconocimiento de voz (Web Speech API), autenticación con bcryptjs, sesiones httpOnly, y PostgreSQL con Drizzle ORM para persistencia cross-device.',
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
      'Integración de LLMs con System Prompt Engineering para personalización de rol',
      'Pipeline de búsqueda web en tiempo real con procesamiento de respuestas grounding',
      'Arquitectura basada en componentes de alto rendimiento para efectos visuales CRT',
      'Validación de datos y seguridad en API routes mediante esquemas de Zod',
      'Reconocimiento de voz y control de velocidad de síntesis',
      'Autenticación con registro, login, forgot/reset password y rate limiting por IP',
      'Sincronización de conversaciones cross-device vía PostgreSQL',
    ],
  },
  {
    id: 'proj-02',
    title: 'BeeHive — Dashboard de Productividad',
    category: 'Web Application',
    description:
      'Dashboard de productividad gamificado con Pomodoro, Kanban, XP quests y autenticación de usuarios.',
    longDescription:
      'BeeHive es un dashboard de productividad completo con temporizador Pomodoro configurable, tablero Kanban con drag & drop, sistema de gamificación (XP, niveles, misiones), estadísticas semanales con gráficos SVG, búsqueda instantánea de tareas, importación/exportación CSV, notas Markdown, y autenticación completa (registro, login, forgot/reset password) con bcryptjs y httpOnly cookies.',
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
      'Temporizador Pomodoro configurable con selector de tarea activa',
      'Tablero Kanban con drag & drop (To do → In progress → Done)',
      'Sistema de gamificación con XP, niveles y misiones reclamables',
      'Gráficos SVG semanales de tiempo de enfoque y eficiencia diaria',
      'Búsqueda instantánea y filtrado de tareas en tiempo real',
      'Importación/exportación de tareas en formato CSV',
      'Autenticación con registro, login, forgot/reset password y rate limiting por IP',
      'Notas Markdown por tarea con previsualización (lazy-loaded)',
      'Persistencia local (IndexedDB) y cloud (PostgreSQL) según autenticación',
    ],
  },
];

export const milestones: LocalizedMilestone[] = [
  {
    id: 'exp-1',
    period: '2025 - ACTUALIDAD',
    role: 'Software Engineer',
    company: 'Proyectos Independientes',
    description:
      'Dueña del ciclo de vida completo del software: desde la idea hasta la última métrica en producción.',
    bullets: [
      'Dueña del ciclo de vida completo del software: concebir, arquitecturar, construir, testear, asegurar, desplegar, monitorear e iterar.',
      'Construyo aplicaciones full-stack con Next.js, React 19, TypeScript, PostgreSQL, Drizzle ORM, Tailwind CSS 4 y Framer Motion.',
      'Integro motores de IA conversacional (Groq API), búsqueda web (Serper.dev) y reconocimiento de voz (Web Speech API).',
      'Creo experiencias interactivas con Canvas API, Web Audio API y animaciones con Framer Motion.',
      'Implemento sistemas de autenticación completos: bcryptjs, httpOnly cookies, DB sessions, rate limiting IP-based.',
      'Endurezco aplicaciones con CSP nonce-based, HSTS, X-Frame-Options, Zod en cada endpoint.',
      'Automatizo todo con GitHub Actions: typecheck, lint, tests, build, deploy.',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Framer Motion', 'Canvas API', 'CI/CD', 'Security'],
  },
  {
    id: 'exp-2',
    period: '2023 - 2025',
    role: 'Desarrolladora Frontend',
    company: 'Auto-Didacta & Proyectos Personales',
    description:
      'Fase de construcción de bases sólidas de frontend: diseño, layout, interacción, animación y UX.',
    bullets: [
      'Construcción de interfaces web con React, JavaScript, TypeScript y CSS moderno.',
      'Exploración de animaciones y micro-interacciones con Framer Motion.',
      'Implementación de control de versiones con Git y documentación técnica.',
      'Aprendizaje de TypeScript strict y mejores prácticas de código modular.',
      'Desarrollo de aplicaciones web desde cero: layout, interacción, lógica y despliegue.',
    ],
    tags: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Framer Motion', 'Responsive Design'],
  },
];
