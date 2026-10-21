import React from 'react';
import { useApp } from '../context/AppContext';
import { RekulaArtifact3D } from '../components/RekulaArtifact3D';
import { audienceList, processSteps } from '../data/initialData';
import { ArrowUpRight, ArrowRight, Play, MessageSquare, ChevronRight, Check } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    openConsultationModal,
    setActiveTab,
    publishedServices,
    navigateToService,
    featuredTestimonials,
  } = useApp();

  return (
    <div className="w-full bg-void text-cream overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (FULL-VIEWPORT 100VH PHOTOGRAPHIC EDITORIAL)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-12 border-b border-dashed border-border-cork">
        
        {/* Cinematic Background Image with darkroom grading */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=85"
            alt="Re:kula focused learner in warm darkroom studio"
            className="w-full h-full object-cover object-center brightness-[0.22] contrast-[1.15] filter"
          />
          {/* Subtle vignette and warm ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/70" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-softblue/10 rounded-full blur-[140px]" />
        </div>

        {/* Vertical Sidebar Label (Rotated 90° down right margin strictly from ORYZO) */}
        <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-6 z-20 items-center gap-3 rotate-90 origin-right pointer-events-none select-none">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-cream-muted whitespace-nowrap">
            RE:KULA · CAPS · IEB · CAMBRIDGE INTERNATIONAL · PRETORIA
          </span>
          <span className="w-12 h-px bg-border-cork" />
        </div>

        {/* Top Hero Lockup (Tagline + Massive Wordmark & Headline strictly from ORYZO spec) */}
        <div className="relative z-10 max-w-5xl space-y-3 pt-6 text-left">
          {/* Tagline above */}
          <p className="text-[11px] sm:text-[13px] font-medium tracking-[0.2em] uppercase text-cream-muted">
            TAILORED ACADEMIC SUPPORT FOR LEARNERS OF EVERY AGE AND STAGE
          </p>

          {/* Massive Display Headline in sculptural uppercase line-height 0.9 */}
          <h1 className="font-serif text-[42px] sm:text-[62px] lg:text-[76px] font-medium uppercase tracking-tight text-cream leading-[0.92] max-w-4xl">
            LEARNING SUPPORT THAT MEETS EVERY LEARNER <span className="text-softblue italic">WHERE THEY ARE.</span>
          </h1>

          {/* Conversational body voice (24-29px, weight 400 mixed-case strictly from ORYZO) */}
          <p className="text-[19px] sm:text-[25px] lg:text-[27px] font-normal leading-[1.3] text-cream-muted max-w-2xl pt-2">
            Whatever the reason a learner has fallen behind, we close the gap, build confidence, and help them grow again across CAPS, IEB, and Cambridge International.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openConsultationModal()}
              className="rounded-buttons-pill bg-surface hover:bg-softblue text-cream hover:text-white px-7 py-3.5 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase border border-border-cork transition-all duration-300 shadow-md active:scale-[0.98] inline-flex items-center gap-2.5"
            >
              <span>Request a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className="rounded-buttons-outlined bg-transparent hover:bg-cream hover:text-void text-cream px-6 py-3 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase border border-cream transition-all duration-300"
            >
              Explore Services Hub
            </button>
          </div>
        </div>

        {/* Hero Bottom Elements: Overlay Info Card (lower-left) & Video Thumbnail (lower-right) */}
        <div className="relative z-10 pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Lower-Left Semi-Transparent Info Card strictly from ORYZO */}
          <div className="rounded-cards bg-surface/85 backdrop-blur-md border border-border-cork p-5 sm:p-6 max-w-md text-left space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-ember">
              <span>FOUNDED BY SHAWN MALULEKE</span>
              <span>PRETORIA · 2023</span>
            </div>
            <div className="dashed-divider my-1.5" />
            <p className="text-xs sm:text-sm font-normal text-cream leading-relaxed">
              Led by a registered educator holding a B.Ed with 22 distinctions and honours cum laude. We support learners without judgement, planning entirely around real life.
            </p>
            <div className="pt-1 flex items-center gap-3 text-[11px] font-medium tracking-wider text-cream-muted uppercase">
              <span className="text-softblue">CAPS</span>
              <span>•</span>
              <span className="text-softblue">IEB</span>
              <span>•</span>
              <span className="text-softblue">CAMBRIDGE</span>
            </div>
          </div>

          {/* Lower-Right Media Preview Card strictly from ORYZO */}
          <div
            onClick={() => setActiveTab('about')}
            className="rounded-cards bg-surface/85 backdrop-blur-md border border-border-cork p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:border-softblue transition-all group"
          >
            <div className="w-11 h-11 rounded-full bg-void border border-border-cork flex items-center justify-center text-softblue group-hover:bg-softblue group-hover:text-white transition-colors">
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            </div>
            <div className="text-left">
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-cream-muted block">
                OUR PHILOSOPHY
              </span>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.08em] text-cream group-hover:text-softblue transition-colors">
                Why Re:kula Exists &rarr;
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE SIGNATURE VOID-MODE 3D PRODUCT REVEAL SECTION (100VH)
          Three-column grid: Left heading / Center 3D Object / Right body
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100dvh] bg-void flex flex-col justify-center py-20 px-6 sm:px-12 border-b border-dashed border-border-cork">
        
        {/* Eyebrow Label */}
        <div className="w-full flex items-center justify-between pb-8 border-b border-dashed border-border-cork text-[10px] uppercase tracking-[0.25em] text-cream-muted">
          <span>THE RE:KULA ARTIFACT · GROW AGAIN</span>
          <span className="text-ember">DRAG TO ROTATE 3D SYMBOL</span>
        </div>

        {/* Three-Column Void Layout strictly matching ORYZO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
          
          {/* Left Column: Heading at 41px uppercase, line-height 0.9 */}
          <div className="lg:col-span-4 text-left space-y-4">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-softblue block">
              PEDAGOGICAL IDENTITY
            </span>
            <h2 className="font-serif text-[38px] sm:text-[46px] lg:text-[51px] font-medium uppercase tracking-tight text-cream leading-[0.9] max-w-sm">
              ISN’T JUST A TUTORING SERVICE.
            </h2>
            <div className="dashed-divider my-4" />
            <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
              A bespoke academic partnership created to diagnose syllabus gaps, liaise with classroom teachers, and build sustainable independence.
            </p>
          </div>

          {/* Center Column: Interactive 3D Artifact */}
          <div className="lg:col-span-4 h-[380px] sm:h-[460px] flex items-center justify-center relative">
            <RekulaArtifact3D className="w-full h-full" />
            
            {/* Center Micro Label under 3D model */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-center">
              <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-cream-muted/70">
                [ 3D GROWTH EMBLEM · ORBITAL GYROSCOPE ]
              </span>
            </div>
          </div>

          {/* Right Column: Descriptive body copy at 29px weight 400 mixed-case */}
          <div className="lg:col-span-4 text-left lg:text-left space-y-4">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-cream-muted block">
              OUR CONVICTION
            </span>
            <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-normal leading-[1.26] text-cream">
              Learners fall behind for many reasons, and none of them make a learner any less capable. We close the gap, build confidence, and help them grow again.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openConsultationModal()}
                className="text-xs font-medium tracking-[0.15em] uppercase text-softblue hover:text-white underline underline-offset-8 transition-colors"
              >
                REQUEST A BESPOKE PLAN &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* Bottom hairline disclaimer in micro type */}
        <div className="w-full pt-6 border-t border-dashed border-border-cork flex flex-col sm:flex-row items-start sm:items-center justify-between text-[8px] sm:text-[9px] uppercase tracking-widest text-cream-muted font-mono">
          <span>* CAPS (NATIONAL) · IEB (INDEPENDENT) · CAMBRIDGE INTERNATIONAL PROGRAMMES</span>
          <span>INDIVIDUALISED DIAGNOSTICS · ZERO FIXED PACKAGES</span>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THE TIMETABLE REALITY (EDITORIAL IN-CONTEXT PHOTOGRAPHY)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 border-b border-dashed border-border-cork bg-surface/30">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-border-cork pb-8 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-ember">
                CORE PHILOSOPHY
              </span>
              <h2 className="font-serif text-[36px] sm:text-[51px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
                LIFE DOESN’T ALWAYS FOLLOW THE SCHOOL TIMETABLE.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-cream-muted max-w-md text-left leading-relaxed">
              Learners miss school for all kinds of reasons: illness or injury, a family move, travel, sport commitments, or circumstances at home. Whatever the reason, we help close the gap, without judgement.
            </p>
          </div>

          {/* 3 Full-Bleed Photographic Editorial Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Card 1: Student Athletes */}
            <div className="group space-y-4">
              <div className="rounded-cards overflow-hidden aspect-[4/3] bg-surface relative border border-border-cork">
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80"
                  alt="Student athlete balancing competitive training and academics"
                  className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-void/80 border border-border-cork text-[9px] uppercase tracking-widest text-cream font-medium">
                  DEMANDING SCHEDULES
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl uppercase tracking-tight font-medium text-cream">
                  High-Performance Athletes
                </h3>
                <p className="text-xs text-cream-muted leading-relaxed">
                  Support planned around training camps, national championships, and international tours. Seamless coordination with teachers.
                </p>
              </div>
            </div>

            {/* Card 2: Relocations & Curriculum Transitions */}
            <div className="group space-y-4">
              <div className="rounded-cards overflow-hidden aspect-[4/3] bg-surface relative border border-border-cork">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                  alt="Students bridging between Cambridge and CAPS curricula"
                  className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-void/80 border border-border-cork text-[9px] uppercase tracking-widest text-cream font-medium">
                  CURRICULUM BRIDGING
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl uppercase tracking-tight font-medium text-cream">
                  Moving Schools & Countries
                </h3>
                <p className="text-xs text-cream-muted leading-relaxed">
                  Smooth integration into CAPS, IEB, or Cambridge International. We close foundational syllabus differences with ease.
                </p>
              </div>
            </div>

            {/* Card 3: Adult Learners & Second Chance */}
            <div className="group space-y-4">
              <div className="rounded-cards overflow-hidden aspect-[4/3] bg-surface relative border border-border-cork">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80"
                  alt="Adult learner revising for second-chance matric"
                  className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-void/80 border border-border-cork text-[9px] uppercase tracking-widest text-cream font-medium">
                  SECOND-CHANCE MATRIC
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl uppercase tracking-tight font-medium text-cream">
                  Adult Learners & Rewrites
                </h3>
                <p className="text-xs text-cream-muted leading-relaxed">
                  Respectful, flexible, adult-oriented tutoring for rewrites and foundational literacy in English and Setswana.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SERVICES EDITORIAL GRID (THREE COLUMNS, DASHED DIVIDERS)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 border-b border-dashed border-border-cork">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-border-cork pb-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-softblue">
                SERVICES HUB
              </span>
              <h2 className="font-serif text-[38px] sm:text-[51px] font-medium uppercase tracking-tight text-cream leading-[0.9]">
                TAILORED EDUCATIONAL SERVICES.
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="text-xs font-medium tracking-[0.14em] uppercase text-cream hover:text-softblue underline underline-offset-4"
            >
              View Detailed Service Blueprints ({publishedServices.length}) &rarr;
            </button>
          </div>

          {/* 3-Column Editorial Grid with Dashed Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {publishedServices.map((service, index) => (
              <div
                key={service.id}
                className="rounded-cards bg-surface/70 border border-border-cork p-7 flex flex-col justify-between space-y-6 hover:border-softblue/60 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-cream-muted">
                    <span>SECTION 0{index + 1}</span>
                    <span className="text-softblue">{service.curricula.join(' · ')}</span>
                  </div>

                  <div className="dashed-divider" />

                  <div>
                    <h3
                      onClick={() => navigateToService(service.slug)}
                      className="font-serif text-2xl font-medium uppercase tracking-tight text-cream group-hover:text-softblue transition-colors cursor-pointer"
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs text-cream-muted font-normal mt-1 italic">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] text-cream-muted/90 leading-relaxed line-clamp-3">
                    {service.whatWeDo}
                  </p>

                  <div className="pt-2 text-xs text-cream-muted border-t border-dashed border-border-cork">
                    <strong className="text-cream uppercase tracking-wider text-[10px] block mb-1">
                      The Measurable Result:
                    </strong>
                    <span className="italic">“{service.result}”</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-border-cork flex items-center justify-between">
                  <button
                    onClick={() => navigateToService(service.slug)}
                    className="text-[11px] uppercase tracking-wider text-cream hover:text-white font-medium"
                  >
                    Read Guide &rarr;
                  </button>
                  <button
                    onClick={() => openConsultationModal(service.title)}
                    className="rounded-buttons-outlined px-4 py-1.5 text-[10px] tracking-widest uppercase border border-cream text-cream hover:bg-cream hover:text-void transition-colors"
                  >
                    Consult
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full p-4 rounded-cards bg-surface/40 border border-dashed border-border-cork flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-muted">
            <span>* All services are available online nationwide or in person across Pretoria.</span>
            <span className="text-ember uppercase tracking-wider font-medium">
              Zero Pricing Displayed • Discussed Privately During Consultation
            </span>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. WHO WE HELP (EQUAL VISUAL WEIGHT BENTO GRID)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 border-b border-dashed border-border-cork bg-surface/20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-3 text-left max-w-2xl">
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-ember">
              AUDIENCE PROFILES
            </span>
            <h2 className="font-serif text-[36px] sm:text-[51px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
              WHO WE HELP.
            </h2>
            <p className="text-sm text-cream-muted leading-relaxed">
              Presented with equal visual weight. No single learner archetype is elevated over another.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {audienceList.map((aud, i) => (
              <div
                key={aud.id}
                className="rounded-cards bg-surface/60 border border-border-cork p-6 space-y-3 hover:border-cream/40 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-cream-muted">
                  <span>AUDIENCE 0{i + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-softblue/60" />
                </div>
                <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
                  {aud.title}
                </h3>
                <p className="text-[11px] text-softblue font-medium uppercase tracking-wider">
                  {aud.subtitle}
                </p>
                <div className="dashed-divider my-2" />
                <p className="text-xs text-cream-muted leading-relaxed">
                  {aud.need}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. HOW WORKING WITH RE:KULA WORKS (THE 4-STEP TIMELINE)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 border-b border-dashed border-border-cork">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-border-cork pb-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-softblue">
                THE FOUR PHASES
              </span>
              <h2 className="font-serif text-[38px] sm:text-[51px] font-medium uppercase tracking-tight text-cream leading-[0.9]">
                HOW IT WORKS.
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className="text-xs font-medium tracking-[0.14em] uppercase text-cream hover:text-softblue underline underline-offset-4"
            >
              Read full process & common FAQs &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-cards bg-surface/50 border border-border-cork p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="font-mono text-3xl font-light text-cream-muted/50 block">
                    {step.number}
                  </span>
                  <div className="dashed-divider my-2" />
                  <h3 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
                    {step.title}
                  </h3>
                  <p className="text-xs text-softblue font-medium uppercase tracking-wider">
                    {step.summary}
                  </p>
                  <p className="text-xs text-cream-muted leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="w-8 h-px bg-border-cork" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FOUNDER SPOTLIGHT (WARM EDITORIAL ATTRIBUTION)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 border-b border-dashed border-border-cork bg-surface/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Portrait in darkroom museum framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-cards overflow-hidden aspect-[3/4] max-w-sm w-full bg-surface border border-border-cork p-2">
              <div className="w-full h-full rounded-lg overflow-hidden bg-void relative">
                <img
                  src="/assets/shawn-maluleke.png"
                  alt="Shawn Maluleke, Founder of Re:kula"
                  className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-3 text-left">
                <p className="font-serif text-sm uppercase tracking-wider text-cream font-medium">
                  Shawn Maluleke
                </p>
                <p className="text-[10px] text-cream-muted uppercase tracking-widest mt-0.5">
                  Founder & Lead Educator · Pretoria, 2023
                </p>
              </div>
            </div>
          </div>

          {/* Credentials and statement */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-ember">
              FOUNDER-LED & QUALIFIED
            </span>

            <h2 className="font-serif text-[34px] sm:text-[44px] font-medium uppercase tracking-tight text-cream leading-[0.94]">
              GROUNDED IN ACADEMIC DISTINCTION.
            </h2>

            <p className="text-[18px] sm:text-[22px] font-normal leading-[1.3] text-cream-muted">
              Shawn is an accomplished educator, academic success consultant, and founder of Re:kula, whose work is grounded in a conviction that every learner deserves the opportunity to realise their full academic potential.
            </p>

            <div className="dashed-divider" />

            <div className="space-y-2 text-xs font-mono text-cream-muted">
              <p>* UNIVERSITY OF PRETORIA B.ED (22 DISTINCTIONS) & B.ED HONS (CUM LAUDE)</p>
              <p>* CURRENTLY COMPLETING MASTER OF EDUCATION (M.ED)</p>
              <p>* DELL YOUNG LEADER & GOLDEN KEY INTERNATIONAL HONOUR SOCIETY</p>
              <p>* 8 YEARS SPANNING FOUNDATIONAL READING TO ADULT MATRIC EDUCATION</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('founder')}
                className="rounded-buttons-outlined border border-cream text-cream hover:bg-cream hover:text-void px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors"
              >
                Read Full Biography &rarr;
              </button>

              <button
                onClick={() => openConsultationModal()}
                className="rounded-buttons-pill bg-surface hover:bg-softblue text-cream hover:text-white px-6 py-2.5 text-xs font-medium tracking-widest uppercase border border-border-cork transition-colors"
              >
                Consult with Shawn
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. TESTIMONIALS (WARM CREAM EDITORIAL QUOTES)
          ───────────────────────────────────────────────────────────── */}
      {featuredTestimonials.length > 0 && (
        <section className="w-full py-24 sm:py-32 px-6 sm:px-12 border-b border-dashed border-border-cork">
          <div className="max-w-7xl mx-auto space-y-12 text-left">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-border-cork pb-6">
              <div className="space-y-2">
                <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-softblue">
                  COMMUNITY VOICES
                </span>
                <h2 className="font-serif text-[38px] sm:text-[51px] font-medium uppercase tracking-tight text-cream leading-[0.9]">
                  STORIES OF GROWING AGAIN.
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('testimonials')}
                className="text-xs font-medium tracking-[0.14em] uppercase text-cream hover:text-softblue underline underline-offset-4"
              >
                Read all verified testimonials &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className="rounded-cards bg-surface/50 border border-border-cork p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-ember uppercase tracking-widest">
                      REFLECT 0{idx + 1} · {t.serviceTag}
                    </span>
                    <div className="dashed-divider" />
                    <p className="font-serif text-[17px] sm:text-[19px] italic text-cream leading-relaxed">
                      “{t.quote}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-border-cork text-xs">
                    <p className="font-medium text-cream uppercase tracking-wider">{t.authorDisplayName}</p>
                    <p className="text-[11px] text-cream-muted mt-0.5">{t.authorRole}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. PRIMARY CONVERSION VOID SECTION (EDITORIAL CALL TO ACTION)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center py-28 px-6 sm:px-12 text-center bg-void">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-softblue/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-ember">
            LET'S BEGIN · PRETORIA & ONLINE
          </span>

          <h2 className="font-serif text-[44px] sm:text-[64px] lg:text-[74px] font-medium uppercase tracking-tight text-cream leading-[0.9]">
            LET’S BUILD A PLAN AROUND YOUR LEARNER.
          </h2>

          <p className="text-[18px] sm:text-[24px] font-normal leading-[1.3] text-cream-muted max-w-xl mx-auto">
            Tell us about the learner, their goals and their situation. We will take it from there. Every plan is bespoke, compassionate, and built for real life.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConsultationModal()}
              className="rounded-buttons-pill bg-cream text-void hover:bg-white px-8 py-4 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase transition-all shadow-xl active:scale-[0.98] inline-flex items-center gap-2"
            >
              <span>Request a Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-void" />
            </button>

            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-8 py-4 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct (+27 67 435 0849)</span>
            </a>
          </div>

          <div className="pt-8 text-[9px] font-mono uppercase tracking-[0.2em] text-cream-muted/70">
            NO PRICING DISPLAYED · TAILORED CONSULTATIONS · CONFIDENTIAL UNDER POPIA
          </div>
        </div>

      </section>

    </div>
  );
};
