import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { CheckCircle2, Send, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ConsultationFormProps {
  onSuccess?: () => void;
  preselectedService?: string;
  isEmbedded?: boolean;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onSuccess,
  preselectedService,
  isEmbedded = false,
}) => {
  const { publishedServices, addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
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
  const [location, setLocation] = useState('Pretoria');

  // Section B: About Learner
  const [learnerFirstName, setLearnerFirstName] = useState('');
  const [ageGrade, setAgeGrade] = useState('Grade 10–12');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detected

    if (!fullName || !email || !phone) {
      setErrorMsg('Please complete your name, email, and contact phone number.');
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
      ageGrade,
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

    addSubmission('consultation', payload);
    setSubmitted(true);
    if (onSuccess) {
      setTimeout(() => onSuccess(), 2500);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-3xl border border-navy/10 space-y-5 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-navy">
            Consultation Request Received
          </h3>
          <p className="text-sm text-slate-subtle max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-navy">{fullName}</span>. Shawn and the Re:kula academic team have received your request and will reach out via <span className="font-semibold text-navy">{preferredContact}</span> during the {bestTime.toLowerCase()}.
          </p>
        </div>

        <div className="p-4 bg-softblue-tint/50 rounded-2xl max-w-md mx-auto text-xs text-navy/80 text-left space-y-1.5 border border-softblue/20">
          <p className="font-semibold text-navy flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-softblue" /> What happens next?
          </p>
          <p>
            1. We review your learner’s curriculum, timeline, and goals.
          </p>
          <p>
            2. We arrange a confidential discussion to construct a plan fitting real life.
          </p>
          <p>
            3. Need immediate assistance? Send a WhatsApp to <span className="font-medium text-navy">+27 67 435 0849</span>.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            if (onSuccess) onSuccess();
          }}
          className="text-xs text-softblue hover:underline font-medium"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-navy text-left">
      {/* Honeypot for spam bots */}
      <input
        type="text"
        name="rekula_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* SECTION A: ABOUT YOU */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-softblue text-white text-xs font-bold flex items-center justify-center">
            A
          </span>
          <h3 className="text-base font-serif font-bold text-navy">About You</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-2">
            Who is this enquiry for? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'parent', label: 'I am a parent or guardian' },
              { id: 'adult', label: 'I am the learner (adult learner)' },
              { id: 'group', label: 'I am organising a group of learners (friends / study group)' },
              { id: 'org', label: 'We are a school, club or organisation' },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-2.5 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                  enquiryFor === option.id
                    ? 'border-softblue bg-softblue-tint/40 font-semibold text-navy shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-subtle'
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
                  className="mt-0.5 text-softblue focus:ring-softblue"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Shawn Maluleke"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.co.za"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Phone / WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 067 435 0849"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
            <label className="flex items-center gap-2 mt-2 text-[11px] text-slate-subtle cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappConsent}
                onChange={(e) => setWhatsappConsent(e.target.checked)}
                className="rounded text-softblue focus:ring-softblue"
              />
              <span>You may contact me on WhatsApp</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Province / City
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Pretoria / Centurion / Johannesburg"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Preferred Contact Method
            </label>
            <select
              value={preferredContact}
              onChange={(e) => setPreferredContact(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
            >
              <option value="WhatsApp">WhatsApp Message</option>
              <option value="Phone call">Phone Call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Best Time to Contact You
            </label>
            <select
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
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
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-full bg-softblue text-white text-xs font-bold flex items-center justify-center">
              B
            </span>
            <h3 className="text-base font-serif font-bold text-navy">About The Learner</h3>
          </div>

          <p className="text-[11px] text-slate-subtle italic">
            In compliance with our child protection policy, please provide only the learner’s first name. Never enter ID numbers or medical details.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Learner's First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required={!isAdultOrGroup}
                value={learnerFirstName}
                onChange={(e) => setLearnerFirstName(e.target.value)}
                placeholder="e.g. Sipho / Mia"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Age Group / Grade <span className="text-red-500">*</span>
              </label>
              <select
                value={ageGrade}
                onChange={(e) => setAgeGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
              >
                <option value="Grade R–3 (Foundation)">Grade R–3 (Foundation Phase)</option>
                <option value="Grade 4–7 (Intermediate)">Grade 4–7 (Intermediate Phase)</option>
                <option value="Grade 8–9 (Senior)">Grade 8–9 (Senior Phase)</option>
                <option value="Grade 10–12 (FET / Matric)">Grade 10–12 (FET Phase / Matric)</option>
                <option value="Adult learner (second-chance matric)">Adult learner (second-chance matric)</option>
                <option value="Other">Other / Preschool</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Curriculum <span className="text-red-500">*</span>
              </label>
              <select
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
              >
                <option value="CAPS">CAPS (National Curriculum)</option>
                <option value="IEB">IEB (Independent Examinations Board)</option>
                <option value="Cambridge International">Cambridge International (Checkpoint, IGCSE, AS/A Levels)</option>
                <option value="Not sure">Not sure / Transitioning</option>
                <option value="Other">Other International / Impaq / Online</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Current Schooling Situation
              </label>
              <select
                value={schoolingSituation}
                onChange={(e) => setSchoolingSituation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
              >
                <option value="At a school">Attending a school daily</option>
                <option value="Homeschooled">Homeschooled</option>
                <option value="Learning online">Enrolled in an online school / academy</option>
                <option value="Demanding athlete / training">Student athlete / training schedule</option>
                <option value="Not currently in school">Not currently attending school</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Current School (Optional)
            </label>
            <input
              type="text"
              value={currentSchool}
              onChange={(e) => setCurrentSchool(e.target.value)}
              placeholder="e.g. Pretoria Boys High / St Alban's / Cornwall Hill / Crawford / Online"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
            <p className="text-[11px] text-slate-subtle mt-1">
              Helps us coordinate with teachers and subject heads, strictly with your permission.
            </p>
          </div>
        </div>
      )}

      {/* SECTION C: HOW CAN WE HELP? */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-softblue text-white text-xs font-bold flex items-center justify-center">
            C
          </span>
          <h3 className="text-base font-serif font-bold text-navy">How Can We Help?</h3>
        </div>

        {/* Services from CMS */}
        <div>
          <label className="block text-xs font-semibold text-navy mb-2">
            Services of Interest <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {publishedServices.map((srv) => (
              <label
                key={srv.id}
                className={`flex items-start gap-2.5 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                  selectedServices.includes(srv.title)
                    ? 'border-softblue bg-softblue-tint/50 text-navy font-semibold shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-subtle'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(srv.title)}
                  onChange={() => handleServiceToggle(srv.title)}
                  className="mt-0.5 rounded text-softblue focus:ring-softblue"
                />
                <div>
                  <p className="font-semibold text-navy">{srv.title}</p>
                  <p className="text-[11px] text-slate-subtle line-clamp-1">{srv.tagline}</p>
                </div>
              </label>
            ))}
            <label
              className={`flex items-start gap-2.5 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                selectedServices.includes('I’m not sure, please advise me')
                  ? 'border-softblue bg-softblue-tint/50 text-navy font-semibold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-subtle'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes('I’m not sure, please advise me')}
                onChange={() => handleServiceToggle('I’m not sure, please advise me')}
                className="mt-0.5 rounded text-softblue focus:ring-softblue"
              />
              <div>
                <p className="font-semibold text-navy">I’m not sure, please advise me</p>
                <p className="text-[11px] text-slate-subtle">We will evaluate during the consultation</p>
              </div>
            </label>
          </div>
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Subject(s) Needing Support <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-slate-subtle mb-2">
            Re:kula supports any subject. Select from common subjects or type any custom subject below:
          </p>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {commonSubjects.map((subj) => (
              <button
                type="button"
                key={subj}
                onClick={() => handleSubjectToggle(subj)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  selectedSubjects.includes(subj)
                    ? 'bg-navy text-white font-medium shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              placeholder="Other: type your subject (e.g. French, Music Theory, Technical Sciences)..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
          </div>
        </div>

        {/* Main Reason */}
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            What is the main reason for support?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {[
              'Missed school (illness, injury, family or other reasons)',
              'Travel or sport commitments',
              'Moving schools, curricula or countries',
              'Struggling with a subject',
              'Learning to read',
              'Second-chance matric or rewrite',
              'Homeschool or online learning structure',
              'Exam preparation',
              'Other',
            ].map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer ${
                  mainReasons.includes(reason)
                    ? 'border-softblue bg-softblue-tint/30 text-navy font-medium'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={mainReasons.includes(reason)}
                  onChange={() => handleReasonToggle(reason)}
                  className="rounded text-softblue focus:ring-softblue"
                />
                <span className="truncate">{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditional: Missed School Dates */}
        {showMissedSchool && (
          <div className="p-4 bg-softblue-tint/40 rounded-2xl border border-softblue/30 space-y-2 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-navy flex items-center gap-1.5">
              Curriculum Bridging / Missed School Details
            </h4>
            <label className="block text-xs text-slate-subtle">
              Approximate dates away or expected return date to school:
            </label>
            <input
              type="text"
              value={missedSchoolDates}
              onChange={(e) => setMissedSchoolDates(e.target.value)}
              placeholder="e.g. Missed 3 weeks in Term 2; returning 14 November"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
            />
          </div>
        )}

        {/* Conditional: Workshop details */}
        {showWorkshopDetails && (
          <div className="p-4 bg-softblue-tint/40 rounded-2xl border border-softblue/30 space-y-3 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-navy">
              Workshop-Style Exam Preparation Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-subtle mb-1">Group Type:</label>
                <select
                  value={workshopGroupType}
                  onChange={(e) => setWorkshopGroupType(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="friends or study group">Friends or Study Group</option>
                  <option value="school grade cohort">School Grade Cohort</option>
                  <option value="sports academy / club">Sports Academy / Club</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-subtle mb-1">Approx. Learners:</label>
                <input
                  type="text"
                  value={workshopLearnerCount}
                  onChange={(e) => setWorkshopLearnerCount(e.target.value)}
                  placeholder="e.g. 8 learners"
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-subtle mb-1">Exam / Test & Target Date:</label>
                <input
                  type="text"
                  value={workshopExamDate}
                  onChange={(e) => setWorkshopExamDate(e.target.value)}
                  placeholder="e.g. Cambridge IGCSE Math Paper 2, Nov 12"
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-subtle mb-1">Preferred Venue:</label>
                <select
                  value={workshopVenue}
                  onChange={(e) => setWorkshopVenue(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Online">Online Interactive Workshop</option>
                  <option value="At the School / Venue">At the School / On Site</option>
                  <option value="Either">Either</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              How would you like to learn?
            </label>
            <div className="flex gap-2">
              {['Online', 'In person', 'Either'].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setLearningMode(mode as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                    learningMode === mode
                      ? 'bg-navy text-white border-navy shadow-sm'
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
              When would you like to start?
            </label>
            <select
              value={whenToStart}
              onChange={(e) => setWhenToStart(e.target.value as any)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
            >
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within a month">Within a month</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Availability
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['Weekday mornings', 'Weekday afternoons', 'Evenings', 'Weekends'].map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => handleAvailabilityToggle(slot)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  availabilities.includes(slot)
                    ? 'bg-softblue text-white font-medium'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Anything else we should know?
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us about the learner's situation, current challenges, or specific goals..."
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
          <p className="text-[11px] text-slate-subtle mt-1">
            Note: Please don’t include medical or sensitive personal details here. We will discuss these with you privately.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            How did you hear about us?
          </label>
          <select
            value={heardAbout}
            onChange={(e) => setHeardAbout(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
          >
            <option value="Referral">Personal Referral / Friend</option>
            <option value="School or coach">School, Teacher or Sports Coach</option>
            <option value="Social media">Social Media</option>
            <option value="Google search">Google Search</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* POPIA and Guardian Consent */}
        <div className="space-y-2.5 pt-3 border-t border-slate-100">
          <label className="flex items-start gap-2.5 text-xs text-navy cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consentAgreed}
              onChange={(e) => setConsentAgreed(e.target.checked)}
              className="mt-0.5 rounded text-softblue focus:ring-softblue"
            />
            <span className="leading-snug">
              I agree to Re:kula contacting me and securely storing the information I have provided, as described in the{' '}
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className="text-softblue underline hover:text-navy"
              >
                privacy policy
              </button>
              . <span className="text-red-500">*</span>
            </span>
          </label>

          {enquiryFor === 'parent' && (
            <label className="flex items-start gap-2.5 text-xs text-navy cursor-pointer">
              <input
                type="checkbox"
                required
                checked={guardianAgreed}
                onChange={(e) => setGuardianAgreed(e.target.checked)}
                className="mt-0.5 rounded text-softblue focus:ring-softblue"
              />
              <span className="leading-snug">
                I confirm that I am the parent or legal guardian of the learner. <span className="text-red-500">*</span>
              </span>
            </label>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full group inline-flex items-center justify-center gap-3 bg-navy hover:bg-navy-800 text-white font-semibold py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm active:scale-[0.98]"
        >
          <span>Submit Consultation Request</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-softblue transition-colors">
            <Send className="w-3.5 h-3.5 text-white" />
          </div>
        </button>
        <p className="text-center text-[11px] text-slate-subtle mt-2">
          Strictly confidential • No automated publishing • Discuss pricing transparently during consultation
        </p>
      </div>
    </form>
  );
};
