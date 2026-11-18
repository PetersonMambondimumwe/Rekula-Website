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
    { tab: 'founder', label: 'TEAM' },
    { tab: 'volunteer', label: 'GIVE BACK' },
    { tab: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled
          ? 'bg-[#050D18]/92 backdrop-blur-xl border-b border-[#36A9F5]/15 py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-[1360px] mx-auto w-full px-5 sm:px-[40px] lg:px-[48px] flex items-center justify-between">
        {/* Left: Re:kula Brand Emblem & Serif Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 sm:gap-4 group text-left focus:outline-none cursor-pointer"
        >
          <div className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px] flex items-center justify-center shrink-0">
            <img
              src="/assets/rekula-logo-cream.png"
              alt="Re:kula Logo"
              className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span
            aria-hidden="true"
            className="h-[30px] w-px bg-[#F5F1EA]/20 hidden sm:block"
          />
          <span className="font-serif text-[24px] sm:text-[28px] font-medium tracking-[-0.01em] text-[#F5F1EA] leading-none">
            Re<span className="text-[#36A9F5]">:</span>kula
          </span>
        </button>

        {/* Right: Minimal Editorial Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-[32px] xl:gap-[40px] text-[12px] font-sans font-medium tracking-[0.16em] uppercase"
        >
          {navItems.map((item) => {
            const isActive =
              activeTab === item.tab ||
              (item.tab === 'services' && activeTab === 'service-detail');
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`relative py-1.5 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#F5F1EA]'
                    : 'text-[#AAB6C5] hover:text-[#F5F1EA]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#36A9F5] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-full bg-[#0D1A28] border border-[#20374B] text-[#F5F1EA] flex items-center justify-center hover:border-[#36A9F5]/60 transition-colors cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-[#050D18]/98 backdrop-blur-2xl z-40 p-6 pt-24 pb-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#20374B]">
              <span className="text-[10px] tracking-[0.25em] font-medium text-[#AAB6C5]">
                Re:kula · NAVIGATION
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#36A9F5]">
                SOUTH AFRICA · EST. 2023
              </span>
            </div>

            <div className="flex flex-col space-y-2 pt-2">
              {navItems.map((item) => {
                const isActive =
                  activeTab === item.tab ||
                  (item.tab === 'services' && activeTab === 'service-detail');
                return (
                  <button
                    key={item.tab}
                    onClick={() => handleNavClick(item.tab)}
                    className={`text-left text-lg sm:text-xl font-medium tracking-[0.12em] uppercase py-3 min-h-[44px] transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'text-[#36A9F5]'
                        : 'text-[#F5F1EA] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#AAB6C5] font-mono tracking-normal">
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#20374B]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultationModal();
              }}
              className="w-full rounded-full bg-[#36A9F5] hover:bg-[#4BB4F7] text-[#050D18] text-center py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Request Consultation
            </button>
            <p className="text-center text-[10px] text-[#AAB6C5] uppercase tracking-widest">
              CAPS · IEB · Cambridge International
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
