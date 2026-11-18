import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { RekulaShaderBackground } from './components/RekulaShaderBackground';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FounderPage } from './pages/FounderPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { CareersPage } from './pages/CareersPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AdminPage } from './pages/AdminPage';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'service-detail':
        return <ServiceDetailPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'founder':
        return <FounderPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'careers':
        return <CareersPage />;
      case 'volunteer':
        return <VolunteerPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#03070d] text-cream selection:bg-softblue selection:text-white">
      {/* Global WebGL Motion Background */}
      <RekulaShaderBackground />

      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* Main View Area with page fade-in */}
      <main className="relative z-10 flex-1 animate-in fade-in duration-300">
        {renderActivePage()}
      </main>

      {/* Global Consultation Modal */}
      <ConsultationModal />

      {/* Comprehensive Brand Footer */}
      <Footer />
    </div>
  );
};
