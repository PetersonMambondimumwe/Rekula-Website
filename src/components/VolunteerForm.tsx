import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  Upload,
  AlertCircle,
  FileText,
  CheckCircle2,
  X,
} from 'lucide-react';
import { uploadFileToSeaweed } from '../utils/fileUpload';

export const VolunteerForm: React.FC = () => {
  const { addSubmission, setActiveTab } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('Student');
  const [qualificationOrStudy, setQualificationOrStudy] = useState('');
  const [subjectsText, setSubjectsText] = useState('');
  const [volunteerMode, setVolunteerMode] = useState<'Either' | 'Online' | 'In person'>('Either');
  const [timeOffered, setTimeOffered] = useState('1–2 hours a week');
  const [whyVolunteer, setWhyVolunteer] = useState('');

  const [cvFileName, setCvFileName] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [consent, setConsent] = useState(false);

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
        const uploadResult = await uploadFileToSeaweed(file, 'volunteers');
        setCvUrl(uploadResult.url);
      } catch (err: any) {
        console.error('Volunteer CV upload error:', err);
        setErrorMsg(err.message || 'Could not upload document. Please try again.');
      } finally {
        setIsUploadingCv(false);
      }
    }
  };

  const clearAttachment = () => {
    setCvFileName('');
    setCvUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !subjectsText.trim()) {
      setErrorMsg('Please fill in your name, email, phone and subjects.');
      return;
    }

    if (isUploadingCv) {
      setErrorMsg('Please wait until your CV finishes uploading.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please accept the privacy policy consent to proceed.');
      return;
    }

    const parsedSubjects = subjectsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((subject) => ({ subject }));

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await addSubmission('volunteer', {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim() || 'South Africa',
      cityProvince: location.trim() || 'South Africa',
      volunteerRole,
      currentOccupation: volunteerRole,
      qualificationOrStudy: qualificationOrStudy.trim() || 'Not specified',
      subjects: parsedSubjects,
      volunteerMode,
      mode: volunteerMode,
      timeOffered,
      weeklyHours: timeOffered,
      whyVolunteer: whyVolunteer.trim(),
      volunteerMotivation: whyVolunteer.trim(),
      cvFileName: cvFileName || 'Not provided (optional)',
      cvUrl: cvUrl || undefined,
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
      <div className="text-center py-10 px-6 bg-void/60 rounded-xl border border-border-cork space-y-4">
        <div className="w-12 h-12 bg-softblue/10 text-softblue border border-softblue/40 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-medium uppercase tracking-tight text-cream">
          Thank You for Giving Back
        </h3>
        <p className="text-sm text-cream-muted max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-cream">{fullName}</span>. Our Lead Educator will review your details and reach out shortly to align on volunteer tutoring.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left text-cream">
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {errorMsg && (
        <div className="p-3.5 bg-red-950/40 border border-red-800 rounded-lg flex items-center gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Name & Email */}
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
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
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
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
          />
        </div>
      </div>

      {/* Phone & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            City / Province
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Pretoria, Gauteng"
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
          />
        </div>
      </div>

      {/* Background & Qualification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            I Am A <span className="text-ember">*</span>
          </label>
          <select
            value={volunteerRole}
            onChange={(e) => setVolunteerRole(e.target.value)}
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
          >
            <option value="Student">University / College Student</option>
            <option value="Teacher">Teacher / Educator</option>
            <option value="Retired educator">Retired Educator</option>
            <option value="Working professional">Working Professional</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Qualification or Current Study
          </label>
          <input
            type="text"
            value={qualificationOrStudy}
            onChange={(e) => setQualificationOrStudy(e.target.value)}
            placeholder="e.g. 2nd Year BSc / BEd / Maths Teacher"
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
          />
        </div>
      </div>

      {/* Subjects */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          Subjects & Grades You Can Tutor <span className="text-ember">*</span>
        </label>
        <input
          type="text"
          required
          value={subjectsText}
          onChange={(e) => setSubjectsText(e.target.value)}
          placeholder="e.g. Mathematics (Gr 8–12), Physical Sciences, English"
          className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
        />
      </div>

      {/* Mode & Time Offered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Preferred Format
          </label>
          <select
            value={volunteerMode}
            onChange={(e) => setVolunteerMode(e.target.value as 'Either' | 'Online' | 'In person')}
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
          >
            <option value="Either">Either (Online or In Person)</option>
            <option value="Online">Online</option>
            <option value="In person">In Person</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
            Time You Can Offer
          </label>
          <select
            value={timeOffered}
            onChange={(e) => setTimeOffered(e.target.value)}
            className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream focus:outline-none focus:border-cream"
          >
            <option value="1–2 hours a week">1–2 hours a week</option>
            <option value="3–5 hours a week">3–5 hours a week</option>
            <option value="Occasional sessions">Occasional workshops / sessions</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Short Note */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          Short Note or Availability (Optional)
        </label>
        <textarea
          rows={3}
          value={whyVolunteer}
          onChange={(e) => setWhyVolunteer(e.target.value)}
          placeholder="Share your preferred days/times or why you'd like to volunteer..."
          className="w-full px-4 py-3 text-base sm:text-xs rounded-lg bg-void border border-border-cork text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-cream transition-colors"
        />
      </div>

      {/* Compact Optional CV Upload */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-cream mb-2">
          CV or Supporting Document (Optional)
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-void border border-border-cork hover:border-cream/70 text-xs text-cream transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-softblue" />
            <span>{cvFileName ? 'Replace File' : 'Attach File (PDF / Word)'}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {isUploadingCv && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-void border border-softblue/40 rounded-full text-xs text-softblue font-medium animate-pulse">
              <span className="w-3 h-3 border-2 border-softblue border-t-transparent rounded-full animate-spin" />
              <span>Uploading...</span>
            </span>
          )}

          {!isUploadingCv && cvUrl && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-void border border-softblue/40 rounded-full text-xs text-softblue font-medium max-w-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-softblue shrink-0" />
              <span className="truncate max-w-[200px]">Uploaded: {cvFileName}</span>
              <button
                type="button"
                onClick={clearAttachment}
                aria-label="Remove uploaded file"
                className="text-cream-muted hover:text-cream cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {!isUploadingCv && !cvUrl && cvFileName && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-void border border-border-cork rounded-full text-xs text-cream-muted font-medium">
              <FileText className="w-3.5 h-3.5 text-softblue shrink-0" />
              <span className="truncate max-w-[200px]">Selected: {cvFileName}</span>
            </span>
          )}
        </div>
      </div>

      {/* POPIA Consent */}
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
            I agree to Re:kula storing my information and contacting me about volunteering opportunities according to the{' '}
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

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 rounded-buttons-pill bg-cream text-void hover:bg-white text-xs font-medium uppercase tracking-[0.14em] transition-all shadow-xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-void border-t-transparent rounded-full animate-spin" />
              <span>SUBMITTING...</span>
            </>
          ) : (
            <>
              <HeartHandshake className="w-3.5 h-3.5 text-void" />
              <span>Submit Volunteer Application</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
