import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Award, GraduationCap, CheckCircle2, BookOpen, Heart, ArrowUpRight, MessageSquare } from 'lucide-react';

export const FounderPage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();

  return (
    <div className="space-y-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Leadership & Pedagogy</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          Meet the Founder
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          Led by an accomplished educator and academic consultant whose career is dedicated to unlocking the highest potential in every learner.
        </p>
      </section>

      {/* Main Profile Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Founder Portrait Card */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-3 rounded-3xl bg-navy/5 ring-1 ring-navy/10 shadow-xl">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-navy-950 relative">
              <img
                src="/assets/shawn-maluleke.png"
                alt="Shawn Maluleke, Founder of Re:kula"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif text-xl font-bold">Shawn Maluleke</p>
                <p className="text-xs text-softblue-light">Founder & Lead Educator</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <p className="font-bold text-navy flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-softblue" /> University of Pretoria Alumni
            </p>
            <p className="text-slate-subtle">
              B.Ed (22 Distinctions) • B.Ed Hons (Cum Laude) • M.Ed Candidate
            </p>
          </div>
        </div>

        {/* Bio Copy strictly from brief */}
        <div className="md:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-navy">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-softblue">
              Educational Visionary
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Shawn Maluleke
            </h2>
          </div>

          <p>
            Shawn is an accomplished educator, academic success consultant, and founder of Re:kula, whose work is grounded in a conviction that every learner deserves the opportunity to realise their full academic potential. With eight years of experience spanning foundational learning to adult education, she brings a wealth of expertise in teaching, remedial education, academic development, and university-level instruction and assessment.
          </p>

          <p>
            A University of Pretoria graduate, Shawn holds a Bachelor of Education with 22 distinctions and an Honours degree in Education (cum laude), and is currently completing her Master of Education. She is a Dell Young Leader and a member of the Golden Key International Honour Society, reflecting her commitment to academic excellence and educational advancement.
          </p>

          <p>
            Founded in 2023, Re:kula is the expression of her vision to make meaningful, individualised academic support a catalyst for lasting learner growth and success.
          </p>

          {/* Academic Honors Badges */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-softblue-tint/50 border border-softblue/30 space-y-1">
              <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                <Award className="w-4 h-4 text-softblue" /> Dell Young Leader
              </span>
              <p className="text-[11px] text-slate-subtle">
                Recognised for exceptional leadership, perseverance, and academic impact.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-softblue-tint/50 border border-softblue/30 space-y-1">
              <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                <Award className="w-4 h-4 text-softblue" /> Golden Key Society
              </span>
              <p className="text-[11px] text-slate-subtle">
                Member of the international collegiate honour society for top academic achievers.
              </p>
            </div>
          </div>

          {/* Direct Actions */}
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => openConsultationModal()}
              className="px-6 py-3 rounded-full bg-navy hover:bg-navy-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Consult with Shawn</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold hover:bg-emerald-100 transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

        </div>

      </section>

      {/* Shawn's Pedagogical Framework */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-navy">
          Shawn’s Pedagogical Approach
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-subtle leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-navy text-sm sm:text-base">
              1. Non-Judgemental Diagnostic
            </h4>
            <p>
              Before prescribing a study plan, we understand the emotional and contextual reasons for any learning gap. No learner is ever judged for falling behind.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-navy text-sm sm:text-base">
              2. Teacher Collaboration
            </h4>
            <p>
              We liaise with class teachers and curriculum heads so that our tutoring directly reinforces upcoming tests, assignments, and exam formats.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-navy text-sm sm:text-base">
              3. Confidence through Mastery
            </h4>
            <p>
              True academic growth happens when a learner experiences small, repeatable wins that rebuild their self-belief and academic independence.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
