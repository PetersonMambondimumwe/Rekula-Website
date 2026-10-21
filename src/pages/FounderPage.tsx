import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, GraduationCap, ArrowUpRight, MessageSquare } from 'lucide-react';

export const FounderPage: React.FC = () => {
  const { openConsultationModal } = useApp();

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-16 text-left">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          <span>LEADERSHIP & PEDAGOGICAL CONVICTION</span>
        </div>
        <h1 className="font-serif text-[40px] sm:text-[54px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          MEET THE FOUNDER.
        </h1>
        <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
          Led by an accomplished educator and academic success consultant whose career is dedicated to unlocking the highest potential in every learner.
        </p>
      </section>

      {/* Main Profile Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Founder Portrait Card */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-cards bg-surface border border-border-cork p-2 shadow-2xl">
            <div className="rounded-lg overflow-hidden aspect-[3/4] bg-void relative">
              <img
                src="/assets/shawn-maluleke.png"
                alt="Shawn Maluleke, Founder of Re:kula"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-cream">
                <p className="font-serif text-lg uppercase tracking-wider font-medium">Shawn Maluleke</p>
                <p className="text-[10px] text-cream-muted uppercase font-mono tracking-widest mt-0.5">Founder & Lead Educator</p>
              </div>
            </div>
          </div>

          <div className="rounded-cards bg-surface/50 border border-border-cork p-5 space-y-2 text-xs">
            <p className="font-medium text-cream uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-softblue" /> University of Pretoria Alumna
            </p>
            <p className="text-cream-muted font-mono text-[11px]">
              B.Ed (22 Distinctions) · B.Ed Hons (Cum Laude) · M.Ed Candidate
            </p>
          </div>
        </div>

        {/* Bio Copy strictly from brief */}
        <div className="md:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-cream-muted">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ember block">
              FOUNDER PROFILE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
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
            <div className="p-4 rounded-cards bg-surface/40 border border-border-cork space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cream flex items-center gap-2 font-medium">
                <Award className="w-4 h-4 text-ember" /> Dell Young Leader
              </span>
              <p className="text-[11px] text-cream-muted">
                Recognised for exceptional academic perseverance and educational leadership.
              </p>
            </div>

            <div className="p-4 rounded-cards bg-surface/40 border border-border-cork space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cream flex items-center gap-2 font-medium">
                <Award className="w-4 h-4 text-softblue" /> Golden Key Society
              </span>
              <p className="text-[11px] text-cream-muted">
                Member of the international collegiate honour society for top academic achievers.
              </p>
            </div>
          </div>

          {/* Direct Actions */}
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => openConsultationModal()}
              className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3 text-xs font-medium uppercase tracking-widest transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Consult with Shawn</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

        </div>

      </section>

    </div>
  );
};
