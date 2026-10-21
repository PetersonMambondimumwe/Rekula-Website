import React, { useState } from 'react';
import { ConsultationForm } from '../components/ConsultationForm';
import { OrganizationForm, QuickContactForm } from '../components/OrganizationForm';
import { siteSettings } from '../data/initialData';
import { MessageSquare, Mail, MapPin, Sparkles, Building2, User, Send, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [activeFormTab, setActiveFormTab] = useState<'consultation' | 'organization' | 'quick'>('consultation');

  return (
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-16 text-left">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-ember" />
          <span>DIRECT ENQUIRIES · PRETORIA & ONLINE</span>
        </div>
        <h1 className="font-serif text-[40px] sm:text-[54px] font-medium uppercase tracking-tight text-cream leading-[0.92]">
          GET IN TOUCH & CONSULT.
        </h1>
        <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
          Tell us about the learner, their goals and their situation. We will take it from there. Every plan is bespoke, compassionate, and built around real life.
        </p>
      </section>

      {/* Contact Quick Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WhatsApp card */}
        <a
          href="https://wa.me/27674350849"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-cards bg-surface/50 border border-border-cork p-6 hover:border-emerald-500 transition-all flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-full bg-void border border-border-cork text-emerald-400 flex items-center justify-center shrink-0 group-hover:border-emerald-400 transition-colors">
            <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              IMMEDIATE
            </span>
            <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
              WhatsApp Direct
            </h3>
            <p className="text-xs text-cream-muted font-mono">
              {siteSettings.phoneDisplay}
            </p>
          </div>
        </a>

        {/* Email card */}
        <div className="rounded-cards bg-surface/50 border border-border-cork p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-void border border-border-cork text-softblue flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
              CORRESPONDENCE
            </span>
            <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
              Official Email
            </h3>
            <a
              href={`mailto:${siteSettings.displayEmail}`}
              className="text-xs text-softblue hover:underline break-all font-mono"
            >
              {siteSettings.displayEmail}
            </a>
          </div>
        </div>

        {/* Pretoria Base */}
        <div className="rounded-cards bg-surface/50 border border-border-cork p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-void border border-border-cork text-ember flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
              LOCATION
            </span>
            <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
              Pretoria, South Africa
            </h3>
            <p className="text-xs text-cream-muted">
              In-person across Pretoria; online nationwide & internationally.
            </p>
          </div>
        </div>

      </section>

      {/* Main Forms Section with Tabs */}
      <section className="space-y-6">
        
        {/* Form Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-dashed border-border-cork">
          <button
            onClick={() => setActiveFormTab('consultation')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFormTab === 'consultation'
                ? 'bg-cream text-void font-bold shadow-md'
                : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Form 1: Consultation</span>
          </button>

          <button
            onClick={() => setActiveFormTab('organization')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFormTab === 'organization'
                ? 'bg-cream text-void font-bold shadow-md'
                : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Form 2: School / Organisation</span>
          </button>

          <button
            onClick={() => setActiveFormTab('quick')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFormTab === 'quick'
                ? 'bg-cream text-void font-bold shadow-md'
                : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Form 3: Quick Message</span>
          </button>
        </div>

        {/* Selected Form Container */}
        <div className="rounded-cards bg-surface/70 border border-border-cork p-6 sm:p-10 shadow-2xl">
          {activeFormTab === 'consultation' && (
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-dashed border-border-cork">
                <h2 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
                  Request a Consultation
                </h2>
                <p className="text-xs text-cream-muted">
                  Complete this form to receive a tailored academic roadmap. Every learner’s plan is unique—no packages or rate cards.
                </p>
              </div>
              <ConsultationForm isEmbedded={true} />
            </div>
          )}

          {activeFormTab === 'organization' && (
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-dashed border-border-cork">
                <h2 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
                  Institutional & School Enquiries
                </h2>
                <p className="text-xs text-cream-muted">
                  For schools, sports clubs, homeschool co-ops, and academies seeking workshop-style exam preparation or structured bridging.
                </p>
              </div>
              <OrganizationForm />
            </div>
          )}

          {activeFormTab === 'quick' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-1 pb-4 border-b border-dashed border-border-cork text-center">
                <h2 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
                  Quick Message
                </h2>
                <p className="text-xs text-cream-muted">
                  Have a quick question? Leave us a message and we will respond promptly.
                </p>
              </div>
              <QuickContactForm />
            </div>
          )}
        </div>

      </section>

      {/* Pricing Policy Card */}
      <section className="rounded-cards bg-surface/40 border border-dashed border-border-cork p-6 text-xs text-cream-muted space-y-1.5 font-mono">
        <p className="font-medium text-cream uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-softblue" /> NOTE ON TUITION PRICING:
        </p>
        <p>
          Every learner’s plan is tailored to their specific curriculum, diagnostic needs, and timetable. We do not publish fixed rate cards or packages. Options and fees are discussed transparently and privately during your consultation.
        </p>
      </section>

    </div>
  );
};
