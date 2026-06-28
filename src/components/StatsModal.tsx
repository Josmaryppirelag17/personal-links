'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { CyberdeckConfig } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CyberdeckConfig;
}

export default function StatsModal({ isOpen, onClose, config }: StatsModalProps) {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const sections = [
    {
      key: 'links',
      label: t('stats_section_links'),
      count: config.links.length,
      active: config.links.filter((l) => l.active).length,
      color: 'brand-pink',
    },
    {
      key: 'projects',
      label: t('stats_section_projects'),
      count: config.projects.length,
      active: config.projects.length,
      color: 'brand-cyan',
    },
    {
      key: 'techs',
      label: t('stats_section_techs'),
      count: config.techIds.length,
      active: config.techIds.length,
      color: 'brand-lime',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-brand-bg border-2 border-brand-cyan/30 p-6 rounded-none shadow-[0_0_40px_rgba(24,190,199,0.15)]"
          >
            <div className="corner-accent top-left" />
            <div className="corner-accent bottom-right" />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-brand-pink hover:text-white transition-colors cursor-pointer"
              aria-label={t('stats_close')}
            >
              <X size={18} />
            </button>

            <div className="font-mono text-left">
              <p className="text-[10px] text-brand-cyan/60 tracking-widest mb-1">
                [ SYS::STATISTICS ]
              </p>
              <h2 className="text-lg font-bold text-brand-pink uppercase tracking-wider mb-5">
                {t('stats_title')}
              </h2>

              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.key} className="border-l-2 pl-3" style={{ borderColor: `var(--color-${section.color})` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider text-${section.color}`}>
                        {section.label}
                      </span>
                      <span className="font-mono text-[10px] text-brand-pale/60">
                        {t('stats_total')}: {section.count}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] text-brand-pale/50 font-mono">
                      <span>{t('stats_active')}: {section.active}</span>
                      <span className="text-brand-pale/20">|</span>
                      <span>{t('stats_performance')}: {Math.round((section.active / Math.max(section.count, 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-brand-bg/80 h-1.5 rounded-none overflow-hidden mt-1.5 border border-brand-cyan/10">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${(section.active / Math.max(section.count, 1)) * 100}%`,
                          backgroundColor: `var(--color-${section.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-brand-cyan/10 font-mono text-[8px] text-brand-pale/30 tracking-wider">
                <div className="flex justify-between">
                  <span>SYS: {language === 'es' ? 'ESTABLE' : 'STABLE'}</span>
                  <span>UPTIME: {Math.floor(Date.now() / 1000 / 60 / 60)}h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
