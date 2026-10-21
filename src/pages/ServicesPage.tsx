import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { publishedServices, navigateToService, openConsultationModal } = useApp();
  const [filterCurriculum, setFilterCurriculum] = useState<string>('All');

  const filteredServices = publishedServices.filter((s) => {
    if (filterCurriculum === 'All') return true;
    return s.curricula.some((c) => c.toLowerCase().includes(filterCurriculum.toLowerCase()));
  });

  return (
    <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored Academic Solutions</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          Educational Services Hub
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          All services are available to any learner who needs them, of any age, in any situation, across CAPS, IEB, and the Cambridge International Curriculum. Every plan is bespoke—no fixed packages or rigid rate cards.
        </p>

        {/* Filter tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-subtle flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter by curriculum:
          </span>
          {['All', 'CAPS', 'IEB', 'Cambridge'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterCurriculum(tag)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                filterCurriculum === tag
                  ? 'bg-navy text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bezel-card p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-softblue-tint text-navy">
                  {service.curricula.join(' • ')}
                </span>
                <span className="text-xs font-bold text-softblue">
                  #{service.order}
                </span>
              </div>

              <div>
                <h3
                  onClick={() => navigateToService(service.slug)}
                  className="font-serif text-2xl font-bold text-navy hover:text-softblue transition-colors cursor-pointer"
                >
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-softblue mt-1">
                  {service.tagline}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-subtle leading-relaxed">
                <p>
                  <strong className="text-navy">Who it is for: </strong>
                  {service.whoItIsFor}
                </p>
                <p>
                  <strong className="text-navy">The Result: </strong>
                  {service.result}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => navigateToService(service.slug)}
                className="text-xs font-semibold text-navy hover:text-softblue inline-flex items-center gap-1 group"
              >
                <span>Read full guide</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => openConsultationModal(service.title)}
                className="px-4 py-2 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-xs"
              >
                Request consultation
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Notice on Bespoke Support & Pricing */}
      <section className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-3">
        <h3 className="font-serif text-xl font-bold text-navy">
          Don’t see your exact scenario?
        </h3>
        <p className="text-xs sm:text-sm text-slate-subtle max-w-xl mx-auto leading-relaxed">
          Re:kula is founder-led and highly adaptable. We work with learners who need multidisciplinary support, flexible exam arrangements, or custom timetables. Every consultation is private and tailored.
        </p>
        <button
          onClick={() => openConsultationModal()}
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-xs"
        >
          <span>Speak with Shawn Maluleke</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </section>

    </div>
  );
};
