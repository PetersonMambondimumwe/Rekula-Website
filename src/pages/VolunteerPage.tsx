import React from 'react';
import { useApp } from '../context/AppContext';
import { VolunteerForm } from '../components/VolunteerForm';
import { HeartHandshake, Sparkles, BookOpen, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header strictly from brief */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-widest border border-emerald-200/60">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Giving Back Initiative</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          Get Involved: Give a Learner the Chance to Grow
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          Every learner deserves access to caring, capable academic support, whatever their circumstances. Our volunteer tutors give their time and knowledge to learners from under-resourced communities who may not otherwise have the support they need.
        </p>
        <p className="text-sm text-navy/90 font-medium">
          Whether you are a student, a teacher, a retired educator or a professional with a subject you love, there is a place for you. We welcome volunteers in any subject.
        </p>
      </section>

      {/* Why volunteer with Re:kula */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="w-9 h-9 rounded-full bg-softblue-tint text-softblue flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-bold text-navy">Community Impact</h3>
          <p className="text-xs text-slate-subtle leading-relaxed">
            Directly help learners who lack resources to access subject tutoring, revision materials, and exam techniques.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="w-9 h-9 rounded-full bg-softblue-tint text-softblue flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-bold text-navy">Flexible Schedules</h3>
          <p className="text-xs text-slate-subtle leading-relaxed">
            From 1–2 hours a week to weekend workshops, online or in person across Pretoria community venues.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="w-9 h-9 rounded-full bg-softblue-tint text-softblue flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-bold text-navy">Guided Pedagogy</h3>
          <p className="text-xs text-slate-subtle leading-relaxed">
            Benefit from Re:kula’s proven teaching strategies and structured curricula guidance led by Shawn Maluleke.
          </p>
        </div>
      </section>

      {/* Volunteer Form Box */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white border border-navy/10 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Volunteer Application Form
          </h2>
          <p className="text-xs text-slate-subtle mt-1">
            Tell us about your background, subjects you can tutor, and your weekly availability.
          </p>
        </div>

        <VolunteerForm />
      </section>

    </div>
  );
};
