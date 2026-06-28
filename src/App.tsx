'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { CyberdeckConfig } from './types';
import { DEFAULT_LINKS, DEFAULT_TECH_IDS } from './data/cyberData';
import { useLanguage } from './context/LanguageContext';
import type { LocalizedProject } from './i18n/types';
import CyberBackground from './components/CyberBackground';
import FloatingTechBadges from './components/FloatingTechBadges';
import CyberDeck from './components/CyberDeck';
import CustomCursor from './components/CustomCursor';
import StatsModal from './components/StatsModal';

const STORAGE_KEY = 'cyberdeck_profile_data_v1';

function toPortfolioProject(p: LocalizedProject) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    url: p.liveUrl,
    tags: p.techStack,
    glowColor: p.imageGlowColor,
  };
}

function buildDefaultConfig(projects: LocalizedProject[], milestones: any[], t: (k: string) => string): CyberdeckConfig {
  return {
    username: 'JOSMARY PIRELA',
    handle: '@josmarypirela',
    tagline: t('bio_tagline'),
    longBio: t('bio_bio'),
    avatarUrl: '',
    primaryNeon: '#fd1eb1',
    secondaryNeon: '#18bec7',
    soundEnabled: true,
    scanlinesEnabled: true,
    glitchFrequency: 0.2,
    links: DEFAULT_LINKS,
    projects: projects.map(toPortfolioProject),
    milestones,
    techIds: DEFAULT_TECH_IDS,
  };
}

export default function App() {
  const { t, projects, experience } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  const [config, setConfig] = useState<CyberdeckConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { return JSON.parse(saved); }
        catch (e) { console.warn('Failed to parse cached deck data; loading factory defaults.', e); }
      }
    }
    return buildDefaultConfig(projects, experience, t);
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const fresh = buildDefaultConfig(projects, experience, t);
      setConfig(fresh);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateConfig = (updater: (prev: CyberdeckConfig) => CyberdeckConfig) => {
    setConfig((prev) => {
      const updated = updater(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-brand-bg text-white selection:bg-brand-pink selection:text-black overflow-x-hidden font-display">
      <CustomCursor />
      <CyberBackground />
      <FloatingTechBadges activeTechIds={config.techIds} />

      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative z-10 w-full flex items-center justify-center my-6"
        id="links"
      >
        <CyberDeck
          config={config}
          updateConfig={updateConfig}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          onOpenStats={() => setStatsModalOpen(true)}
        />
      </motion.main>

      <div className="fixed bottom-3 left-4 right-4 hidden md:flex items-center justify-between font-mono text-[9px] text-brand-cyan/55 z-30 pointer-events-none select-none uppercase tracking-widest bg-brand-bg/65 backdrop-blur-sm px-4 py-1.5 border border-brand-cyan/10 rounded-none">
        <div>{t('hud_loc')}</div>
        <div>{t('hud_status')}</div>
        <div>{t('hud_latency')}</div>
      </div>

      <div className="fixed inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/30 z-20" />

      <StatsModal isOpen={statsModalOpen} onClose={() => setStatsModalOpen(false)} config={config} />
    </div>
  );
}
