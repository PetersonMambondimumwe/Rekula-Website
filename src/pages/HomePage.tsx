import React, { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { RekulaCapstoneStage } from '../components/RekulaCapstoneStage';
import { MotionBackground } from '../components/MotionBackground';
import { ShinyText } from '../components/ShinyText';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();
  const [progress, setProgress] = useState(0);

  const handleProgressChange = useCallback((p: number) => {
    setProgress(p);
  }, []);

  const smoothstep = (a: number, b: number, x: number) => {
    const v = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return v * v * (3 - 2 * v);
  };

  // Synchronized cross-fades driven by the automatic animation clock
  const heroOpacity = Math.max(0, 1 - smoothstep(0.0, 0.40, progress));
  const heroTranslate = -smoothstep(0.0, 0.40, progress) * 24;

  const finalProgress = smoothstep(0.35, 0.85, progress);
  const finalTranslate = (1 - finalProgress) * 20;

  return (
    <div className="relative w-full bg-void select-none text-cream">
      
      {/* ─────────────────────────────────────────────────────────────
          1. 3D HERO VIEWPORT (CAP & HAND MOVE ON THEIR OWN UPON OPEN)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between">
        
        {/* Full-screen Dark Blue Ambient Video Motion Background */}
        <MotionBackground />

        {/* 3D WebGL Canvas Layer */}
        <RekulaCapstoneStage
          onProgressChange={handleProgressChange}
        />

        {/* Hero Brand Title (Visible on open, fades out as animation glides) */}
        <div
          className="absolute left-6 sm:left-12 top-28 sm:top-36 z-20 pointer-events-none transition-transform will-change-transform"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslate}px)`,
            visibility: heroOpacity <= 0 ? 'hidden' : 'visible',
          }}
        >
          <div className="flex items-center gap-4 sm:gap-7">
            <div className="w-14 h-14 sm:w-24 sm:h-24 lg:w-36 lg:h-36 shrink-0">
              <img
                src="/assets/rekula-logo-cream.png"
                alt="Re:kula Logo"
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </div>
            <h1 className="font-serif text-[42px] sm:text-[76px] lg:text-[132px] font-medium tracking-tight text-cream leading-[0.88]">
              Re<span className="text-softblue">:</span>kula
            </h1>
          </div>
        </div>

        {/* Core Value Proposition & Actions (Revealed in palm state) */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 pointer-events-auto transition-transform will-change-transform overflow-y-auto lg:overflow-visible pt-24 pb-16 lg:py-0"
          style={{
            opacity: finalProgress,
            transform: `translateY(${finalTranslate}px)`,
            visibility: finalProgress <= 0 ? 'hidden' : 'visible',
          }}
        >
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
            
            {/* Left Column: Mission Headline & Curriculum */}
            <div className="lg:col-span-4 text-left space-y-4">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-cream block">
                ACADEMIC SUPPORT & CONSULTATION
              </span>

              <h2 className="font-serif text-[28px] sm:text-[42px] lg:text-[50px] font-medium uppercase tracking-tight text-cream leading-[0.94]">
                YOUR ACADEMIC FUTURE IN <ShinyText className="italic">TRUSTED HANDS.</ShinyText>
              </h2>

              <div className="dashed-divider my-3" />

              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cream-muted">
                <span className="text-softblue font-medium">CAPS</span>
                <span>·</span>
                <span className="text-softblue font-medium">IEB</span>
                <span>·</span>
                <span className="text-softblue font-medium">CAMBRIDGE</span>
              </div>
            </div>

            {/* Center Column: Spatial Void for the Live 3D Hand & Cap */}
            <div className="hidden lg:flex lg:col-span-4 lg:h-[400px] items-center justify-center relative pointer-events-none" />

            {/* Right Column: Clear, Straightforward Summary & Primary CTAs */}
            <div className="lg:col-span-4 text-left space-y-5 pl-3 sm:pl-5 lg:pl-16 xl:pl-24">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-cream block">
                OUR PURPOSE
              </span>

              <p className="text-[17px] sm:text-[22px] lg:text-[25px] font-semibold leading-[1.3] text-cream">
                Learning support that meets every learner where they are.
              </p>

              {/* Primary Action Buttons (Pill-shaped controls) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pointer-events-auto">
                <button
                  onClick={() => openConsultationModal()}
                  className="group rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3.5 text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-void transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase transition-all text-center cursor-pointer w-full sm:w-auto"
                >
                  Explore Services
                </button>
              </div>

              <div className="pt-2 flex items-center gap-3 pointer-events-auto">
                <a
                  href="https://wa.me/27674350849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white hover:underline font-mono inline-flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-softblue" />
                  <span>Chat on WhatsApp: +27 67 435 0849</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HOW WORKING WITH US WORKS
          ───────────────────────────────────────────────────────────── */}
      <HowItWorksSection />

    </div>
  );
};
