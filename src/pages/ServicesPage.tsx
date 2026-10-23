import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Filter } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { publishedServices, navigateToService, openConsultationModal } = useApp();
  const [filterCurriculum, setFilterCurriculum] = useState<string>('All');

  const filteredServices = publishedServices.filter((s) => {
    if (filterCurriculum === 'All') return true;
    return s.curricula.some((c) => c.toLowerCase().includes(filterCurriculum.toLowerCase()));
  });

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-16 text-left">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          <span>TAILORED CURRICULA SUPPORT · CAPS · IEB · CAMBRIDGE</span>
        </div>
        <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[54px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          EDUCATIONAL SERVICES HUB.
        </h1>
        <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
          All services are available to any learner who needs them, of any age, in any situation, across CAPS, IEB and the Cambridge International Curriculum. Every plan is bespoke, with no fixed packages or rigid rate cards.
        </p>

        {/* Filter tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cream-muted flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['All', 'CAPS', 'IEB', 'Cambridge'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterCurriculum(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                filterCurriculum === tag
                  ? 'bg-cream text-void font-bold'
                  : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className="rounded-cards bg-surface/60 border border-border-cork p-7 flex flex-col justify-between space-y-6 hover:border-softblue/60 transition-colors group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-cream-muted">
                <span>SERVICE 0{index + 1}</span>
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
                <p className="text-xs font-normal text-cream-muted mt-1 italic">
                  {service.tagline}
                </p>
              </div>

              <div className="space-y-2 text-xs text-cream-muted leading-relaxed">
                <p>
                  <strong className="text-cream uppercase tracking-wider text-[10px] block">Who it is for: </strong>
                  {service.whoItIsFor}
                </p>
                <div className="dashed-divider my-2" />
                <p>
                  <strong className="text-cream uppercase tracking-wider text-[10px] block">The Result: </strong>
                  <span className="italic">“{service.result}”</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-border-cork flex items-center justify-between gap-3">
              <button
                onClick={() => navigateToService(service.slug)}
                className="text-[11px] uppercase tracking-wider text-cream hover:text-white font-medium inline-flex items-center gap-1"
              >
                <span>Read Blueprint</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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
      </section>

      {/* Notice on Bespoke Support & Pricing */}
      <section className="rounded-cards bg-surface/40 border border-dashed border-border-cork p-8 text-center space-y-3">
        <h3 className="font-serif text-xl uppercase tracking-tight font-medium text-cream">
          Don’t see your exact scenario?
        </h3>
        <p className="text-xs sm:text-sm text-cream-muted max-w-xl mx-auto leading-relaxed">
          Re:kula is founder-led and highly adaptable. We work with learners who need multidisciplinary support, flexible exam arrangements or custom timetables. Every consultation is private and tailored.
        </p>
        <button
          onClick={() => openConsultationModal()}
          className="mt-2 rounded-buttons-pill bg-surface hover:bg-cream hover:text-void border border-border-cork text-cream px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors"
        >
          Speak with Lead Educator &rarr;
        </button>
      </section>

    </div>
  );
};
