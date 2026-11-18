import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { faqs, openConsultationModal } = useApp();
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
    <div className="w-full bg-transparent text-cream text-left">
      <HowItWorksSection
        headingAs="h1"
        showTopBorder={false}
        className="pt-32 sm:pt-36 pb-20 sm:pb-24"
      />

      <div className="w-full px-6 sm:px-12 pb-20 space-y-20">
        {/* FAQs Section */}
      <section className="space-y-8 pt-8 border-t border-dashed border-border-cork">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-border-cork pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ember">
              KNOWLEDGE BASE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cream-muted/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2 text-base sm:text-xs rounded-full bg-surface border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
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
              className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cream text-void font-bold'
                  : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 rounded-cards bg-surface/30 border border-border-cork text-xs text-cream-muted">
              No matching questions found.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-cards bg-surface/40 border border-border-cork overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium uppercase tracking-tight text-cream">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-void border border-border-cork flex items-center justify-center shrink-0 text-cream-muted">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-cream-muted leading-relaxed border-t border-dashed border-border-cork bg-void/50">
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
      <section className="rounded-cards bg-surface border border-border-cork p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
            Still Have a Question?
          </h3>
          <p className="text-xs sm:text-sm text-cream-muted">
            Our Lead Educator and the Re:kula team are always here to advise you on the right path.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => openConsultationModal()}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3 text-xs font-medium uppercase tracking-widest transition-all shadow-md"
          >
            Request Consultation
          </button>
          <a
            href="https://wa.me/27674350849"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-buttons-outlined border border-cream text-cream hover:bg-void px-6 py-3 text-xs font-medium uppercase tracking-widest transition-all inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-softblue" />
            <span>WhatsApp Lead Educator</span>
          </a>
        </div>
      </section>
      </div>
    </div>
  );
};
