import React, { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { RekulaCapstoneStage } from '../components/RekulaCapstoneStage';
import { ArrowUpRight, MessageSquare, RotateCcw } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();
  const [progress, setProgress] = useState(0);
  const [replaySignal, setReplaySignal] = useState(0);

  const handleProgressChange = useCallback((p: number) => {
    setProgress(p);
  }, []);

  const handleReplay = () => {
    setReplaySignal((prev) => prev + 1);
  };

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
    <div className="relative w-full h-[100dvh] overflow-hidden bg-void select-none flex flex-col justify-between text-cream">
      
      {/* ─────────────────────────────────────────────────────────────
          1. 3D WEBGL STAGE (CAP & HAND MOVE ON THEIR OWN UPON OPEN)
          ───────────────────────────────────────────────────────────── */}
      <RekulaCapstoneStage
        onProgressChange={handleProgressChange}
        replaySignal={replaySignal}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. HERO TITLE (VISIBLE ON OPEN, FADES OUT AS ANIMATION GLIDES)
          Zero cluttered small text on the top or right side
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-6 sm:left-12 top-28 sm:top-36 z-20 pointer-events-none transition-transform will-change-transform"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslate}px)`,
          visibility: heroOpacity <= 0 ? 'hidden' : 'visible',
        }}
      >
        <h1 className="font-serif text-[60px] sm:text-[96px] lg:text-[136px] font-medium uppercase tracking-tight text-cream leading-[0.88]">
          RE<span className="text-softblue">:</span>KULA
        </h1>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE VALUE PROPOSITION & ACTIONS (REVEALED IN PALM STATE)
          Straightforward: what the business is about, nothing overwhelming
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
          
          {/* Left Column: Mission Headline & Curriculum */}
          <div className="lg:col-span-4 text-left space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted block">
              ACADEMIC SUPPORT & CONSULTING
            </span>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
              YOUR ACADEMIC FUTURE IN <span className="text-softblue italic">TRUSTED HANDS.</span>
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
          <div className="lg:col-span-4 h-[200px] sm:h-[300px] lg:h-[400px] flex items-center justify-center relative pointer-events-none">
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cream-muted/60">
                [ 3D ARTIFACT · DRAG TO ROTATE ]
              </span>
            </div>
          </div>

          {/* Right Column: Clear, Straightforward Summary & Primary CTAs */}
          <div className="lg:col-span-4 text-left space-y-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted block">
              OUR PROMISE
            </span>

            <p className="text-[18px] sm:text-[22px] lg:text-[25px] font-normal leading-[1.3] text-cream">
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
          4. BOTTOM MINIMAL BAR (REPLAY OPTION & LOCATION)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full px-6 sm:px-12 pb-5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-cream-muted pointer-events-none">
        <div className="pointer-events-auto">
          {finalProgress > 0.6 ? (
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 text-softblue hover:text-white transition-colors cursor-pointer group"
              title="Replay 3D Sequence"
            >
              <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform" />
              <span>REPLAY SEQUENCE</span>
            </button>
          ) : (
            <span className="text-cream-muted">GROW AGAIN</span>
          )}
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <span>PRETORIA & GLOBAL ONLINE</span>
        </div>
      </div>

    </div>
  );
};
