import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { Briefcase, Plus, Trash2, Upload, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { uploadFileToSeaweed } from '../utils/fileUpload';

interface CareerSubjectEntry {
  id: string;
  subject: string;
  highestGrade: string;
  curricula: string[];
}

export const CareersForm: React.FC = () => {
  const { addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('South Africa');
  const [workPreference, setWorkPreference] = useState<'In person' | 'Online' | 'Both'>('Both');

  const [role, setRole] = useState<'Tutor' | 'Teacher' | 'Educational psychologist' | 'Psychology student' | 'Other'>('Tutor');
  const [roleOther, setRoleOther] = useState('');

  const [subjectsList, setSubjectsList] = useState<CareerSubjectEntry[]>([
    {
      id: 'subj-1',
      subject: 'Mathematics',
      highestGrade: 'FET (Gr 10–12 / Matric)',
      curricula: ['CAPS', 'IEB'],
    },
  ]);

  const [psychAreas, setPsychAreas] = useState<string[]>(['Learning support']);
  const [phases, setPhases] = useState<string[]>(['Senior (Gr 7–9)', 'FET (Gr 10–12)']);
  const [interests, setInterests] = useState<string[]>(['One-to-one tutoring']);

  const [highestQualification, setHighestQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState('1–3');
  const [saceStatus, setSaceStatus] = useState<'Registered' | 'Not registered' | 'In progress'>('Not registered');
  const [saceNumber, setSaceNumber] = useState('');
  const [hpcsaStatus, setHpcsaStatus] = useState<'Registered' | 'Not registered'>('Not registered');
  const [hpcsaNumber, setHpcsaNumber] = useState('');
  const [studentInstitutionYear, setStudentInstitutionYear] = useState('');
  const [remedialExperience, setRemedialExperience] = useState('');

  const [cvFileName, setCvFileName] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [consent, setConsent] = useState(false);

  const addSubjectRow = () => {
    setSubjectsList((prev) => [
      ...prev,
      {
        id: `subj-${Date.now()}`,
        subject: '',
        highestGrade: 'FET (Gr 10–12 / Matric)',
        curricula: ['CAPS'],
      },
    ]);
  };

  const removeSubjectRow = (id: string) => {
    if (subjectsList.length === 1) return;
    setSubjectsList((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubjectRow = (id: string, field: keyof CareerSubjectEntry, val: any) => {
    setSubjectsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const toggleCurriculumOnRow = (id: string, c: string) => {
    setSubjectsList((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const exists = s.curricula.includes(c);
        return {
          ...s,
          curricula: exists ? s.curricula.filter((item) => item !== c) : [...s.curricula, c],
        };
      })
    );
  };

  const togglePhase = (p: string) => {
    setPhases((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const toggleInterest = (i: string) => {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
    );
  };

  const togglePsychArea = (area: string) => {
    setPsychAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('CV file size exceeds the 15MB limit.');
        return;
      }
      setCvFileName(file.name);
      setErrorMsg('');
      setIsUploadingCv(true);

      try {
        const uploadResult = await uploadFileToSeaweed(file, 'cvs');
        setCvUrl(uploadResult.url);
      } catch (err: any) {
        console.error('SeaweedFS CV upload failed:', err);
        setErrorMsg(err.message || 'Could not upload CV to SeaweedFS storage. Please try again.');
      } finally {
        setIsUploadingCv(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!fullName || !email || !phone || !highestQualification) {
      setErrorMsg('Please complete all required fields (Name, Email, Phone, Highest Qualification).');
      return;
    }

    if (!cvFileName) {
      setErrorMsg('Please upload your CV document.');
      return;
    }

    if (isUploadingCv) {
      setErrorMsg('Please wait until your CV document finishes uploading to storage.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please accept the privacy consent box to submit your application.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    const res = await addSubmission('careers', {
      fullName,
      email,
      phone,
      location,
      workPreference,
      role: role === 'Other' ? roleOther : role,
      subjects: subjectsList,
      psychAreas,
      phases,
      interests,
      highestQualification,
      experienceYears,
      saceStatus,
      saceNumber,
      hpcsaStatus,
      hpcsaNumber,
      studentInstitutionYear,
      remedialExperience,
      cvFileName,
      cvUrl,
      motivation,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to submit application. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-surface rounded-cards border border-border-cork space-y-4 animate-in fade-in">
        <div className="w-14 h-14 bg-softblue/20 text-softblue border border-softblue/40 rounded-full flex items-center justify-center mx-auto">
          <Briefcase className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
          Application Successfully Lodged
        </h3>
        <p className="text-sm text-cream-muted max-w-lg mx-auto leading-relaxed">
          Thank you, <span className="text-cream font-medium">{fullName}</span>. We keep every application on file in our dedicated educator registry. Our Lead Educator and our leadership team will review your qualifications and contact you when matching tutoring or workshop opportunities arise.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-softblue hover:underline font-mono uppercase tracking-wider pt-2"
        >
          Submit another application
        </button>
      </div>
    );
  }

  const isPsych = role === 'Educational psychologist' || role === 'Psychology student';

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left text-cream">
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
      />

      {errorMsg && (
        <div className="p-4 bg-red-950/50 border border-red-800/80 rounded-lg flex items-center gap-3 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Basic Contact */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            CONTACT DETAILS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Your Name <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Peterson"
              className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

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
              className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Phone / WhatsApp <span className="text-ember">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="067 435 0849"
              className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Province / City <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Johannesburg / Cape Town / Durban"
              className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Can you work online, in person or both? <span className="text-ember">*</span>
          </label>
          <div className="flex gap-2">
            {(['In person', 'Online', 'Both'] as const).map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setWorkPreference(mode)}
                className={`flex-1 py-2.5 text-xs rounded-lg border transition-all cursor-pointer ${
                  workPreference === mode
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

      {/* 2. Role Picker */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            ROLE & SPECIALISATION
          </h3>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2.5">
            I am applying as a: <span className="text-ember">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {(['Tutor', 'Teacher', 'Educational psychologist', 'Psychology student', 'Other'] as const).map((r) => (
              <label
                key={r}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  role === r
                    ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                    : 'border-border-cork bg-void/50 hover:border-border-driftwood text-cream-muted'
                }`}
              >
                <input
                  type="radio"
                  name="roleOption"
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="accent-cream"
                />
                <span className="truncate">{r}</span>
              </label>
            ))}
          </div>

          {role === 'Other' && (
            <input
              type="text"
              value={roleOther}
              onChange={(e) => setRoleOther(e.target.value)}
              placeholder="Please specify your role..."
              className="mt-3 w-full px-4 py-2.5 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
          )}
        </div>
      </div>

      {/* 3. Repeatable Subjects for Tutors / Teachers */}
      {!isPsych && (
        <div className="space-y-4 p-5 sm:p-6 bg-void/70 rounded-cards border border-border-cork">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-border-cork">
            <div>
              <label className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream block">
                Subjects You Can Tutor or Teach <span className="text-ember">*</span>
              </label>
              <span className="text-[11px] text-cream-muted mt-0.5 block">
                Add each subject you are qualified and passionate to instruct.
              </span>
            </div>
            <button
              type="button"
              onClick={addSubjectRow}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border-cork hover:border-cream text-cream text-[11px] font-mono uppercase tracking-wider transition-all bg-surface hover:bg-surface-elevated shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-softblue" />
              <span>Add Another Subject</span>
            </button>
          </div>

          <div className="space-y-4">
            {subjectsList.map((entry, idx) => (
              <div
                key={entry.id}
                className="p-4 sm:p-5 bg-surface border border-border-cork/90 rounded-lg space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-softblue font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-softblue" />
                    Subject #{idx + 1}
                  </span>
                  {subjectsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubjectRow(entry.id)}
                      className="text-cream-muted hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remove subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-cream-muted mb-1.5">
                      Subject Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={entry.subject}
                      onChange={(e) => updateSubjectRow(entry.id, 'subject', e.target.value)}
                      placeholder="e.g. Mathematics, Physical Sciences, English"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-cream-muted mb-1.5">
                      Highest Grade / Level Supported:
                    </label>
                    <select
                      value={entry.highestGrade}
                      onChange={(e) => updateSubjectRow(entry.id, 'highestGrade', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream focus:outline-none focus:border-cream"
                    >
                      <option value="Foundation Phase (Gr R–3)">Foundation Phase (Gr R–3)</option>
                      <option value="Intermediate Phase (Gr 4–6)">Intermediate Phase (Gr 4–6)</option>
                      <option value="Senior Phase (Gr 7–9)">Senior Phase (Gr 7–9)</option>
                      <option value="FET Phase (Gr 10–12 / Matric)">FET Phase (Gr 10–12 / Matric)</option>
                      <option value="First-Year University">First-Year University</option>
                      <option value="Adult Matric">Adult Matric</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-cream-muted mb-1.5">
                    Curricula You Know for this Subject:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['CAPS', 'IEB', 'Cambridge International'].map((c) => {
                      const isSelected = entry.curricula.includes(c);
                      return (
                        <button
                          type="button"
                          key={c}
                          onClick={() => toggleCurriculumOnRow(entry.id, c)}
                          className={`text-xs px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cream text-void font-medium border-cream'
                              : 'border-border-cork bg-void text-cream-muted hover:border-border-driftwood'
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Areas of Practice for Psychologists */}
      {isPsych && (
        <div className="space-y-3 p-5 bg-void/70 rounded-cards border border-border-cork">
          <label className="block text-xs font-mono uppercase tracking-[0.2em] text-cream">
            Areas of Practice <span className="text-ember">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {['Learning support', 'Academic Assessment', 'Counselling', 'Early reading & literacy', 'Other'].map((area) => (
              <label
                key={area}
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  psychAreas.includes(area)
                    ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                    : 'border-border-cork bg-void/50 hover:border-border-driftwood text-cream-muted'
                }`}
              >
                <input
                  type="checkbox"
                  checked={psychAreas.includes(area)}
                  onChange={() => togglePsychArea(area)}
                  className="accent-cream"
                />
                <span className="truncate">{area}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Phases You Can Support */}
      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wider text-cream">
          Phases You Can Support
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            'Foundation (Gr R–3)',
            'Intermediate (Gr 4–6)',
            'Senior (Gr 7–9)',
            'FET (Gr 10–12)',
            'Adult learners',
          ].map((phase) => {
            const isSelected = phases.includes(phase);
            return (
              <button
                type="button"
                key={phase}
                onClick={() => togglePhase(phase)}
                className={`px-3.5 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cream text-void font-medium border-cream'
                    : 'border-border-cork bg-void text-cream-muted hover:border-border-driftwood'
                }`}
              >
                {phase}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wider text-cream">
          I am also interested in:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            'One-to-one tutoring',
            'Facilitating exam workshops',
            'Volunteer tutoring',
          ].map((item) => (
            <label
              key={item}
              className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                interests.includes(item)
                  ? 'border-softblue bg-softblue/15 text-softblue font-medium'
                  : 'border-border-cork bg-void/50 hover:border-border-driftwood text-cream-muted'
              }`}
            >
              <input
                type="checkbox"
                checked={interests.includes(item)}
                onChange={() => toggleInterest(item)}
                className="accent-softblue"
              />
              <span className="truncate">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Qualifications & Registration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Highest Qualification <span className="text-ember">*</span>
          </label>
          <input
            type="text"
            required
            value={highestQualification}
            onChange={(e) => setHighestQualification(e.target.value)}
            placeholder="e.g. B.Ed (UP, 2024) / BSc Mathematics (Wits, 2023)"
            className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Years of Experience
          </label>
          <select
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream focus:outline-none focus:border-cream"
          >
            <option value="None yet">None yet (Eager to learn)</option>
            <option value="Under 1">Under 1 year</option>
            <option value="1–3">1–3 years</option>
            <option value="4–7">4–7 years</option>
            <option value="8+">8+ years</option>
          </select>
        </div>

        {!isPsych && (
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              SACE Registration Status
            </label>
            <div className="flex gap-2 mb-2">
              {(['Registered', 'Not registered', 'In progress'] as const).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setSaceStatus(st)}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-all cursor-pointer ${
                    saceStatus === st
                      ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                      : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
            {saceStatus === 'Registered' && (
              <input
                type="text"
                value={saceNumber}
                onChange={(e) => setSaceNumber(e.target.value)}
                placeholder="Enter SACE registration number..."
                className="w-full px-3.5 py-2 text-xs bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream mt-2"
              />
            )}
          </div>
        )}

        {role === 'Educational psychologist' && (
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              HPCSA Registration Status
            </label>
            <div className="flex gap-2 mb-2">
              {(['Registered', 'Not registered'] as const).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setHpcsaStatus(st)}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-all cursor-pointer ${
                    hpcsaStatus === st
                      ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                      : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
            {hpcsaStatus === 'Registered' && (
              <input
                type="text"
                value={hpcsaNumber}
                onChange={(e) => setHpcsaNumber(e.target.value)}
                placeholder="Enter HPCSA registration number..."
                className="w-full px-3.5 py-2 text-xs bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream mt-2"
              />
            )}
          </div>
        )}

        {(role === 'Psychology student' || role === 'Tutor') && (
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Current Year & Institution (Students)
            </label>
            <input
              type="text"
              value={studentInstitutionYear}
              onChange={(e) => setStudentInstitutionYear(e.target.value)}
              placeholder="e.g. 3rd Year B.Ed, University of Pretoria"
              className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Remedial / Early Reading Experience (Optional)
          </label>
          <input
            type="text"
            value={remedialExperience}
            onChange={(e) => setRemedialExperience(e.target.value)}
            placeholder="e.g. 2 years remedial reading; Setswana literacy"
            className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>
      </div>

      {/* CV Upload */}
      <div className="p-6 bg-void/60 rounded-cards border-2 border-dashed border-border-cork hover:border-border-driftwood transition-colors text-center cursor-pointer">
        <label className="cursor-pointer block">
          <Upload className="w-8 h-8 text-softblue mx-auto mb-2" />
          <span className="text-xs font-mono uppercase tracking-wider text-cream block font-medium">
            Upload Your Curriculum Vitae (CV) <span className="text-ember">*</span>
          </span>
          <span className="text-[11px] text-cream-muted block mt-1">
            PDF, Word (.docx) or image format, max 15MB.
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {isUploadingCv && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-softblue/40 rounded-full text-xs text-softblue font-medium animate-pulse">
            <span className="w-3.5 h-3.5 border-2 border-softblue border-t-transparent rounded-full animate-spin" />
            <span>Uploading securely to SeaweedFS storage...</span>
          </div>
        )}
        {!isUploadingCv && cvUrl && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-emerald-500/40 rounded-full text-xs text-emerald-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Stored on SeaweedFS: {cvFileName}</span>
          </div>
        )}
        {!isUploadingCv && !cvUrl && cvFileName && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-border-cork rounded-full text-xs text-cream-muted font-medium">
            <FileText className="w-3.5 h-3.5 text-softblue" />
            <span>Selected: {cvFileName}</span>
          </div>
        )}
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          Tell us why you want to join Re:kula (Optional)
        </label>
        <textarea
          rows={3}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Share your teaching philosophy, passion for education and what drew you to Re:kula..."
          className="w-full px-4 py-3 text-base sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
        />
      </div>

      {/* Consent */}
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
            I agree to Re:kula storing my information to consider me for educational opportunities as outlined in the{' '}
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className="text-softblue underline"
            >
              privacy policy
            </button>
            . <span className="text-ember">*</span>
          </span>
        </label>
        <p className="text-[11px] text-cream-muted/70 mt-2 font-mono">
          Note: We never ask for ID copies, bank details or sensitive financial information at the initial application stage. Child protection and police clearance checks occur prior to final onboarding.
        </p>
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
              <span>SAVING APPLICATION TO DATABASE...</span>
            </>
          ) : (
            <>
              <Briefcase className="w-4 h-4 text-void" />
              <span>Submit Application to Join Team</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
