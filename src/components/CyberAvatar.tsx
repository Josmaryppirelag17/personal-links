import { motion } from 'motion/react';

interface CyberAvatarProps {
  primaryColor: string;
  secondaryColor: string;
  pulsing: boolean;
}

export default function CyberAvatar({ primaryColor, secondaryColor, pulsing = true }: CyberAvatarProps) {
  return (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center select-none" id="hologram-avatar-core">
      <div
        className="absolute inset-0 rounded-full border border-dashed animate-[spin_24s_linear_infinite]"
        style={{ borderColor: `${secondaryColor}80` }}
      />
      <div
        className="absolute inset-[3px] rounded-full border-t border-b border-[#ffffff30] animate-[spin_8s_linear_infinite]"
        style={{ borderColor: `${primaryColor}aa` }}
      />
      <div
        className="absolute inset-[6px] rounded-full border border-double animate-[spin_16s_reverse_linear_infinite]"
        style={{ borderColor: `${secondaryColor}dd` }}
      />

      {pulsing && (
        <span
          className="absolute inset-3 rounded-full opacity-30 animate-ping"
          style={{ backgroundColor: primaryColor }}
        />
      )}

      <div className="relative w-20 h-20 rounded-full bg-brand-bg p-1 border-2 border-brand-cyan flex items-center justify-center overflow-hidden group shadow-[0_0_15px_rgba(24,190,199,0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-black pointer-events-none" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(24,190,199,0.15)_95%),linear-gradient(to_right,rgba(0,0,0,0)_95%,rgba(24,190,199,0.15)_95%)] bg-[size:6px_6px]" />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 rounded-full border border-brand-pink flex items-center justify-center relative cursor-crosshair"
          title="SYS_OP CORE CONNECTED"
        >
          <div className="w-10 h-10 border border-dotted border-brand-cyan rounded-full rotate-45 animate-pulse" />
          <div className="absolute w-2 h-2 rounded-full bg-brand-pink shadow-[0_0_8px_var(--color-brand-pink)]" />

          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-brand-cyan/50" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-brand-cyan/50" />
        </motion.div>

        <div className="absolute bottom-1 w-full text-[7px] text-center font-mono text-brand-cyan opacity-80 select-none tracking-widest leading-none">
          SECURE_98%
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(253,30,177,0.06)_50%,rgba(24,190,199,0.06)_50%)] bg-[size:100%_4px] pointer-events-none" />
      </div>

      <span className="absolute -top-1 -right-1 flex h-3 w-3 select-none">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan border border-black"></span>
      </span>
    </div>
  );
}
