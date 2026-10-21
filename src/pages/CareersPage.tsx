import React from 'react';
import { useApp } from '../context/AppContext';
import { CareersForm } from '../components/CareersForm';
import { Briefcase, HeartHandshake, CheckCircle2, Sparkles, GraduationCap, Users } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header strictly from brief */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Educator Recruitment</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          Join the Re:kula Team
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          We’re building a team of caring, capable people who believe every learner can grow again. If you’re passionate about helping learners succeed, we’d love to hear from you.
        </p>

        <div className="p-4 rounded-2xl bg-softblue-tint/50 border border-softblue/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-navy font-medium">
            Looking to volunteer with under-resourced communities instead?
          </span>
          <button
            onClick={() => setActiveTab('volunteer')}
            className="text-softblue font-bold hover:underline shrink-0"
          >
            Visit Get Involved (Volunteer Tutoring) &rarr;
          </button>
        </div>
      </section>

      {/* Roles of Interest */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-softblue">
          Profiles We Welcome
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { title: 'Tutors', desc: 'University graduates & subject specialists' },
            { title: 'Teachers', desc: 'Registered SACE educators' },
            { title: 'Educational Psychologists', desc: 'HPCSA accredited practitioners' },
            { title: 'Psychology Students', desc: 'Undergraduate & Honours students' },
            { title: 'Exam Facilitators', desc: 'Matric & Cambridge workshop leads' },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5"
            >
              <h3 className="font-serif text-sm font-bold text-navy">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-subtle leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form Box */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white border border-navy/10 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Educator Application Form
          </h2>
          <p className="text-xs text-slate-subtle mt-1">
            Complete the form below and tell us about yourself. We keep every application on file and will be in touch when matching tutoring, mentoring, or workshop opportunities arise.
          </p>
        </div>

        <CareersForm />
      </section>

    </div>
  );
};
