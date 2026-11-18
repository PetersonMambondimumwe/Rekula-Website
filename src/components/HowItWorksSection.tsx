import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GraduationCap,
  MessageCircleMore,
  CalendarDays,
  ChartColumnIncreasing,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

interface HowItWorksStep {
  stepLabel: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: HowItWorksStep[] = [
  {
    stepLabel: 'STEP 01',
    title: 'Enquire',
    description: 'Reach out through our consultation form or WhatsApp.',
    icon: GraduationCap,
  },
  {
    stepLabel: 'STEP 02',
    title: 'Consult',
    description: 'A thoughtful, confidential conversation about your goals.',
    icon: MessageCircleMore,
  },
  {
    stepLabel: 'STEP 03',
    title: 'Plan',
    description:
      'We assign the right specialist, design a personalized plan, and arrange your learning schedule.',
    icon: CalendarDays,
  },
  {
    stepLabel: 'STEP 04',
    title: 'Support & Review',
    description:
      'Get ongoing guidance, track progress, and adjust your plan as you grow.',
    icon: ChartColumnIncreasing,
  },
];

interface HowItWorksSectionProps {
  headingAs?: 'h1' | 'h2';
  showTopBorder?: boolean;
  className?: string;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  headingAs = 'h2',
  showTopBorder = true,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const HeadingTag = headingAs;

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className={`relative w-full overflow-hidden bg-[#071321] px-6 sm:px-10 lg:px-12 py-24 sm:py-28 lg:py-32 ${
        showTopBorder ? 'border-t border-[#36A9F5]/15' : ''
      } ${className}`}
    >
      {/* Subtle Blue Radial Gradients Around the Edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 46% 48% at 0% 0%, rgba(28, 94, 172, 0.30), transparent 72%)',
            'radial-gradient(ellipse 46% 48% at 100% 100%, rgba(28, 94, 172, 0.26), transparent 72%)',
            'radial-gradient(ellipse 52% 32% at 50% 0%, rgba(54, 169, 245, 0.08), transparent 70%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Centered Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20 space-y-5"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#36A9F5]/30 bg-[#0B1C30]/80 shadow-[inset_0_1px_0_rgba(54,169,245,0.16)]">
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#D8E3EE]">
              HOW IT <span className="text-[#36A9F5]">WORKS</span>
            </span>
          </div>

          <HeadingTag
            id="how-it-works-heading"
            className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-medium tracking-[-0.015em] text-[#F5F1EA] leading-[1.12]"
          >
            How Working With Us{' '}
            <span className="text-[#36A9F5]">Works.</span>
          </HeadingTag>

          <p className="font-sans text-sm sm:text-base text-[#AAB6C5] leading-relaxed max-w-xl mx-auto">
            We make learning simple. Here&apos;s how we help you go from
            uncertainty to confidence.
          </p>
        </motion.div>

        {/* Four-Step Horizontal Flow (Desktop) / 2x2 (Tablet) / Stacked (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)_52px_minmax(0,1fr)_52px_minmax(0,1fr)] gap-5 md:gap-6 lg:gap-0 items-stretch">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.stepLabel}>
                <motion.article
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative h-full flex flex-col rounded-2xl p-6 sm:p-7 text-left border border-[#36A9F5]/20 bg-gradient-to-br from-[#0F243D]/95 via-[#0A1A2D] to-[#081524] shadow-[inset_0_1px_0_rgba(54,169,245,0.16),0_18px_40px_-24px_rgba(0,0,0,0.65)] transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#36A9F5]/45 hover:from-[#132C4A] hover:via-[#0D2138] hover:to-[#0A1A2E] before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_14%_12%,rgba(54,169,245,0.13),transparent_52%)] before:opacity-80 group-hover:before:opacity-100 before:transition-opacity before:duration-300"
                >
                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Icon Container */}
                    <div className="w-[48px] h-[48px] rounded-xl bg-gradient-to-b from-[#173A63]/85 to-[#0D233D]/95 border border-[#36A9F5]/30 flex items-center justify-center text-[#E8F1FA] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] group-hover:border-[#36A9F5]/55 transition-colors duration-300 mb-[24px]">
                      <Icon className="w-5 h-5" strokeWidth={1.65} />
                    </div>

                    {/* Step Pill */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#36A9F5]/25 bg-[#0A1D33]/85 text-[10px] font-sans font-medium uppercase tracking-[0.16em] text-[#5EB8F7] mb-3.5 w-fit">
                      {step.stepLabel}
                    </span>

                    {/* Serif Heading */}
                    <h3 className="font-serif text-[22px] sm:text-[24px] font-medium text-[#F5F1EA] tracking-[-0.01em] leading-snug mb-2.5">
                      {step.title}
                    </h3>

                    {/* Clean Sans-Serif Description */}
                    <p className="font-sans text-[13.5px] sm:text-sm text-[#AAB6C5] leading-[1.6]">
                      {step.description}
                    </p>
                  </div>
                </motion.article>

                {/* Desktop-only Connecting Line & Arrow Indicator */}
                {index < STEPS.length - 1 && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: prefersReducedMotion ? 0 : index * 0.08 + 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-hidden="true"
                    className="hidden lg:flex items-center justify-center w-full"
                  >
                    <div className="h-px flex-1 bg-gradient-to-r from-[#36A9F5]/20 to-[#36A9F5]/45" />
                    <div className="w-7 h-7 rounded-full bg-[#091829] border border-[#36A9F5]/40 flex items-center justify-center text-[#E8F1FA] shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.8} />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#36A9F5]/45 to-[#36A9F5]/20" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
