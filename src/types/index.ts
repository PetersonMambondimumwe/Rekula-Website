export type NavigationTab = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'service-detail'
  | 'how-it-works' 
  | 'founder' 
  | 'testimonials' 
  | 'careers' 
  | 'volunteer' 
  | 'contact' 
  | 'privacy' 
  | 'admin';

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  whoItIsFor: string;
  whatWeDo: string;
  howItWorks?: string[];
  result: string;
  curricula: string[];
  targetAudiences: string[];
  iconName: string;
  status: 'published' | 'draft';
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorDisplayName: string;
  authorRole: string; // e.g. "Parent of a Grade 8 learner"
  serviceTag: string; // e.g. "Curriculum Bridging"
  rating?: number; // 1 to 5
  isFeatured: boolean;
  isApproved: boolean;
  dateSubmitted: string;
  authorEmail?: string;
  isAnonymous?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'logistics' | 'careers';
}

export interface SubjectExpertise {
  id: string;
  subject: string;
  highestGrade: string;
  curricula: string[];
}

export interface FormSubmission {
  id: string;
  formType: 'consultation' | 'organization' | 'quick-contact' | 'careers' | 'volunteer' | 'testimonial';
  createdAt: string;
  status: 'new' | 'in-review' | 'contacted' | 'resolved';
  fullName: string;
  email: string;
  phone?: string;
  whatsappConsent?: boolean;
  preferredContact?: 'email' | 'call' | 'whatsapp';
  bestTime?: string;
  location?: string;
  data: Record<string, any>;
}

export interface SiteSettings {
  whatsappNumber: string;
  backupEmail: string;
  displayEmail: string;
  location: string;
  phoneDisplay: string;
  yearsOfExperience: number;
  foundedYear: number;
}
