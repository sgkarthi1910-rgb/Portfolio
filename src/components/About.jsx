import React from 'react';
import { 
  Bot, 
  Palette, 
  Database, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Code, 
  CheckCircle2, 
  Layers,
  Cpu
} from 'lucide-react';
import { personalInfo, educationData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import PopUpCard from './PopUpCard';
import AnimatedSection from './AnimatedSection';

export default function About() {
  const pillars = [
    {
      icon: <Bot className="w-5 h-5 text-purple-400" />,
      title: "Machine Learning & AI",
      desc: "Building practical classification pipelines, predictive models, and data-driven systems using Python and Scikit-Learn.",
      glow: "purple"
    },
    {
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      title: "GUI Architecture & Graphics Design",
      desc: "Designing intuitive graphical interfaces, component systems, and visual branding in Adobe Photoshop and Figma.",
      glow: "cyan"
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      title: "Data Science & Exploratory Analysis",
      desc: "Performing rigorous data preprocessing, feature scaling, correlation analysis, and statistical visualization.",
      glow: "emerald"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      title: "Mobile & Interactive Web Apps",
      desc: "Developing cross-platform mobile and web applications in Flutter and React Native backed by Firebase services.",
      glow: "pink"
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scrolling Pop-Up */}
        <AnimatedSection direction="pop" className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-2">
            // Profile & Overview // Chapter 01
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Profile & Philosophy</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Artificial Intelligence & Data Science student specializing in GUI architecture, graphics design, and cross-platform applications.
          </p>
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Bio card with PopUpCard */}
          <div className="lg:col-span-7 h-full">
            <PopUpCard delay={0.1} glowColor="purple" className="h-full">
              <div className="relative group/bio h-full flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-purple-500/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl overflow-hidden transition-[border-color,box-shadow] duration-300">
                {/* Top specular glow line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none z-10 opacity-70 group-hover/bio:opacity-100 transition-opacity" />

                {/* Ambient corner glow */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-600/10 group-hover/bio:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-600/30 border border-white/20">
                      {personalInfo.initials}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {personalInfo.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mt-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{personalInfo.location}</span>
                        <span className="text-purple-400">•</span>
                        <span>{personalInfo.timezone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    {personalInfo.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Quick Domain Badges */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-purple-950/50 text-purple-300 border border-purple-800/40">
                    #ArtificialIntelligence
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-800/40">
                    #DataScience
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-pink-950/50 text-pink-300 border border-pink-800/40">
                    #GUIDesign
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-indigo-950/50 text-indigo-300 border border-indigo-800/40">
                    #GraphicsDesign
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
                    #MachineLearning
                  </span>
                </div>
              </div>
            </PopUpCard>
          </div>

          {/* Right: Pillars & Education Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 4 Pillars with Staggered Pop-Up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => (
                <PopUpCard 
                  key={idx} 
                  index={idx} 
                  delay={0.15 + idx * 0.08} 
                  glowColor={item.glow}
                  className="h-full"
                >
                  <div 
                    onMouseEnter={() => sound.hover()}
                    className="relative group/pillar h-full p-5 rounded-2xl bg-gradient-to-b from-[#13172e]/90 via-[#0d1020]/90 to-[#080912]/95 border border-white/10 hover:border-cyan-400/50 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-300"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                    <div>
                      <div className="mb-3 p-2.5 rounded-xl bg-white/[0.04] w-fit border border-white/10 group-hover/pillar:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1.5">{item.title}</h4>
                      <p className="text-slate-300 text-xs leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </PopUpCard>
              ))}
            </div>

            {/* Education Pop-Up Card */}
            {educationData.map((edu, idx) => (
              <PopUpCard key={idx} delay={0.45} glowColor="cyan" className="w-full">
                <div 
                  className="relative group/edu p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-cyan-400/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl overflow-hidden transition-[border-color,box-shadow] duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none opacity-70 group-hover/edu:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 shrink-0 shadow-md">
                      <GraduationCap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        {edu.period}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-indigo-300 font-medium mb-2.5">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </div>
              </PopUpCard>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
