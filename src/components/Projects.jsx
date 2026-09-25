import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import PopUpCard from './PopUpCard';
import AnimatedSection from './AnimatedSection';
import { projectsData } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Lock background scrolling and allow ESC key to close when project modal is open
  useEffect(() => {
    if (activeModalProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModalProject]);

  const categories = ["All Projects", "Mobile & Web Apps", "AI & Machine Learning", "Data Science & Analytics"];

  const filteredProjects = selectedCategory === "All Projects" || selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleOpenModal = (project) => {
    sound.click();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    sound.click();
    setActiveModalProject(null);
  };

  const cardGlows = ['purple', 'cyan', 'pink', 'emerald'];

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Spring Pop-Up */}
        <AnimatedSection direction="pop" className="flex flex-col items-center text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-2">
            // Featured Work // Chapter 03
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            AI Models, Data Science & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">Application Engineering</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Multilingual AI mobile applications, small-business marketing assistants, data science pipelines, and cross-platform apps built by Selva Guru Karthikeyan P.
          </p>
        </AnimatedSection>

        {/* Filter Pills */}
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
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-[#121524] text-slate-300 hover:text-white hover:bg-[#1a1e33] border border-purple-900/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: Staggered Balanced 2-Column Pop-Up Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <PopUpCard 
              key={project.id} 
              index={idx}
              delay={idx * 0.1} 
              glowColor={cardGlows[idx % cardGlows.length]}
              className="h-full"
            >
              <div
                className="group relative h-full rounded-3xl bg-gradient-to-b from-[#13172e]/95 via-[#0d1022]/95 to-[#080913]/98 border border-white/10 hover:border-cyan-400/50 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] transition-[border-color,box-shadow] duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top specular glow line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Corner ambient orb */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-500/10 group-hover:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

                <div>
                  {/* Image & Overlay Header */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#070913]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1022] via-[#0d1022]/50 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#0b0e1b]/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]"></span>
                        {project.badge}
                      </span>
                    </div>

                    {/* Quick Expand Button */}
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-cyan-500 text-slate-300 hover:text-black backdrop-blur-md transition-all shadow-md cursor-pointer z-10"
                      title="View Full Architecture"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                      {project.description}
                    </p>

                    {/* Impact Metric Box */}
                    <div className="p-3 rounded-2xl bg-[#090c1a]/90 border border-white/[0.08] text-xs font-mono text-emerald-400 mb-5 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-slate-300 font-sans">Core Focus:</span>
                      </div>
                      <span className="font-semibold text-emerald-300">{project.metrics}</span>
                    </div>

                    {/* Highlights bullet preview */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="space-y-1.5 mb-5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:border-cyan-400/40 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 sm:p-7 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenModal(project)}
                    onMouseEnter={() => sound.hover()}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    Deep Dive
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-purple-900/50 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer shadow-sm"
                      title="View Source on GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white transition-all shadow-md shadow-purple-600/30 cursor-pointer"
                      title="Explore Project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </PopUpCard>
          ))}
        </div>

        {/* Modal for Deep-Dive Architecture Inspection with Spring Pop-Up - Portaled to document.body to prevent any section clipping */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {activeModalProject && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
                onClick={handleCloseModal}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.88, y: 32 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.90, y: 24 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#0c0e1e]/98 border border-purple-500/40 p-6 sm:p-8 shadow-2xl text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top specular glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 hover:text-white border border-purple-800/40 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Modal Category & Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-800/40">
                      {activeModalProject.badge}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {activeModalProject.category}
                    </span>
                  </div>

                  {/* Modal Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    {activeModalProject.title}
                  </h3>

                  {/* Modal Image */}
                  <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 border border-purple-900/30">
                    <img
                      src={activeModalProject.image}
                      alt={activeModalProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Full Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-purple-300 uppercase tracking-wider mb-2">
                      System Architecture & Deep Dive
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {activeModalProject.fullDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3">
                      Key Technical Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {activeModalProject.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                      Integrated Stacks & Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-950/40 text-purple-200 border border-purple-800/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-purple-900/30">
                    <a
                      href={activeModalProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Launch Interactive Demo
                    </a>
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      className="py-3 px-5 rounded-xl bg-[#14182b] hover:bg-purple-900/40 text-slate-200 hover:text-white border border-purple-800/40 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
                      View GitHub
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
}
