'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github, Linkedin, Globe, VolumeX, Volume2,
  Check, Copy, ArrowUpRight, Link,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Github, Linkedin, Globe, VolumeX, Volume2,
  Check, Copy, ArrowUpRight, Link,
};
import type { CyberdeckConfig, SocialLink } from '../types';
import CyberAvatar from './CyberAvatar';
import { cyberSynth } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from './ContactForm';

interface CyberDeckProps {
  config: CyberdeckConfig;
  updateConfig: (updater: (prev: CyberdeckConfig) => CyberdeckConfig) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenStats: () => void;
}

type TabId = 'LINKS' | 'PROJECTS' | 'CONTACT';

export default function CyberDeck({ config, updateConfig: _updateConfig, isMuted, onToggleMute, onOpenStats }: CyberDeckProps) {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('LINKS');
  const [copiedId, setCopiedId] = useState<string | null>(null);



  useEffect(() => {
    cyberSynth.enabled = !isMuted;
  }, [isMuted]);

  useEffect(() => {
    cyberSynth.playBoot();
  }, []);

  const handleCopyLink = (link: SocialLink) => {
    cyberSynth.playClick();
    navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTabChange = (tab: TabId) => {
    cyberSynth.playClick();
    setActiveTab(tab);
  };

  const renderIcon = (name: string, className: string = 'w-5 h-5') => {
    const IconComp = ICON_MAP[name] || Link;
    return <IconComp className={className} />;
  };

  const tabs: { key: TabId; label: string }[] = [
    { key: 'LINKS', label: t('tab_links') },
    { key: 'PROJECTS', label: t('tab_projects') },
    { key: 'CONTACT', label: t('tab_contact') },
  ];

  return (
    <div
      className="relative w-full max-w-2xl mx-auto rounded-none bg-[#0a0c24e6] border-2 border-brand-cyan p-6 md:p-8 shadow-[0_0_35px_rgba(24,190,199,0.18)] z-10 overflow-hidden skew-cyber"
      id="cyberpunk-main-card-deck"
    >
      <div className="corner-accent top-left" />
      <div className="corner-accent bottom-right" />

      {config.scanlinesEnabled && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none z-30 opacity-70 animate-[pulse_6s_infinite]" />
      )}

      <div className="absolute top-0 left-0 right-0 h-10 border-b border-brand-cyan/20 flex items-center justify-between px-6 bg-slate-950/60 select-none">
        <span className="font-mono text-[10px] text-brand-pink uppercase tracking-widest font-bold">
          {t('header_title')}
        </span>
        <div className="flex items-center space-x-1">
          <div
            className="flex bg-brand-bg border border-brand-cyan/20 rounded p-0.5"
            role="group"
            aria-label="Language selector"
          >
            <button
              onClick={() => { if (language !== 'es') toggleLanguage(); }}
              aria-pressed={language === 'es'}
              className={`px-1.5 py-0.5 font-mono text-[8px] font-bold transition-all cursor-pointer ${language === 'es' ? 'bg-brand-lime text-brand-bg' : 'text-brand-pale hover:text-white'}`}
            >
              {t('lang_es')}
            </button>
            <button
              onClick={() => { if (language !== 'en') toggleLanguage(); }}
              aria-pressed={language === 'en'}
              className={`px-1.5 py-0.5 font-mono text-[8px] font-bold transition-all cursor-pointer ${language === 'en' ? 'bg-brand-pink text-white' : 'text-brand-pale hover:text-white'}`}
            >
              {t('lang_en')}
            </button>
          </div>
          <button
            onClick={onToggleMute}
            className="font-mono text-[10px] text-brand-cyan hover:text-brand-pink cursor-pointer p-1 transition-colors flex items-center space-x-1"
            title={t('header_mute_title')}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="pt-6 relative h-full">
        <div className="text-center mb-6">
          <div className="mb-4">
            <CyberAvatar primaryColor="#fd1eb1" secondaryColor="#18bec7" pulsing={!isMuted} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            <h1 className="font-display text-4xl font-extrabold text-brand-pink tracking-widest relative z-10 select-none uppercase cyber-text-shadow">
              {config.username}
            </h1>
            <div className="absolute -inset-1 blur-md bg-gradient-to-r from-brand-pink via-purple-600 to-brand-cyan opacity-20 -z-10 animate-pulse" />
          </motion.div>

          <div>
            <p className="font-mono text-xs text-brand-cyan mt-2 font-bold tracking-widest select-none bg-slate-950/70 inline-block px-3 py-1 rounded-none border border-brand-cyan/20">
              {config.handle}
            </p>
          </div>

          <div className="w-full max-w-lg mx-auto bg-brand-bg/80 p-3.5 rounded-none border border-dashed border-brand-cyan/35 mt-4 text-left font-mono relative">
            <div className="absolute top-2 right-2 text-[8px] text-brand-pink font-bold tracking-widest uppercase">
              {t('bio_label')}
            </div>
            <p className="text-[10px] text-brand-pink tracking-wider uppercase font-semibold leading-relaxed border-b border-brand-cyan/20 pb-1 mb-1.5">
              {config.tagline}
            </p>
            <p className="text-[11px] text-brand-cyan/90 leading-relaxed font-sans normal-case">
              {config.longBio}
            </p>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          className="grid grid-cols-3 gap-2.5 mb-6 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-brand-pink"
          id="telemetry-grid"
          onClick={onOpenStats}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenStats(); } }}
        >
          {[
            { labelKey: 'stat_links_label', itemKey: 'hud_links', count: config.links.length, color: '#fd1eb1', barWidth: Math.min(100, config.links.length * 15) },
            { labelKey: 'stat_projects_label', itemKey: 'hud_projects', count: config.projects.length, color: '#18bec7', barWidth: Math.min(100, config.projects.length * 20) },
            { labelKey: 'stat_techs_label', itemKey: 'hud_techs', count: config.techIds.length, color: '#dcf10b', barWidth: Math.min(100, config.techIds.length * 9) },
          ].map((stat) => (
            <div key={stat.labelKey} className="bg-brand-bg/55 border border-brand-cyan/25 p-2 rounded-none font-mono text-[9px] group-hover:border-brand-pink/50 transition-colors">
              <div className="text-brand-cyan font-semibold mb-1">{t(stat.labelKey)}</div>
              <div className="flex items-center justify-between" style={{ color: stat.color }}>
                <span>{t(stat.itemKey)}</span>
                <span className="font-bold">{stat.count}</span>
              </div>
              <div className="w-full bg-[#10103a] h-1 rounded-none overflow-hidden mt-1">
                <div className="h-full" style={{ width: `${stat.barWidth}%`, backgroundColor: stat.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex border-b border-brand-cyan/20 mb-5 relative">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              onMouseEnter={() => cyberSynth.playHover()}
              className={`flex-1 py-1.5 font-mono text-xs font-bold tracking-widest relative z-10 transition-colors duration-300 uppercase cursor-pointer ${
                activeTab === key ? 'text-brand-pink' : 'text-brand-cyan/60 hover:text-brand-cyan'
              }`}
              id={`tab-trigger-${key.toLowerCase()}`}
            >
              {label}
              {activeTab === key && (
                <motion.div
                  layoutId="cyber-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink shadow-[0_0_8px_var(--color-brand-pink)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative min-h-[250px]" id="cyberdeck-tab-viewport">
          <AnimatePresence mode="wait">
            {activeTab === 'LINKS' && (
              <motion.div
                key="links-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {config.links.filter(l => l.active).map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0.5 rounded-none bg-slate-950 -z-10 group-hover:bg-brand-bg transition-colors" />
                    <div
                      className="flex items-center justify-between p-4 rounded-none border border-brand-cyan/20 group-hover:border-brand-pink hover:shadow-[0_0_15px_rgba(253,30,177,0.22)] transition-all duration-300 bg-brand-bg/60 relative overflow-hidden"
                      style={{ borderLeftWidth: '4px', borderLeftColor: link.color }}
                    >
                      <div className="absolute -inset-y-12 -left-12 w-24 bg-gradient-to-r from-brand-cyan/5 to-transparent rotate-12 group-hover:translate-x-[600px] transition-transform duration-1000 ease-out" />

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => cyberSynth.playClick()}
                        className="flex items-center space-x-3.5 flex-1 select-none pr-8 cursor-pointer"
                        id={`link-item-anchor-${link.id}`}
                      >
                        <div
                          className="p-2.5 rounded-none border border-brand-cyan/30 text-brand-cyan group-hover:animate-pulse transition-colors"
                          style={{ color: link.color, borderColor: `${link.color}50` }}
                        >
                          {renderIcon(link.icon, 'w-5 h-5')}
                        </div>
                        <div className="text-left font-mono">
                          <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-brand-pink transition-colors">
                            {link.label}
                          </span>
                          <span className="block text-[10px] text-brand-cyan/60 leading-tight mt-0.5 font-sans normal-case group-hover:text-brand-cyan/90 transition-colors">
                            {link.description}
                          </span>
                        </div>
                      </a>

                      <div className="flex items-center space-x-2 relative z-10 select-none">
                        <button
                          onClick={() => handleCopyLink(link)}
                          className="p-1 px-2.5 bg-[#10103a]/35 hover:bg-[#10103a]/60 border border-brand-cyan/20 hover:border-brand-cyan/50 rounded-none font-mono text-[9px] text-brand-cyan transition-colors cursor-pointer flex items-center space-x-1"
                          title="Copy URL"
                          id={`link-copy-btn-${link.id}`}
                        >
                          {copiedId === link.id ? (
                            <>
                              <Check className="w-3 h-3 text-brand-pink" />
                              <span className="text-brand-pink">{t('link_copied')}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{t('link_copy')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'PROJECTS' && (
              <motion.div
                key="projects-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {config.projects.map((proj, idx) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-4 rounded-none border border-brand-cyan/20 bg-brand-bg/60 group hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(24,190,199,0.22)] transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-brand-cyan to-transparent" />
                    <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-brand-cyan to-transparent" />

                    <div className="flex items-start justify-between">
                      <div className="font-mono text-left">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-brand-cyan rounded-none group-hover:bg-brand-pink transition-colors" />
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-brand-cyan">
                            {proj.title}
                          </h3>
                        </div>
                        <p className="text-[11px] text-brand-cyan/80 leading-relaxed font-sans normal-case mt-2">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] bg-[#10103a]/40 text-brand-cyan px-2 py-0.5 rounded-none border border-brand-cyan/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end mt-4 select-none">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => cyberSynth.playClick()}
                        className="font-mono text-[9px] font-bold text-brand-pink hover:text-white bg-pink-950/20 hover:bg-brand-pink px-3 py-1.5 rounded-none border border-brand-pink/40 hover:border-brand-pink transition-all duration-300 flex items-center space-x-1 cursor-pointer"
                        id={`project-link-anchor-${proj.id}`}
                      >
                        <span>{t('project_enter')}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'CONTACT' && (
              <motion.div
                key="contact-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ContactForm isMuted={isMuted} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 border-t border-brand-cyan/20 pt-4 flex justify-between items-center select-none">
          <span className="font-mono text-[9px] text-brand-cyan/40">
            {t('footer_sys')}
          </span>
          <span className="font-mono text-[9px] text-brand-pink/50 tracking-widest animate-pulse">
            {t('footer_access')}
          </span>
        </div>
      </div>
    </div>
  );
}
