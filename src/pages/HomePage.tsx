import React from 'react';
import { useApp } from '../context/AppContext';
import { RekulaHand3D } from '../components/RekulaHand3D';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();

  return (
    <div className="relative w-full min-h-[100dvh] bg-void text-cream flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-12 overflow-hidden select-none">
      
      {/* Background subtle darkroom glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-softblue/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Vertical Sidebar Label (Right margin strictly from ORYZO) */}
      <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-6 z-20 items-center gap-3 rotate-90 origin-right pointer-events-none select-none">
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-cream-muted whitespace-nowrap">
          RE:KULA · CAPS · IEB · CAMBRIDGE INTERNATIONAL · PRETORIA
        </span>
        <span className="w-12 h-px bg-border-cork" />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left border-b border-dashed border-border-cork pb-4">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-ember flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-ember" />
            <span>ELITE ACADEMIC SUPPORT · PRETORIA & ONLINE</span>
          </span>
          <p className="text-[11px] sm:text-[13px] font-medium tracking-[0.18em] uppercase text-cream-muted">
            TAGLINE: GROW AGAIN
          </p>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-cream-muted">
          <span className="text-softblue">CAPS</span>
          <span>·</span>
          <span className="text-softblue">IEB</span>
          <span>·</span>
          <span className="text-softblue">CAMBRIDGE</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CENTER HERO: THE 3D HAND VOID PRESENTATION
          Three-column layout: Left Headline / Center 3D Hand / Right Body
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-10">
        
        {/* Left Column: Bold Sculptural Headline (Line-height 0.9 strictly from ORYZO) */}
        <div className="lg:col-span-4 text-left space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted block">
            CORE MISSION
          </span>

          <h1 className="font-serif text-[40px] sm:text-[52px] lg:text-[58px] font-medium uppercase tracking-tight text-cream leading-[0.91]">
            MEETING EVERY LEARNER <span className="text-softblue italic">WHERE THEY ARE.</span>
          </h1>

          <div className="dashed-divider my-3" />

          <p className="text-xs sm:text-[13px] text-cream-muted leading-relaxed max-w-sm">
            Whatever the reason a learner has fallen behind, we close the gap, build confidence, and help them grow again without judgement.
          </p>
        </div>

        {/* Center Column: Interactive 3D Hand Launching from start to finish */}
        <div className="lg:col-span-4 h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center relative">
          <RekulaHand3D className="w-full h-full" />
          
          {/* Subtle micro-prompt below the 3D hand */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none text-center">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cream-muted/70">
              [ 3D HAND ARTIFACT · DRAG TO INTERACT ]
            </span>
          </div>
        </div>

        {/* Right Column: Conversational Descriptive Voice (26–28px mixed-case) & Direct CTAs */}
        <div className="lg:col-span-4 text-left space-y-5">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted block">
            INDIVIDUALIZED EDUCATION
          </span>

          <p className="text-[20px] sm:text-[24px] lg:text-[27px] font-normal leading-[1.28] text-cream">
            Bespoke academic catch-up, curriculum bridging, and examination mastery planned around real life.
          </p>

          {/* Primary Action Buttons (Pill-shaped controls) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => openConsultationModal()}
              className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3.5 text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-void" />
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase transition-all text-center"
            >
              Services
            </button>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-400 hover:underline font-mono inline-flex items-center gap-1.5 uppercase tracking-wider"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp: +27 67 435 0849</span>
            </a>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM MINIMAL CONTROL BAR (CLEAN, STRAIGHTFORWARD, NO SLOP)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full pt-4 border-t border-dashed border-border-cork flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[9px] font-mono uppercase tracking-widest text-cream-muted">
        <div>
          <span>FOUNDED BY SHAWN MALULEKE (B.ED, 22 DISTINCTIONS · HONS CUM LAUDE · M.ED CANDIDATE)</span>
        </div>

        <div className="flex items-center gap-4 text-cream-muted">
          <span>PRETORIA & GLOBAL ONLINE</span>
          <span>·</span>
          <span className="text-ember font-medium">ZERO PRICING DISPLAYED · TAILORED ASSESSMENTS</span>
        </div>
      </div>

    </div>
  );
};
