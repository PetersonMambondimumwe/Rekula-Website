import React from 'react';
import { useApp } from '../context/AppContext';
import { curriculaList, audienceList, processSteps } from '../data/initialData';
import {
  ArrowUpRight,
  Sparkles,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Trophy,
  Clock,
  Globe,
  Laptop,
  Users,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Star,
  Quote,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    openConsultationModal,
    setActiveTab,
    publishedServices,
    navigateToService,
    featuredTestimonials,
  } = useApp();

  const getAudienceIcon = (icon: string) => {
    switch (icon) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-softblue" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-softblue" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-softblue" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-softblue" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-softblue" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-softblue" />;
      case 'Users':
        return <Users className="w-5 h-5 text-softblue" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-softblue" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-softblue" />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-40">
          <div className="absolute top-12 left-10 w-72 h-72 bg-softblue-tint rounded-full blur-3xl" />
          <div className="absolute top-36 right-10 w-96 h-96 bg-softblue/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-softblue-tint/80 border border-softblue/20 text-navy text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-softblue animate-pulse" />
                <span>Academic Partner & Educational Services • Pretoria</span>
              </div>

              {/* H1 Headline strictly from brief */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-[1.12]">
                Learning support that meets every learner <span className="text-softblue italic">where they are.</span>
              </h1>

              {/* Lead Paragraph strictly from brief */}
              <p className="text-base sm:text-lg text-slate-subtle max-w-xl leading-relaxed">
                Re:kula offers tailored academic support for learners of every age and background, from first-time readers to adults taking a second chance at matric, across CAPS, IEB and the Cambridge International Curriculum.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => openConsultationModal()}
                  className="group inline-flex items-center justify-between sm:justify-center gap-4 bg-navy hover:bg-navy-800 text-white rounded-full pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 text-sm font-semibold tracking-wide shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Request a consultation</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-softblue">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-navy/20 text-navy hover:bg-softblue-tint/60 text-sm font-semibold transition-all duration-300"
                >
                  Explore our services
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-lg text-left">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-navy">CAPS & IEB</p>
                  <p className="text-xs text-slate-subtle">National Curriculum</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-navy">Cambridge</p>
                  <p className="text-xs text-slate-subtle">Primary to A-Level</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-navy">Zero Pricing</p>
                  <p className="text-xs text-slate-subtle">Tailored Consultation</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card (Double-Bezel architecture) */}
            <div className="lg:col-span-5 relative">
              <div className="p-2 sm:p-3 rounded-[2.5rem] bg-navy/5 ring-1 ring-navy/10 shadow-2xl">
                <div className="relative rounded-[2rem] overflow-hidden bg-navy-950 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] shadow-inner">
                  {/* High quality imagery representing diverse focused learning */}
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
                    alt="Attentive learner receiving one-to-one mentorship at Re:kula"
                    className="w-full h-full object-cover object-center brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

                  {/* Overlaid floating badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-island-dark border border-white/10 text-white backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-softblue/30 border border-white/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-softblue-light" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide">
                          Tailored Around Real Life
                        </p>
                        <p className="text-[11px] text-white/70 line-clamp-1">
                          No gaps building up. No judgement. Just steady progress.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Leaf Indicator */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-lg p-2.5 border border-navy/10 hidden sm:flex items-center justify-center">
                <img
                  src="/assets/rekula-logo.png"
                  alt="Re:kula emblem"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CURRICULA STRIP */}
      <section className="border-y border-navy/10 bg-softblue-tint/30 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-navy/70">
              Curricula We Master & Support:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {curriculaList.map((curriculum) => (
                <div
                  key={curriculum.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-navy/10 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-softblue shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-navy">
                    {curriculum.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY / TIMETABLE STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-14 rounded-3xl bg-navy text-white overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-softblue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-softblue-light">
              Our Core Conviction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Life doesn’t always follow the school timetable
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Learners miss school for all kinds of reasons: illness or injury, a family move, travel, sport commitments, or circumstances at home. Whatever the reason, we help close the gap, without judgement. We work alongside the learner, the family and the school so that progress keeps moving.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openConsultationModal('Curriculum Bridging')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-softblue-light font-semibold hover:text-white underline underline-offset-4"
              >
                Learn how curriculum bridging works <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO WE HELP (EQUAL VISUAL WEIGHT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-softblue">
            Inclusivity at Heart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Who We Help
          </h2>
          <p className="text-sm text-slate-subtle leading-relaxed">
            Every learner’s circumstance is respected. We present every group with equal dignity and focus—whether you are returning from competition, learning to read, or conquering matric as an adult.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {audienceList.map((item) => (
            <div
              key={item.id}
              className="p-1.5 rounded-3xl bg-slate-50 ring-1 ring-navy/5 hover:ring-softblue/30 transition-all duration-300 hover:shadow-md"
            >
              <div className="p-6 rounded-[1.35rem] bg-white h-full flex flex-col justify-between space-y-4 border border-slate-100">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-softblue-tint flex items-center justify-center">
                    {getAudienceIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-xs text-softblue font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-slate-subtle leading-relaxed">
                    {item.need}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openConsultationModal()}
                    className="text-xs font-semibold text-navy hover:text-softblue inline-flex items-center gap-1 group"
                  >
                    <span>Request plan</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICES OVERVIEW */}
      <section className="bg-softblue-mist/50 py-20 border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-softblue">
                Services Hub
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                Tailored Academic Services
              </h2>
              <p className="text-sm text-slate-subtle">
                Personal, not packaged. Every service adapts to the learner's exact curriculum, schedule, and goals—strictly without rate cards or rigid boxes.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-softblue hover:text-navy group shrink-0"
            >
              <span>Explore all {publishedServices.length} services</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {publishedServices.map((service) => (
              <div
                key={service.id}
                className="bezel-card p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-softblue-tint text-navy">
                      {service.curricula.join(' • ')}
                    </span>
                    <button
                      onClick={() => navigateToService(service.slug)}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-softblue hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                      title="View service details"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy hover:text-softblue transition-colors cursor-pointer" onClick={() => navigateToService(service.slug)}>
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-softblue mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-subtle line-clamp-3 leading-relaxed">
                    {service.whatWeDo}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => navigateToService(service.slug)}
                    className="text-xs font-semibold text-navy hover:text-softblue transition-colors"
                  >
                    View details
                  </button>

                  <button
                    onClick={() => openConsultationModal(service.title)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-navy text-white hover:bg-navy-800 transition-colors shadow-xs"
                  >
                    Consult
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. HOW WORKING WITH RE:KULA WORKS (4-STEP FRAMEWORK) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-softblue">
            Simplicity & Certainty
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            How Working with Re:kula Works
          </h2>
          <p className="text-sm text-slate-subtle leading-relaxed">
            We remove the guesswork from academic recovery and advancement through four clear, transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-3xl bg-white border border-navy/10 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="font-serif text-3xl font-bold text-softblue/40 block">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl font-bold text-navy">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-softblue">
                  {step.summary}
                </p>
                <p className="text-xs text-slate-subtle leading-relaxed">
                  {step.detail}
                </p>
              </div>

              <div className="w-6 h-1 bg-softblue/30 rounded-full" />
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-softblue underline underline-offset-4"
          >
            <span>Read full process & common FAQs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 7. FEATURED TESTIMONIALS SLIDER / PREVIEW */}
      {featuredTestimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-softblue">
              Real Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Kind Words from Our Community
            </h2>
            <p className="text-xs text-slate-subtle">
              Behind every learner is a story of growing again. All testimonials are authentic, verified, and anonymous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {featuredTestimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-softblue-tint/40 border border-softblue/20 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-navy italic leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>

                <div className="pt-3 border-t border-softblue/20">
                  <p className="text-xs font-bold text-navy">{t.authorDisplayName}</p>
                  <p className="text-[11px] text-slate-subtle">{t.authorRole}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-softblue uppercase tracking-wider">
                    {t.serviceTag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveTab('testimonials')}
              className="text-xs font-semibold text-navy hover:text-softblue underline underline-offset-4"
            >
              View all community stories & submit your experience
            </button>
          </div>
        </section>
      )}

      {/* 8. FOUNDER SPOTLIGHT (SHAWN MALULEKE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-navy/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-navy/10">
              <img
                src="/assets/shawn-maluleke.png"
                alt="Shawn Maluleke, Founder of Re:kula"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-softblue">
                Founder-Led & Qualified
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                Shawn Maluleke, Founder
              </h3>
              <p className="text-xs font-semibold text-softblue">
                Dell Young Leader • Golden Key International Honour Society • M.Ed Candidate
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-subtle leading-relaxed">
              Shawn is an accomplished educator, academic success consultant, and founder of Re:kula, whose work is grounded in a conviction that every learner deserves the opportunity to realise their full academic potential. With eight years of experience spanning foundational learning to adult education, she brings a wealth of expertise in teaching, remedial education, academic development, and university-level instruction and assessment.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('founder')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-softblue underline underline-offset-4"
              >
                Read Shawn’s full bio & credentials <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => openConsultationModal()}
                className="px-4 py-2 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-xs"
              >
                Book a consultation with Shawn
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8">
        <div className="p-10 sm:p-16 rounded-[2.5rem] bg-navy-950 text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-softblue/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-softblue-light">
              Start The Conversation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Let’s build a plan around your learner.
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Tell us about the learner, their goals and their situation. We will take it from there. Every plan is bespoke, compassionate, and built for real life.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openConsultationModal()}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-navy hover:bg-softblue-tint rounded-full px-8 py-3.5 text-sm font-bold shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Request a consultation</span>
                <ArrowUpRight className="w-4 h-4 text-softblue" />
              </button>

              <a
                href="https://wa.me/27674350849"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-3.5 text-sm font-semibold transition-all shadow-md"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
