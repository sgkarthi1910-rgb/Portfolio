import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  FolderGit2, 
  Award, 
  Mail, 
  Activity, 
  X,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

const SECTION_INSIGHTS = {
  hero: {
    title: "AI & Design Identity",
    tag: "STUDIO STATUS: ACTIVE",
    text: "Selva Guru Karthikeyan P • AI & Data Science Student & GUI / Graphics Designer.",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    border: "border-purple-500/40"
  },
  about: {
    title: "Student Profile & Philosophy",
    tag: "AI & GUI DESIGN",
    text: "Synthesizing machine learning, data science, and cross-platform mobile apps with clean GUI design.",
    icon: Cpu,
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/40"
  },
  skills: {
    title: "AI, Mobile & GUI Stacks",
    tag: "CORE CAPABILITIES",
    text: "Equipped with Python, Scikit-Learn, Flutter, React Native, Figma, Adobe Photoshop, and React 19.",
    icon: Layers,
    color: "from-pink-500 to-purple-500",
    border: "border-pink-500/40"
  },
  projects: {
    title: "Featured Applications",
    tag: "PROJECTS LIVE",
    text: "Multilingual SIH AI mobile app, small-business marketing suite, ML pipeline, and Flutter apps.",
    icon: FolderGit2,
    color: "from-emerald-500 to-cyan-500",
    border: "border-emerald-500/40"
  },
  experience: {
    title: "Practical Work & Milestones",
    tag: "KEY ACHIEVEMENTS",
    text: "Smart India Hackathon project developer, mobile application intern, and data science pipelines.",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/40"
  },
  contact: {
    title: "Quantum Uplink Dispatch",
    tag: "COMMS OPEN",
    text: "Ready for AI research, predictive data science roles, and high-end GUI design commissions.",
    icon: Mail,
    color: "from-purple-500 to-cyan-500",
    border: "border-purple-500/40"
  }
};

export default function ScrollInformationHUD() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 250 && rect.bottom >= 250) {
                setCurrentSection((prev) => {
                  if (prev !== sectionId) {
                    sound.hover();
                    return sectionId;
                  }
                  return prev;
                });
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

  if (dismissed) return null;

  const currentInsight = SECTION_INSIGHTS[currentSection] || SECTION_INSIGHTS.hero;
  const Icon = currentInsight.icon;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm hidden sm:block pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 25 }}
          className={`pointer-events-auto p-4 rounded-2xl bg-[#090b16]/95 backdrop-blur-xl border ${currentInsight.border} shadow-2xl shadow-black/60 relative overflow-hidden transform-gpu will-change-transform`}
        >
          {/* Ambient corner glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none" />

          <div className="flex items-start gap-3">
            {/* Holographic Glowing Icon Badge */}
            <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${currentInsight.color} text-white shadow-lg shrink-0 mt-0.5`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 pr-3">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {currentInsight.tag}
                </span>
                <span className="text-purple-400 text-[10px]">•</span>
                <span className="text-xs font-bold text-white">
                  {currentInsight.title}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {currentInsight.text}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => {
                sound.click();
                setDismissed(true);
              }}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors cursor-pointer shrink-0"
              title="Dismiss HUD"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Action Link */}
          <div className="mt-2.5 pt-2 border-t border-purple-900/30 flex items-center justify-between text-[11px] font-mono text-purple-300">
            <span className="text-slate-400">Section telemetry:</span>
            <span className="text-cyan-400 flex items-center gap-1 font-semibold uppercase">
              #{currentSection}
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
