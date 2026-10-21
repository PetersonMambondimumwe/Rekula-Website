import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { siteSettings } from '../data/initialData';

export const PrivacyPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      <div>
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs text-softblue hover:text-navy transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>
      </div>

      <section className="space-y-4 pb-6 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>POPIA & Child Protection Compliance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-navy">
          Privacy Policy & Terms of Information Handling
        </h1>
        <p className="text-xs sm:text-sm text-slate-subtle">
          Last updated: October 2026 • Compliant with the South African Protection of Personal Information Act (POPIA)
        </p>
      </section>

      {/* Main Privacy Notice */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-subtle leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-navy">
            1. Our Commitment to Your Privacy
          </h2>
          <p>
            Re:kula (Pty) Ltd ("Re:kula", "we", "us", or "our"), founded in Pretoria, South Africa, respects the constitutional right to privacy and is strictly committed to protecting the personal information of our learners, parents, guardians, job applicants, and volunteers in accordance with the Protection of Personal Information Act, 4 of 2013 (POPIA).
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-softblue-tint/40 border border-softblue/30 space-y-2.5">
          <h2 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
            <Lock className="w-4 h-4 text-softblue" /> 2. Special Protections for Minor Learners (Under 18)
          </h2>
          <p className="text-navy/90">
            Because our educational services actively support children, we enforce rigorous child protection and data minimization protocols:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-subtle">
            <li>We only collect the learner’s first name on public consultation forms—never their surname or national identity number.</li>
            <li>We require verified parent or legal guardian consent prior to providing any academic services or tutoring.</li>
            <li>We never publish photographs, full names, or identifying details of learners under 18 anywhere on our website or social media.</li>
            <li>All educators, tutors, and volunteers complete child protection and background clearance prior to placement.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-navy">
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
          <h2 className="font-serif text-xl font-bold text-navy">
            4. Information We NEVER Collect Online
          </h2>
          <p>
            To prevent accidental data loss or security risk, Re:kula will never ask for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>South African ID numbers or passport copies at the initial enquiry stage.</li>
            <li>Bank account or credit card details via website forms.</li>
            <li>Sensitive medical or clinical files via public forms (these are handled under private educator-parent privilege).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-navy">
            5. Purpose of Processing
          </h2>
          <p>
            Your information is processed exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Evaluate learning requirements and design tailored curriculum bridging and tutoring plans.</li>
            <li>Liaise with the learner’s school teachers, with your explicit authorization.</li>
            <li>Process educator applications and volunteer tutor placements.</li>
            <li>Communicate with you regarding consultations via your preferred contact channel (Email, Phone, or WhatsApp).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-navy">
            6. Data Retention & Your Rights
          </h2>
          <p>
            Under POPIA, you retain the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request access to any personal records held by Re:kula.</li>
            <li>Request rectification or deletion of your information from our active databases at any time.</li>
            <li>Withdraw marketing or consultation consent without penalty.</li>
          </ul>
          <p className="pt-2">
            For data requests or POPIA queries, please contact Shawn Maluleke directly at{' '}
            <a href={`mailto:${siteSettings.displayEmail}`} className="text-softblue underline">
              {siteSettings.displayEmail}
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  );
};
