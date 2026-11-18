import React from 'react';
import { VolunteerForm } from '../components/VolunteerForm';

export const VolunteerPage: React.FC = () => {
  return (
    <div className="w-full bg-void text-cream pt-32 pb-24 px-6 sm:px-12 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
        {/* Left Column: Editorial Intro & Key Info Ledger */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-10">
          <div className="space-y-4">
            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
              GIVE BACK.
            </h1>
            <p className="text-sm sm:text-[15px] text-cream-muted leading-relaxed max-w-md">
              Share your time and knowledge with learners from under-resourced
              communities who need caring, capable academic support.
            </p>
          </div>

          {/* Clean Highlights Ledger (matching ContactPage structure) */}
          <div className="border-t border-dashed border-border-cork divide-y divide-dashed divide-border-cork">
            <div className="py-4 space-y-1">
              <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-softblue">
                Who Can Volunteer
              </span>
              <p className="text-sm text-cream-muted leading-relaxed">
                Students, teachers, retired educators and working professionals
                — we welcome volunteers in any subject.
              </p>
            </div>

            <div className="py-4 space-y-1">
              <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-cream-dim">
                Flexible Commitment
              </span>
              <p className="text-sm text-cream-muted leading-relaxed">
                From 1–2 hours a week to occasional workshops, online or in
                person across South Africa.
              </p>
            </div>

            <div className="py-4 space-y-1">
              <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-cream-dim">
                Guided Support
              </span>
              <p className="text-sm text-cream-muted leading-relaxed">
                Structured curricula guidance and teaching strategies led by our
                Lead Educator.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column: Simplified Volunteer Form Workspace */}
        <section className="lg:col-span-8">
          <div className="rounded-[20px] p-1.5 bg-surface/40 border border-border-cork/80">
            <div className="rounded-[14px] bg-surface/90 border border-border-cork/60 p-6 sm:p-10 shadow-2xl space-y-8">
              <div className="pb-6 border-b border-dashed border-border-cork space-y-1.5">
                <h2 className="font-serif text-2xl sm:text-[26px] font-medium uppercase tracking-tight text-cream">
                  Volunteer Application
                </h2>
                <p className="text-xs sm:text-sm text-cream-muted leading-relaxed max-w-2xl">
                  Tell us a little about yourself, the subjects you can support
                  and your availability. We will follow up directly.
                </p>
              </div>

              <VolunteerForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
