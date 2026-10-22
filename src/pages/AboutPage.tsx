import React from 'react';
import { useApp } from '../context/AppContext';
import { differentiators, audienceList } from '../data/initialData';
import { ArrowUpRight, BookOpen, GraduationCap, Trophy, Clock, Globe, Laptop, Users, HeartHandshake, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();

  const getAudienceIcon = (icon: string) => {
    switch (icon) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-softblue" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-softblue" />;
      case 'Trophy':
        return <Trophy className="w-4 h-4 text-softblue" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-softblue" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-softblue" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4 text-softblue" />;
      case 'Users':
        return <Users className="w-4 h-4 text-softblue" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-softblue" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-softblue" />;
    }
  };

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-24 text-left">
      
      {/* 1. Header & Core Positioning Statement */}
      <section className="max-w-5xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          <span>POSITIONING STATEMENT · FOUNDED 2023</span>
        </div>

        <h1 className="font-serif text-[40px] sm:text-[56px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          THE ACADEMIC PARTNER FOR LEARNERS WHOSE EDUCATION NEEDS A DIFFERENT KIND OF SUPPORT.
        </h1>

        <p className="text-[20px] sm:text-[26px] font-normal leading-[1.28] text-cream-muted max-w-3xl">
          Whatever the reason a learner has fallen behind, we close the gap, build confidence, and help them grow again.
        </p>

        <div className="dashed-divider pt-2" />
      </section>

      {/* 2. Our Story Section strictly from brief */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-cream-muted leading-relaxed">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-softblue block">
            THE CHRONICLE
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
            Our Story
          </h2>

          <p>
            Re:kula began in 2023 as a simple tutoring company in South Africa, created to support learners who were struggling with core subjects.
          </p>

          <p>
            As we worked with more families, we saw that learners fall behind for many different reasons. Some miss weeks of school through illness or family circumstances. Others are away for camps and championships; many of the learners we support compete nationally and internationally. Others arrive from abroad and have to adjust to a new curriculum.
          </p>

          <p>
            So we began to bridge the curriculum, staying in contact with teachers to close the gap, and we helped learners integrate into the South African curriculum (CAPS and IEB) as well as the Cambridge International Curriculum.
          </p>

          <p>
            More recently, we added academic success consulting, supporting homeschooled and online learners, including those with professional-level sporting commitments. We also support early readers, and adults who want a second chance at matric.
          </p>

          <p className="font-serif text-lg text-cream italic pt-2">
            “Whatever the reason a learner needs us, our approach stays the same: meet them where they are, and help them grow again.”
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-cards bg-surface border border-border-cork p-2 shadow-2xl">
            <div className="rounded-lg overflow-hidden aspect-[3/4] sm:aspect-[4/3] bg-void relative">
              <img
                src="/assets/shawn-maluleke.png"
                alt="Lead Educator of Re:kula"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ember">FOUNDER & LEAD EDUCATOR · EST. 2023</p>
                <p className="font-serif text-base uppercase tracking-wider text-cream font-medium mt-0.5">Lead Educator</p>
                <p className="text-[11px] text-cream-muted font-mono tracking-wider">B.Ed (22 Distinctions) · Cum Laude</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who We Help (Moved to About Tab so Landing Page stays ultra-clean) */}
      <section className="space-y-12">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ember">
            AUDIENCE PROFILES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
            Who We Help
          </h2>
          <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
            Every learner’s circumstance is respected. We present every group with equal dignity and focus—whether you are returning from competition, learning to read, or conquering matric as an adult.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audienceList.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-cards bg-surface/60 border border-border-cork p-6 space-y-3 hover:border-cream/40 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cream-muted">
                <span>AUDIENCE 0{idx + 1}</span>
                <div className="w-7 h-7 rounded-full bg-void border border-border-cork flex items-center justify-center">
                  {getAudienceIcon(item.icon)}
                </div>
              </div>
              <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
                {item.title}
              </h3>
              <p className="text-[11px] text-softblue font-medium uppercase tracking-wider">
                {item.subtitle}
              </p>
              <div className="dashed-divider my-2" />
              <p className="text-xs text-cream-muted leading-relaxed">
                {item.need}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The 10 Differentiators from Brief */}
      <section className="space-y-12">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-softblue uppercase">
            WHY Re:kula
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium uppercase tracking-tight text-cream">
            Ten Distinctive Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((diff, index) => (
            <div
              key={diff.title}
              className="rounded-cards bg-surface/40 border border-border-cork p-6 flex items-start gap-4 hover:border-border-driftwood transition-colors"
            >
              <span className="font-mono text-xs font-bold text-softblue mt-0.5">
                0{index + 1}
              </span>
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Direct Action CTA */}
      <section className="rounded-cards bg-surface border border-border-cork p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl uppercase tracking-tight font-medium text-cream">
            Ready to Build a Plan?
          </h3>
          <p className="text-xs sm:text-sm text-cream-muted">
            Our Lead Educator and our educator team will construct an individualized roadmap fitting your life.
          </p>
        </div>

        <button
          onClick={() => openConsultationModal()}
          className="rounded-buttons-pill bg-cream text-void hover:bg-white px-7 py-3 text-xs font-medium uppercase tracking-widest transition-all shadow-md shrink-0"
        >
          Request Consultation
        </button>
      </section>

    </div>
  );
};
