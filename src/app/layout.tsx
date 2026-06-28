import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { spaceGrotesk, jetbrainsMono, bungee } from '../lib/fonts';

const APP_URL = process.env.APP_URL || 'https://linktree.josmarypirela.dev';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111232',
};

export const metadata: Metadata = {
  title: 'Josmary Pirela | Creative Software Engineer',
  description:
    'Linktree personal de Josmary Pirela: creative software engineer, proyectos, experiencia y contacto.',
  metadataBase: new URL(APP_URL),
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Josmary Pirela | Creative Software Engineer',
    description:
      'Linktree personal de Josmary Pirela: creative software engineer.',
    url: APP_URL,
    siteName: 'Josmary Pirela',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josmary Pirela | Creative Software Engineer',
    description:
      'Linktree personal de Josmary Pirela: creative software engineer.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${bungee.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
