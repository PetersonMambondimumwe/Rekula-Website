import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import { siteSettings } from '../data/initialData';

export const PrivacyPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-12 text-left">
      
      <div>
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cream-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>
      </div>

      <section className="space-y-4 pb-6 border-b border-dashed border-border-cork">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <Shield className="w-3 h-3 text-ember" />
          <span>POPIA & MINOR PROTECTION PROTOCOL</span>
        </div>
        <h1 className="font-serif text-[36px] sm:text-[46px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          PRIVACY POLICY & INFORMATION HANDLING.
        </h1>
        <p className="text-xs text-cream-muted font-mono uppercase tracking-wider">
          Compliant with the South African Protection of Personal Information Act (POPIA)
        </p>
      </section>

      {/* Main Privacy Notice */}
      <div className="space-y-8 text-xs sm:text-sm text-cream-muted leading-relaxed max-w-4xl">
        
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
            1. Commitment to Information Security
          </h2>
          <p>
            Re:kula (Pty) Ltd ("Re:kula", "we", "us", or "our"), founded in South Africa, respects the constitutional right to privacy and is strictly committed to protecting the personal information of our learners, parents, guardians, job applicants, and volunteers in accordance with the Protection of Personal Information Act, 4 of 2013 (POPIA).
          </p>
        </section>

        <section className="p-6 rounded-cards bg-surface/50 border border-border-cork space-y-2.5">
          <h2 className="font-serif text-lg font-medium uppercase tracking-tight text-cream flex items-center gap-2">
            <Lock className="w-4 h-4 text-ember" /> 2. Special Protections for Minor Learners (Under 18)
          </h2>
          <p className="text-cream">
            Because our educational services actively support children, we enforce rigorous child protection and data minimization protocols:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We only collect the learner’s first name on public consultation forms—never their surname or national identity number.</li>
            <li>We require verified parent or legal guardian consent prior to providing any academic services or tutoring.</li>
            <li>We never publish photographs, full names, or identifying details of learners under 18 anywhere on our website or marketing.</li>
            <li>All educators, tutors, and volunteers complete child protection and background clearance prior to onboarding.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
            3. Information We Collect
          </h2>
          <p>
            When you complete our consultation, career, volunteer, or contact forms, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: Parent/guardian or adult learner name, email address, phone/WhatsApp number, city/province.</li>
            <li>Educational context: Learner grade or stage, school name (optional), curriculum (CAPS, IEB, Cambridge), subject needs, and timetable availability.</li>
            <li>Educator & Volunteer applicants: Qualification history, SACE/HPCSA registration numbers where applicable, curriculum familiarity, and uploaded CV files.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
            4. Information We NEVER Collect Online
          </h2>
          <p>
            To prevent accidental data loss or security risk, Re:kula will never ask for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>South African ID numbers or passport copies at the initial enquiry stage.</li>
            <li>Bank account or credit card details via website forms.</li>
            <li>Sensitive medical or clinical files via public forms.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
            5. Inquiries & Data Rights
          </h2>
          <p>
            For data inquiries or consent withdrawal under POPIA, contact our Lead Educator directly at{' '}
            <a href={`mailto:${siteSettings.displayEmail}`} className="text-softblue underline font-mono">
              {siteSettings.displayEmail}
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  );
};
