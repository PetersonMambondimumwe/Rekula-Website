import React from 'react';
import { useApp } from '../context/AppContext';
import { siteSettings } from '../data/initialData';
import { MessageSquare, Mail, MapPin, ArrowUpRight, Lock } from 'lucide-react';
import { NavigationTab } from '../types';

export const Footer: React.FC = () => {
  const { setActiveTab, navigateToService, publishedServices } = useApp();

  const handleNav = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  return (
    <footer className="w-full bg-void text-cream pt-20 pb-12 border-t border-dashed border-border-cork relative overflow-hidden">
      
      {/* Background ambient warmth */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-softblue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 relative z-10 space-y-16">
        
        {/* Top Row: Brand & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-dashed border-border-cork text-left">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface border border-border-cork flex items-center justify-center p-1 overflow-hidden">
                <img
                  src="/assets/rekula-logo-cream.png"
                  alt="Re:kula Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm font-medium tracking-[0.2em] text-cream uppercase leading-none">
                  RE<span className="text-softblue">:</span>KULA
                </span>
                <span className="text-[9px] font-medium tracking-[0.25em] text-cream-muted uppercase mt-0.5">
                  GROW AGAIN
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-cream-muted max-w-sm leading-relaxed">
              The academic partner for learners of every age whose education needs a different kind of support. Whatever the reason a learner has fallen behind, we close the gap, build confidence, and help them grow again.
            </p>

            <div className="pt-2 text-[10px] font-mono uppercase tracking-widest text-cream-muted space-y-1">
              <p>* FOUNDED IN PRETORIA, SOUTH AFRICA · 2023</p>
              <p>* CAPS · IEB · CAMBRIDGE INTERNATIONAL PROGRAMMES</p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-ember">
              SERVICES
            </h4>
            <div className="dashed-divider my-2" />
            <ul className="space-y-2 text-xs text-cream-muted">
              {publishedServices.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => navigateToService(service.slug)}
                    className="hover:text-white transition-colors text-left uppercase tracking-wider"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-softblue hover:underline text-[11px] uppercase tracking-wider flex items-center gap-1 mt-2"
                >
                  All Services Hub &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-ember">
              EXPLORE
            </h4>
            <div className="dashed-divider my-2" />
            <ul className="space-y-2 text-xs text-cream-muted uppercase tracking-wider">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-white transition-colors">
                  How It Works & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('founder')} className="hover:text-white transition-colors">
                  Meet Shawn Maluleke
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('testimonials')} className="hover:text-white transition-colors">
                  Kind Words & Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors">
                  Careers (Join Team)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('volunteer')} className="hover:text-white transition-colors">
                  Give Back (Volunteer)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy & POPIA
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Base */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-ember">
              PRETORIA BASE
            </h4>
            <div className="dashed-divider my-2" />
            <ul className="space-y-3 text-xs text-cream-muted">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-softblue shrink-0 mt-0.5" />
                <span>Pretoria, Gauteng · In-Person & Global Online</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-softblue shrink-0" />
                <a href={`mailto:${siteSettings.displayEmail}`} className="hover:text-white transition-colors">
                  {siteSettings.displayEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/27674350849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-mono"
                >
                  +27 67 435 0849
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => handleNav('contact')}
                className="w-full rounded-buttons-outlined border border-cream text-cream hover:bg-cream hover:text-void py-2.5 text-[10px] font-medium uppercase tracking-widest transition-colors"
              >
                Direct Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: System legal & studio credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono uppercase tracking-widest text-cream-muted/70">
          <div>
            &copy; {new Date().getFullYear()} RE:KULA (PTY) LTD · GROW AGAIN · ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <span>NO PRICING DISPLAYED · TAILORED ASSESSMENTS ONLY</span>
            
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-white transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
              title="Founder CMS Studio"
            >
              <Lock className="w-3 h-3 text-softblue" />
              <span>FOUNDER PORTAL</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
