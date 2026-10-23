import React from 'react';
import { useApp } from '../context/AppContext';
import { CareersForm } from '../components/CareersForm';
import { Briefcase } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-16 text-left">
      
      {/* Header strictly from brief */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <Briefcase className="w-3 h-3 text-ember" />
          <span>JOIN THE Re:kula TEAM · EDUCATORS & SPECIALISTS</span>
        </div>
        <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[54px] font-medium tracking-tight text-cream leading-[0.92]">
          JOIN THE Re:kula TEAM.
        </h1>
        <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
          We’re building a team of caring, capable people who believe every learner can grow again. If you’re passionate about helping learners succeed, we’d love to hear from you.
        </p>

        <div className="p-4 rounded-cards bg-surface/40 border border-dashed border-border-cork flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cream-muted">
          <span>Looking to give your time to under-resourced learners instead?</span>
          <button
            onClick={() => setActiveTab('volunteer')}
            className="text-softblue font-medium hover:underline shrink-0 uppercase tracking-wider font-mono text-[11px]"
          >
            Visit Give Back (Volunteer Tutoring) &rarr;
          </button>
        </div>
      </section>

      {/* Roles of Interest */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream-muted">
          PROFILES WE WELCOME
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { title: 'Tutors', desc: 'University graduates & subject specialists' },
            { title: 'Teachers', desc: 'Registered SACE educators' },
            { title: 'Educational Psychologists', desc: 'HPCSA accredited practitioners' },
            { title: 'Psychology Students', desc: 'Undergraduate & Honours students' },
            { title: 'Exam Facilitators', desc: 'Matric & Cambridge workshop leads' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-cards bg-surface/50 border border-border-cork p-4 space-y-1.5"
            >
              <h3 className="font-serif text-sm font-medium uppercase tracking-tight text-cream">
                {item.title}
              </h3>
              <p className="text-[11px] text-cream-muted leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form Box */}
      <section className="rounded-cards bg-surface/70 border border-border-cork p-4 sm:p-10 shadow-2xl space-y-6">
        <div className="border-b border-dashed border-border-cork pb-4">
          <h2 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
            Educator Application Form
          </h2>
          <p className="text-xs text-cream-muted mt-1">
            Complete the form below and tell us about yourself. We keep every application on file and will be in touch when matching tutoring, mentoring or workshop opportunities arise.
          </p>
        </div>

        <CareersForm />
      </section>

    </div>
  );
};
