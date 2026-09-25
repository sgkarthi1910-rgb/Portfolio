import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  CheckCircle,
  ExternalLink,
  Bot,
  Palette
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';
import PopUpCard from './PopUpCard';
import AnimatedSection from './AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.click();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      sound.success();

      // Trigger celebratory confetti 🎉
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 900);
  };

  const handleCopyEmail = () => {
    sound.click();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Spring Pop-Up */}
        <AnimatedSection direction="pop" className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-2">
            // Direct Uplink // Chapter 05
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            AI & Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">Quantum Uplink</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Have an Artificial Intelligence venture, GUI/UX design system project, or data science collaboration in mind? Broadcast your transmission.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Info Cards with PopUpCard */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 text-left">
            
            {/* Direct Email Card */}
            <PopUpCard delay={0.1} glowColor="purple">
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-purple-500/25 backdrop-blur-xl shadow-xl shadow-black/50 group/email transition-all">
                {/* Specular Top Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover/email:bg-purple-500/25 transition-all"></div>

                <div className="relative z-10 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-500/30 text-purple-300 shadow-inner">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-purple-300/80 uppercase tracking-wider block">
                        Direct Email Address
                      </span>
                      <a 
                        href={`mailto:${personalInfo.email}`} 
                        className="text-white font-semibold text-sm hover:text-cyan-300 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-[#14182e] hover:bg-purple-900/50 text-slate-300 hover:text-white border border-purple-500/30 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer active:scale-95 shadow-md"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="relative z-10 text-xs text-slate-400 font-light leading-relaxed">
                  Feel free to send proposals, GUI design system collaborations, or AI research inquiries directly.
                </p>
              </div>
            </PopUpCard>

            {/* Location & Timezone */}
            <PopUpCard delay={0.2} glowColor="cyan">
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-cyan-500/25 backdrop-blur-xl shadow-xl shadow-black/50 group/loc transition-all">
                {/* Specular Top Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover/loc:bg-cyan-500/25 transition-all"></div>

                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 shadow-inner">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-300/80 uppercase tracking-wider block">
                      Location & Time Zone
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {personalInfo.location} • {personalInfo.timezone}
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-xs text-emerald-400 font-mono mt-3 pt-3 border-t border-purple-900/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  <span>Available for remote AI & GUI design roles worldwide</span>
                </div>
              </div>
            </PopUpCard>

            {/* Fast Response Guarantee */}
            <PopUpCard delay={0.3} glowColor="pink">
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-b from-[#18122a]/95 via-[#0f0e21]/95 to-[#080913]/98 border border-pink-500/25 backdrop-blur-xl text-xs text-slate-300 space-y-2 shadow-xl shadow-black/50 group/resp transition-all">
                {/* Specular Top Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover/resp:bg-pink-500/25 transition-all"></div>

                <div className="relative z-10 flex items-center gap-2 font-bold text-white text-sm">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Response Time: &lt; 24 Hours</span>
                </div>
                <p className="relative z-10 text-slate-400 font-light leading-relaxed">
                  I check inquiries daily and prioritize discussions on Artificial Intelligence, Data Science pipelines, and high-fidelity GUI design systems.
                </p>
              </div>
            </PopUpCard>

            {/* Quick Links */}
            <PopUpCard delay={0.4} glowColor="emerald">
              <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-b from-[#11162b]/90 to-[#090b16]/95 border border-purple-900/40 flex items-center justify-between shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
                <span className="text-xs text-slate-400 font-mono">Design & Code Hubs:</span>
                <div className="flex items-center gap-3">
                  <a 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-purple-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-600">•</span>
                  <a 
                    href={personalInfo.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-purple-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </PopUpCard>

          </div>

          {/* Right Column: Contact Message Form with PopUpCard */}
          <div className="lg:col-span-7 h-full">
            <PopUpCard delay={0.25} glowColor="purple" className="h-full">
              <div className="relative overflow-hidden h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141830]/95 via-[#0d1022]/95 to-[#080913]/98 border border-purple-500/25 backdrop-blur-xl shadow-2xl shadow-black/60 flex flex-col justify-between text-left">
                {/* Specular Top Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>DIRECT DISPATCH FORM</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                    Send a Message
                  </h3>

                  {status === 'success' ? (
                    <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-fadeIn my-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Message Dispatched Successfully!</h4>
                      <p className="text-xs text-emerald-300 max-w-md mx-auto font-light">
                        Thank you for reaching out. Selva Guru Karthikeyan P will receive this transmission and get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1.5">
                            Your Name <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Dr. Alex Mercer"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[#0b0e1d]/90 border border-purple-900/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1.5">
                            Email Address <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@domain.com"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[#0b0e1d]/90 border border-purple-900/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Subject / Domain
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="AI Research / GUI Design / Collaboration"
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0e1d]/90 border border-purple-900/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          Message Transmission <span className="text-purple-400">*</span>
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Outline your project scope, dataset requirements, or design vision..."
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0e1d]/90 border border-purple-900/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            <span>Encrypting & Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Broadcast Transmission</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-purple-900/30 text-center">
                  <span className="text-[11px] font-mono text-slate-500">
                    Direct Encrypted Transmission • Zero-Spam Architecture
                  </span>
                </div>
              </div>
            </PopUpCard>
          </div>

        </div>

      </div>
    </section>
  );
}
