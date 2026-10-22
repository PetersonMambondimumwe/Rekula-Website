import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { CheckCircle2, Send, Building2, AlertCircle } from 'lucide-react';

export const OrganizationForm: React.FC = () => {
  const { publishedServices, addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('School');
  const [contactPerson, setContactPerson] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [learnerCount, setLearnerCount] = useState('6–20');
  const [curricula, setCurricula] = useState<string[]>(['CAPS']);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [customSubject, setCustomSubject] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Workshop-Style Exam Preparation']);
  const [learningMode, setLearningMode] = useState<'Online' | 'On site' | 'Either'>('On site');
  const [needsDescription, setNeedsDescription] = useState('');
  const [consent, setConsent] = useState(false);

  const handleCurriculumToggle = (c: string) => {
    setCurricula((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleSubjectToggle = (subj: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const handleServiceToggle = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!orgName || !contactPerson || !email || !phone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please accept the POPIA data storage consent.');
      return;
    }

    const compiledSubjects = [...selectedSubjects];
    if (customSubject.trim()) compiledSubjects.push(customSubject.trim());

    setIsSubmitting(true);
    setErrorMsg('');
    const res = await addSubmission('organization', {
      orgName,
      orgType,
      contactPerson,
      contactRole,
      email,
      phone,
      approxLearners: learnerCount,
      gradePhases: curricula,
      curricula,
      subjects: compiledSubjects,
      serviceNeeded: selectedServices[0],
      learningMode,
      message: needsDescription,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to submit enquiry. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 rounded-cards bg-surface border border-border-cork text-cream space-y-4 animate-in fade-in">
        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
          Institutional Enquiry Submitted
        </h3>
        <p className="text-sm text-cream-muted max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-cream">{contactPerson}</span> from <span className="font-semibold text-cream">{orgName}</span>. Our Lead Educator will be in touch with you shortly to discuss your cohort’s academic requirements.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-cream text-left">
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
      />

      {errorMsg && (
        <div className="p-3.5 bg-red-950/40 border border-red-800 rounded-lg flex items-center gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Organisation & Contact Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            ORGANISATION & CONTACT PERSON
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Organisation / School Name <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. South Africa High School / Athletics Academy"
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Type of Organisation <span className="text-ember">*</span>
            </label>
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
            >
              <option value="School">School / Educational Institution</option>
              <option value="Sports club or academy">Sports Club or Academy</option>
              <option value="Homeschool group">Homeschool Group / Co-op</option>
              <option value="Company or NGO">Company or NGO / Foundation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Contact Person Name <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="e.g. David"
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Role / Designation <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={contactRole}
              onChange={(e) => setContactRole(e.target.value)}
              placeholder="e.g. Head of Academics / Sports Director"
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Official Email Address <span className="text-ember">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="d.ndlovu@school.co.za"
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Contact Phone / WhatsApp <span className="text-ember">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="067 435 0849"
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. Cohort Size & Curricula */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            COHORT SIZE & CURRICULA
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Approximate Number of Learners
            </label>
            <select
              value={learnerCount}
              onChange={(e) => setLearnerCount(e.target.value)}
              className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
            >
              <option value="1–5">1–5 learners</option>
              <option value="6–20">6–20 learners</option>
              <option value="21–50">21–50 learners</option>
              <option value="50+">50+ learners</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Curricula Supported
            </label>
            <div className="flex gap-2">
              {['CAPS', 'IEB', 'Cambridge International'].map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => handleCurriculumToggle(c)}
                  className={`flex-1 py-3 text-xs rounded-lg border transition-all cursor-pointer ${
                    curricula.includes(c)
                      ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                      : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Services & Subjects */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            3
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            SERVICES & SUBJECTS NEEDED
          </h3>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2.5">
            Services of Interest
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {publishedServices.map((srv) => (
              <label
                key={srv.id}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  selectedServices.includes(srv.title)
                    ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                    : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(srv.title)}
                  onChange={() => handleServiceToggle(srv.title)}
                  className="rounded accent-cream"
                />
                <span>{srv.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Subjects Needed <span className="text-ember">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {commonSubjects.slice(0, 10).map((subj) => (
              <button
                type="button"
                key={subj}
                onClick={() => handleSubjectToggle(subj)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedSubjects.includes(subj)
                    ? 'bg-cream text-void font-bold shadow-sm'
                    : 'bg-void border border-border-cork text-cream-muted hover:border-border-driftwood'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            placeholder="Other subjects (e.g. Accounting, Geography)..."
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Preferred Learning Arrangement
          </label>
          <div className="flex gap-2">
            {['On site', 'Online', 'Either'].map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setLearningMode(mode as any)}
                className={`flex-1 py-3 text-xs rounded-lg border transition-all cursor-pointer ${
                  learningMode === mode
                    ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                    : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Timetable & Requirements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            4
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            TIMETABLE & REQUIREMENTS
          </h3>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Tell us about your cohort’s academic needs
          </label>
          <textarea
            rows={4}
            value={needsDescription}
            onChange={(e) => setNeedsDescription(e.target.value)}
            placeholder="Detail specific cohorts, dates of upcoming exams or particular timetable constraints..."
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>
      </div>

      {/* Consent & Submit */}
      <div className="pt-2 border-t border-dashed border-border-cork">
        <label className="flex items-start gap-3 text-xs text-cream-muted cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-cream"
          />
          <span className="leading-relaxed">
            I agree to Re:kula storing the provided organisation details and contacting me regarding our academic needs as described in the{' '}
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className="text-softblue underline hover:text-white"
            >
              privacy policy
            </button>
            . <span className="text-ember">*</span>
          </span>
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-buttons-pill bg-cream text-void hover:bg-white text-xs font-medium uppercase tracking-[0.14em] transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
              <span>SAVING INSTITUTIONAL ENQUIRY...</span>
            </>
          ) : (
            <>
              <Building2 className="w-4 h-4 text-void" />
              <span>Submit Institutional Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export const QuickContactForm: React.FC = () => {
  const { publishedServices, addSubmission, setActiveTab } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('General question');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please complete your name, email and message.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please accept the POPIA data consent.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    const res = await addSubmission('quick-contact', {
      name,
      email,
      phone,
      subject: interest,
      message,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to send message. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 px-6 rounded-cards bg-surface border border-border-cork text-cream space-y-4 animate-in fade-in">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">Message Received</h4>
        <p className="text-xs sm:text-sm text-cream-muted max-w-sm mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-cream">{name}</span>. We will review your message and reply via email promptly.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left text-cream">
      {errorMsg && (
        <div className="p-3.5 bg-red-950/40 border border-red-800 rounded-lg flex items-center gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          Your Name <span className="text-ember">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Peterson"
          className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Email Address <span className="text-ember">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.co.za"
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Phone / WhatsApp (Optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="067 435 0849"
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          I’m Interested In
        </label>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
        >
          <option value="General question">General question</option>
          {publishedServices.map((s) => (
            <option key={s.id} value={`Service: ${s.title}`}>
              Service: {s.title}
            </option>
          ))}
          <option value="School / Institutional Partnership">Institutional Partnership</option>
          <option value="Careers / Join Team">Careers</option>
          <option value="Volunteer Tutoring">Volunteer Tutoring</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          Message <span className="text-ember">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we assist you?"
          className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
        />
      </div>

      <div className="pt-2 border-t border-dashed border-border-cork">
        <label className="flex items-start gap-3 text-xs text-cream-muted cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-cream"
          />
          <span className="leading-relaxed text-[11px]">
            I agree to Re:kula storing my information according to the{' '}
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className="text-softblue underline hover:text-white"
            >
              privacy policy
            </button>
            . <span className="text-ember">*</span>
          </span>
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 rounded-buttons-pill bg-cream text-void hover:bg-white text-xs font-medium uppercase tracking-[0.14em] transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-void border-t-transparent rounded-full animate-spin" />
              <span>SENDING MESSAGE...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5 text-void" />
              <span>Send Quick Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
