import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  TrendingUp,
  User,
  BookOpenText,
  Users,
  LucideIcon,
} from 'lucide-react';

interface ServiceDisplayOverride {
  icon: LucideIcon;
  description: string;
  whoItIsFor: string;
  outcome: string;
  isOutcomeQuoted?: boolean;
  displayCurricula?: string[];
}

const SERVICE_CATALOGUE_META: Record<string, ServiceDisplayOverride> = {
  'curriculum-bridging': {
    icon: BookOpen,
    description: 'Catch up on missed school content without gaps or judgement.',
    whoItIsFor:
      'Any learner who has missed school and needs to catch up. There are many reasons: illness or injury, family circumstances, relocation, travel or sport commitments such as training camps, national tours and international championships.',
    outcome:
      'No gaps building up and a learner who walks back into the classroom prepared, calm and confident.',
    isOutcomeQuoted: true,
    displayCurricula: ['CAPS', 'IEB', 'Cambridge International'],
  },
  'curriculum-integration': {
    icon: GraduationCap,
    description: 'Smooth transition into a new curriculum or school system.',
    whoItIsFor:
      'Learners moving to South Africa from abroad or moving from one curriculum or school system to another (e.g. transitioning between Cambridge, CAPS or IEB).',
    outcome:
      'A smoother transition, with the learner working comfortably at the standard and rhythm of their new class.',
    isOutcomeQuoted: true,
    displayCurricula: ['CAPS', 'IEB', 'Cambridge International'],
  },
  'academic-success-consulting': {
    icon: TrendingUp,
    description: 'Custom learning roadmaps, study systems and accountability.',
    whoItIsFor:
      'Homeschooled and online learners, learners with demanding schedules such as professional-level athletes and any learner or family that wants more structure, clarity and direction.',
    outcome:
      'A learner with a clear plan, steady progress and the independence to manage their own learning with pride.',
    isOutcomeQuoted: true,
    displayCurricula: ['CAPS', 'IEB', 'Cambridge International'],
  },
  'personalised-tutoring': {
    icon: User,
    description: 'One-to-one mastery across any subject and grade level.',
    whoItIsFor:
      'Any learner, of any age, who is struggling or wants to strengthen any subject, from core foundational subjects to specialist matric subjects. This includes adult learners taking a second chance at matric.',
    outcome:
      'Stronger subject understanding, improved academic performance and renewed confidence.',
    isOutcomeQuoted: false,
  },
  'early-reading-support': {
    icon: BookOpenText,
    description: 'Patient, joyful foundational reading in English and Setswana.',
    whoItIsFor:
      'Early readers and learners who are learning to read. This may be young children just starting out in Foundation Phase (Grades R–3) or older learners who need extra, gentle help with reading and comprehension.',
    outcome:
      'Greater reading confidence, improved foundational skills and a love for learning.',
    isOutcomeQuoted: false,
  },
  'workshop-exam-prep': {
    icon: Users,
    description:
      'Collaborative, high-impact revision sessions for groups and schools.',
    whoItIsFor:
      'Schools or groups of learners such as friends and study groups, who want expert subject knowledge and targeted support ahead of tests, preliminary exams and final matric assessments. Open to any subject.',
    outcome:
      'Focused revision, improved exam readiness and stronger examination performance.',
    isOutcomeQuoted: false,
  },
};

