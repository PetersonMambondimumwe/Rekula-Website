import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { CheckCircle2, Send, AlertCircle, ShieldCheck } from 'lucide-react';

interface ConsultationFormProps {
  onSuccess?: () => void;
  preselectedService?: string;
  isEmbedded?: boolean;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onSuccess,
  preselectedService,
}) => {
  const { publishedServices, addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Honeypot spam field
  const [honeypot, setHoneypot] = useState('');

  // Section A: About You
  const [enquiryFor, setEnquiryFor] = useState<'parent' | 'adult' | 'group' | 'org'>('parent');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [preferredContact, setPreferredContact] = useState<'Email' | 'Phone call' | 'WhatsApp'>('WhatsApp');
  const [bestTime, setBestTime] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Any time'>('Afternoon');
  const [location, setLocation] = useState('South Africa');

  // Section B: About Learner
  const [learnerFirstName, setLearnerFirstName] = useState('');
  const [ageGrade, setAgeGrade] = useState('Grade 10–12');
  const [ageGradeOther, setAgeGradeOther] = useState('');
  const [schoolingSituation, setSchoolingSituation] = useState('At a school');
  const [curriculum, setCurriculum] = useState('CAPS');
  const [currentSchool, setCurrentSchool] = useState('');

  // Section C: How can we help?
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : []
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [customSubject, setCustomSubject] = useState('');
  const [mainReasons, setMainReasons] = useState<string[]>(['Struggling with a subject']);

  // Conditional fields
  const [missedSchoolDates, setMissedSchoolDates] = useState('');
  const [workshopGroupType, setWorkshopGroupType] = useState('friends or study group');
  const [workshopLearnerCount, setWorkshopLearnerCount] = useState('5-10');
  const [workshopExamDate, setWorkshopExamDate] = useState('');
  const [workshopVenue, setWorkshopVenue] = useState('Online');

  const [learningMode, setLearningMode] = useState<'Online' | 'In person' | 'Either'>('Either');
  const [whenToStart, setWhenToStart] = useState<'As soon as possible' | 'Within a month' | 'Just exploring'>('As soon as possible');
  const [availabilities, setAvailabilities] = useState<string[]>(['Weekday afternoons']);
  const [notes, setNotes] = useState('');
  const [heardAbout, setHeardAbout] = useState('Referral');

  // Consents
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [guardianAgreed, setGuardianAgreed] = useState(false);

  // Checks
  const isAdultOrGroup = enquiryFor === 'adult' || enquiryFor === 'group';
  const showMissedSchool =
    selectedServices.includes('Curriculum Bridging') ||
    mainReasons.includes('Missed school (illness, injury, family or other reasons)');
  const showWorkshopDetails = selectedServices.includes('Workshop-Style Exam Preparation');

  const handleServiceToggle = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleSubjectToggle = (subj: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const handleReasonToggle = (reason: string) => {
    setMainReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  const handleAvailabilityToggle = (avail: string) => {
    setAvailabilities((prev) =>
      prev.includes(avail) ? prev.filter((a) => a !== avail) : [...prev, avail]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detected

    if (!fullName || !email || !phone) {
      setErrorMsg('Please complete your name, email and contact phone number.');
      return;
    }
    if (!consentAgreed) {
      setErrorMsg('Please tick the consent box to proceed in compliance with POPIA.');
      return;
    }
    if (enquiryFor === 'parent' && !guardianAgreed) {
      setErrorMsg('Please confirm you are the parent or legal guardian for minor learners.');
      return;
    }

    const compiledSubjects = [...selectedSubjects];
    if (customSubject.trim()) {
      compiledSubjects.push(customSubject.trim());
    }

    const resolvedAgeGrade =
      ageGrade === 'Other' && ageGradeOther.trim()
        ? `Other: ${ageGradeOther.trim()}`
        : ageGrade;

    const payload = {
      enquiryFor,
      fullName,
      email,
      phone,
      whatsappConsent,
      preferredContact,
      bestTime,
      location,
      learnerFirstName: isAdultOrGroup ? 'Self/Group' : learnerFirstName || 'Not specified',
      ageGrade: resolvedAgeGrade,
      schoolingSituation,
      curriculum,
      currentSchool,
      selectedServices,
      subjects: compiledSubjects,
      mainReasons,
      missedSchoolDates: showMissedSchool ? missedSchoolDates : undefined,
      workshopDetails: showWorkshopDetails
        ? {
            groupType: workshopGroupType,
            count: workshopLearnerCount,
            examDate: workshopExamDate,
            venue: workshopVenue,
          }
        : undefined,
      learningMode,
      whenToStart,
      availabilities,
      notes,
      heardAbout,
      guardianConfirmed: guardianAgreed,
    };

    setIsSubmitting(true);
    setErrorMsg('');
    const result = await addSubmission('consultation', payload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2500);
      }
    } else {
      setErrorMsg(result.error || 'Failed to submit enquiry. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 rounded-cards bg-surface border border-border-cork space-y-5 animate-in fade-in duration-300">
        <div className="w-14 h-14 bg-void border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
            CONSULTATION REQUEST RECEIVED
          </h3>
          <p className="text-xs sm:text-sm text-cream-muted max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-cream">{fullName}</span>. Our Lead Educator and the Re:kula academic team have received your request and will reach out via <span className="font-semibold text-cream">{preferredContact}</span> during the {bestTime.toLowerCase()}.
          </p>
        </div>

        <div className="p-4 bg-void rounded-lg max-w-md mx-auto text-xs text-cream-muted text-left space-y-1.5 border border-border-cork font-mono">
          <p className="font-semibold text-cream flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-softblue" /> NEXT ACTIONS:
          </p>
          <p>1. Diagnostic review of syllabus requirements & deadlines.</p>
          <p>2. Private discussion regarding timetable alignment.</p>
          <p>3. WhatsApp direct assistance: +27 67 435 0849.</p>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            if (onSuccess) onSuccess();
          }}
          className="text-xs text-softblue hover:underline font-mono uppercase tracking-wider"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-cream text-left">
      <input
        type="text"
        name="rekula_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
      />

      {errorMsg && (
        <div className="p-3.5 bg-red-950/40 border border-red-800 rounded-lg flex items-start gap-3 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* SECTION A: ABOUT YOU */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            A
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">ABOUT YOU</h3>
        </div>

        <div>
          <label className="block text-xs font-medium text-cream mb-2 uppercase tracking-wider">
            Who is this enquiry for? <span className="text-ember">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'parent', label: 'I am a parent or guardian' },
              { id: 'adult', label: 'I am the learner (adult learner)' },
              { id: 'group', label: 'I am organising a group (friends / study group)' },
              { id: 'org', label: 'We are a school, club or organisation' },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  enquiryFor === option.id
                    ? 'border-cream bg-void font-medium text-cream'
                    : 'border-border-cork bg-void/50 hover:border-border-driftwood text-cream-muted'
                }`}
              >
                <input
                  type="radio"
                  name="enquiryFor"
                  value={option.id}
                  checked={enquiryFor === option.id}
                  onChange={() => {
                    setEnquiryFor(option.id as any);
                    if (option.id === 'org') {
                      setActiveTab('contact');
                    }
                  }}
                  className="mt-0.5 text-softblue focus:ring-0 bg-void border-border-cork"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
              Your Name <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Peterson"
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
              Email Address <span className="text-ember">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.co.za"
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
              Phone / WhatsApp Number <span className="text-ember">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 067 435 0849"
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
            <label className="flex items-center gap-2 mt-2 text-[11px] text-cream-muted cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappConsent}
                onChange={(e) => setWhatsappConsent(e.target.checked)}
                className="rounded bg-void border-border-cork text-softblue"
              />
              <span>You may contact me on WhatsApp</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
              Province / City
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Johannesburg / Cape Town / Durban"
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
              Preferred Contact Method
            </label>
            <select
              value={preferredContact}
              onChange={(e) => setPreferredContact(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
            >
              <option value="WhatsApp">WhatsApp Message</option>
              <option value="Phone call">Phone Call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
              Best Time to Contact
            </label>
            <select
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
            >
              <option value="Morning">Morning (08:00 – 12:00)</option>
              <option value="Afternoon">Afternoon (12:00 – 17:00)</option>
              <option value="Evening">Evening (17:00 – 19:30)</option>
              <option value="Any time">Any Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION B: ABOUT THE LEARNER */}
      {!isAdultOrGroup && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
            <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
              B
            </span>
            <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">ABOUT THE LEARNER</h3>
          </div>

          <p className="text-[11px] text-cream-muted italic">
            In compliance with our child protection policy, enter only the first name. Never enter ID numbers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
                Learner's First Name <span className="text-ember">*</span>
              </label>
              <input
                type="text"
                required={!isAdultOrGroup}
                value={learnerFirstName}
                onChange={(e) => setLearnerFirstName(e.target.value)}
                placeholder="e.g. Sipho / Mia"
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
                Grade / Phase <span className="text-ember">*</span>
              </label>
              <select
                value={ageGrade}
                onChange={(e) => setAgeGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
              >
                <option value="Grade R–3 (Foundation)">Grade R–3 (Foundation Phase)</option>
                <option value="Grade 4–7 (Intermediate)">Grade 4–7 (Intermediate Phase)</option>
                <option value="Grade 8–9 (Senior)">Grade 8–9 (Senior Phase)</option>
                <option value="Grade 10–12 (FET / Matric)">Grade 10–12 (FET Phase / Matric)</option>
                <option value="Adult learner (second-chance matric)">Adult learner (second-chance matric)</option>
                <option value="Other">Other</option>
              </select>
              {ageGrade === 'Other' && (
                <input
                  type="text"
                  required
                  value={ageGradeOther}
                  onChange={(e) => setAgeGradeOther(e.target.value)}
                  placeholder="Please specify grade or phase (e.g. Pre-primary, Cambridge A-Level)..."
                  className="mt-2.5 w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream animate-in fade-in duration-200"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
                Curriculum <span className="text-ember">*</span>
              </label>
              <select
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
              >
                <option value="CAPS">CAPS (National Curriculum)</option>
                <option value="IEB">IEB (Independent Examinations Board)</option>
                <option value="Cambridge International">Cambridge International (Checkpoint, IGCSE, AS/A Levels)</option>
                <option value="Not sure">Not sure / Transitioning</option>
                <option value="Other">Other International / Online</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
                Current Schooling Situation
              </label>
              <select
                value={schoolingSituation}
                onChange={(e) => setSchoolingSituation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
              >
                <option value="At a school">Attending school daily</option>
                <option value="Homeschooled">Homeschooled</option>
                <option value="Learning online">Enrolled in online school</option>
                <option value="Demanding athlete / training">Student athlete / training calendar</option>
                <option value="Not currently in school">Not currently in school</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* SECTION C: HOW CAN WE HELP? */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            C
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">HOW CAN WE HELP?</h3>
        </div>

        {/* Services from CMS */}
        <div>
          <label className="block text-xs font-medium text-cream mb-2 uppercase tracking-wider">
            Services of Interest <span className="text-ember">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {publishedServices.map((srv) => (
              <label
                key={srv.id}
                className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  selectedServices.includes(srv.title)
                    ? 'border-cream bg-void text-cream font-medium'
                    : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(srv.title)}
                  onChange={() => handleServiceToggle(srv.title)}
                  className="mt-0.5 rounded bg-void border-border-cork text-softblue"
                />
                <div>
                  <p className="font-medium text-cream">{srv.title}</p>
                  <p className="text-[11px] text-cream-muted line-clamp-1">{srv.tagline}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-xs font-medium text-cream mb-1.5 uppercase tracking-wider">
            Subject(s) Needing Support <span className="text-ember">*</span>
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {commonSubjects.map((subj) => (
              <button
                type="button"
                key={subj}
                onClick={() => handleSubjectToggle(subj)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors ${
                  selectedSubjects.includes(subj)
                    ? 'bg-cream text-void border border-cream'
                    : 'bg-void border border-border-cork text-cream-muted hover:text-cream'
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
            placeholder="Other: type custom subject (e.g. French, Technical Sciences)..."
            className="w-full px-3.5 py-2 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>

        {/* Conditional Missed School */}
        {showMissedSchool && (
          <div className="p-4 bg-void rounded-lg border border-border-cork space-y-2">
            <h4 className="text-xs font-mono font-medium text-ember uppercase tracking-wider">
              Curriculum Bridging / Missed School Timeline
            </h4>
            <input
              type="text"
              value={missedSchoolDates}
              onChange={(e) => setMissedSchoolDates(e.target.value)}
              placeholder="e.g. Missed 3 weeks; returning 14 November"
              className="w-full px-3.5 py-2 text-base sm:text-xs rounded-lg bg-surface border border-border-cork text-cream focus:outline-none"
            />
          </div>
        )}

        {/* POPIA & Guardian Consent */}
        <div className="space-y-2.5 pt-3 border-t border-dashed border-border-cork text-xs">
          <label className="flex items-start gap-2.5 text-cream-muted cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consentAgreed}
              onChange={(e) => setConsentAgreed(e.target.checked)}
              className="mt-0.5 rounded bg-void border-border-cork text-softblue"
            />
            <span className="leading-snug">
              I agree to Re:kula storing the provided information according to the{' '}
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className="text-softblue underline"
              >
                POPIA privacy policy
              </button>
              . <span className="text-ember">*</span>
            </span>
          </label>

          {enquiryFor === 'parent' && (
            <label className="flex items-start gap-2.5 text-cream-muted cursor-pointer">
              <input
                type="checkbox"
                required
                checked={guardianAgreed}
                onChange={(e) => setGuardianAgreed(e.target.checked)}
                className="mt-0.5 rounded bg-void border-border-cork text-softblue"
              />
              <span className="leading-snug">
                I confirm that I am the parent or legal guardian of the learner. <span className="text-ember">*</span>
              </span>
            </label>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-buttons-pill bg-cream text-void hover:bg-white font-medium py-3.5 px-6 text-xs sm:text-sm uppercase tracking-[0.14em] shadow-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
              <span>SAVING ENQUIRY TO SECURE DATABASE...</span>
            </>
          ) : (
            <span>SUBMIT CONSULTATION REQUEST</span>
          )}
        </button>
        <p className="text-center text-[10px] text-cream-muted/60 uppercase tracking-widest mt-2 font-mono">
          NO PRICING DISPLAYED · CONFIDENTIAL · INDIVIDUALIZED ROADMAP
        </p>
      </div>
    </form>
  );
};
