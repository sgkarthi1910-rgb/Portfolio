import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  Code2, 
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, DiscordIcon } from './Icons';
import TiltCard from './TiltCard';
import CountUp from './CountUp';
import PopUpCard from './PopUpCard';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

const ROLES = [
  "Artificial Intelligence & Data Science Student",
  "GUI & Graphics Designer",
  "Machine Learning & Data Analytics",
  "Mobile & Web App Developer",
  "Creative Visual Technologist"
];

export default function Hero({ onOpenTerminal, onOpenResumeModal }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("ml_pipeline.py");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simOutput, setSimOutput] = useState("");

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const codeSnippet = `// AI & Data Science + GUI Design Profile
const profile: AIDataScientist & GUIDesigner = {
  name: "Selva Guru Karthikeyan P",
  role: "AI & Data Science Student • GUI / Graphics Designer",
  location: "Tamil Nadu, India",
  aiStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "EDA"],
  guiStack: ["Adobe Photoshop", "Figma", "Design Systems", "Tailwind CSS"],
  mobileStack: ["Flutter & Dart", "React Native & Expo", "Firebase"],
  status: "Undergraduate Student • Open for Opportunities"
};

export default profile;`;

  const handleCopyCode = () => {
    sound.click();
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    sound.click();
    setIsSimulating(true);
    setSimOutput("Loading Python ML classification pipeline...\nDataset preprocessed with StandardScaler\nTraining Random Forest model (100 estimators)...\nModel evaluation complete. Status: Nominal ✨");
    setTimeout(() => {
      sound.success();
      setIsSimulating(false);
    }, 900);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability / Mission Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-cyan-500/40 shadow-sm shadow-cyan-900/30 mb-6 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-cyan-200 tracking-wide flex items-center gap-1.5">
                <span>🤖</span>
                <span>AI & DATA SCIENCE SCHOLAR • GUI & GRAPHICS DESIGNER</span>
              </span>
            </div>

            {/* Salutation & Full Name */}
            <h2 className="text-sm sm:text-base font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
              Creative Technologist //
            </h2>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
              <span className="text-white block sm:inline">Selva Guru </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
                Karthikeyan P
              </span>
            </h1>

            {/* Animated Typing Title */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-lg sm:text-2xl font-mono text-slate-300">
                &gt; <span className="text-purple-300 font-bold">{displayedText}</span>
                <span className="inline-block w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </span>
            </div>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-8 font-light">
              Bridging the frontiers of Artificial Intelligence & Data Science with cinematic GUI architecture, high-fidelity graphics, and interactive visual computing.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              
              <a
                href="#projects"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  sound.click();
                  onOpenTerminal();
                }}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#131627] hover:bg-[#1c213b] border border-purple-800/40 hover:border-purple-500 text-purple-200 font-mono text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-black/40"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch GuruShell</span>
              </button>

              <button
                onClick={() => {
                  sound.click();
                  onOpenResumeModal();
                }}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0f111f] hover:bg-[#181c30] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>View CV / Resume</span>
              </button>

            </div>

            {/* Social Connect links with glowing hover */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono mr-2">
                Connect:
              </span>
              
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="p-2.5 rounded-lg bg-[#121524] border border-purple-900/30 text-slate-300 hover:text-white hover:border-purple-500 hover:bg-purple-950/40 hover:scale-110 transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="p-2.5 rounded-lg bg-[#121524] border border-purple-900/30 text-slate-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-950/40 hover:scale-110 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.discord}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="p-2.5 rounded-lg bg-[#121524] border border-purple-900/30 text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-950/40 hover:scale-110 transition-all shadow-sm"
                aria-label="Discord Profile"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>

              {personalInfo.twitter && (
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="p-2.5 rounded-lg bg-[#121524] border border-purple-900/30 text-slate-300 hover:text-white hover:border-sky-500 hover:bg-sky-950/40 hover:scale-110 transition-all shadow-sm"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Interactive Code IDE Card */}
          <div className="lg:col-span-5">
            <PopUpCard delay={0.2} maxTilt={9} className="w-full">
              <div className="relative group">
                
                {/* Decorative backlight glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>

                {/* Glassmorphic IDE Frame */}
                <div className="relative rounded-2xl bg-[#0c0e18] border border-purple-900/40 shadow-2xl overflow-hidden">
                  
                  {/* Window top bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#111422] border-b border-purple-900/30">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                      <span className="ml-2 text-xs font-mono text-slate-400">sgk-ai-studio</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRunSimulation}
                        className="px-2 py-1 rounded bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                        title="Run AI & GUI simulation"
                      >
                        <Play className="w-3 h-3 fill-purple-400 text-purple-400" />
                        <span>train & test</span>
                      </button>
                      
                      <button
                        onClick={handleCopyCode}
                        className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title="Copy profile code"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Editor Tabs */}
                  <div className="flex items-center border-b border-purple-900/20 bg-[#090b14] px-2 text-xs font-mono">
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveTab('ml_pipeline.py');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'ml_pipeline.py'
                          ? 'border-cyan-400 text-cyan-300 bg-[#0c0e18]'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ml_pipeline.py</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.click();
                        setActiveTab('gui_tokens.json');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'gui_tokens.json'
                          ? 'border-cyan-400 text-cyan-300 bg-[#0c0e18]'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>gui_tokens.json</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.click();
                        setActiveTab('telemetry.log');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'telemetry.log'
                          ? 'border-cyan-400 text-cyan-300 bg-[#0c0e18]'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>telemetry.log</span>
                    </button>
                  </div>

                  {/* Code Content Area */}
                  <div className="p-4 font-mono text-xs text-left leading-relaxed overflow-x-auto min-h-[220px]">
                    {activeTab === 'ml_pipeline.py' && (
                      <pre className="text-slate-300 animate-fadeIn">
                        <span className="text-purple-400">import</span> <span className="text-yellow-300">pandas</span> <span className="text-purple-400">as</span> <span className="text-yellow-300">pd</span>{'\n'}
                        <span className="text-purple-400">from</span> <span className="text-yellow-300">sklearn.ensemble</span> <span className="text-purple-400">import</span> <span className="text-yellow-300">RandomForestClassifier</span>{'\n'}
                        <span className="text-purple-400">from</span> <span className="text-yellow-300">sklearn.preprocessing</span> <span className="text-purple-400">import</span> <span className="text-yellow-300">StandardScaler</span>{'\n'}
                        {'\n'}
                        <span className="text-slate-400"># Data preprocessing & feature scaling</span>{'\n'}
                        scaler = StandardScaler(){'\n'}
                        X_scaled = scaler.fit_transform(X_train){'\n'}
                        {'\n'}
                        <span className="text-slate-400"># Train predictive model</span>{'\n'}
                        rf = RandomForestClassifier(n_estimators=<span className="text-amber-400">100</span>, random_state=<span className="text-amber-400">42</span>){'\n'}
                        rf.fit(X_scaled, y_train){'\n'}
                        accuracy = rf.score(scaler.transform(X_test), y_test){'\n'}
                        <span className="text-purple-400">print</span>(<span className="text-emerald-400">f"Model Accuracy: &#123;accuracy * 100:.2f&#125;%"</span>)
                      </pre>
                    )}

                    {(activeTab === 'gui_tokens.json' || activeTab === 'payload.json') && (
                      <pre className="text-slate-300 animate-fadeIn">
                        &#123;{'\n'}
                        {'  '}<span className="text-indigo-300">"design_system"</span>: <span className="text-emerald-400">"Cosmic Modern Dark"</span>,{'\n'}
                        {'  '}<span className="text-indigo-300">"color_palette"</span>: &#123;{'\n'}
                        {'    '}<span className="text-indigo-300">"primary_cyan"</span>: <span className="text-emerald-400">"#38bdf8"</span>,{'\n'}
                        {'    '}<span className="text-indigo-300">"accent_violet"</span>: <span className="text-emerald-400">"#a855f7"</span>,{'\n'}
                        {'    '}<span className="text-indigo-300">"obsidian_bg"</span>: <span className="text-emerald-400">"#08090e"</span>{'\n'}
                        {'  '}&#125;,{'\n'}
                        {'  '}<span className="text-indigo-300">"typography"</span>: [<span className="text-emerald-400">"Inter"</span>, <span className="text-emerald-400">"JetBrains Mono"</span>],{'\n'}
                        {'  '}<span className="text-indigo-300">"spring_physics"</span>: &#123; <span className="text-indigo-300">"stiffness"</span>: <span className="text-amber-400">100</span>, <span className="text-indigo-300">"damping"</span>: <span className="text-amber-400">14</span> &#125;{'\n'}
                        &#125;
                      </pre>
                    )}

                    {activeTab === 'telemetry.log' && (
                      <pre className="text-slate-300 font-mono text-[11px] leading-loose animate-fadeIn">
                        <span className="text-emerald-400">[DATA PREP]</span> StandardScaler applied to 11 physicochemical features{'\n'}
                        <span className="text-cyan-400">[ML TRAIN]</span> RandomForestClassifier fitted with 100 estimators{'\n'}
                        <span className="text-purple-400">[EDA VISUALS]</span> Correlation matrix & feature importances rendered{'\n'}
                        <span className="text-amber-400">[HACKATHON]</span> SIH mobile app architecture verified & operational{'\n'}
                        <span className="text-emerald-400">[STATUS]</span> Data science & application builds nominal.
                      </pre>
                    )}

                    {/* Terminal simulation feedback */}
                    {simOutput && (
                      <div className="mt-3 pt-3 border-t border-purple-900/30 text-[11px] font-mono text-cyan-400 bg-cyan-950/20 p-2.5 rounded-lg whitespace-pre-line animate-fadeIn">
                        {simOutput}
                      </div>
                    )}
                  </div>

                  {/* Bottom Status bar */}
                  <div className="px-4 py-1.5 bg-[#080a12] border-t border-purple-900/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Sparkles className="w-3 h-3" /> Python 3.11 • Scikit-Learn
                      </span>
                      <span>{activeTab === 'gui_tokens.json' || activeTab === 'payload.json' ? 'JSON' : activeTab === 'telemetry.log' ? 'LOG' : 'Python 3.11'}</span>
                    </div>
                    <div className="text-cyan-400">
                      System: Nominal
                    </div>
                  </div>

                </div>
              </div>
            </PopUpCard>
          </div>

        </div>

        {/* Global Statistics Strip: Staggered Scrolling Pop-Up Cards */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          {personalInfo.stats.map((stat, idx) => (
            <PopUpCard key={idx} index={idx} delay={0.15 + idx * 0.08} className="w-full">
              <div 
                className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-b from-[#13172e]/90 via-[#0d1022]/90 to-[#080913]/95 border border-white/10 hover:border-cyan-400/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 text-center group"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 mb-1.5 group-hover:scale-105 transition-transform font-mono">
                  <CountUp endVal={stat.value} />
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </PopUpCard>
          ))}
        </div>

      </div>
    </section>
  );
}
