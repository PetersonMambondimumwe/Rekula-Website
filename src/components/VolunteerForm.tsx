import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { commonSubjects } from '../data/initialData';
import { CheckCircle2, HeartHandshake, Plus, Trash2, Upload, AlertCircle, FileText } from 'lucide-react';

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
      highestGrade: 'Senior (Gr 7–9)',
      curricula: ['CAPS'],
    },
  ]);

  const [languages, setLanguages] = useState<string[]>(['English']);
  const [otherLanguage, setOtherLanguage] = useState('');
  const [qualificationOrStudy, setQualificationOrStudy] = useState('');
  const [saceStatus, setSaceStatus] = useState<'Registered' | 'Not registered' | 'Not applicable'>('Not applicable');
  const [volunteerMode, setVolunteerMode] = useState<'Online' | 'In person' | 'Either'>('Either');
  const [timeOffered, setTimeOffered] = useState('1–2 hours a week');
  const [commitmentLength, setCommitmentLength] = useState('One term');
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
        highestGrade: 'Senior (Gr 7–9)',
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
      <div className="text-center py-12 px-6 bg-white rounded-3xl border border-navy/10 space-y-4 animate-in fade-in">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
          <HeartHandshake className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy">
          Thank You for Giving Back
        </h3>
        <p className="text-sm text-slate-subtle max-w-lg mx-auto leading-relaxed">
          Your willingness to share your knowledge with learners from under-resourced communities means the world to us. Shawn and the Re:kula team will be in touch with you to align on volunteer tutoring sessions.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-softblue hover:underline font-medium"
        >
          Submit another volunteer application
        </button>
      </div>
    );
  }

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
            placeholder="name@example.co.za"
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
            placeholder="e.g. Pretoria / Mamelodi / Soshanguve"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          I am a: <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {['Student', 'Teacher', 'Retired educator', 'Working professional', 'Other'].map((role) => (
            <label
              key={role}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                volunteerRole === role
                  ? 'border-softblue bg-softblue-tint/50 text-navy font-semibold'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <input
                type="radio"
                name="volRole"
                checked={volunteerRole === role}
                onChange={() => setVolunteerRole(role as any)}
                className="text-softblue focus:ring-softblue"
              />
              <span className="truncate">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Repeatable Subjects */}
      <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-navy">
            Subjects You Can Volunteer to Tutor <span className="text-red-500">*</span>
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
                    placeholder="e.g. Mathematics / Reading / Physical Sciences"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-subtle mb-1">
                    Highest Grade / Level:
                  </label>
                  <select
                    value={entry.highestGrade}
                    onChange={(e) => updateSubjectRow(entry.id, 'highestGrade', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Foundation (Gr R–3)">Foundation Phase (Gr R–3)</option>
                    <option value="Intermediate (Gr 4–6)">Intermediate Phase (Gr 4–6)</option>
                    <option value="Senior (Gr 7–9)">Senior Phase (Gr 7–9)</option>
                    <option value="FET (Gr 10–12)">FET Phase (Gr 10–12)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-subtle mb-1">
                  Curricula:
                </label>
                <div className="flex gap-2">
                  {['CAPS', 'IEB', 'Cambridge'].map((c) => (
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

      {/* Languages */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Languages You Can Tutor In
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {['English', 'Afrikaans', 'Setswana', 'isiZulu', 'Sepedi'].map((lang) => (
            <button
              type="button"
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                languages.includes(lang)
                  ? 'bg-navy text-white font-medium'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={otherLanguage}
          onChange={(e) => setOtherLanguage(e.target.value)}
          placeholder="Other languages (e.g. Xhosa, Sesotho, French)..."
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Highest Qualification or Current Study <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={qualificationOrStudy}
            onChange={(e) => setQualificationOrStudy(e.target.value)}
            placeholder="e.g. 2nd Year BSc Physics, UP / Retired Maths Teacher"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            SACE Registration (If Applicable)
          </label>
          <select
            value={saceStatus}
            onChange={(e) => setSaceStatus(e.target.value as any)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
          >
            <option value="Not applicable">Not applicable</option>
            <option value="Registered">Registered</option>
            <option value="Not registered">Not registered</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            How would you like to volunteer?
          </label>
          <div className="flex gap-2">
            {['Online', 'In person', 'Either'].map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setVolunteerMode(mode as any)}
                className={`flex-1 py-2 text-xs rounded-xl border transition-colors ${
                  volunteerMode === mode
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
            Time You Can Offer
          </label>
          <select
            value={timeOffered}
            onChange={(e) => setTimeOffered(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
          >
            <option value="1–2 hours a week">1–2 hours a week</option>
            <option value="3–5 hours a week">3–5 hours a week</option>
            <option value="Occasional sessions">Occasional workshops / sessions</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            How long can you commit?
          </label>
          <select
            value={commitmentLength}
            onChange={(e) => setCommitmentLength(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue bg-white"
          >
            <option value="One term">One school term</option>
            <option value="A semester or half year">A semester or half year</option>
            <option value="A full year">A full academic year</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5">
            Availability
          </label>
          <div className="flex flex-wrap gap-1">
            {['Weekday afternoons', 'Evenings', 'Weekends', 'School holidays'].map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => toggleAvailability(slot)}
                className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                  availabilities.includes(slot)
                    ? 'bg-softblue text-white font-medium'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Why volunteer */}
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5">
          Why would you like to volunteer? (Optional)
        </label>
        <textarea
          rows={3}
          value={whyVolunteer}
          onChange={(e) => setWhyVolunteer(e.target.value)}
          placeholder="Tell us what motivates you to support under-resourced learners..."
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-softblue"
        />
      </div>

      {/* CV Upload (Optional) */}
      <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
        <label className="cursor-pointer block">
          <Upload className="w-7 h-7 text-softblue mx-auto mb-1.5" />
          <span className="text-xs font-bold text-navy block">
            Upload Your CV (Optional)
          </span>
          <span className="text-[11px] text-slate-subtle block">
            PDF or Word, max 5MB.
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {cvFileName && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-300 rounded-full text-xs text-emerald-800">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Attached: {cvFileName}</span>
          </div>
        )}
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
            I agree to Re:kula storing my information and contacting me about volunteering opportunities as described in the{' '}
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
        className="w-full bg-navy hover:bg-navy-800 text-white font-semibold py-3.5 px-6 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
      >
        <HeartHandshake className="w-4 h-4 text-emerald-400" />
        <span>Submit Volunteer Application</span>
      </button>
    </form>
  );
};
