import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { CheckCircle2, Plus, Trash2, Upload, AlertCircle, Briefcase, FileText } from 'lucide-react';

interface SubjectEntry {
  id: string;
  subject: string;
  highestGrade: string;
  curricula: string[];
}

export const CareersForm: React.FC = () => {
  const { addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Pretoria');
  const [workPreference, setWorkPreference] = useState<'Online' | 'In person' | 'Both'>('Both');

  const [role, setRole] = useState<'Tutor' | 'Teacher' | 'Educational psychologist' | 'Psychology student' | 'Other'>('Tutor');
  const [roleOther, setRoleOther] = useState('');

  // Repeatable subjects
  const [subjectsList, setSubjectsList] = useState<SubjectEntry[]>([
    {
      id: 'subj-1',
      subject: 'Mathematics',
      highestGrade: 'Grade 10–12 (FET / Matric)',
      curricula: ['CAPS', 'IEB'],
    },
  ]);

  // Areas of practice (for psychologists & psychology students)
  const [psychAreas, setPsychAreas] = useState<string[]>(['Learning support']);
  const [phases, setPhases] = useState<string[]>(['FET (Gr 10–12)']);
  const [interests, setInterests] = useState<string[]>(['One-to-one tutoring']);

  const [highestQualification, setHighestQualification] = useState('');
  const [saceStatus, setSaceStatus] = useState<'Registered' | 'Not registered' | 'In progress'>('In progress');
  const [saceNumber, setSaceNumber] = useState('');
  const [hpcsaStatus, setHpcsaStatus] = useState<'Registered' | 'Not registered'>('Not registered');
  const [hpcsaNumber, setHpcsaNumber] = useState('');
  const [studentInstitutionYear, setStudentInstitutionYear] = useState('');
  const [experienceYears, setExperienceYears] = useState('1–3');
  const [remedialExperience, setRemedialExperience] = useState('');
  const [availabilities, setAvailabilities] = useState<string[]>(['Weekday afternoons', 'Weekends']);
  const [cvFileName, setCvFileName] = useState('');
  const [motivation, setMotivation] = useState('');
  const [consent, setConsent] = useState(false);

  const addSubjectRow = () => {
    setSubjectsList((prev) => [
      ...prev,
      {
        id: `subj-${Date.now()}`,
        subject: '',
        highestGrade: 'Grade 10–12',
        curricula: ['CAPS'],
      },
    ]);
  };

  const removeSubjectRow = (id: string) => {
    if (subjectsList.length === 1) return;
    setSubjectsList((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubjectRow = (id: string, field: keyof SubjectEntry, val: any) => {
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

  const togglePsychArea = (item: string) => {
    setPsychAreas((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const togglePhase = (phase: string) => {
    setPhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleAvailability = (item: string) => {
    setAvailabilities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('CV file size exceeds 5MB limit.');
        return;
      }
      setCvFileName(file.name);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!fullName || !email || !phone || !highestQualification) {
      setErrorMsg('Please complete all required fields (Name, Email, Phone, Highest Qualification).');
      return;
    }

    if (!cvFileName) {
      setErrorMsg('Please attach your CV document (PDF or DOCX).');
      return;
    }

    if (!consent) {
      setErrorMsg('Please tick the consent box to submit your application.');
      return;
    }

    addSubmission('careers', {
      fullName,
      email,
      phone,
      location,
      workPreference,
      role: role === 'Other' ? roleOther : role,
      subjects: subjectsList,
      psychAreas: (role === 'Educational psychologist' || role === 'Psychology student') ? psychAreas : undefined,
      phases,
      interests,
      highestQualification,
      sace: { status: saceStatus, number: saceNumber },
      hpcsa: role === 'Educational psychologist' ? { status: hpcsaStatus, number: hpcsaNumber } : undefined,
      studentDetails: studentInstitutionYear,
      experienceYears,
      remedialExperience,
      availabilities,
      cvFileName,
      motivation,
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
          Application Successfully Lodged
        </h3>
        <p className="text-sm text-slate-subtle max-w-lg mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-navy">{fullName}</span>. We keep every application on file in our dedicated educator registry. Shawn and our leadership team will review your qualifications and contact you when matching tutoring or workshop opportunities arise.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-softblue hover:underline font-medium"
        >
          Submit another application
        </button>
      </div>
    );
  }

  const isPsych = role === 'Educational psychologist' || role === 'Psychology student';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left text-navy">
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

      {/* Basic Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Peterson Mambondimumwe"
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
            placeholder="name@tuks.co.za"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="067 435 0849"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Province / City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Pretoria / Hatfield / Centurion"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Can you work online, in person, or both? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {['In person', 'Online', 'Both'].map((mode) => (
            <button
              type="button"
              key={mode}
              onClick={() => setWorkPreference(mode as any)}
              className={`flex-1 py-2 text-xs rounded-xl border transition-colors ${
                workPreference === mode
                  ? 'bg-navy text-white font-medium border-navy'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Role Picker */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          I am applying as a: <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Tutor', 'Teacher', 'Educational psychologist', 'Psychology student', 'Other'].map((r) => (
            <label
              key={r}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                role === r
                  ? 'border-softblue bg-softblue-tint/50 text-navy font-semibold'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <input
                type="radio"
                name="roleOption"
                checked={role === r}
                onChange={() => setRole(r as any)}
                className="text-softblue focus:ring-softblue"
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
            className="mt-2 w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
          />
        )}
      </div>

      {/* Repeatable Subjects for Tutors / Teachers */}
      {!isPsych && (
        <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-navy">
              Subjects You Can Tutor or Teach <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addSubjectRow}
              className="inline-flex items-center gap-1 text-xs text-softblue hover:underline font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another Subject
            </button>
          </div>

          <div className="space-y-3">
            {subjectsList.map((entry, idx) => (
              <div
                key={entry.id}
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-softblue">
                    Subject #{idx + 1}
                  </span>
                  {subjectsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubjectRow(entry.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove subject"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-subtle mb-1">
                      Subject Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={entry.subject}
                      onChange={(e) => updateSubjectRow(entry.id, 'subject', e.target.value)}
                      placeholder="e.g. Mathematics / Physical Sciences / English"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-subtle mb-1">
                      Highest Grade / Level Supported:
                    </label>
                    <select
                      value={entry.highestGrade}
                      onChange={(e) => updateSubjectRow(entry.id, 'highestGrade', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Foundation (Gr R–3)">Foundation Phase (Gr R–3)</option>
                      <option value="Intermediate (Gr 4–6)">Intermediate Phase (Gr 4–6)</option>
                      <option value="Senior (Gr 7–9)">Senior Phase (Gr 7–9)</option>
                      <option value="FET (Gr 10–12 / Matric)">FET Phase (Gr 10–12 / Matric)</option>
                      <option value="First-Year University">First-Year University</option>
                      <option value="Adult Matric">Adult Matric</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-subtle mb-1">
                    Curricula You Know for this Subject:
                  </label>
                  <div className="flex gap-2">
                    {['CAPS', 'IEB', 'Cambridge International'].map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => toggleCurriculumOnRow(entry.id, c)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                          entry.curricula.includes(c)
                            ? 'bg-softblue text-white border-softblue font-medium'
                            : 'border-slate-200 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Areas of Practice for Psychologists */}
      {isPsych && (
        <div className="space-y-2 p-4 bg-softblue-tint/30 rounded-2xl border border-softblue/30">
          <label className="block text-xs font-bold text-navy">
            Areas of Practice <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {['Learning support', 'Academic Assessment', 'Counselling', 'Early reading & literacy', 'Other'].map((area) => (
              <label
                key={area}
                className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer ${
                  psychAreas.includes(area)
                    ? 'border-softblue bg-white text-navy font-semibold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={psychAreas.includes(area)}
                  onChange={() => togglePsychArea(area)}
                  className="rounded text-softblue focus:ring-softblue"
                />
                <span className="truncate">{area}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Phases You Can Support */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Phases You Can Support
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Foundation (Gr R–3)',
            'Intermediate (Gr 4–6)',
            'Senior (Gr 7–9)',
            'FET (Gr 10–12)',
            'Adult learners',
          ].map((phase) => (
            <button
              type="button"
              key={phase}
              onClick={() => togglePhase(phase)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                phases.includes(phase)
                  ? 'bg-navy text-white font-medium'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          I am also interested in:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            'One-to-one tutoring',
            'Facilitating exam workshops',
            'Volunteer tutoring',
          ].map((item) => (
            <label
              key={item}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                interests.includes(item)
                  ? 'border-softblue bg-softblue-tint/40 text-navy font-medium'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <input
                type="checkbox"
                checked={interests.includes(item)}
                onChange={() => toggleInterest(item)}
                className="rounded text-softblue focus:ring-softblue"
              />
              <span className="truncate">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Qualification & Registration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Highest Qualification <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={highestQualification}
            onChange={(e) => setHighestQualification(e.target.value)}
            placeholder="e.g. B.Ed (UP, 2024) / BSc Mathematics (Wits, 2023)"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Years of Experience
          </label>
          <select
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
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
            <label className="block text-xs font-semibold text-navy mb-1.5">
              SACE Registration Status
            </label>
            <div className="flex gap-2 mb-2">
              {['Registered', 'Not registered', 'In progress'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setSaceStatus(st as any)}
                  className={`flex-1 py-1.5 text-[11px] rounded-lg border ${
                    saceStatus === st
                      ? 'bg-softblue text-white border-softblue font-medium'
                      : 'border-slate-200 text-slate-600'
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
                className="w-full px-3.5 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            )}
          </div>
        )}

        {role === 'Educational psychologist' && (
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              HPCSA Registration Status
            </label>
            <div className="flex gap-2 mb-2">
              {['Registered', 'Not registered'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setHpcsaStatus(st as any)}
                  className={`flex-1 py-1.5 text-[11px] rounded-lg border ${
                    hpcsaStatus === st
                      ? 'bg-softblue text-white border-softblue font-medium'
                      : 'border-slate-200 text-slate-600'
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
                className="w-full px-3.5 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            )}
          </div>
        )}

        {(role === 'Psychology student' || role === 'Tutor') && (
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Current Year & Institution (Students)
            </label>
            <input
              type="text"
              value={studentInstitutionYear}
              onChange={(e) => setStudentInstitutionYear(e.target.value)}
              placeholder="e.g. 3rd Year B.Ed, University of Pretoria"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Remedial / Early Reading Experience (Optional)
          </label>
          <input
            type="text"
            value={remedialExperience}
            onChange={(e) => setRemedialExperience(e.target.value)}
            placeholder="e.g. 2 years remedial reading; Setswana literacy"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>
      </div>

      {/* CV Upload */}
      <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
        <label className="cursor-pointer block">
          <Upload className="w-8 h-8 text-softblue mx-auto mb-2" />
          <span className="text-xs font-bold text-navy block">
            Upload Your Curriculum Vitae (CV) <span className="text-red-500">*</span>
          </span>
          <span className="text-[11px] text-slate-subtle block mt-0.5">
            PDF or Word (.docx) format only, max 5MB.
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {cvFileName && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white border border-emerald-300 rounded-full text-xs text-emerald-800 font-medium">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Attached: {cvFileName}</span>
          </div>
        )}
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Tell us why you want to join Re:kula (Optional)
        </label>
        <textarea
          rows={3}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Share your teaching philosophy, passion for education, and what drew you to Re:kula..."
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      {/* Consent */}
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
            I agree to Re:kula storing my information to consider me for educational opportunities as outlined in the{' '}
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
        <p className="text-[11px] text-slate-subtle mt-1.5">
          Note: We never ask for ID copies, bank details, or sensitive financial information at the initial application stage. Child protection and police clearance checks occur prior to final onboarding.
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-navy hover:bg-navy-800 text-white font-semibold py-3.5 px-6 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
      >
        <Briefcase className="w-4 h-4" />
        <span>Submit Application to Join Team</span>
      </button>
    </form>
  );
};
