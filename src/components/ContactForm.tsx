'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check } from 'lucide-react';
import { z } from 'zod';
import { useLanguage } from '../context/LanguageContext';
import { cyberSynth } from '../utils/audio';
import { appendCyberMessage } from '../lib/cyberMessages';

const clientContactSchema = z.object({
  name: z.string().min(1).max(120).trim(),
  email: z.string().min(1).max(200).email().trim().toLowerCase(),
  message: z.string().min(1).max(5000).trim(),
});

type FormData = z.infer<typeof clientContactSchema>;

interface ContactFormProps {
  isMuted: boolean;
}

export default function ContactForm({ isMuted }: ContactFormProps) {
  const { t } = useLanguage();
  const formTimestampRef = useRef(Date.now());
  const [isSent, setIsSent] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(clientContactSchema),
  });

  useEffect(() => {
    cyberSynth.enabled = !isMuted;
  }, [isMuted]);

  const runTerminal = useCallback(async () => {
    const steps = [
      t('contact_log_1'),
      t('contact_log_2'),
      t('contact_log_3'),
      t('contact_log_5'),
      t('contact_log_6'),
      t('contact_log_7'),
    ];

    setShowTerminal(true);
    setTerminalLines([]);

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
      setTerminalLines((prev) => [...prev, steps[i]!]);
      cyberSynth.playGlitch();
    }

    cyberSynth.playSuccess();
  }, [t]);

  const onSubmit = async (data: FormData) => {
    cyberSynth.playClick();

    const payload = {
      ...data,
      fax: '',
      website: '',
      formTimestamp: formTimestampRef.current,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Transmission failed');
      }

      appendCyberMessage({ name: data.name, email: data.email, message: data.message });
      await runTerminal();
      setIsSent(true);
      reset();
    } catch (err) {
      console.error('[ContactForm] Submit error:', err);
      setTerminalLines((prev) => [...prev, `[ERROR]: ${err instanceof Error ? err.message : 'Connection lost'}`]);
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 font-mono"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-none border-2 border-brand-lime flex items-center justify-center">
          <Check className="w-8 h-8 text-brand-lime" />
        </div>
        <p className="text-brand-lime text-xs font-bold tracking-wider">
          {t('contact_success')}
        </p>
        <button
          onClick={() => { setIsSent(false); setShowTerminal(false); setTerminalLines([]); formTimestampRef.current = Date.now(); }}
          className="mt-4 font-mono text-[9px] text-brand-cyan hover:text-white border border-brand-cyan/30 px-3 py-1.5 transition-colors cursor-pointer"
        >
          {t('contact_submit')}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="font-mono text-left">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        <div>
          <label className="block text-[10px] text-brand-cyan uppercase tracking-widest font-bold mb-1">
            {t('contact_name_label')}
          </label>
          <input
            {...register('name')}
            placeholder={t('contact_name_placeholder')}
            onFocus={() => cyberSynth.playHover()}
            className="w-full bg-brand-bg border border-brand-cyan/30 rounded-none p-2.5 text-xs text-white uppercase placeholder-brand-cyan/30 focus:outline-none focus:border-brand-pink focus:shadow-[0_0_10px_rgba(253,30,177,0.25)] transition-all"
          />
          {errors.name && (
            <p className="text-[9px] text-brand-pink mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] text-brand-cyan uppercase tracking-widest font-bold mb-1">
            EMAIL_CHANNEL:
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="e.g. user@network.net"
            onFocus={() => cyberSynth.playHover()}
            className="w-full bg-brand-bg border border-brand-cyan/30 rounded-none p-2.5 text-xs text-white placeholder-brand-cyan/30 focus:outline-none focus:border-brand-pink focus:shadow-[0_0_10px_rgba(253,30,177,0.25)] transition-all"
          />
          {errors.email && (
            <p className="text-[9px] text-brand-pink mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] text-brand-cyan uppercase tracking-widest font-bold mb-1">
            {t('contact_message_label')}
          </label>
          <textarea
            {...register('message')}
            rows={3}
            placeholder={t('contact_message_placeholder')}
            onFocus={() => cyberSynth.playHover()}
            className="w-full bg-brand-bg border border-brand-cyan/30 rounded-none p-2.5 text-xs text-white placeholder-brand-cyan/30 focus:outline-none focus:border-brand-pink focus:shadow-[0_0_10px_rgba(253,30,177,0.25)] transition-all"
          />
          {errors.message && (
            <p className="text-[9px] text-brand-pink mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-mono text-xs font-bold text-black bg-brand-cyan hover:bg-white hover:shadow-[0_0_15px_rgba(24,190,199,0.5)] p-2.5 rounded-none border border-brand-cyan transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          <span>{isSubmitting ? t('contact_submitting') : t('contact_submit')}</span>
          <Send className="w-4 h-4 animate-pulse" />
        </button>
      </form>

      <AnimatePresence>
        {showTerminal && terminalLines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-black/90 rounded-none p-3 border border-brand-pink/30 font-mono text-[9.5px] text-brand-pink leading-relaxed max-h-[160px] overflow-y-auto select-none"
          >
            <div className="text-brand-cyan border-b border-brand-cyan/20 pb-1 mb-1 font-bold">
              {t('contact_terminal_label')}
            </div>
            {terminalLines.map((line, idx) => (
              <div key={idx} className="opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]" style={{ animationDelay: `${idx * 0.1}s` }}>
                {line}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
