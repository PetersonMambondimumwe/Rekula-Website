import React from 'react';
import { useApp } from '../context/AppContext';
import { differentiators } from '../data/initialData';
import { ArrowUpRight, Sparkles, CheckCircle2, HeartHandshake, Compass, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openConsultationModal, setActiveTab } = useApp();

  return (
    <div className="space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* 1. Header & Positioning */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Identity & Purpose</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          The Academic Partner for Learners Whose Education Needs a Different Kind of Support.
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          Whatever the reason a learner has fallen behind, we close the gap, build confidence, and help them grow again. We believe falling behind is never a reflection of capability—it simply calls for a more compassionate, tailored academic approach.
        </p>
      </section>

      {/* 2. Our Story Section strictly from brief */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-navy/90 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Our Story
          </h2>
          <p>
            Re:kula began in 2023 as a simple tutoring company in Pretoria, created to support learners who were struggling with core subjects.
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
          <p className="font-medium text-softblue italic">
            Whatever the reason a learner needs us, our approach stays the same: meet them where they are, and help them grow again.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="p-3 rounded-3xl bg-navy/5 ring-1 ring-navy/10 shadow-lg">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-navy-950 relative">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                alt="Supportive learning environment at Re:kula"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-bold">Founded in Pretoria, 2023</p>
                <p className="text-white/80 text-[11px]">Led by registered educator Shawn Maluleke</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 10 Re:kula Differentiators */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-softblue">
            Why Re:kula
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            What Makes Our Approach Distinctive
          </h2>
          <p className="text-sm text-slate-subtle max-w-xl">
            Ten guiding principles that shape every lesson, timetable, and learner relationship we establish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((diff, index) => (
            <div
              key={diff.title}
              className="p-6 rounded-3xl bg-white border border-navy/10 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-softblue-tint text-softblue font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-navy">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-subtle leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Values in Action */}
      <section className="p-8 sm:p-12 rounded-3xl bg-softblue-tint/50 border border-softblue/20 space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
          Giving Back to Our Communities
        </h3>
        <p className="text-sm text-slate-subtle max-w-3xl leading-relaxed">
          At Re:kula, elite educational support is never synonymous with exclusivity. Through our dedicated volunteer tutoring division, qualified tutors and university students volunteer their time to guide learners from under-resourced schools across Gauteng and beyond.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('volunteer')}
            className="px-5 py-2.5 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
          >
            Join as a volunteer tutor
          </button>
          <button
            onClick={() => openConsultationModal()}
            className="px-5 py-2.5 rounded-full bg-white border border-navy/20 text-navy text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Enquire about academic partnerships
          </button>
        </div>
      </section>

    </div>
  );
};
