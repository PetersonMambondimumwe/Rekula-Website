import React from 'react';
import { useApp } from '../context/AppContext';
import { siteSettings } from '../data/initialData';
import { ArrowUpRight, MessageSquare, Mail, MapPin, ShieldCheck, Heart, Lock } from 'lucide-react';
import { NavigationTab } from '../types';

export const Footer: React.FC = () => {
  const { setActiveTab, navigateToService, publishedServices } = useApp();

  const handleNav = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  return (
    <footer className="bg-navy-950 text-white/80 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Decorative subtle ambient circle */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-softblue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center">
                <img
                  src="/assets/rekula-logo.png"
                  alt="Re:kula Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Re<span className="text-softblue-light">:</span>kula
                </span>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-softblue-light uppercase mt-0.5">
                  GROW AGAIN
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-muted max-w-md leading-relaxed">
              Re:kula is the premier academic partner for learners of every age whose education needs a different kind of support. Whatever the reason a learner has fallen behind, we close the gap, build confidence, and help them grow again.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                CAPS Curricula
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                IEB Accredited
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                Cambridge International
              </span>
            </div>

            <div className="pt-2">
              <p className="text-xs text-slate-muted italic">
                * Re:kula tailors every academic journey individually. We do not publish fixed rate cards or packages; pricing options are discussed transparently during consultation.
              </p>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-softblue-light">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {publishedServices.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => navigateToService(service.slug)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-softblue-light hover:underline text-xs flex items-center gap-1 mt-1"
                >
                  Explore all services <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-softblue-light">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Our Story & Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-white transition-colors">
                  How Working With Us Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('founder')} className="hover:text-white transition-colors">
                  Meet Founder Shawn Maluleke
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('testimonials')} className="hover:text-white transition-colors">
                  Kind Words & Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors">
                  Careers (Join Our Team)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('volunteer')} className="hover:text-white transition-colors">
                  Get Involved (Volunteer Tutoring)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy & POPIA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Base */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-softblue-light">
              Pretoria Base
            </h4>
            <ul className="space-y-3 text-sm text-slate-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-softblue-light shrink-0 mt-0.5" />
                <span>Pretoria, Gauteng, South Africa (In-person & Nationwide/Global Online)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-softblue-light shrink-0" />
                <a href={`mailto:${siteSettings.displayEmail}`} className="hover:text-white transition-colors">
                  {siteSettings.displayEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/27674350849`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-emerald-300 transition-colors font-medium"
                >
                  WhatsApp: +27 67 435 0849
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => handleNav('contact')}
                className="w-full text-center px-4 py-2.5 rounded-full bg-softblue hover:bg-softblue-hover text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                Get in Touch
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-muted">
          <div>
            &copy; {new Date().getFullYear()} Re:kula (Pty) Ltd. Founded in Pretoria, South Africa. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy & Child Protection
            </button>
            
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-white transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
              title="Founder CMS Studio"
            >
              <Lock className="w-3 h-3 text-softblue-light" />
              <span>Founder CMS Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
