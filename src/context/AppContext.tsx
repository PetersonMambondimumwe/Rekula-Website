import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, Testimonial, FAQItem, FormSubmission, NavigationTab } from '../types';
import { initialServices, initialTestimonials, initialFAQs } from '../data/initialData';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedServiceSlug: string | null;
  setSelectedServiceSlug: (slug: string | null) => void;
  navigateToService: (slug: string) => void;
  isConsultationModalOpen: boolean;
  openConsultationModal: (preselectedService?: string) => void;
  closeConsultationModal: () => void;
  consultationPreselectedService: string;

  // CMS: Services
  services: Service[];
  publishedServices: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // CMS: Testimonials
  testimonials: Testimonial[];
  approvedTestimonials: Testimonial[];
  featuredTestimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'dateSubmitted' | 'isApproved' | 'isFeatured'>) => void;
  approveTestimonial: (id: string, isApproved: boolean) => void;
  toggleFeaturedTestimonial: (id: string) => void;
  deleteTestimonial: (id: string) => void;

  // CMS: FAQs
  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, updates: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Forms & Inquiries
  submissions: FormSubmission[];
  addSubmission: (formType: FormSubmission['formType'], data: Record<string, any>) => void;
  updateSubmissionStatus: (id: string, status: FormSubmission['status']) => void;
  deleteSubmission: (id: string) => void;
  exportSubmissionsToCSV: () => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<NavigationTab>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'about', 'services', 'service-detail', 'how-it-works', 'founder', 'testimonials', 'careers', 'volunteer', 'contact', 'privacy', 'admin'].includes(hash)) {
      return hash as NavigationTab;
    }
    return 'home';
  });

  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationPreselectedService, setConsultationPreselectedService] = useState('');

  // Sync hash with activeTab
  const setActiveTab = (tab: NavigationTab) => {
    setActiveTabState(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setActiveTab('service-detail');
  };

  const openConsultationModal = (preselectedService?: string) => {
    if (preselectedService) {
      setConsultationPreselectedService(preselectedService);
    } else {
      setConsultationPreselectedService('');
    }
    setIsConsultationModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
  };

  // Persistent Services
  const [services, setServices] = useState<Service[]>(() => {
    const stored = localStorage.getItem('rekula_services');
    return stored ? JSON.parse(stored) : initialServices;
  });

  useEffect(() => {
    localStorage.setItem('rekula_services', JSON.stringify(services));
  }, [services]);

  // Persistent Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const stored = localStorage.getItem('rekula_testimonials');
    return stored ? JSON.parse(stored) : initialTestimonials;
  });

  useEffect(() => {
    localStorage.setItem('rekula_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Persistent FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const stored = localStorage.getItem('rekula_faqs');
    return stored ? JSON.parse(stored) : initialFAQs;
  });

  useEffect(() => {
    localStorage.setItem('rekula_faqs', JSON.stringify(faqs));
  }, [faqs]);

  // Persistent Form Submissions
  const [submissions, setSubmissions] = useState<FormSubmission[]>(() => {
    const stored = localStorage.getItem('rekula_submissions');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('rekula_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Listen to hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      if (hash && ['home', 'about', 'services', 'service-detail', 'how-it-works', 'founder', 'testimonials', 'careers', 'volunteer', 'contact', 'privacy', 'admin'].includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const publishedServices = services
    .filter((s) => s.status === 'published')
    .sort((a, b) => a.order - b.order);

  const approvedTestimonials = testimonials.filter((t) => t.isApproved);
  const featuredTestimonials = testimonials.filter((t) => t.isApproved && t.isFeatured);

  // Service CRUD
  const addService = (newSrv: Omit<Service, 'id'>) => {
    const s: Service = {
      ...newSrv,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [...prev, s]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Testimonial CRUD
  const addTestimonial = (item: Omit<Testimonial, 'id' | 'dateSubmitted' | 'isApproved' | 'isFeatured'>) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `test-${Date.now()}`,
      dateSubmitted: new Date().toISOString().split('T')[0],
      isApproved: false, // Per brief: must never be published automatically
      isFeatured: false,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);

    // Also register in submissions log
    addSubmission('testimonial', {
      ...item,
      note: 'Awaiting founder verification before public publishing',
    });
  };

  const approveTestimonial = (id: string, isApproved: boolean) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, isApproved } : t)));
  };

  const toggleFeaturedTestimonial = (id: string) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, isFeatured: !t.isFeatured } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // FAQ CRUD
  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newItem: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`,
    };
    setFaqs((prev) => [...prev, newItem]);
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Submissions Log
  const addSubmission = (formType: FormSubmission['formType'], data: Record<string, any>) => {
    const newSubmission: FormSubmission = {
      id: `sub-${Date.now()}`,
      formType,
      createdAt: new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
      status: 'new',
      fullName: data.fullName || data.contactPerson || data.name || data.organisationName || 'Anonymous',
      email: data.email || 'N/A',
      phone: data.phone || data.whatsappNumber || '',
      whatsappConsent: !!data.whatsappConsent,
      preferredContact: data.preferredContact,
      bestTime: data.bestTime,
      location: data.location || data.provinceCity,
      data,
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const updateSubmissionStatus = (id: string, status: FormSubmission['status']) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const exportSubmissionsToCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions available to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Form Type', 'Status', 'Full Name', 'Email', 'Phone', 'Location', 'Summary Data'];
    const rows = submissions.map((s) => [
      s.id,
      `"${s.createdAt}"`,
      s.formType,
      s.status,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.phone || ''}"`,
      `"${(s.location || '').replace(/"/g, '""')}"`,
      `"${JSON.stringify(s.data).replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekula_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAllDataToDefault = () => {
    if (window.confirm('Reset all CMS content and submissions back to default seed state?')) {
      localStorage.removeItem('rekula_services');
      localStorage.removeItem('rekula_testimonials');
      localStorage.removeItem('rekula_faqs');
      localStorage.removeItem('rekula_submissions');
      setServices(initialServices);
      setTestimonials(initialTestimonials);
      setFaqs(initialFAQs);
      setSubmissions([]);
      alert('Reset complete. Original draft brief data restored.');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedServiceSlug,
        setSelectedServiceSlug,
        navigateToService,
        isConsultationModalOpen,
        openConsultationModal,
        closeConsultationModal,
        consultationPreselectedService,
        services,
        publishedServices,
        addService,
        updateService,
        deleteService,
        testimonials,
        approvedTestimonials,
        featuredTestimonials,
        addTestimonial,
        approveTestimonial,
        toggleFeaturedTestimonial,
        deleteTestimonial,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        submissions,
        addSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        exportSubmissionsToCSV,
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
