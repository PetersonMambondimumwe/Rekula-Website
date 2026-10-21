import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquarePlus, Filter, ShieldCheck, Heart } from 'lucide-react';
import { TestimonialFormModal } from '../components/TestimonialFormModal';

export const TestimonialsPage: React.FC = () => {
  const { approvedTestimonials } = useApp();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('All');

  const serviceTags = [
    'All',
    ...Array.from(new Set(approvedTestimonials.map((t) => t.serviceTag))),
  ];

  const filteredTestimonials = approvedTestimonials.filter((t) => {
    if (selectedServiceFilter === 'All') return true;
    return t.serviceTag === selectedServiceFilter;
  });

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-16 text-left">
      
      {/* Header strictly from brief */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <Heart className="w-3 h-3 text-ember" />
          <span>COMMUNITY VOICES · VERIFIED & ANONYMOUS</span>
        </div>
        <h1 className="font-serif text-[40px] sm:text-[54px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          KIND WORDS FROM OUR COMMUNITY.
        </h1>
        <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
          Behind every learner is a story of growing again. Here is what learners, parents, schools, and tutors say about working with Re:kula.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3 text-xs font-medium uppercase tracking-widest transition-all shadow-md inline-flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4 text-void" />
            <span>Share your experience</span>
          </button>
          <span className="text-xs text-cream-muted font-mono">
            * All reflections verified with guardian consent prior to publishing.
          </span>
        </div>
      </section>

      {/* Filter by service */}
      {serviceTags.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-dashed border-border-cork">
          <span className="text-xs font-mono uppercase tracking-widest text-cream-muted flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter by service:
          </span>
          {serviceTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedServiceFilter(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                selectedServiceFilter === tag
                  ? 'bg-cream text-void font-bold'
                  : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid or Empty State */}
      {filteredTestimonials.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-cards bg-surface/40 border border-border-cork space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-void border border-border-cork text-softblue flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
            Strict Authenticity Standard
          </h3>
          <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
            Per Re:kula’s founding principles, we never invent or publish unverified testimonials. Only reflections with explicit guardian consent and direct founder verification appear here.
          </p>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="text-xs text-softblue font-mono uppercase tracking-wider hover:underline"
          >
            Share your learning reflection &rarr;
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t, idx) => (
            <div
              key={t.id}
              className="rounded-cards bg-surface/50 border border-border-cork p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ember">
                  STORY 0{idx + 1} · {t.serviceTag}
                </span>

                <div className="dashed-divider" />

                <p className="font-serif text-[17px] sm:text-[19px] italic text-cream leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-dashed border-border-cork">
                <p className="font-medium text-xs sm:text-sm uppercase tracking-wider text-cream">
                  {t.authorDisplayName}
                </p>
                <p className="text-[11px] text-cream-muted mt-0.5 font-mono">
                  {t.authorRole}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Form 6 Modal */}
      <TestimonialFormModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
};
