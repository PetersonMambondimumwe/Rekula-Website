import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, closeConsultationModal, consultationPreselectedService } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeConsultationModal();
    };
    if (isConsultationModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isConsultationModalOpen, closeConsultationModal]);

  if (!isConsultationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-void/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-cards bg-surface border border-border-cork p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left text-cream animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={closeConsultationModal}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-void border border-border-cork text-cream-muted hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>CONFIDENTIAL ASSESSMENT · PRETORIA & ONLINE</span>
          </div>
          <h2 id="consultation-modal-title" className="font-serif text-2xl sm:text-3xl font-medium uppercase tracking-tight text-cream">
            LET’S BUILD A PLAN AROUND YOUR LEARNER.
          </h2>
          <p className="text-xs sm:text-sm text-cream-muted leading-relaxed">
            Tell us about your learner, their curriculum, and what support is needed. Shawn and our leadership team will respond with a tailored roadmap.
          </p>
          <div className="dashed-divider mt-4" />
        </div>

        {/* Form */}
        <ConsultationForm
          onSuccess={closeConsultationModal}
          preselectedService={consultationPreselectedService}
        />
      </div>
    </div>
  );
};
