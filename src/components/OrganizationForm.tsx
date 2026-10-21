import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { CheckCircle2, Send, Building2, AlertCircle } from 'lucide-react';

export const OrganizationForm: React.FC = () => {
  const { publishedServices, addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
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
  const [workshopExamDate, setWorkshopExamDate] = useState('');
  const [workshopVenue, setWorkshopVenue] = useState('At the school / on site');
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

  const handleSubmit = (e: React.FormEvent) => {
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

    addSubmission('organization', {
      orgName,
      orgType,
      contactPerson,
      contactRole,
      email,
      phone,
      learnerCount,
      curricula,
      subjects: compiledSubjects,
      selectedServices,
      workshopExamDate,
      workshopVenue,
      learningMode,
      needsDescription,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-3xl border border-navy/10 space-y-4 animate-in fade-in">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy">
          Institutional Enquiry Submitted
        </h3>
        <p className="text-sm text-slate-subtle max-w-md mx-auto">
          Thank you, <span className="font-semibold text-navy">{contactPerson}</span> from <span className="font-semibold text-navy">{orgName}</span>. Shawn Maluleke will be in touch with you shortly to discuss your cohort’s requirements.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-softblue hover:underline font-medium"
        >
          Submit another institutional enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-navy text-left">
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
      />

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Organisation Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="e.g. Pretoria High School for Girls / Pretoria Athletics Club"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Type of Organisation <span className="text-red-500">*</span>
          </label>
          <select
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
          >
            <option value="School">School / Educational Institution</option>
            <option value="Sports club or academy">Sports Club or Academy</option>
            <option value="Homeschool group">Homeschool Group / Co-op</option>
            <option value="Company or NGO">Company or NGO / Foundation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Contact Person Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="e.g. Mr. David Ndlovu"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Role / Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={contactRole}
            onChange={(e) => setContactRole(e.target.value)}
            placeholder="e.g. Head of Academics / Sports Director"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Official Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="d.ndlovu@school.co.za"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Contact Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="012 345 6789 / 082 123 4567"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Approximate Number of Learners
          </label>
          <select
            value={learnerCount}
            onChange={(e) => setLearnerCount(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
          >
            <option value="1–5">1–5 learners</option>
            <option value="6–20">6–20 learners</option>
            <option value="21–50">21–50 learners</option>
            <option value="50+">50+ learners</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Curricula Supported
          </label>
          <div className="flex gap-2">
            {['CAPS', 'IEB', 'Cambridge International'].map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => handleCurriculumToggle(c)}
                className={`flex-1 py-2 text-xs rounded-xl border transition-colors ${
                  curricula.includes(c)
                    ? 'bg-navy text-white font-medium border-navy'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Services of Interest
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {publishedServices.map((srv) => (
            <label
              key={srv.id}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                selectedServices.includes(srv.title)
                  ? 'border-softblue bg-softblue-tint/50 text-navy font-semibold'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(srv.title)}
                onChange={() => handleServiceToggle(srv.title)}
                className="rounded text-softblue focus:ring-softblue"
              />
              <span>{srv.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Subjects Needed <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {commonSubjects.slice(0, 10).map((subj) => (
            <button
              type="button"
              key={subj}
              onClick={() => handleSubjectToggle(subj)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                selectedSubjects.includes(subj)
                  ? 'bg-navy text-white font-medium'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
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
          placeholder="Other subjects..."
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Preferred Way to Learn
        </label>
        <div className="flex gap-2">
          {['On site', 'Online', 'Either'].map((mode) => (
            <button
              type="button"
              key={mode}
              onClick={() => setLearningMode(mode as any)}
              className={`flex-1 py-2 text-xs rounded-xl border transition-colors ${
                learningMode === mode
                  ? 'bg-navy text-white font-medium border-navy'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Tell us about your needs
        </label>
        <textarea
          rows={3}
          value={needsDescription}
          onChange={(e) => setNeedsDescription(e.target.value)}
          placeholder="Detail specific cohorts, dates of upcoming exams, or particular timetable constraints..."
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-start gap-2.5 text-xs text-navy cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded text-softblue focus:ring-softblue"
          />
          <span>
            I agree to Re:kula contacting me and storing the information provided as described in the{' '}
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className="text-softblue underline"
            >
              privacy policy
            </button>
            . <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-navy hover:bg-navy-800 text-white font-semibold py-3 px-6 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
      >
        <Building2 className="w-4 h-4" />
        <span>Submit Institutional Enquiry</span>
      </button>
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
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please complete your name, email, and message.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please accept the POPIA data consent.');
      return;
    }

    addSubmission('quick-contact', {
      fullName: name,
      email,
      phone,
      interest,
      message,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4 bg-white rounded-3xl border border-navy/10 space-y-3 animate-in fade-in">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="font-serif text-lg font-bold text-navy">Message Received</h4>
        <p className="text-xs text-slate-subtle">
          Thank you, <span className="font-semibold text-navy">{name}</span>. We will review your message and reply via email promptly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-softblue hover:underline font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left text-navy">
      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-navy mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Shawn Maluleke"
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.co.za"
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1">
            Phone (Optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="067 435 0849"
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy mb-1">
          I’m interested in
        </label>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
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
        <label className="block text-xs font-semibold text-navy mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we assist you?"
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      <div>
        <label className="flex items-start gap-2 text-xs text-navy cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded text-softblue focus:ring-softblue"
          />
          <span className="text-[11px] leading-snug">
            I agree to Re:kula storing my information according to the{' '}
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className="text-softblue underline"
            >
              privacy policy
            </button>
            . <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-softblue hover:bg-softblue-hover text-white font-semibold py-2.5 px-4 rounded-full text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Send Quick Message</span>
      </button>
    </form>
  );
};
