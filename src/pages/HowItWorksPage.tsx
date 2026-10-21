import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { processSteps } from '../data/initialData';
import { Sparkles, ChevronDown, ChevronUp, Search, ArrowUpRight, MessageSquare, HelpCircle } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { faqs, openConsultationModal, setActiveTab } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clear Guidance</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          How Working With Re:kula Works
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          We know that falling behind or shifting curricula can feel stressful. Our four-step partnership eliminates anxiety by establishing a transparent, supportive plan tailored to your learner’s life.
        </p>
      </section>

      {/* 4 Steps In-Depth */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((step) => (
          <div
            key={step.number}
            className="p-7 rounded-3xl bg-white border border-navy/10 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <span className="font-serif text-4xl font-bold text-softblue/30 block">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy">
                {step.title}
              </h3>
              <p className="text-xs font-semibold text-softblue">
                {step.summary}
              </p>
              <p className="text-xs sm:text-sm text-slate-subtle leading-relaxed">
                {step.detail}
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-block w-8 h-1 bg-softblue/40 rounded-full" />
            </div>
          </div>
        ))}
      </section>

      {/* FAQs Section */}
      <section className="space-y-8 pt-8 border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-softblue">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-subtle">
              Everything you need to know about our approach, curricula, and consultation process.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'general', label: 'General & Approach' },
            { id: 'services', label: 'Services & Curricula' },
            { id: 'logistics', label: 'Logistics & Venues' },
            { id: 'careers', label: 'Careers & Volunteering' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-navy text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl text-xs text-slate-subtle">
              No matching questions found. Ask us directly via WhatsApp or enquiry form!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-navy">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-subtle leading-relaxed border-t border-slate-100 bg-softblue-mist/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA Box */}
      <section className="p-8 sm:p-12 rounded-3xl bg-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl font-bold">
            Still have a question?
          </h3>
          <p className="text-xs sm:text-sm text-white/80">
            Shawn Maluleke and the Re:kula team are always here to answer your questions and advise you on the right path.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => openConsultationModal()}
            className="px-6 py-3 rounded-full bg-white text-navy font-bold text-xs sm:text-sm hover:bg-softblue-tint transition-colors shadow-sm"
          >
            Request a Consultation
          </button>
          <a
            href="https://wa.me/27674350849"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Shawn</span>
          </a>
        </div>
      </section>

    </div>
  );
};
