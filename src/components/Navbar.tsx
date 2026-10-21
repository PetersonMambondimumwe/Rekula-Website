import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { NavigationTab } from '../types';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, openConsultationModal } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const navItems: { tab: NavigationTab; label: string }[] = [
    { tab: 'home', label: 'INTRO' },
    { tab: 'services', label: 'SERVICES' },
    { tab: 'how-it-works', label: 'HOW IT WORKS' },
    { tab: 'founder', label: 'FOUNDER' },
    { tab: 'testimonials', label: 'STORIES' },
    { tab: 'careers', label: 'CAREERS' },
    { tab: 'volunteer', label: 'GIVE BACK' },
    { tab: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-void/90 backdrop-blur-xl border-b border-border-cork/40 py-3.5'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="w-full px-6 sm:px-12 flex items-center justify-between">
        
        {/* Left: Re:kula Wordmark & Model Identity */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <img
              src="/assets/rekula-logo-cream.png"
              alt="Re:kula Logo"
              className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[15px] sm:text-[16px] font-medium tracking-[0.06em] text-cream leading-none">
              Re<span className="text-softblue">:</span>kula
            </span>
            <span className="text-[9px] font-medium tracking-[0.22em] text-cream-muted uppercase mt-1">
              GROW AGAIN
            </span>
          </div>
        </button>

        {/* Center/Right: Desktop Minimal Navigation (ORYZO 12px uppercase) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.14em] uppercase text-cream">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab || (item.tab === 'services' && activeTab === 'service-detail');
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`relative py-1 hover:text-white transition-colors ${
                  isActive ? 'text-white' : 'text-cream-muted'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full border-b border-dashed border-cream" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Pill Button (Filled) strictly from ORYZO */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Icon */}
          <a
            href="https://wa.me/27674350849"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp"
            className="w-9 h-9 rounded-full bg-surface border border-border-cork text-emerald-400 hover:border-emerald-500 flex items-center justify-center transition-all duration-300 hover:scale-105"
            title="Chat on WhatsApp (+27 67 435 0849)"
          >
            <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
          </a>

          {/* Primary Consultation Pill CTA */}
          <button
            onClick={() => openConsultationModal()}
            className="hidden sm:inline-flex items-center gap-2 rounded-buttons-pill bg-surface hover:bg-softblue text-cream hover:text-white px-5 py-2.5 text-[11px] sm:text-[12px] font-medium tracking-[0.12em] uppercase border border-border-cork transition-all duration-300 active:scale-[0.98]"
          >
            <span>Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-surface border border-border-cork text-cream flex items-center justify-center hover:border-cream transition-colors"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Full-Screen Void Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-void/98 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-border-cork">
              <span className="text-[10px] tracking-[0.25em] font-medium text-cream-muted">
                Re:kula · SITEMAP
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-ember">
                PRETORIA · EST. 2023
              </span>
            </div>

            <div className="flex flex-col space-y-3 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`text-left text-lg sm:text-xl font-medium tracking-[0.1em] uppercase py-1.5 transition-colors flex items-center justify-between ${
                    activeTab === item.tab ? 'text-softblue' : 'text-cream hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-cream-muted font-mono tracking-normal">
                    &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-dashed border-border-cork">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultationModal();
              }}
              className="w-full rounded-buttons-pill bg-cream text-void text-center py-3.5 text-xs font-medium uppercase tracking-[0.12em]"
            >
              Request a Consultation
            </button>
            <p className="text-center text-[10px] text-cream-muted uppercase tracking-widest">
              Zero Pricing Displayed • Tailored Individual Support
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
