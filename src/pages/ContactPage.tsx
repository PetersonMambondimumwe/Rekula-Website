import React, { useState, useRef, useEffect } from 'react';
import { ConsultationForm } from '../components/ConsultationForm';
import { OrganizationForm, QuickContactForm } from '../components/OrganizationForm';
import { siteSettings } from '../data/initialData';
import { ArrowUpRight, ChevronDown, Check } from 'lucide-react';

type ContactFormType = 'quick' | 'consultation' | 'organization';

interface FormOption {
  id: ContactFormType;
  label: string;
  shortHint: string;
  heading: string;
  description: string;
}

const FORM_OPTIONS: FormOption[] = [
  {
    id: 'quick',
    label: 'Quick Message',
    shortHint: 'General questions and brief enquiries',
    heading: 'Quick Message',
    description: 'Have a quick question? Leave us a message and we will respond promptly.',
  },
  {
    id: 'consultation',
    label: 'Consultation',
    shortHint: 'Learner intake for a tailored academic plan',
    heading: 'Request a Consultation',
    description:
      'Complete this form to receive a tailored academic roadmap. Every learner’s plan is unique, with no packages or rate cards.',
  },
  {
    id: 'organization',
    label: 'School / Organisation',
    shortHint: 'Schools, academies, sports clubs and co-ops',
    heading: 'Institutional & School Enquiries',
    description:
      'For schools, sports clubs, homeschool co-ops and academies seeking workshop-style exam preparation or structured bridging.',
  },
];

export const ContactPage: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<ContactFormType>('quick');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption =
    FORM_OPTIONS.find((opt) => opt.id === selectedForm) || FORM_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectOption = (id: ContactFormType) => {
    setSelectedForm(id);
    setDropdownOpen(false);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const currentIndex = FORM_OPTIONS.findIndex((o) => o.id === selectedForm);
      const nextIndex =
        event.key === 'ArrowDown'
          ? (currentIndex + 1) % FORM_OPTIONS.length
          : (currentIndex - 1 + FORM_OPTIONS.length) % FORM_OPTIONS.length;
      setSelectedForm(FORM_OPTIONS[nextIndex].id);
    }
  };

  return (
    <div className="w-full bg-transparent text-cream pt-32 pb-24 px-6 sm:px-12 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
        {/* Left Column: Editorial Intro & Direct Contact Ledger */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-10">
          <div className="space-y-4">
            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
              GET IN TOUCH.
            </h1>
            <p className="text-sm sm:text-[15px] text-cream-muted leading-relaxed max-w-md">
              Tell us about the learner, their goals and their situation. Every
              plan is bespoke, compassionate and built around real life.
            </p>
          </div>

          {/* Direct Contact Details */}
          <div className="border-t border-dashed border-border-cork divide-y divide-dashed divide-border-cork">
            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="space-y-1">
                <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-softblue">
                  WhatsApp Direct
                </span>
                <span className="block text-sm font-mono text-cream group-hover:text-white transition-colors">
                  {siteSettings.phoneDisplay}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-border-cork bg-surface/60 flex items-center justify-center text-cream-muted group-hover:border-cream group-hover:text-cream transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            <a
              href={`mailto:${siteSettings.displayEmail}`}
              className="group flex items-center justify-between py-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="space-y-1 min-w-0 pr-3">
                <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-cream-dim">
                  Official Email
                </span>
                <span className="block text-sm font-mono text-cream group-hover:text-softblue transition-colors break-all">
                  {siteSettings.displayEmail}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-border-cork bg-surface/60 flex items-center justify-center text-cream-muted group-hover:border-cream group-hover:text-cream transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            <div className="py-4 space-y-1">
              <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-cream-dim">
                Location & Reach
              </span>
              <p className="text-sm text-cream-muted leading-relaxed">
                South Africa · In-person nationwide and online internationally.
              </p>
            </div>
          </div>

          {/* Tuition Policy Note */}
          <div className="pt-2 space-y-2 border-t border-dashed border-border-cork">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-cream pt-4">
              Note on Tuition Pricing
            </h2>
            <p className="text-xs text-cream-muted leading-relaxed">
              Every learner’s plan is tailored to their curriculum, diagnostic
              needs and timetable. We do not publish fixed rate cards or
              packages — options and fees are discussed transparently during
              your consultation.
            </p>
          </div>
        </aside>

        {/* Right Column: Form Workspace with Dropdown Selector */}
        <section className="lg:col-span-8">
          <div className="rounded-[20px] p-1.5 bg-surface/40 border border-border-cork/80">
            <div className="rounded-[14px] bg-surface/90 border border-border-cork/60 p-6 sm:p-10 shadow-2xl space-y-8">
              {/* Form Type Dropdown Selector */}
              <div className="space-y-2.5" ref={dropdownRef}>
                <label
                  htmlFor="contact-form-selector"
                  className="block text-[11px] font-mono uppercase tracking-[0.18em] text-softblue"
                >
                  Select Enquiry Form
                </label>

                <div className="relative">
                  <button
                    id="contact-form-selector"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                    aria-controls="contact-form-listbox"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    onKeyDown={handleTriggerKeyDown}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-void border text-left transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-cream ${
                      dropdownOpen
                        ? 'border-cream'
                        : 'border-border-driftwood hover:border-cream/70'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="block font-serif text-lg sm:text-xl font-medium tracking-tight text-cream">
                        {activeOption.label}
                      </span>
                      <span className="block text-xs text-cream-dim truncate mt-0.5">
                        {activeOption.shortHint}
                      </span>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-surface border border-border-cork flex items-center justify-center shrink-0 text-cream">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          dropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div
                      id="contact-form-listbox"
                      role="listbox"
                      aria-label="Enquiry form options"
                      className="absolute left-0 right-0 mt-2 z-30 rounded-xl bg-void border border-border-driftwood shadow-2xl overflow-hidden py-1.5"
                    >
                      {FORM_OPTIONS.map((option) => {
                        const isSelected = option.id === selectedForm;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelectOption(option.id)}
                            className={`w-full px-5 py-3.5 text-left flex items-start justify-between gap-4 transition-colors duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-surface-subtle text-cream'
                                : 'text-cream-muted hover:bg-surface/70 hover:text-cream'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="block text-sm font-medium text-cream">
                                {option.label}
                              </span>
                              <span className="block text-xs text-cream-muted leading-relaxed">
                                {option.shortHint}
                              </span>
                            </div>
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-opacity ${
                                isSelected
                                  ? 'bg-cream text-void opacity-100'
                                  : 'opacity-0'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Active Form Header */}
              <div className="pt-6 border-t border-dashed border-border-cork space-y-1.5">
                <h2 className="font-serif text-2xl sm:text-[26px] font-medium uppercase tracking-tight text-cream">
                  {activeOption.heading}
                </h2>
                <p className="text-xs sm:text-sm text-cream-muted leading-relaxed max-w-2xl">
                  {activeOption.description}
                </p>
              </div>

              {/* Active Form Body */}
              <div key={selectedForm}>
                {selectedForm === 'quick' && <QuickContactForm />}
                {selectedForm === 'consultation' && (
                  <ConsultationForm isEmbedded={true} />
                )}
                {selectedForm === 'organization' && <OrganizationForm />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
