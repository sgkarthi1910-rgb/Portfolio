import React, { useState } from 'react';
import { 
  Atom, 
  FileCode, 
  Palette, 
  Globe, 
  Layers, 
  Boxes, 
  Server, 
  Terminal, 
  Network, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Database, 
  HardDrive, 
  Zap, 
  Box, 
  Cloud, 
  GitBranch, 
  Sparkles, 
  Search, 
  Bot, 
  CheckCircle,
  Filter
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import PopUpCard from './PopUpCard';
import AnimatedSection from './AnimatedSection';

const ICON_MAP = {
  Atom,
  FileCode,
  Palette,
  Globe,
  Layers,
  Boxes,
  Server,
  Terminal,
  Network,
  Cpu,
  ShieldCheck,
  Code2,
  Database,
  HardDrive,
  Zap,
  Box,
  Cloud,
  GitBranch,
  Sparkles,
  Search,
  Bot,
  CheckCircle
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All Disciplines");

  const categories = ["All Disciplines", ...skillsData.map((c) => c.category)];

  const filteredCategories = selectedCategory === "All Disciplines" || selectedCategory === "All"
    ? skillsData
    : skillsData.filter((c) => c.category === selectedCategory);

  const glowColors = ['purple', 'cyan', 'emerald', 'pink'];

  return (
    <section id="skills" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Spring Pop-Up */}
        <AnimatedSection direction="pop" className="flex flex-col items-center text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
            // Technical Capabilities // Chapter 02
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            AI, Data Science & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Technical Stacks</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Machine learning pipelines, mobile application engineering, GUI design systems, and backend cloud services.
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => sound.hover()}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-[#121524] text-slate-300 hover:text-white hover:bg-[#1a1e33] border border-purple-900/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Categories Display: Staggered Scrolling Pop-Up Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredCategories.map((group, groupIdx) => (
            <PopUpCard 
              key={groupIdx} 
              index={groupIdx} 
              delay={groupIdx * 0.1} 
              glowColor={glowColors[groupIdx % glowColors.length]}
              className="h-full"
            >
              <div 
                className="group relative h-full p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-cyan-400/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl flex flex-col justify-between transition-[border-color,box-shadow] duration-300 overflow-hidden"
              >
                {/* Top specular glow line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Corner ambient glow */}
                <div className="absolute -top-14 -right-14 w-40 h-40 bg-purple-500/10 group-hover:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></span>
                      {group.category}
                    </h3>
                    <span className="text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
                      {group.skills.length} skills
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-300 mb-7 leading-relaxed font-light">
                    {group.description}
                  </p>

                  {/* Skills Bars & Badges */}
                  <div className="space-y-4">
                    {group.skills.map((skill, sIdx) => {
                      const IconComponent = ICON_MAP[skill.icon] || Code2;
                      return (
                        <div 
                          key={sIdx}
                          onMouseEnter={() => sound.hover()}
                          className="group/skill p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.04] transition-all"
                        >
                          <div className="flex items-center justify-between text-xs mb-2 font-medium">
                            <span className="flex items-center gap-2.5 text-slate-200 group-hover/skill:text-cyan-300 transition-colors">
                              <span 
                                className="p-1.5 rounded-lg bg-[#0c0e1a] border border-white/10 group-hover/skill:scale-110 transition-transform shadow-sm"
                                style={{ color: skill.color }}
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-semibold">{skill.name}</span>
                            </span>
                            <span className="font-mono text-cyan-400 text-xs font-medium">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress track with glow */}
                          <div className="w-full h-2 rounded-full bg-[#080a14] overflow-hidden p-[1px] border border-white/[0.06]">
                            <div 
                              className="h-full rounded-full transition-all duration-700 ease-out group-hover/skill:brightness-125"
                              style={{ 
                                width: `${skill.level}%`,
                                background: `linear-gradient(90deg, #6366f1 0%, ${skill.color || '#38bdf8'} 100%)`
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom tag summary */}
                <div className="mt-7 pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                  {group.skills.map((s, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>

              </div>
            </PopUpCard>
          ))}
        </div>

        {/* Currently Specializing Banner */}
        <AnimatedSection direction="pop" delay={0.3} className="mt-12">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950/40 border border-purple-700/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 rounded-xl bg-purple-900/30 text-purple-300 border border-purple-700/40 shadow-md">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Current Deep-Dive Research & Creative Focus</h4>
                <p className="text-xs text-slate-400 font-light">Vision Transformers (ViT), Glassmorphic 3D Design Systems in Figma & Blender, and Real-Time WebGL Visualizations.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono font-medium">
                Dual Discipline Scholar
              </span>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
