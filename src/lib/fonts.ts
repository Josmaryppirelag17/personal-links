import { Space_Grotesk, JetBrains_Mono, Bungee } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['500', '700'],
  variable: '--font-sans',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

export const bungee = Bungee({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400'],
  variable: '--font-display',
});
