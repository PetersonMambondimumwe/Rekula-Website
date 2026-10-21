import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonialFormModal: React.FC<TestimonialModalProps> = ({ isOpen, onClose }) => {
  const { publishedServices, addTestimonial, setActiveTab } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authorType, setAuthorType] = useState('Parent or guardian');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Curriculum Bridging']);
  const [gradeStage, setGradeStage] = useState('High school');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [nameDisplayOption, setNameDisplayOption] = useState<'Full name' | 'First name and last initial' | 'First name only' | 'Anonymous'>('Anonymous');
  const [publishPermission, setPublishPermission] = useState(false);
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [popiaConsent, setPopiaConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const charCount = quote.length;
  const isMinorLearner = authorType === 'Learner (under 18)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !quote.trim()) {
      setErrorMsg('Please complete your name, email, and testimonial.');
      return;
    }
    if (!publishPermission || !popiaConsent) {
      setErrorMsg('Please accept the publication permission and privacy consent.');
      return;
    }
    if (isMinorLearner && !guardianConsent) {
      setErrorMsg('Parent or legal guardian consent is mandatory for learners under 18.');
      return;
    }

    // Determine display name
    let computedDisplayName = 'Anonymous';
    if (nameDisplayOption === 'Full name') {
      computedDisplayName = name;
    } else if (nameDisplayOption === 'First name only') {
      computedDisplayName = name.split(' ')[0];
    } else if (nameDisplayOption === 'First name and last initial') {
      const parts = name.split(' ');
      computedDisplayName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
    } else {
      computedDisplayName = `${authorType} (${gradeStage})`;
    }

    addTestimonial({
      quote: quote.trim(),
      authorDisplayName: computedDisplayName,
      authorRole: `${authorType} • ${gradeStage}`,
      serviceTag: selectedServices[0] || 'Academic Support',
      rating,
      authorEmail: email,
      isAnonymous: nameDisplayOption === 'Anonymous',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-navy-950/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-navy/10 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-left text-navy">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-navy">
              Thank You for Sharing Your Story
            </h3>
            <p className="text-sm text-slate-subtle max-w-sm mx-auto leading-relaxed">
              Your reflection has been sent directly to Shawn Maluleke. In line with our strict privacy rules, nothing is published without direct founder verification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-softblue">
                Community Reflections
              </span>
              <h2 className="font-serif text-2xl font-bold text-navy mt-0.5">
                Share Your Experience
              </h2>
              <p className="text-xs text-slate-subtle mt-1">
                Tell us about your learning journey. Every story inspires another learner to grow again.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shawn Maluleke"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
                />
                <span className="text-[10px] text-slate-subtle">
                  Private; will not be published unless selected below.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.co.za"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
                />
                <span className="text-[10px] text-slate-subtle">
                  Never published; used only to verify consent.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  I am a:
                </label>
                <select
                  value={authorType}
                  onChange={(e) => setAuthorType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Parent or guardian">Parent or guardian</option>
                  <option value="Adult learner">Adult learner (second-chance matric)</option>
                  <option value="Learner (under 18)">Learner (under 18)</option>
                  <option value="School or organisation">School or organisation</option>
                  <option value="Tutor or volunteer">Tutor or volunteer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Learner’s Grade or Stage:
                </label>
                <select
                  value={gradeStage}
                  onChange={(e) => setGradeStage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Early reader">Early reader (Gr R–3)</option>
                  <option value="Primary school">Primary school (Gr 4–7)</option>
                  <option value="High school">High school (Gr 8–12)</option>
                  <option value="Adult learner">Adult learner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Which service did you use?
              </label>
              <select
                value={selectedServices[0]}
                onChange={(e) => setSelectedServices([e.target.value])}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                {publishedServices.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="General Academic Support">Not sure / General support</option>
              </select>
            </div>

            {/* Testimonial Text with Counter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-navy">
                  Your Testimonial <span className="text-red-500">*</span>
                </label>
                <span className={`text-[11px] ${charCount > 600 ? 'text-red-500 font-bold' : 'text-slate-subtle'}`}>
                  {charCount} / 600 characters
                </span>
              </div>
              <textarea
                rows={4}
                required
                maxLength={650}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="What was the situation before Re:kula, and what difference did the support make?"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
              />
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Rating (Optional):
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name Display Choice */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                How should we display your name publicly? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Anonymous', label: 'Anonymous (e.g. Parent of a Grade 8 learner)' },
                  { id: 'First name only', label: 'First name only (e.g. Shawn)' },
                  { id: 'First name and last initial', label: 'First name & initial (e.g. Shawn M.)' },
                  { id: 'Full name', label: 'Full name (e.g. Shawn Maluleke)' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${
                      nameDisplayOption === item.id
                        ? 'border-softblue bg-softblue-tint/40 text-navy font-semibold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="nameDisplay"
                      checked={nameDisplayOption === item.id}
                      onChange={() => setNameDisplayOption(item.id as any)}
                      className="text-softblue focus:ring-softblue"
                    />
                    <span className="truncate">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consents */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2 text-xs text-navy cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={publishPermission}
                  onChange={(e) => setPublishPermission(e.target.checked)}
                  className="mt-0.5 rounded text-softblue focus:ring-softblue"
                />
                <span className="text-[11px] leading-snug">
                  I give Re:kula permission to publish my testimonial on its website and marketing materials, and I understand I can ask for it to be removed at any time. <span className="text-red-500">*</span>
                </span>
              </label>

              {isMinorLearner && (
                <label className="flex items-start gap-2 text-xs text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={guardianConsent}
                    onChange={(e) => setGuardianConsent(e.target.checked)}
                    className="mt-0.5 rounded text-softblue focus:ring-softblue"
                  />
                  <span className="text-[11px] leading-snug">
                    I am the parent or legal guardian of this learner and grant full consent. <span className="text-red-500">*</span>
                  </span>
                </label>
              )}

              <label className="flex items-start gap-2 text-xs text-navy cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={popiaConsent}
                  onChange={(e) => setPopiaConsent(e.target.checked)}
                  className="mt-0.5 rounded text-softblue focus:ring-softblue"
                />
                <span className="text-[11px] leading-snug">
                  I consent to the processing of this feedback under the{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setActiveTab('privacy');
                    }}
                    className="text-softblue underline"
                  >
                    POPIA privacy policy
                  </button>
                  . <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-navy hover:bg-navy-800 text-white font-semibold py-3 px-6 rounded-full text-xs sm:text-sm transition-colors shadow-md"
            >
              Submit Testimonial for Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
