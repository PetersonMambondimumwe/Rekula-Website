import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConsultationForm } from '../components/ConsultationForm';
import { OrganizationForm, QuickContactForm } from '../components/OrganizationForm';
import { siteSettings } from '../data/initialData';
import { MessageSquare, Mail, MapPin, Sparkles, Building2, User, Send, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [activeFormTab, setActiveFormTab] = useState<'consultation' | 'organization' | 'quick'>('consultation');

  return (
    <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connect With Re:kula</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-navy">
          Get in Touch & Request a Consultation
        </h1>
        <p className="text-base sm:text-lg text-slate-subtle leading-relaxed">
          Tell us about the learner, their goals and their situation. We will take it from there. Every plan is bespoke, compassionate, and built around real life.
        </p>
      </section>

      {/* Contact Quick Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WhatsApp direct card */}
        <a
          href="https://wa.me/27674350849"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6 fill-white/20" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Immediate Response
            </span>
            <h3 className="font-serif text-lg font-bold text-navy group-hover:text-emerald-800 transition-colors">
              Chat on WhatsApp
            </h3>
            <p className="text-xs text-slate-subtle">
              {siteSettings.phoneDisplay}
            </p>
            <p className="text-[11px] text-emerald-700 font-medium pt-1">
              Click to open WhatsApp chat &rarr;
            </p>
          </div>
        </a>

        {/* Email card */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-softblue-light" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-subtle">
              Official Email
            </span>
            <h3 className="font-serif text-lg font-bold text-navy">
              Email Correspondence
            </h3>
            <a
              href={`mailto:${siteSettings.displayEmail}`}
              className="text-xs text-softblue hover:underline break-all font-medium block"
            >
              {siteSettings.displayEmail}
            </a>
            <p className="text-[11px] text-slate-subtle pt-1">
              Inquiries reviewed daily by Shawn
            </p>
          </div>
        </div>

        {/* Pretoria Base */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-softblue text-white flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-subtle">
              Location & Delivery
            </span>
            <h3 className="font-serif text-lg font-bold text-navy">
              Pretoria, South Africa
            </h3>
            <p className="text-xs text-slate-subtle leading-tight">
              In-person across Pretoria & Gauteng; online support nationwide & internationally.
            </p>
          </div>
        </div>

      </section>

      {/* Main Forms Section with Tabs */}
      <section className="space-y-6">
        
        {/* Form Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
          <button
            onClick={() => setActiveFormTab('consultation')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeFormTab === 'consultation'
                ? 'bg-navy text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Form 1: Request a Consultation (Learner / Parent)</span>
          </button>

          <button
            onClick={() => setActiveFormTab('organization')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeFormTab === 'organization'
                ? 'bg-navy text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Form 2: School, Club or Organisation</span>
          </button>

          <button
            onClick={() => setActiveFormTab('quick')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeFormTab === 'quick'
                ? 'bg-navy text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Form 3: Quick Contact</span>
          </button>
        </div>

        {/* Selected Form Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-navy/10 shadow-lg">
          {activeFormTab === 'consultation' && (
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h2 className="font-serif text-2xl font-bold text-navy">
                  Request a Consultation
                </h2>
                <p className="text-xs text-slate-subtle">
                  Complete this form to receive a tailored academic roadmap. Every learner’s plan is unique—no packages or rate cards.
                </p>
              </div>
              <ConsultationForm isEmbedded={true} />
            </div>
          )}

          {activeFormTab === 'organization' && (
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h2 className="font-serif text-2xl font-bold text-navy">
                  Institutional & School Enquiries
                </h2>
                <p className="text-xs text-slate-subtle">
                  For schools, sports clubs, homeschool co-ops, and academies seeking workshop-style exam preparation or structured bridging.
                </p>
              </div>
              <OrganizationForm />
            </div>
          )}

          {activeFormTab === 'quick' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-1 pb-4 border-b border-slate-100 text-center">
                <h2 className="font-serif text-2xl font-bold text-navy">
                  Quick Message
                </h2>
                <p className="text-xs text-slate-subtle">
                  Have a quick question? Leave us a message and we will respond promptly.
                </p>
              </div>
              <QuickContactForm />
            </div>
          )}
        </div>

      </section>

      {/* Pricing Policy Card */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-subtle space-y-1.5">
        <p className="font-bold text-navy flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-softblue" /> Note on Tuition Pricing:
        </p>
        <p>
          Every learner’s plan is tailored to their specific curriculum, subject combination, diagnostic needs, and timetable. Therefore, we do not publish fixed rate cards or packages. Options and fees are discussed transparently and privately during your consultation.
        </p>
      </section>

    </div>
  );
};
