import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, CheckCircle2, X, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

const ACHIEVEMENTS = [
  {
    threshold: 0.18,
    id: 'ach-1',
    title: 'Milestone 01: Student Profile Discovered',
    desc: 'Explored Selva Guru Karthikeyan P\'s dual-discipline profile in AI & GUI design.',
    icon: Sparkles,
    badge: '+50 XP PROFILE'
  },
  {
    threshold: 0.42,
    id: 'ach-2',
    title: 'Milestone 02: Core Technical Stacks Unlocked',
    desc: 'Explored Python, Scikit-Learn, Flutter, React Native, Figma, and modern frontend capabilities.',
    icon: Zap,
    badge: '+75 XP TECH STACKS'
  },
  {
    threshold: 0.68,
    id: 'ach-3',
    title: 'Milestone 03: Practical Projects & Applications',
    desc: 'Explored Krishi AgroAssist, AI Business Assistant, Wine Quality ML, and Flutter apps.',
    icon: Trophy,
    badge: '+100 XP FEATURED WORK'
  },
  {
    threshold: 0.90,
    id: 'ach-4',
    title: 'Milestone 04: Direct Comm Channel Open',
    desc: 'Contact link active. Ready to connect with Selva Guru for projects and opportunities!',
    icon: CheckCircle2,
    badge: '+150 XP CONNECTED'
  }
];

export default function AchievementPopups() {
  const [activeToast, setActiveToast] = useState(null);
  const unlockedIdsRef = useRef(new Set());

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const progress = window.scrollY / scrollHeight;
            for (const ach of ACHIEVEMENTS) {
              if (progress >= ach.threshold && !unlockedIdsRef.current.has(ach.id)) {
                unlockedIdsRef.current.add(ach.id);
                setActiveToast(ach);
                sound.success();

                // Auto dismiss after 4.5 seconds
                setTimeout(() => {
                  setActiveToast((curr) => (curr?.id === ach.id ? null : curr));
                }, 4500);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 pointer-events-none sm:max-w-sm">
      <AnimatePresence>
        {activeToast && (
          <motion.div
            key={activeToast.id}
            initial={{ opacity: 0, x: 50, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="pointer-events-auto p-4 rounded-2xl bg-[#0e1124]/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl shadow-amber-950/40 relative overflow-hidden transform-gpu will-change-transform"
          >
            {/* Ambient gold glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold shrink-0 mt-0.5 shadow-md shadow-amber-500/30">
                <activeToast.icon className="w-5 h-5" />
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/40 font-bold">
                    {activeToast.badge}
                  </span>
                  <button
                    onClick={() => setActiveToast(null)}
                    className="text-slate-500 hover:text-white p-0.5 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  {activeToast.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {activeToast.desc}
                </p>
              </div>
            </div>

            {/* Countdown animation progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4.5, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-cyan-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
