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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-navy-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-navy/10 p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={closeConsultationModal}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-navy flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Confidential Assessment</span>
          </div>
          <h2 id="consultation-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Let’s Build a Plan Around Your Learner
          </h2>
          <p className="text-sm text-slate-subtle leading-relaxed">
            Tell us about your learner, their curriculum, and what support is needed. Shawn and our team will respond with a tailored roadmap.
          </p>
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
