import React from 'react';
import { 
  Briefcase, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Trophy, 
  Cpu, 
  Terminal, 
  Sparkles,
  Palette
} from 'lucide-react';
import { experienceData, certificationsData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import PopUpCard from './PopUpCard';
import AnimatedSection from './AnimatedSection';

const CERT_ICONS = {
  Award,
  Cpu,
  Terminal,
  Trophy,
  Palette,
  Sparkles
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Spring Pop-Up */}
        <AnimatedSection direction="pop" className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
            // Milestones & Trajectory // Chapter 04
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Practical Work & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Key Milestones</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Hackathon engineering, mobile development internships, and core technical competencies.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Professional Timeline with PopUpCard */}
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              Practical Experience & Hackathons
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-900/40 flex flex-col gap-8">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative group text-left">
                  {/* Glowing Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#08090e] group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-purple-600/50 z-20" />

                  <PopUpCard index={idx} delay={idx * 0.12} glowColor="purple">
                    <div className="relative group/exp p-7 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-purple-500/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none opacity-70 group-hover/exp:opacity-100 transition-opacity" />
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/40">
                          {exp.period}
                        </span>
                        <span className="text-xs font-mono text-cyan-400 font-medium">
                          {exp.type}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-white mt-1 group-hover/exp:text-cyan-300 transition-colors">
                        {exp.role}
                      </h4>

                      <div className="text-sm font-medium text-purple-300 mb-3.5">
                        {exp.organization}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed font-light">
                        {exp.description}
                      </p>

                      <div className="space-y-2.5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </PopUpCard>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications & Recognitions with PopUpCard */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-start">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                Specialized Focus Areas & Milestones
              </h3>

              <div className="flex flex-col gap-4">
                {certificationsData.map((cert, idx) => {
                  const IconComp = CERT_ICONS[cert.icon] || Award;
                  return (
                    <PopUpCard key={idx} index={idx} delay={idx * 0.08} glowColor="cyan" className="w-full">
                      <div 
                        onMouseEnter={() => sound.hover()}
                        className="relative group/cert p-5 rounded-2xl bg-gradient-to-b from-[#13172e]/90 via-[#0d1020]/90 to-[#080912]/95 border border-white/10 hover:border-cyan-400/50 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 flex items-start gap-4 text-left overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none opacity-60 group-hover/cert:opacity-100 transition-opacity" />

                        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 shrink-0 group-hover/cert:scale-110 transition-transform shadow-md">
                          <IconComp className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                            <span>{cert.date}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                              {cert.badge}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white group-hover/cert:text-cyan-300 transition-colors truncate sm:whitespace-normal">
                            {cert.title}
                          </h4>

                          <p className="text-xs text-slate-400 mt-1 font-light">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                    </PopUpCard>
                  );
                })}
              </div>
            </div>

            {/* Design & Engineering Philosophy Card */}
            <PopUpCard delay={0.35} glowColor="purple" className="w-full">
              <div className="relative group/phil p-7 rounded-3xl bg-gradient-to-b from-[#181d3d]/95 via-[#101428]/95 to-[#080a14]/98 border border-white/10 hover:border-amber-400/40 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl text-left overflow-hidden transition-[border-color,box-shadow] duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none opacity-70 group-hover/phil:opacity-100 transition-opacity" />
                <h4 className="text-base font-bold text-white flex items-center gap-2.5 mb-2.5">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Dual-Discipline Engineering Standard
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  "Artificial Intelligence creates predictive capability; GUI and Graphic Design translates that capability into clarity and human empowerment."
                </p>
              </div>
            </PopUpCard>
          </div>

        </div>

      </div>
    </section>
  );
}
