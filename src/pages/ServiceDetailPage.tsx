import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, ShieldCheck, Calendar, Users, MessageSquare } from 'lucide-react';

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
      <div className="py-20 text-center space-y-4">
        <p className="text-sm text-slate-subtle">Service not found.</p>
        <button
          onClick={() => setActiveTab('services')}
          className="text-xs text-softblue underline"
        >
          Return to services hub
        </button>
      </div>
    );
  }

  const otherServices = publishedServices.filter((s) => s.id !== currentService.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left text-navy">
      
      {/* Back link */}
      <div>
        <button
          onClick={() => setActiveTab('services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-softblue hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all services
        </button>
      </div>

      {/* Hero Header */}
      <section className="space-y-4 pb-8 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {currentService.curricula.map((c) => (
            <span
              key={c}
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-softblue-tint text-navy"
            >
              {c}
            </span>
          ))}
          <span className="text-xs font-semibold text-slate-subtle">
            • Online & In-person available
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-navy">
          {currentService.title}
        </h1>
        <p className="font-serif text-lg sm:text-xl text-softblue italic">
          {currentService.tagline}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => openConsultationModal(currentService.title)}
            className="group inline-flex items-center gap-3 bg-navy hover:bg-navy-800 text-white rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.98]"
          >
            <span>Request {currentService.title} Consultation</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-softblue">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          <a
            href={`https://wa.me/27674350849?text=${encodeURIComponent(`Hello Shawn, I would like to ask about ${currentService.title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold hover:bg-emerald-100 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
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
            <h2 className="text-xs font-bold uppercase tracking-widest text-softblue">
              Who It Is For
            </h2>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 text-sm leading-relaxed text-navy">
              {currentService.whoItIsFor}
            </div>
          </section>

          {/* What we do */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-softblue">
              What We Do
            </h2>
            <div className="p-6 rounded-3xl bg-white border border-navy/10 text-sm sm:text-base leading-relaxed text-navy shadow-sm">
              {currentService.whatWeDo}
            </div>
          </section>

          {/* How it works */}
          {currentService.howItWorks && currentService.howItWorks.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-softblue">
                How It Works Step-by-Step
              </h2>
              <div className="space-y-3">
                {currentService.howItWorks.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4"
                  >
                    <span className="w-7 h-7 rounded-full bg-softblue-tint text-softblue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-navy/90 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* The Result */}
          <section className="p-6 sm:p-8 rounded-3xl bg-navy text-white space-y-2 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-softblue-light">
              The Measurable Outcome
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              The Result
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed italic">
              “{currentService.result}”
            </p>
          </section>

        </div>

        {/* Right Sidebar: Details & Consultation prompt */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-softblue-tint/50 border border-softblue/30 space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy">
              Bespoke Academic Plan
            </h3>
            <p className="text-xs text-slate-subtle leading-relaxed">
              Every learner’s plan is tailored around their exact commitments, teachers, and syllabus. We discuss options and arrangements privately during consultation.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-navy">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Coordinated with class teachers</span>
              </div>
              <div className="flex items-center gap-2 text-navy">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Flexible timetables for athletes</span>
              </div>
              <div className="flex items-center gap-2 text-navy">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pretoria on-site or online nationwide</span>
              </div>
            </div>

            <button
              onClick={() => openConsultationModal(currentService.title)}
              className="w-full py-3 rounded-full bg-navy hover:bg-navy-800 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Request a Consultation
            </button>
          </div>

          {/* Other Services */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-subtle">
              Other Services
            </h4>
            <div className="space-y-1.5">
              {otherServices.slice(0, 4).map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigateToService(s.slug)}
                  className="w-full text-left py-2 px-3 rounded-xl hover:bg-white text-xs font-medium text-navy transition-colors flex items-center justify-between group"
                >
                  <span className="truncate">{s.title}</span>
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
