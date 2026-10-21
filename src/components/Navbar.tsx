import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Menu, X, MessageSquare, ChevronDown, Sparkles, HeartHandshake, Briefcase, GraduationCap, Shield } from 'lucide-react';
import { NavigationTab } from '../types';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, openConsultationModal, publishedServices, navigateToService } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    setServicesDropdownOpen(false);
  };

  const navLinks: { tab: NavigationTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'about', label: 'About Us' },
    { tab: 'how-it-works', label: 'How It Works' },
    { tab: 'founder', label: 'Meet Shawn' },
    { tab: 'testimonials', label: 'Stories' },
    { tab: 'careers', label: 'Careers' },
    { tab: 'volunteer', label: 'Volunteer' },
    { tab: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="glass-island rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Re:kula Home"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center p-0.5 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/rekula-logo.png"
                alt="Re:kula Leaf Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-navy leading-none">
                Re<span className="text-softblue">:</span>kula
              </span>
              <span className="text-[9px] tracking-[0.25em] font-semibold text-softblue uppercase leading-tight mt-0.5">
                GROW AGAIN
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-navy/90">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'home'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'about'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              About
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors ${
                  activeTab === 'services' || activeTab === 'service-detail'
                    ? 'bg-softblue-tint text-navy font-semibold'
                    : 'hover:text-softblue hover:bg-softblue-mist/60'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-navy/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-subtle">
                      Tailored Support
                    </span>
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-xs text-softblue hover:underline font-medium"
                    >
                      View All ({publishedServices.length})
                    </button>
                  </div>
                  <div className="py-1">
                    {publishedServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          navigateToService(service.slug);
                          setServicesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-softblue-tint/50 transition-colors flex flex-col group/item"
                      >
                        <span className="text-sm font-semibold text-navy group-hover/item:text-softblue flex items-center justify-between">
                          {service.title}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-xs text-slate-subtle line-clamp-1">
                          {service.tagline}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'how-it-works'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => handleNavClick('founder')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'founder'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              Meet Shawn
            </button>

            <button
              onClick={() => handleNavClick('testimonials')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'testimonials'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              Stories
            </button>

            <button
              onClick={() => handleNavClick('careers')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'careers'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              Careers
            </button>

            <button
              onClick={() => handleNavClick('volunteer')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'volunteer'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              Volunteer
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'contact'
                  ? 'bg-softblue-tint text-navy font-semibold'
                  : 'hover:text-softblue hover:bg-softblue-mist/60'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action: Button-in-Button CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Chat */}
            <a
              href="https://wa.me/27674350849"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Contact"
              className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center transition-all duration-300 hover:scale-105 ring-1 ring-emerald-200/50"
              title="Chat with Re:kula on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-600/20" />
            </a>

            {/* Primary Consultation Button with nested trailing arrow circle */}
            <button
              onClick={() => openConsultationModal()}
              className="group relative inline-flex items-center gap-2.5 bg-navy text-white hover:bg-navy-800 rounded-full pl-4 pr-1.5 py-1.5 sm:pl-5 sm:pr-2 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <span>Consultation</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-softblue">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-softblue-tint flex items-center justify-center text-navy hover:text-softblue focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] z-40 bg-navy-950/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-navy/10 max-h-[85vh] overflow-y-auto flex flex-col gap-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs uppercase tracking-widest font-bold text-softblue">
                Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-subtle hover:text-navy"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-base font-medium transition-colors ${
                    activeTab === link.tab
                      ? 'bg-softblue-tint text-navy font-semibold'
                      : 'text-navy hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('services')}
                className={`text-left px-4 py-2.5 rounded-2xl text-base font-medium transition-colors ${
                  activeTab === 'services' || activeTab === 'service-detail'
                    ? 'bg-softblue-tint text-navy font-semibold'
                    : 'text-navy hover:bg-slate-50'
                }`}
              >
                Services Hub ({publishedServices.length})
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className={`text-left px-4 py-2.5 rounded-2xl text-xs font-medium text-slate-subtle hover:text-navy transition-colors flex items-center gap-2 mt-2 pt-2 border-t border-slate-100`}
              >
                <Shield className="w-3.5 h-3.5 text-softblue" />
                Founder Portal / CMS Studio
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultationModal();
                }}
                className="w-full bg-navy text-white text-center py-3 rounded-full text-sm font-semibold shadow-md"
              >
                Request a Consultation
              </button>

              <a
                href="https://wa.me/27674350849"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 text-center py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                WhatsApp: +27 67 435 0849
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
