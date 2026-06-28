import type { MetadataRoute } from 'next';

const APP_URL = process.env.APP_URL || 'https://linktree.josmarypirela.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
