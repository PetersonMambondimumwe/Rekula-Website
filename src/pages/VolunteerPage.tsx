import React from 'react';
import { useApp } from '../context/AppContext';
import { VolunteerForm } from '../components/VolunteerForm';
import { BookOpen, Users, ShieldCheck } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-16 text-left">
      
      {/* Header strictly from brief */}
      <section className="space-y-4 max-w-3xl">
        <h1 className="font-serif text-[40px] sm:text-[54px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          GIVE A LEARNER THE CHANCE TO GROW.
        </h1>
        <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
          Every learner deserves access to caring, capable academic support, whatever their circumstances. Our volunteer tutors give their time and knowledge to learners from under-resourced communities who may not otherwise have the support they need.
        </p>
        <p className="text-xs sm:text-sm text-cream font-medium">
          Whether you are a student, a teacher, a retired educator or a professional with a subject you love, there is a place for you. We welcome volunteers in any subject.
        </p>
      </section>

      {/* Why volunteer with Re:kula */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-cards bg-surface/40 border border-border-cork p-6 space-y-2">
          <div className="w-8 h-8 rounded-full bg-void border border-border-cork text-softblue flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">Community Impact</h3>
          <p className="text-xs text-cream-muted leading-relaxed">
            Directly help learners who lack resources to access subject tutoring, revision materials and exam techniques.
          </p>
        </div>

        <div className="rounded-cards bg-surface/40 border border-border-cork p-6 space-y-2">
          <div className="w-8 h-8 rounded-full bg-void border border-border-cork text-softblue flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">Flexible Schedules</h3>
          <p className="text-xs text-cream-muted leading-relaxed">
            From 1–2 hours a week to weekend workshops, online or in person across South Africa community venues.
          </p>
        </div>

        <div className="rounded-cards bg-surface/40 border border-border-cork p-6 space-y-2">
          <div className="w-8 h-8 rounded-full bg-void border border-border-cork text-softblue flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">Guided Pedagogy</h3>
          <p className="text-xs text-cream-muted leading-relaxed">
            Benefit from Re:kula’s proven teaching strategies and structured curricula guidance led by our Lead Educator.
          </p>
        </div>
      </section>

      {/* Volunteer Form Box */}
      <section className="rounded-cards bg-surface/70 border border-border-cork p-4 sm:p-10 shadow-2xl space-y-6">
        <div className="border-b border-dashed border-border-cork pb-4">
          <h2 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
            Volunteer Application Form
          </h2>
          <p className="text-xs text-cream-muted mt-1">
            Tell us about your background, subjects you can tutor and your weekly availability.
          </p>
        </div>

        <VolunteerForm />
      </section>

    </div>
  );
};
