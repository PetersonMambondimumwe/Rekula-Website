import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X } from 'lucide-react';
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
    { tab: 'home', label: 'HOME' },
    { tab: 'services', label: 'SERVICES' },
    { tab: 'founder', label: 'FOUNDER' },
    { tab: 'testimonials', label: 'STORIES' },
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
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
            <img
              src="/assets/rekula-logo-cream.png"
              alt="Re:kula Logo"
              className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="font-sans text-[20px] sm:text-[25px] font-medium tracking-[0.04em] text-cream leading-none">
            Re<span className="text-softblue">:</span>kula
          </span>
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

        {/* Right Action: Mobile Menu Trigger (Desktop Consultation button removed) */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface border border-border-cork text-cream flex items-center justify-center hover:border-cream transition-colors cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
          </button>
        </div>

      </div>

      {/* Mobile Full-Screen Void Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-void/98 backdrop-blur-2xl z-40 p-6 pt-24 pb-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-border-cork">
              <span className="text-[10px] tracking-[0.25em] font-medium text-cream-muted">
                Re:kula · SITEMAP
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-ember">
                SOUTH AFRICA · EST. 2023
              </span>
            </div>

            <div className="flex flex-col space-y-3 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`text-left text-lg sm:text-xl font-medium tracking-[0.1em] uppercase py-2.5 min-h-[44px] transition-colors flex items-center justify-between cursor-pointer ${
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
              Tailored Individual Support · South Africa & Global Online
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
