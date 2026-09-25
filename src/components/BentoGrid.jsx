import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  GitCommit, 
  Activity, 
  Headphones, 
  Sparkles, 
  Palette, 
  Bot, 
  Radio, 
  Check, 
  Zap, 
  Terminal,
  Cpu,
  Layers,
  Database
} from 'lucide-react';
import PopUpCard from './PopUpCard';
import AnimatedSection from './AnimatedSection';
import { sound } from '../utils/sound';

export default function BentoGrid() {
  const [timeStr, setTimeStr] = useState('');
  const [activeCell, setActiveCell] = useState(null);
  const [isTraining, setIsTraining] = useState(true);

  // Live ticking IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 22-week contribution matrix
  const weeks = 22;
  const daysPerWeek = 7;
  const commitLevels = [
    'bg-[#121626]',     // 0
    'bg-purple-900/60', // 1
    'bg-purple-600/70', // 2
    'bg-cyan-500/80',   // 3
    'bg-emerald-400'    // 4
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mini Header with Spring Pop-Up */}
        <AnimatedSection direction="pop">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
              // Telemetry & Design Studio
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI & Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Cockpit</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-light">
              Real-time model telemetry, GUI design token systems, GitHub commits, and creative frequency.
            </p>
          </div>
        </AnimatedSection>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Live IST Clock & Working Status (5 cols) */}
          <div className="md:col-span-5 h-full">
            <PopUpCard delay={0.1} glowColor="cyan" className="h-full">
              <div className="relative group/clock h-full p-7 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-cyan-400/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl flex flex-col justify-between transition-[border-color,box-shadow] duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none opacity-70 group-hover/clock:opacity-100 transition-opacity" />
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>LIVE SYSTEM TELEMETRY</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      ACTIVE LAB
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight mb-2">
                    {timeStr || '20:30:00'} <span className="text-sm font-normal text-purple-400">IST</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    Asia/Kolkata (UTC +5:30) • Tamil Nadu, India
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>Student & Development Hours:</span>
                  <span className="text-emerald-400 font-semibold">Online & Building</span>
                </div>
              </div>
            </PopUpCard>
          </div>

          {/* Bento Item 2: Machine Learning & Data Pipeline (7 cols) */}
          <div className="md:col-span-7 h-full">
            <PopUpCard delay={0.2} glowColor="purple" className="h-full">
              <div className="relative group/ml h-full p-7 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-purple-500/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl flex flex-col justify-between transition-[border-color,box-shadow] duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none opacity-70 group-hover/ml:opacity-100 transition-opacity" />
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-2 text-xs font-mono text-purple-300">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span>ML & DATA SCIENCE PIPELINE</span>
                    </span>
                    <button
                      onClick={() => {
                        sound.click();
                        setIsTraining(!isTraining);
                      }}
                      className="px-3 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800/30 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isTraining ? 'Pipeline Active' : 'Completed'}</span>
                    </button>
                  </div>

                  <div className="my-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                        Scikit-Learn & Python
                      </span>
                      <span className="text-xs font-mono text-emerald-400 border border-emerald-800/40 bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
                        Random Forest & EDA
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 font-light">
                      End-to-end data preprocessing, StandardScaler normalization, correlation matrix generation, and hyperparameter tuning with GridSearchCV.
                    </p>
                  </div>
                </div>

                {/* Simulated Feature Importance Waveform */}
                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-end gap-1.5 h-12">
                  {[22, 35, 48, 62, 75, 88, 92, 85, 78, 90, 95, 89, 74, 82, 86, 91, 93, 95, 96, 94, 98, 92, 88, 96].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-300"
                      style={{
                        height: `${val}%`,
                        opacity: isTraining ? (i === 23 ? 1 : 0.8) : 0.6
                      }}
                      title={`Feature ${i + 1}: ${val}%`}
                    />
                  ))}
                </div>
              </div>
            </PopUpCard>
          </div>

          {/* Bento Item 3: GitHub Activity Commit Heatmap Simulator (8 cols) */}
          <div className="md:col-span-8 h-full">
            <PopUpCard delay={0.3} glowColor="emerald" className="h-full">
              <div className="relative group/cadence h-full p-7 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-emerald-500/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl flex flex-col justify-between transition-[border-color,box-shadow] duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none opacity-70 group-hover/cadence:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <GitCommit className="w-4 h-4 text-emerald-400" />
                      <span>PROJECT & CODE CADENCE</span>
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      Consistent Development Activity
                    </span>
                  </div>

                  {/* Commit Matrix Grid */}
                  <div className="my-2 overflow-x-auto py-2">
                    <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
                      {Array.from({ length: weeks * daysPerWeek }).map((_, idx) => {
                        const level = (idx % 7 === 0 || idx % 5 === 0) 
                          ? (idx % 4) + 1 
                          : (idx % 3 === 0 ? 2 : (idx % 2 === 0 ? 1 : 0));
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => {
                              sound.hover();
                              setActiveCell(idx);
                            }}
                            onMouseLeave={() => setActiveCell(null)}
                            className={`w-3.5 h-3.5 rounded-[3px] ${commitLevels[level]} hover:scale-125 transition-transform cursor-pointer shadow-sm`}
                            title={`Day ${idx + 1}: ${level * 3} commits`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Less Commits</span>
                  <div className="flex items-center gap-1">
                    {commitLevels.map((c, i) => (
                      <span key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />
                    ))}
                  </div>
                  <span>High Activity (Python, Flutter & Web)</span>
                </div>
              </div>
            </PopUpCard>
          </div>

          {/* Bento Item 4: GUI Design Token Palette & Philosophy (4 cols) */}
          <div className="md:col-span-4 h-full">
            <PopUpCard delay={0.4} glowColor="pink" className="h-full">
              <div className="relative group/tokens h-full p-7 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-pink-500/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl flex flex-col justify-between transition-[border-color,box-shadow] duration-300 overflow-hidden text-left">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent pointer-events-none opacity-70 group-hover/tokens:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-pink-400 mb-3">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <span>GUI DESIGN TOKENS</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                    Human-Centered Interfaces
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Every data pipeline and mobile app deserves an interface with intuitive visual hierarchies, high-contrast dark modes, and fluid responsive interactions.
                  </p>

                  {/* Swatches */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#010206] border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]"></span>
                      #38bdf8
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#010206] border border-purple-500/40 text-[10px] font-mono text-purple-300 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_6px_#a855f7]"></span>
                      #a855f7
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Figma & WCAG AAA Tested</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">v3.2</span>
                </div>
              </div>
            </PopUpCard>
          </div>

        </div>

      </div>
    </section>
  );
}
