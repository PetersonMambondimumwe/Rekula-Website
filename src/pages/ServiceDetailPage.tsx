import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowUpRight, MessageSquare, Check } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const {
    publishedServices,
    selectedServiceSlug,
    setActiveTab,
    openConsultationModal,
    navigateToService,
  } = useApp();

  const currentService =
    publishedServices.find((s) => s.slug === selectedServiceSlug) || publishedServices[0];

  if (!currentService) {
    return (
      <div className="py-28 text-center space-y-4 bg-void text-cream">
        <p className="text-sm text-cream-muted">Service blueprint not found.</p>
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs text-softblue underline font-mono uppercase"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const otherServices = publishedServices.filter((s) => s.id !== currentService.id);

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-12 text-left">
      
      {/* Back link */}
      <div>
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cream-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>
      </div>

      {/* Hero Header */}
      <section className="space-y-4 pb-8 border-b border-dashed border-border-cork">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cream-muted">
          <span className="text-ember">{currentService.curricula.join(' · ')}</span>
          <span>•</span>
          <span>SOUTH AFRICA ON-SITE & GLOBAL ONLINE</span>
        </div>

        <h1 className="font-serif text-[36px] sm:text-[50px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          {currentService.title}
        </h1>
        <p className="font-serif text-lg sm:text-xl text-cream-muted italic">
          {currentService.tagline}
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => openConsultationModal(currentService.title)}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3 text-xs font-medium uppercase tracking-widest transition-all shadow-md active:scale-[0.98] inline-flex items-center gap-2"
          >
            <span>Request {currentService.title} Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/27674350849?text=${encodeURIComponent(`Hello, I would like to ask about ${currentService.title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Main Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Who it is for & What we do */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Who it is for */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-ember">
              WHO IT IS FOR
            </h2>
            <div className="rounded-cards bg-surface/50 border border-border-cork p-6 text-sm leading-relaxed text-cream-muted">
              {currentService.whoItIsFor}
            </div>
          </section>

          {/* What we do */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-softblue">
              WHAT WE DO
            </h2>
            <div className="rounded-cards bg-surface/70 border border-border-cork p-6 text-sm sm:text-base leading-relaxed text-cream">
              {currentService.whatWeDo}
            </div>
          </section>

          {/* How it works */}
          {currentService.howItWorks && currentService.howItWorks.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted">
                HOW IT WORKS STEP-BY-STEP
              </h2>
              <div className="space-y-3">
                {currentService.howItWorks.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-cards bg-surface/40 border border-border-cork p-5 flex items-start gap-4"
                  >
                    <span className="font-mono text-xs font-bold text-softblue shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* The Result */}
          <section className="rounded-cards bg-surface border border-border-cork p-7 sm:p-8 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ember">
              THE MEASURABLE OUTCOME
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium uppercase tracking-tight text-cream">
              The Result
            </h3>
            <p className="text-sm sm:text-base text-cream-muted leading-relaxed italic">
              “{currentService.result}”
            </p>
          </section>

        </div>

        {/* Right Sidebar: Details & Consultation prompt */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-cards bg-surface/60 border border-border-cork p-6 space-y-4 text-xs">
            <h3 className="font-serif text-base uppercase tracking-wider font-medium text-cream">
              Bespoke Academic Plan
            </h3>
            <p className="text-cream-muted leading-relaxed">
              Every learner’s plan is tailored around their exact commitments, teachers and syllabus. We discuss options privately during consultation.
            </p>

            <div className="dashed-divider" />

            <div className="space-y-2 font-mono text-[11px] text-cream-muted">
              <p>* CO-ORDINATED WITH CLASSROOM TEACHERS</p>
              <p>* FLEXIBLE SCHEDULES FOR ATHLETES & RELOCATION</p>
              <p>* NO FIXED PACKAGES OR HIDDEN RATE CARDS</p>
            </div>

            <button
              onClick={() => openConsultationModal(currentService.title)}
              className="w-full rounded-buttons-pill bg-cream text-void hover:bg-white py-3 text-xs font-medium uppercase tracking-widest transition-all"
            >
              Request Consultation
            </button>
          </div>

          {/* Other Services */}
          <div className="rounded-cards bg-surface/40 border border-border-cork p-6 space-y-3">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
              OTHER SERVICES
            </h4>
            <div className="space-y-1.5">
              {otherServices.slice(0, 4).map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigateToService(s.slug)}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-surface text-xs font-medium text-cream-muted hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span className="truncate uppercase">{s.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
