import React, { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { RekulaCapstoneStage } from '../components/RekulaCapstoneStage';
import { ArrowUpRight, MessageSquare, ChevronDown } from 'lucide-react';

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

  // Interpolations matching the Capstone design system
  const heroOpacity = 1 - smoothstep(0.06, 0.22, progress);
  const heroTranslate = -smoothstep(0.06, 0.22, progress) * 32;

  const hintOpacity = 1 - smoothstep(0.0, 0.08, progress);

  const finalProgress = smoothstep(0.80, 0.96, progress);
  const finalTranslate = (1 - finalProgress) * 24;

  const handleScrollToReveal = () => {
    const trackEl = document.getElementById('rekula-track');
    if (trackEl) {
      window.scrollTo({
        top: trackEl.offsetHeight - window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div id="rekula-track" className="relative w-full h-[400vh] bg-void select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          STAGE: STICKY 100VH VIEWPORT
          ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between text-cream">
        
        {/* 3D WebGL Canvas Layer */}
        <RekulaCapstoneStage
          onProgressChange={handleProgressChange}
          onRequestScrollDown={handleScrollToReveal}
        />

        {/* ─────────────────────────────────────────────────────────────
            TOP PERSISTENT OVERLAYS
            ───────────────────────────────────────────────────────────── */}
        {/* Vertical Sidebar Label (Right margin from Capstone/ORYZO) */}
        <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-6 z-20 items-center gap-3 rotate-90 origin-right pointer-events-none select-none">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-cream-muted whitespace-nowrap">
            RE:KULA · CLASS OF 2026 · PRETORIA & ONLINE
          </span>
          <span className="w-12 h-px bg-border-cork" />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERO LAYER (VISIBLE AT TOP OF SCROLL TRACK, FADES OUT SMOOTHLY)
            ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute left-6 sm:left-12 top-24 sm:top-28 z-20 pointer-events-none transition-transform will-change-transform"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslate}px)`,
            visibility: heroOpacity <= 0 ? 'hidden' : 'visible',
          }}
        >
          <p className="text-[11px] sm:text-[13px] font-medium tracking-[0.25em] uppercase text-cream-muted mb-2">
            MADE FOR THE MOMENT YOU’VE EARNED.
          </p>

          <h1 className="font-serif text-[56px] sm:text-[90px] lg:text-[128px] font-medium uppercase tracking-tight text-cream leading-[0.88]">
            RE<span className="text-softblue">:</span>KULA
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-[12px] sm:text-[14px] font-mono tracking-[0.2em] uppercase text-ember font-medium">
              TAGLINE: GROW AGAIN
            </span>
            <span className="text-cream-muted">·</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-cream-muted">
              PRETORIA & GLOBAL ONLINE
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SCROLL HINT (BOTTOM LEFT AT SCROLL = 0)
            ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute left-6 sm:left-12 bottom-8 z-20 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted cursor-pointer group"
          style={{
            opacity: hintOpacity,
            visibility: hintOpacity <= 0 ? 'hidden' : 'visible',
          }}
          onClick={handleScrollToReveal}
        >
          <span className="w-10 sm:w-16 border-t border-dashed border-cream group-hover:border-softblue transition-colors" />
          <span className="group-hover:text-cream transition-colors flex items-center gap-1.5">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FINAL REVEAL LAYER (EMERGES WHEN HAND CATCHES CAP AT BOTTOM)
            ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 pointer-events-none transition-transform will-change-transform"
          style={{
            opacity: finalProgress,
            transform: `translateY(${finalTranslate}px)`,
            visibility: finalProgress <= 0 ? 'hidden' : 'visible',
          }}
        >
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Bold Sculptural Mission Headline */}
            <div className="lg:col-span-4 text-left space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted block">
                CORE PHILOSOPHY
              </span>

              <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
                YOUR ACADEMIC FUTURE IN <span className="text-softblue italic">TRUSTED HANDS.</span>
              </h2>

              <div className="dashed-divider my-3" />

              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cream-muted">
                <span className="text-softblue">CAPS</span>
                <span>·</span>
                <span className="text-softblue">IEB</span>
                <span>·</span>
                <span className="text-softblue">CAMBRIDGE</span>
              </div>
            </div>

            {/* Center Column: Spatial Void for the Live 3D Hand & Cap */}
            <div className="lg:col-span-4 h-[220px] sm:h-[320px] lg:h-[420px] flex items-center justify-center relative pointer-events-none">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cream-muted/70">
                  [ 3D ARTIFACT · DRAG TO ROTATE ]
                </span>
              </div>
            </div>

            {/* Right Column: Conversational Voice & Primary Pill CTAs */}
            <div className="lg:col-span-4 text-left space-y-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted block">
                MEETING EVERY LEARNER
              </span>

              <p className="text-[20px] sm:text-[24px] lg:text-[27px] font-normal leading-[1.28] text-cream">
                Whatever the reason a learner has fallen behind, we close the gap, build confidence, and guide them to their capstone moment without judgement.
              </p>

              {/* Primary Action Buttons (Pill-shaped controls) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pointer-events-auto">
                <button
                  onClick={() => openConsultationModal()}
                  className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3.5 text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-void" />
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase transition-all text-center cursor-pointer"
                >
                  Explore Services
                </button>
              </div>

              <div className="pt-2 flex items-center gap-3 pointer-events-auto">
                <a
                  href="https://wa.me/27674350849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline font-mono inline-flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp: +27 67 435 0849</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM MINIMAL CONTROL & ATTRIBUTION BAR
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full px-6 sm:px-12 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-cream-muted pointer-events-none">
          <div>
            <span className="text-ember">* RENDERED LIVE WITH THREE.JS</span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">FOUNDED BY SHAWN MALULEKE (B.ED, 22 DISTINCTIONS · HONS CUM LAUDE · M.ED CANDIDATE)</span>
          </div>

          <div className="flex items-center gap-4 text-cream-muted pointer-events-auto">
            <span>PRETORIA & GLOBAL ONLINE</span>
            <span>·</span>
            {progress > 0.75 ? (
              <button
                onClick={handleScrollToTop}
                className="text-softblue hover:underline cursor-pointer"
              >
                BACK TO TOP ↑
              </button>
            ) : (
              <span className="text-cream-muted">GROW AGAIN</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
