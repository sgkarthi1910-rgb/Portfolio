import React from 'react';
import { 
  Atom, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  Terminal, 
  Zap, 
  Cloud, 
  Boxes, 
  Layers, 
  Palette, 
  Sparkles,
  Bot,
  Search,
  Box,
  FileCode
} from 'lucide-react';

const TECH_ITEMS = [
  { name: "Python", icon: Terminal, color: "#3776ab" },
  { name: "Scikit-Learn", icon: Database, color: "#f97316" },
  { name: "Flutter & Dart", icon: Globe, color: "#02569b" },
  { name: "React Native & Expo", icon: Bot, color: "#61dafb" },
  { name: "Adobe Photoshop", icon: Layers, color: "#31a8ff" },
  { name: "Figma UI/UX", icon: Palette, color: "#f24e1e" },
  { name: "Pandas & NumPy", icon: Terminal, color: "#00b4d8" },
  { name: "React 19", icon: Atom, color: "#38bdf8" },
  { name: "Firebase Auth & Firestore", icon: Zap, color: "#ffca28" },
  { name: "Tailwind CSS", icon: Layers, color: "#38bdf8" },
  { name: "TypeScript", icon: FileCode || Terminal, color: "#3178c6" },
  { name: "Express & Node.js", icon: Server, color: "#68a063" }
];

export default function TechMarquee() {
  return (
    <div className="relative w-full py-8 overflow-hidden z-20 border-y border-purple-900/30 bg-[#090b14]/70 backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#010206] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#010206] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#121526]/80 border border-purple-900/30 hover:border-purple-500/50 shadow-sm transition-all hover:scale-105 cursor-default select-none"
            >
              <Icon className="w-4 h-4" style={{ color: tech.color }} />
              <span className="text-xs font-mono font-medium text-slate-200 tracking-wide">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
