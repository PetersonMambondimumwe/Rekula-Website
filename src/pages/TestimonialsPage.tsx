import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquarePlus, Filter, ShieldCheck, Heart } from 'lucide-react';
import { TestimonialFormModal } from '../components/TestimonialFormModal';

export const TestimonialsPage: React.FC = () => {
  const { approvedTestimonials } = useApp();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('All');

  // Extract unique service tags
  const serviceTags = [
    'All',
    ...Array.from(new Set(approvedTestimonials.map((t) => t.serviceTag))),
  ];

  const filteredTestimonials = approvedTestimonials.filter((t) => {
    if (selectedServiceFilter === 'All') return true;
    return t.serviceTag === selectedServiceFilter;
  });

  return (
    <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header strictly from brief */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5" />
          <span>Real Community Reflections</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          Kind Words from Our Community
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          Behind every learner is a story of growing again. Here is what learners, parents, schools, and tutors say about working with Re:kula.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy hover:bg-navy-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-[0.98]"
          >
            <MessageSquarePlus className="w-4 h-4 text-softblue-light" />
            <span>Share your experience</span>
          </button>
          <span className="text-xs text-slate-subtle">
            All submissions are reviewed with written guardian consent before publication.
          </span>
        </div>
      </section>

      {/* Filter by service */}
      {serviceTags.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-subtle flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter by service:
          </span>
          {serviceTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedServiceFilter(tag)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                selectedServiceFilter === tag
                  ? 'bg-navy text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid or Empty State */}
      {filteredTestimonials.length === 0 ? (
        <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-softblue-tint text-softblue flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-navy">
            Strict Authenticity Policy
          </h3>
          <p className="text-xs sm:text-sm text-slate-subtle leading-relaxed">
            Per Re:kula’s founding principles, we never invent or publish unverified testimonials. Only reflections with explicit guardian consent and direct founder verification appear here.
          </p>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="text-xs text-softblue font-semibold hover:underline"
          >
            Be among the first to share your learning story &rarr;
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bezel-card p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-softblue-tint text-navy">
                    {t.serviceTag}
                  </span>
                </div>

                <p className="font-serif text-sm sm:text-base text-navy italic leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-0.5">
                <p className="font-bold text-xs sm:text-sm text-navy">
                  {t.authorDisplayName}
                </p>
                <p className="text-xs text-slate-subtle">
                  {t.authorRole}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Rules Notice */}
      <section className="p-6 rounded-2xl bg-softblue-tint/30 border border-softblue/20 text-xs text-slate-subtle space-y-1.5">
        <p className="font-bold text-navy flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-softblue" /> Re:kula Privacy & Transparency Standard:
        </p>
        <p>
          Authors choose their own attribution (Anonymous, First Name, or Full Name). We strictly safeguard minor learners—photos and full surnames of learners under 18 are never accepted or published.
        </p>
      </section>

      {/* Form 6 Modal */}
      <TestimonialFormModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
};
