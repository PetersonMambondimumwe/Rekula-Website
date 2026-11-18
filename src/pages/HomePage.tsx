import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full bg-transparent text-[#F5F1EA]">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL ACADEMIC CONSULTANCY HERO
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100dvh] flex items-center overflow-hidden bg-transparent pt-28 pb-16 lg:pt-24 lg:pb-12">
        {/* Atmospheric Deep Navy & Subtle Electric Blue Radial Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse 52% 62% at 74% 48%, rgba(28, 102, 188, 0.28), transparent 72%)',
              'radial-gradient(ellipse 38% 42% at 12% 24%, rgba(20, 70, 134, 0.18), transparent 70%)',
              'radial-gradient(ellipse 46% 36% at 88% 92%, rgba(54, 169, 245, 0.18), transparent 68%)',
            ].join(', '),
          }}
        />

        {/* Restrained Architectural Sapphire Arc Framing Right Composition */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-75"
        >
          <defs>
            <linearGradient id="rekulaHeroArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#36A9F5" stopOpacity="0.05" />
              <stop offset="45%" stopColor="#36A9F5" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#36A9F5" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="rekulaBottomSweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#36A9F5" stopOpacity="0" />
              <stop offset="55%" stopColor="#36A9F5" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#36A9F5" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M 1010 -40 C 760 65, 650 280, 680 510"
            stroke="url(#rekulaHeroArc)"
            strokeWidth="1.25"
          />
          <path
            d="M 920 910 C 1110 815, 1290 770, 1480 735"
            stroke="url(#rekulaBottomSweep)"
            strokeWidth="1.25"
          />
        </svg>

        {/* Hero Two-Column Content Grid */}
        <div className="relative z-20 max-w-[1360px] mx-auto w-full px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
            {/* Left Column: Editorial Headline, Supporting Copy & CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 text-left space-y-7 lg:pr-6"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="w-7 h-px bg-[#36A9F5]/75 shrink-0"
                />
                <span className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.22em] text-[#7CC4F8]">
                  ACADEMIC SUPPORT &amp; CONSULTATION
                </span>
              </div>

              {/* Oversized Serif Headline */}
              <h1 className="font-serif text-[44px] sm:text-[58px] lg:text-[66px] xl:text-[74px] font-medium tracking-[-0.02em] text-[#F5F1EA] leading-[1.03]">
                Your Academic
                <br />
                Future in
                <br />
                <span className="italic text-[#36A9F5]">Trusted</span> Hands.
              </h1>

              {/* Clean Sans-Serif Supporting Copy */}
              <p className="font-sans text-base sm:text-[18px] text-[#AAB6C5] leading-[1.6] max-w-md">
                Personalised support. Proven results.
                <br className="hidden sm:inline" /> A brighter future.
              </p>

              {/* Primary & Secondary Pill CTAs */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openConsultationModal()}
                  className="group rounded-full bg-[#36A9F5] hover:bg-[#4BB4F7] text-[#050D18] px-7 py-3.5 text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_14px_34px_-12px_rgba(54,169,245,0.5)] active:scale-[0.98] inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>REQUEST CONSULTATION</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="group rounded-full border border-[#36A9F5]/45 hover:border-[#36A9F5] bg-[#0B192B]/45 hover:bg-[#10243D]/75 text-[#F5F1EA] px-7 py-3.5 text-xs font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>EXPLORE SERVICES</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#36A9F5] transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Subtle Curriculum Compatibility Metadata */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#8FA1B3]">
                <span>CAPS</span>
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-[#36A9F5]/65"
                />
                <span>IEB</span>
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-[#36A9F5]/65"
                />
                <span>CAMBRIDGE</span>
              </div>
            </motion.div>

            {/* Right Column: Graduation Cap Hovering Above Outstretched Hand */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, x: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.85,
                delay: prefersReducedMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-6 relative flex items-center justify-center lg:justify-end"
            >
              {/* Soft Studio Radial Backdrop Behind Cap & Hand */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full opacity-90"
                style={{
                  background:
                    'radial-gradient(ellipse 62% 58% at 54% 48%, rgba(54, 169, 245, 0.20) 0%, rgba(16, 48, 86, 0.16) 45%, transparent 74%)',
                }}
              />

              <div className="relative w-full max-w-[540px] lg:max-w-none lg:w-[114%] lg:-mr-12 xl:-mr-20 select-none pointer-events-none">
                <img
                  src="/assets/rekula-capstone-combined.png"
                  alt="Graduation cap resting gently above an outstretched hand"
                  className="w-full h-auto object-contain filter contrast-[1.04] brightness-[0.96] drop-shadow-[0_28px_48px_rgba(0,0,0,0.72)]"
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
                    maskImage:
                      'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. HOW WORKING WITH US WORKS
          ───────────────────────────────────────────────────────────── */}
      <HowItWorksSection />
    </div>
  );
};
