import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, GraduationCap, ArrowUpRight, MessageSquare, Users, BookOpen, Brain, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const FounderPage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-20 text-left">
      
      {/* 1. Page Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          <span>LEADERSHIP & MULTIDISCIPLINARY EDUCATOR NETWORK</span>
        </div>
        <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[54px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          MEET OUR LEAD EDUCATOR.
        </h1>
      </section>

      {/* 2. Main Profile Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Founder Portrait Card */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-cards bg-surface border border-border-cork p-2 shadow-2xl">
            <div className="rounded-lg overflow-hidden aspect-[3/4] bg-void relative">
              <img
                src="/assets/shawn-maluleke.png"
                alt="Lead Educator of Re:kula"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-cream">
                <p className="font-serif text-lg uppercase tracking-wider font-medium">Lead Educator</p>
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

        {/* Bio Copy combining Founder Leadership & The Team */}
        <div className="md:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-cream-muted">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ember block">
              LEADERSHIP & PEDAGOGICAL VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
              Lead Educator & The Team
            </h2>
          </div>

          <p>
            Our Lead Educator is an accomplished educator, academic success consultant and founder of Re:kula, whose work is grounded in a conviction that every learner deserves the opportunity to realise their full academic potential. With eight years of experience spanning foundational learning to adult education, she brings a wealth of expertise in teaching, remedial education, academic development and university-level instruction and assessment.
          </p>

          <p>
            A University of Pretoria graduate, our Lead Educator holds a Bachelor of Education with 22 distinctions and an Honours degree in Education (cum laude) and is currently completing her Master of Education. She is a Dell Young Leader and a member of the Golden Key International Honour Society, reflecting her commitment to academic excellence and educational advancement.
          </p>

          <p>
            Founded in 2023, Re:kula is the expression of her vision to make meaningful, individualised academic support a catalyst for lasting learner growth and success. Every learner is paired with caring, capable educators who understand their curriculum and learning style.
          </p>

          <p className="text-cream font-medium">
            Working alongside our Lead Educator is a dedicated team of subject-specialist tutors, registered classroom teachers, educational psychologists and exam workshop facilitators. Together, our team ensures that every child, athlete, homeschooler and adult learner receives tailored, compassionate guidance aligned to their specific syllabus goals.
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
              <span>Consult with Our Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-softblue" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

        </div>

      </section>

      {/* 3. The Multidisciplinary Educator & Specialist Team Section */}
      <section className="space-y-10 pt-8 border-t border-dashed border-border-cork">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-softblue text-[10px] font-mono uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-softblue" />
            <span>OUR EDUCATOR TALENT NETWORK</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
            The Re:kula Team & Specialists
          </h2>

          <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
            While Re:kula is founder-led, our impact on every learner is delivered by a carefully assembled network of educators, subject specialists and psychology practitioners across South Africa. Every member of our team is selected for subject mastery, empathy and alignment with our diagnostic approach.
          </p>
        </div>

        {/* Team Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              role: 'Subject Specialist Tutors',
              badge: 'CORE & ELECTIVES',
              desc: 'High-achieving university graduates and subject specialists who break down complex concepts into manageable, confidence-building steps across CAPS, IEB and Cambridge.',
              qualities: ['Mathematics & Physical Sciences', 'Languages & Humanities', 'Accounting & Business Studies']
            },
            {
              role: 'Registered Classroom Teachers',
              badge: 'SACE ACCREDITED',
              desc: 'Experienced educators with proven classroom and remedial backgrounds who know syllabus requirements, internal marking rubrics and assessment benchmarks inside out.',
              qualities: ['Primary & High School Phases', 'Curriculum Bridging Expertise', 'Diagnostic Progress Monitoring']
            },
            {
              role: 'Educational Psychologists & Specialists',
              badge: 'LEARNING SUPPORT',
              desc: 'Specialists who support cognitive learning strategies, study systems, remedial reading literacy and emotional adjustment for learners navigating academic transitions.',
              qualities: ['Early Literacy & Remedial Reading', 'Personalised Study Systems', 'Emotional & Academic Adjustment']
            },
            {
              role: 'Exam Preparation Facilitators',
              badge: 'WORKSHOP MASTERY',
              desc: 'Senior educators and past-paper mentors who run intensive, interactive exam workshops for schools, cohorts and matric revision groups.',
              qualities: ['Matric & Cambridge Exam Revision', 'Past-Paper Strategy & Technique', 'Exam Anxiety Reduction']
            }
          ].map((pillar) => (
            <div
              key={pillar.role}
              className="rounded-cards bg-surface/50 border border-border-cork p-6 flex flex-col justify-between space-y-5 hover:border-softblue/50 transition-colors"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-softblue font-medium block">
                  {pillar.badge}
                </span>

                <h3 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
                  {pillar.role}
                </h3>

                <div className="dashed-divider my-2" />

                <p className="text-xs text-cream-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-dashed border-border-cork text-[11px] font-mono text-cream-muted">
                {pillar.qualities.map((q) => (
                  <div key={q} className="flex items-center gap-1.5 text-cream">
                    <span className="w-1.5 h-1.5 rounded-full bg-softblue shrink-0" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Educator Network CTA Card */}
        <div className="rounded-cards bg-surface/30 border border-border-cork p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif text-xl sm:text-2xl font-medium uppercase tracking-tight text-cream">
              Want to Join Our Educator Team?
            </h3>
            <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
              We are constantly seeking passionate tutors, teachers, educational psychologists and workshop facilitators who believe every learner can grow again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('careers')}
              className="rounded-buttons-pill bg-cream text-void hover:bg-white px-6 py-3 text-xs font-medium uppercase tracking-widest transition-all shadow-md"
            >
              Apply to Join Team
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className="rounded-buttons-outlined border border-cream text-cream hover:bg-surface px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors text-center"
            >
              Volunteer Tutoring
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};
