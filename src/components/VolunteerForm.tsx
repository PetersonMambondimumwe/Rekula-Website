import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, Plus, Trash2, Upload, AlertCircle, FileText } from 'lucide-react';

interface VolunteerSubjectEntry {
  id: string;
  subject: string;
  highestGrade: string;
  curricula: string[];
}

export const VolunteerForm: React.FC = () => {
  const { addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Pretoria');

  const [volunteerRole, setVolunteerRole] = useState<'Student' | 'Teacher' | 'Retired educator' | 'Working professional' | 'Other'>('Student');
  const [volunteerRoleOther, setVolunteerRoleOther] = useState('');

  const [subjectsList, setSubjectsList] = useState<VolunteerSubjectEntry[]>([
    {
      id: 'vol-subj-1',
      subject: 'Mathematics',
      highestGrade: 'Senior Phase (Gr 7–9)',
      curricula: ['CAPS'],
    },
  ]);

  const [languages, setLanguages] = useState<string[]>(['English']);
  const [otherLanguage, setOtherLanguage] = useState('');
  const [qualificationOrStudy, setQualificationOrStudy] = useState('');
  const [saceStatus, setSaceStatus] = useState<'Registered' | 'Not registered' | 'Not applicable'>('Not applicable');
  const [volunteerMode, setVolunteerMode] = useState<'Online' | 'In person' | 'Either'>('Either');
  const [timeOffered, setTimeOffered] = useState('1–2 hours a week');
  const [commitmentLength, setCommitmentLength] = useState('One school term');
  const [availabilities, setAvailabilities] = useState<string[]>(['Weekday afternoons']);
  const [whyVolunteer, setWhyVolunteer] = useState('');
  const [cvFileName, setCvFileName] = useState('');
  const [consent, setConsent] = useState(false);

  const addSubjectRow = () => {
    setSubjectsList((prev) => [
      ...prev,
      {
        id: `vol-subj-${Date.now()}`,
        subject: '',
        highestGrade: 'Senior Phase (Gr 7–9)',
        curricula: ['CAPS'],
      },
    ]);
  };

  const removeSubjectRow = (id: string) => {
    if (subjectsList.length === 1) return;
    setSubjectsList((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubjectRow = (id: string, field: keyof VolunteerSubjectEntry, val: any) => {
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

  const toggleLanguage = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleAvailability = (slot: string) => {
    setAvailabilities((prev) =>
      prev.includes(slot) ? prev.filter((a) => a !== slot) : [...prev, slot]
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

    if (!fullName || !email || !phone || !qualificationOrStudy) {
      setErrorMsg('Please complete your name, email, phone, and qualification/study details.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please tick the consent box to proceed.');
      return;
    }

    const compiledLanguages = [...languages];
    if (otherLanguage.trim()) compiledLanguages.push(otherLanguage.trim());

    addSubmission('volunteer', {
      fullName,
      email,
      phone,
      location,
      volunteerRole: volunteerRole === 'Other' ? volunteerRoleOther : volunteerRole,
      subjects: subjectsList,
      languages: compiledLanguages,
      qualificationOrStudy,
      saceStatus,
      volunteerMode,
      timeOffered,
      commitmentLength,
      availabilities,
      whyVolunteer,
      cvFileName: cvFileName || 'Not provided (optional)',
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-surface rounded-cards border border-border-cork space-y-4 animate-in fade-in">
        <div className="w-14 h-14 bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
          <HeartHandshake className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
          Thank You for Giving Back
        </h3>
        <p className="text-sm text-cream-muted max-w-lg mx-auto leading-relaxed">
          Your willingness to share your knowledge with learners from under-resourced communities means the world to us. Shawn and the Re:kula team will be in touch with you to align on volunteer tutoring sessions.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-softblue hover:underline font-mono uppercase tracking-wider pt-2"
        >
          Submit another volunteer application
        </button>
      </div>
    );
  }

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

      {/* 1. Personal & Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            YOUR DETAILS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
              Full Name <span className="text-ember">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Peterson Mambondimumwe"
              className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
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
              className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
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
              className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
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
              placeholder="e.g. Pretoria / Mamelodi / Soshanguve"
              className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. Your Profile / Background */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border-cork">
          <span className="w-5 h-5 rounded-full bg-void border border-border-cork text-softblue text-[10px] font-mono font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream">
            BACKGROUND & ROLE
          </h3>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2.5">
            I am a: <span className="text-ember">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {(['Student', 'Teacher', 'Retired educator', 'Working professional', 'Other'] as const).map((role) => (
              <label
                key={role}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  volunteerRole === role
                    ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                    : 'border-border-cork bg-void/50 hover:border-border-driftwood text-cream-muted'
                }`}
              >
                <input
                  type="radio"
                  name="volRole"
                  checked={volunteerRole === role}
                  onChange={() => setVolunteerRole(role)}
                  className="accent-cream"
                />
                <span className="truncate">{role}</span>
              </label>
            ))}
          </div>

          {volunteerRole === 'Other' && (
            <input
              type="text"
              value={volunteerRoleOther}
              onChange={(e) => setVolunteerRoleOther(e.target.value)}
              placeholder="Please specify your occupation or background..."
              className="mt-3 w-full px-4 py-2.5 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
            />
          )}
        </div>
      </div>

      {/* 3. Subjects You Can Tutor */}
      <div className="space-y-4 p-5 sm:p-6 bg-void/70 rounded-cards border border-border-cork">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-border-cork">
          <div>
            <label className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-cream block">
              Subjects You Can Volunteer to Tutor <span className="text-ember">*</span>
            </label>
            <span className="text-[11px] text-cream-muted mt-0.5 block">
              Add the subjects, grade phases, and curricula you feel confident supporting.
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
                    placeholder="e.g. Mathematics, Reading, Physical Sciences"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-cream-muted mb-1.5">
                    Highest Grade / Level:
                  </label>
                  <select
                    value={entry.highestGrade}
                    onChange={(e) => updateSubjectRow(entry.id, 'highestGrade', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream focus:outline-none focus:border-cream"
                  >
                    <option value="Foundation Phase (Gr R–3)">Foundation Phase (Gr R–3)</option>
                    <option value="Intermediate Phase (Gr 4–6)">Intermediate Phase (Gr 4–6)</option>
                    <option value="Senior Phase (Gr 7–9)">Senior Phase (Gr 7–9)</option>
                    <option value="FET Phase (Gr 10–12)">FET Phase (Gr 10–12)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cream-muted mb-1.5">
                  Curricula You Can Guide:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['CAPS', 'IEB', 'Cambridge'].map((c) => {
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

      {/* 4. Languages */}
      <div className="space-y-3">
        <label className="block text-xs font-medium uppercase tracking-wider text-cream">
          Languages You Can Tutor In
        </label>
        <div className="flex flex-wrap gap-2">
          {['English', 'Afrikaans', 'Setswana', 'isiZulu', 'Sepedi'].map((lang) => {
            const isSelected = languages.includes(lang);
            return (
              <button
                type="button"
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-cream text-void font-medium border-cream'
                    : 'border-border-cork bg-void text-cream-muted hover:border-border-driftwood'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={otherLanguage}
          onChange={(e) => setOtherLanguage(e.target.value)}
          placeholder="Other languages (e.g. Xhosa, Sesotho, French)..."
          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
        />
      </div>

      {/* 5. Qualifications & Availability Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Highest Qualification or Current Study <span className="text-ember">*</span>
          </label>
          <input
            type="text"
            required
            value={qualificationOrStudy}
            onChange={(e) => setQualificationOrStudy(e.target.value)}
            placeholder="e.g. 2nd Year BSc Physics, UP / Retired Maths Teacher"
            className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            SACE Registration (If Applicable)
          </label>
          <select
            value={saceStatus}
            onChange={(e) => setSaceStatus(e.target.value as any)}
            className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream focus:outline-none focus:border-cream"
          >
            <option value="Not applicable">Not applicable</option>
            <option value="Registered">Registered</option>
            <option value="Not registered">Not registered</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            How would you like to volunteer?
          </label>
          <div className="flex gap-2">
            {(['Online', 'In person', 'Either'] as const).map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setVolunteerMode(mode)}
                className={`flex-1 py-2.5 text-xs rounded-lg border transition-all cursor-pointer ${
                  volunteerMode === mode
                    ? 'border-cream bg-void font-medium text-cream ring-1 ring-cream'
                    : 'border-border-cork bg-void/50 text-cream-muted hover:border-border-driftwood'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Time You Can Offer
          </label>
          <select
            value={timeOffered}
            onChange={(e) => setTimeOffered(e.target.value)}
            className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream focus:outline-none focus:border-cream"
          >
            <option value="1–2 hours a week">1–2 hours a week</option>
            <option value="3–5 hours a week">3–5 hours a week</option>
            <option value="Occasional sessions">Occasional workshops / sessions</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            How long can you commit?
          </label>
          <select
            value={commitmentLength}
            onChange={(e) => setCommitmentLength(e.target.value)}
            className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream focus:outline-none focus:border-cream"
          >
            <option value="One school term">One school term</option>
            <option value="A semester or half year">A semester or half year</option>
            <option value="A full academic year">A full academic year</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Availability
          </label>
          <div className="flex flex-wrap gap-2">
            {['Weekday afternoons', 'Evenings', 'Weekends', 'School holidays'].map((slot) => {
              const isSelected = availabilities.includes(slot);
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => toggleAvailability(slot)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-softblue bg-softblue/20 text-softblue font-medium'
                      : 'border-border-cork bg-void text-cream-muted hover:border-border-driftwood'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Why Volunteer */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          Why would you like to volunteer? (Optional)
        </label>
        <textarea
          rows={3}
          value={whyVolunteer}
          onChange={(e) => setWhyVolunteer(e.target.value)}
          placeholder="Tell us what motivates you to support under-resourced learners..."
          className="w-full px-4 py-3 text-xs sm:text-sm bg-void border border-border-cork rounded-lg text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream"
        />
      </div>

      {/* 7. CV Upload (Optional) */}
      <div className="p-6 bg-void/60 rounded-cards border-2 border-dashed border-border-cork hover:border-border-driftwood transition-colors text-center cursor-pointer">
        <label className="cursor-pointer block">
          <Upload className="w-7 h-7 text-softblue mx-auto mb-2" />
          <span className="text-xs font-mono uppercase tracking-wider text-cream block font-medium">
            Upload Your CV (Optional)
          </span>
          <span className="text-[11px] text-cream-muted block mt-1">
            PDF or Word documents, max 5MB.
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {cvFileName && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-emerald-500/40 rounded-full text-xs text-emerald-300">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Attached: {cvFileName}</span>
          </div>
        )}
      </div>

      {/* 8. Consent & Submit */}
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
            I agree to Re:kula storing my information and contacting me about volunteering opportunities as described in the{' '}
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
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-buttons-pill bg-cream text-void hover:bg-white text-xs font-medium uppercase tracking-[0.14em] transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <HeartHandshake className="w-4 h-4 text-void" />
          <span>Submit Volunteer Application</span>
        </button>
      </div>
    </form>
  );
};