export const ServicesPage: React.FC = () => {
  const { publishedServices, navigateToService, openConsultationModal } = useApp();
  const [filterCurriculum, setFilterCurriculum] = useState<string>('All');
  const prefersReducedMotion = useReducedMotion();

  const filteredServices = publishedServices.filter((s) => {
    if (filterCurriculum === 'All') return true;
    return s.curricula.some((c) =>
      c.toLowerCase().includes(filterCurriculum.toLowerCase())
    );
  });

  return (
    <div className="relative w-full overflow-hidden bg-transparent text-[#F5F1EA] pt-32 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-12">
      {/* Subtle Blue Radial Edge Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 46% 32% at 0% 0%, rgba(28, 94, 172, 0.24), transparent 72%)',
            'radial-gradient(ellipse 46% 32% at 100% 100%, rgba(28, 94, 172, 0.20), transparent 72%)',
            'radial-gradient(ellipse 50% 24% at 50% 0%, rgba(54, 169, 245, 0.07), transparent 70%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto space-y-16 sm:space-y-20">
        {/* Centered Section Header */}
        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-5"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#36A9F5]/30 bg-[#0B1C30]/80 shadow-[inset_0_1px_0_rgba(54,169,245,0.16)]">
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#D8E3EE]">
              OUR <span className="text-[#36A9F5]">SERVICES</span>
            </span>
          </div>

          <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] font-medium tracking-[-0.015em] text-[#F5F1EA] leading-[1.08]">
            Comprehensive Academic{' '}
            <span className="text-[#36A9F5]">Support</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#AAB6C5] leading-relaxed max-w-xl mx-auto">
            Tailored educational services to help every learner thrive.
          </p>

          {/* Subtle Curriculum Filter */}
          <div
            className="pt-3 flex flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label="Filter services by curriculum"
          >
            {['All', 'CAPS', 'IEB', 'Cambridge'].map((tag) => {
              const isActive = filterCurriculum === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilterCurriculum(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer border ${
                    isActive
                      ? 'bg-[#36A9F5]/15 border-[#36A9F5] text-[#F5F1EA]'
                      : 'bg-[#0D1A28]/80 border-[#20374B] text-[#AAB6C5] hover:border-[#36A9F5]/45 hover:text-[#F5F1EA]'
                  }`}
                >
                  {tag === 'All' ? 'All Curricula' : tag}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* Responsive 3-Column Academic Services Catalogue */}
        <section
          aria-label="Academic Services Catalogue"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
        >
          {filteredServices.map((service, index) => {
            const meta = SERVICE_CATALOGUE_META[service.slug];
            const Icon = meta?.icon || BookOpen;
            const description = meta?.description ?? service.tagline;
            const whoItIsFor = meta?.whoItIsFor ?? service.whoItIsFor;
            const outcome = meta?.outcome ?? service.result;
            const isOutcomeQuoted = meta ? meta.isOutcomeQuoted : true;
            const displayCurricula = meta
              ? meta.displayCurricula
              : service.curricula;
            const serviceNumber = String(service.order || index + 1).padStart(
              2,
              '0'
            );

            return (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : (index % 3) * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col h-full rounded-2xl bg-[#0D1A28] border border-[#20374B] p-6 sm:p-7 text-left transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#36A9F5]/55 hover:bg-[#102032] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                {/* 1. Top Row: Icon, Service Number & Curriculum Metadata */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#10243B] border border-[#36A9F5]/25 flex items-center justify-center text-[#E8F1FA] shrink-0 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#153152] group-hover:border-[#36A9F5]/55 group-hover:text-white">
                    <Icon className="w-5 h-5" strokeWidth={1.65} />
                  </div>

                  <div className="flex flex-col items-end gap-2 min-w-0">
                    <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#36A9F5]">
                      SERVICE {serviceNumber}
                    </span>

                    {displayCurricula && displayCurricula.length > 0 && (
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {displayCurricula.map((curriculum) => (
                          <span
                            key={curriculum}
                            className="px-2 py-0.5 rounded-md bg-[#071321]/80 border border-[#20374B] text-[10px] font-sans font-medium text-[#AAB6C5] whitespace-nowrap"
                          >
                            {curriculum}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Main Area: Serif Heading & Short Italic Description */}
                <div className="space-y-2 pb-6 border-b border-[#20374B]/80">
                  <h2 className="font-serif text-[23px] sm:text-[25px] font-medium tracking-[-0.01em] text-[#F5F1EA] leading-[1.2]">
                    <button
                      type="button"
                      onClick={() => navigateToService(service.slug)}
                      className="text-left hover:text-[#36A9F5] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:underline"
                    >
                      {service.title}
                    </button>
                  </h2>

                  <p className="font-sans italic text-[14px] text-[#C6D1DC] leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* 3. Information Area: WHO IT'S FOR & THE OUTCOME */}
                <div className="flex-1 flex flex-col justify-between divide-y divide-[#20374B]/70 py-1">
                  <div className="py-5 space-y-2">
                    <h3 className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.16em] text-[#36A9F5]">
                      Who It&apos;s For
                    </h3>
                    <p className="font-sans text-[13.5px] sm:text-[14px] text-[#AAB6C5] leading-[1.65]">
                      {whoItIsFor}
                    </p>
                  </div>

                  <div className="py-5 space-y-2">
                    <h3 className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.16em] text-[#F5F1EA]/90">
                      The Outcome
                    </h3>
                    <p
                      className={`font-sans text-[13.5px] sm:text-[14px] text-[#DCE4EC] leading-[1.65] ${
                        isOutcomeQuoted ? 'italic' : ''
                      }`}
                    >
                      {isOutcomeQuoted ? `“${outcome}”` : outcome}
                    </p>
                  </div>
                </div>

                {/* 4. Bottom CTA Area */}
                <div className="mt-auto pt-5 border-t border-[#20374B]/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToService(service.slug)}
                    className="group/link inline-flex items-center gap-1 text-xs font-sans font-medium text-[#AAB6C5] hover:text-[#36A9F5] transition-colors duration-200 cursor-pointer"
                  >
                    <span>Explore service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openConsultationModal(service.title)}
                    className="group/cta inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#36A9F5]/12 hover:bg-[#36A9F5] border border-[#36A9F5]/45 hover:border-[#36A9F5] text-[#F5F1EA] hover:text-[#071321] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer active:scale-[0.98]"
                  >
                    <span>CONSULT</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </section>
      </div>
    </div>
  );
};
