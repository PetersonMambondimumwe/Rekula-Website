import { Resend } from 'resend';
import { config } from 'dotenv';

// Ensure environment variables are loaded
config();

/**
 * Re:kula Academic Support Transactional Email Service
 * Powered by Resend API
 */

const DEFAULT_FROM = 'Re:kula Academic Support <info@mambondimumwe.com>';
const TARGET_ADMIN_EMAIL = 'shawn.kulanigt@gmail.com';
const LOGO_URL = 'https://raw.githubusercontent.com/PetersonMambondimumwe/Rekula-Website/main/public/assets/rekula-logo-navy.png';
const WEBSITE_URL = 'https://re-luka-webiste.vercel.app/';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[EMAIL SERVICE WARNING] RESEND_API_KEY is not set in environment variables. Outbound emails will be skipped.');
    return null;
  }
  return new Resend(apiKey);
}

function getSender() {
  const custom = (process.env.RESEND_FROM_EMAIL || '').trim();
  if (!custom) return DEFAULT_FROM;
  if (!custom.includes('<')) {
    return `Re:kula Academic Support <${custom}>`;
  }
  return custom;
}

/**
 * Returns list of admin notification recipients.
 * Always includes shawn.kulanigt@gmail.com as explicitly requested.
 */
function getAdminRecipients() {
  const recipients = [TARGET_ADMIN_EMAIL];
  const configured = (process.env.ADMIN_EMAIL || '').trim();
  if (configured && !recipients.some(r => r.toLowerCase() === configured.toLowerCase())) {
    recipients.push(configured);
  }
  return recipients;
}

/**
 * Escapes HTML characters to prevent layout breakage or markup injection in generated emails.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Helper to extract first name for friendly personalization
 */
function extractFirstName(rawName) {
  if (!rawName) return 'there';
  const cleaned = String(rawName).trim();
  if (!cleaned) return 'there';
  const parts = cleaned.split(/\s+/);
  const titles = ['mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'dr', 'dr.', 'prof', 'prof.'];
  if (parts.length > 1 && titles.includes(parts[0].toLowerCase())) {
    return parts.slice(0, 2).join(' ');
  }
  return parts[0] || 'there';
}

/**
 * Formats a timestamp in South African Standard Time (SAST)
 */
function formatSubmissionDate(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-ZA', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Johannesburg'
    }).format(date);
  } catch (e) {
    return date.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  }
}

/**
 * Helper to generate detail table rows for only completed fields
 */
function renderDetailRows(fields) {
  // Filter out any rows with empty, null, or undefined values
  const activeFields = fields.filter(f => {
    if (f.value === null || f.value === undefined) return false;
    if (typeof f.value === 'string' && f.value.trim() === '') return false;
    if (Array.isArray(f.value) && f.value.length === 0) return false;
    return true;
  });

  return activeFields
    .map((f, index) => {
      const isLast = index === activeFields.length - 1;
      const borderStyle = isLast ? '' : 'border-bottom:1px solid #D6EAF7;';
      const valHtml = f.isHtml
        ? f.value
        : escapeHtml(Array.isArray(f.value) ? f.value.join(', ') : String(f.value));

      return `
        <tr>
          <td width="35%" valign="top" style="padding:14px 16px;background-color:#EAF5FD;font-size:13px;font-weight:bold;color:#3E6A8A;${borderStyle}">${escapeHtml(f.label)}</td>
          <td valign="top" style="padding:14px 16px;font-size:15px;line-height:22px;color:#1F3A52;${borderStyle}">${valHtml}</td>
        </tr>
      `;
    })
    .join('');
}

/**
 * Generate Admin Notification Email using the brand email template
 * Displays all completed form fields depending on the submission type.
 */
function buildAdminNotification(formType, data, submissionId) {
  const contactName = (
    data.fullName ||
    data.contactPerson ||
    data.name ||
    data.organisationName ||
    data.authorDisplayName ||
    'Website Visitor'
  ).trim();

  const firstName = extractFirstName(contactName);
  const email = (data.email || data.authorEmail || '').trim();
  const phone = (data.phone || data.whatsappNumber || '').trim();
  const location = (data.location || data.cityProvince || '').trim();
  const submittedAt = formatSubmissionDate(new Date());

  const fields = [];

  // Form Type Tag
  let formBadge = 'New Submission';
  let emailSubject = `New form submission from ${contactName} – Re:kula`;

  switch (formType) {
    case 'consultation': {
      formBadge = 'Consultation Enquiry';
      emailSubject = `[Consultation Enquiry] ${contactName} (${data.ageGrade || 'Learner'}) – Re:kula`;

      fields.push({ label: 'Form type', value: 'Consultation & Academic Support Enquiry' });
      fields.push({ label: 'Enquiry for', value: data.enquiryFor || 'Parent' });
      fields.push({ label: 'Full name', value: contactName });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Phone / WhatsApp', value: phone });
      fields.push({
        label: 'Preferred contact',
        value: `${data.preferredContact || 'WhatsApp'}${data.bestTime ? ` (${data.bestTime})` : ''}`
      });
      fields.push({ label: 'WhatsApp consent', value: data.whatsappConsent !== false ? 'Yes' : 'No' });
      fields.push({ label: 'Location', value: location });
      fields.push({ label: 'Learner first name', value: data.learnerFirstName });
      fields.push({ label: 'Curriculum / grade', value: `${data.curriculum || 'CAPS / IEB'} • ${data.ageGrade || 'Not specified'}` });
      fields.push({ label: 'Current school', value: data.currentSchool });
      fields.push({ label: 'Schooling situation', value: data.schoolingSituation });
      fields.push({ label: 'Service of interest', value: data.selectedServices });
      fields.push({ label: 'Subjects needed', value: data.subjects });
      fields.push({ label: 'Main focus / struggles', value: data.mainReasons });
      fields.push({ label: 'Missed school dates', value: data.missedSchoolDates });

      if (data.workshopDetails && (data.workshopDetails.groupType || data.workshopDetails.venue)) {
        fields.push({
          label: 'Workshop details',
          value: `${data.workshopDetails.groupType || ''} ${data.workshopDetails.count ? `(${data.workshopDetails.count} learners)` : ''} ${data.workshopDetails.venue ? `at ${data.workshopDetails.venue}` : ''}`.trim()
        });
      }

      fields.push({ label: 'Learning mode', value: data.learningMode });
      fields.push({ label: 'When to start', value: data.whenToStart });
      fields.push({ label: 'Weekly availability', value: data.availabilities });

      if (data.attachmentUrl) {
        fields.push({
          label: 'Attached document',
          value: `<a href="${escapeHtml(data.attachmentUrl)}" target="_blank" rel="noopener noreferrer" style="color:#2F8FCF;text-decoration:underline;font-weight:bold;">Download ${escapeHtml(data.attachmentName || 'Diagnostic Document')} &rarr;</a>`,
          isHtml: true
        });
      }

      fields.push({ label: 'Notes / Details', value: data.notes });
      fields.push({ label: 'Heard about Re:kula', value: data.heardAbout });
      fields.push({ label: 'Submission ID', value: submissionId });
      break;
    }

    case 'organization': {
      formBadge = 'Organisation Enquiry';
      emailSubject = `[School / Organisation] ${data.orgName || contactName} – Re:kula`;

      fields.push({ label: 'Form type', value: 'School / Organisation Partnership' });
      fields.push({ label: 'Organisation name', value: data.orgName });
      fields.push({ label: 'Organisation type', value: data.orgType });
      fields.push({ label: 'Contact person', value: contactName });
      fields.push({ label: 'Role / Title', value: data.contactRole });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Phone', value: phone });
      fields.push({ label: 'Location', value: location });
      fields.push({ label: 'Approximate learners', value: data.approxLearners });
      fields.push({ label: 'Grade phases', value: data.gradePhases });
      fields.push({ label: 'Curricula', value: data.curricula });
      fields.push({ label: 'Service needed', value: data.serviceNeeded });
      fields.push({ label: 'Timeline', value: data.timeline });
      fields.push({ label: 'Message / Project scope', value: data.message });
      fields.push({ label: 'Submission ID', value: submissionId });
      break;
    }

    case 'quick-contact': {
      formBadge = 'Quick Message';
      emailSubject = `[Quick Message] ${data.subject || 'Enquiry'} from ${contactName} – Re:kula`;

      fields.push({ label: 'Form type', value: 'Quick Message' });
      fields.push({ label: 'Full name', value: contactName });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Phone', value: phone });
      fields.push({ label: 'Subject', value: data.subject || 'General Inquiry' });
      fields.push({ label: 'Message', value: data.message });
      fields.push({ label: 'Submission ID', value: submissionId });
      break;
    }

    case 'careers': {
      formBadge = 'Educator Application';
      emailSubject = `[Educator Application] ${contactName} (${data.highestQualification || 'Educator'}) – Re:kula`;

      fields.push({ label: 'Form type', value: 'Educator Application' });
      fields.push({ label: 'Full name', value: contactName });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Phone / WhatsApp', value: phone });
      fields.push({ label: 'City / Province', value: location });
      fields.push({ label: 'Highest qualification', value: data.highestQualification });
      fields.push({ label: 'Institution', value: data.institution });
      fields.push({ label: 'Graduation year', value: data.graduationYear });
      fields.push({
        label: 'SACE registration',
        value: `${data.saceStatus || 'Not registered'}${data.saceNumber ? ` (Registration No: ${data.saceNumber})` : ''}`
      });
      fields.push({ label: 'Teaching experience', value: data.teachingExperienceYears ? `${data.teachingExperienceYears} years` : null });

      if (Array.isArray(data.subjects) && data.subjects.length > 0) {
        const subjectsStr = data.subjects
          .map(s => `${s.subject || ''} (up to ${s.highestGrade || 'Grade 12'})`)
          .join('; ');
        fields.push({ label: 'Subjects & grades', value: subjectsStr });
      }

      fields.push({ label: 'Tutoring mode', value: data.tutoringMode });
      fields.push({ label: 'Weekly availability', value: data.weeklyAvailabilityHours ? `${data.weeklyAvailabilityHours} hours/week` : null });

      if (data.cvUrl) {
        fields.push({
          label: 'Curriculum Vitae',
          value: `<a href="${escapeHtml(data.cvUrl)}" target="_blank" rel="noopener noreferrer" style="color:#2F8FCF;text-decoration:underline;font-weight:bold;">View / Download ${escapeHtml(data.cvFileName || 'Educator CV')} &rarr;</a>`,
          isHtml: true
        });
      }

      fields.push({ label: 'Teaching philosophy', value: data.teachingPhilosophy });
      fields.push({ label: 'Submission ID', value: submissionId });
      break;
    }

    case 'volunteer': {
      formBadge = 'Volunteer Application';
      emailSubject = `[Volunteer Application] ${contactName} – Re:kula`;

      fields.push({ label: 'Form type', value: 'Volunteer Application' });
      fields.push({ label: 'Full name', value: contactName });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Phone / WhatsApp', value: phone });
      fields.push({ label: 'City / Province', value: location });
      fields.push({ label: 'Current occupation', value: data.currentOccupation });
      fields.push({ label: 'Weekly availability', value: data.weeklyHours });
      fields.push({ label: 'Preferred mode', value: data.mode });

      if (Array.isArray(data.subjects) && data.subjects.length > 0) {
        const subjectsStr = data.subjects
          .map(s => `${s.subject || ''} (up to ${s.highestGrade || 'Grade 12'})`)
          .join('; ');
        fields.push({ label: 'Subjects to support', value: subjectsStr });
      }

      if (data.cvUrl) {
        fields.push({
          label: 'Curriculum Vitae',
          value: `<a href="${escapeHtml(data.cvUrl)}" target="_blank" rel="noopener noreferrer" style="color:#2F8FCF;text-decoration:underline;font-weight:bold;">View / Download ${escapeHtml(data.cvFileName || 'Volunteer CV')} &rarr;</a>`,
          isHtml: true
        });
      }

      fields.push({ label: 'Volunteer motivation', value: data.volunteerMotivation });
      fields.push({ label: 'Submission ID', value: submissionId });
      break;
    }

    case 'testimonial': {
      formBadge = 'Testimonial Submission';
      emailSubject = `[Testimonial] ${contactName} (${data.rating || 5} Stars) – Re:kula`;

      fields.push({ label: 'Form type', value: 'Client Testimonial' });
      fields.push({ label: 'Author name', value: contactName });
      fields.push({ label: 'Author role', value: data.authorRole || 'Parent' });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Service reviewed', value: data.serviceTag || 'Academic Support' });
      fields.push({ label: 'Rating', value: `${data.rating || 5} / 5 Stars` });
      fields.push({ label: 'Display anonymously?', value: data.isAnonymous ? 'Yes' : 'No' });
      fields.push({ label: 'Testimonial quote', value: data.quote });
      fields.push({ label: 'Submission ID', value: submissionId });
      break;
    }

    default: {
      fields.push({ label: 'Form type', value: formType });
      fields.push({ label: 'Full name', value: contactName });
      if (email) {
        fields.push({
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email)}" style="color:#2F8FCF;text-decoration:none;">${escapeHtml(email)}</a>`,
          isHtml: true
        });
      }
      fields.push({ label: 'Phone', value: phone });
      fields.push({ label: 'Submission ID', value: submissionId });
    }
  }

  // Any additional attachments
  if (Array.isArray(data.attachments) && data.attachments.length > 0) {
    const attLinks = data.attachments
      .filter(a => a && a.url)
      .map(
        a =>
          `<a href="${escapeHtml(a.url)}" target="_blank" rel="noopener noreferrer" style="color:#2F8FCF;text-decoration:underline;">${escapeHtml(a.fileName || 'Attachment')}</a>`
      )
      .join('<br>');
    if (attLinks) {
      fields.push({ label: 'Additional attachments', value: attLinks, isHtml: true });
    }
  }

  const rowsHtml = renderDetailRows(fields);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New form submission – Re:kula</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF5FD;font-family:Arial,Helvetica,sans-serif;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    New submission from ${escapeHtml(contactName)}. Reply within 48 hours.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EAF5FD;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#BFE3F8;padding:32px 24px;">
              <a href="${WEBSITE_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;">
                <img src="${LOGO_URL}" alt="Re:kula" width="68" height="85" style="display:block;margin:0 auto 12px auto;width:68px;height:auto;border:0;outline:none;" />
              </a>
              <div style="font-size:28px;font-weight:bold;color:#1F3A52;">Re:kula</div>
              <div style="font-size:13px;color:#3E6A8A;letter-spacing:2px;text-transform:uppercase;margin-top:6px;">${escapeHtml(formBadge)}</div>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:36px 40px 8px 40px;">
              <h1 style="margin:0 0 12px 0;font-size:22px;line-height:30px;color:#1F3A52;">
                You have a new form submission
              </h1>
              <p style="margin:0;font-size:15px;line-height:24px;color:#4A5F72;">
                Someone just filled in the form on your website. The user has been told to expect a reply within <strong style="color:#1F3A52;">48 hours</strong>.
              </p>
            </td>
          </tr>

          <!-- Submission details -->
          <tr>
            <td style="padding:20px 40px 8px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #D6EAF7;border-radius:10px;border-collapse:separate;">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <!-- Meta -->
          <tr>
            <td style="padding:12px 40px 0 40px;">
              <p style="margin:0;font-size:13px;color:#7A90A3;">Submitted on ${escapeHtml(submittedAt)}</p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:28px 40px 40px 40px;">
              ${email ? `
                <a href="mailto:${escapeHtml(email)}?subject=Re:%20Your%20Re:kula%20enquiry" style="display:inline-block;background-color:#6BB8E8;color:#FFFFFF;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:999px;">
                  Reply to ${escapeHtml(firstName)}
                </a>
              ` : `
                <a href="${WEBSITE_URL}" style="display:inline-block;background-color:#6BB8E8;color:#FFFFFF;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:999px;">
                  Open Website
                </a>
              `}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#F4FAFE;padding:18px 24px;border-top:1px solid #D6EAF7;">
              <p style="margin:0;font-size:12px;line-height:18px;color:#7A90A3;">
                Automated notification from the Re:kula website form.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject: emailSubject, html };
}

/**
 * Renders the user-facing form submission confirmation template with the business logo
 */
function renderUserConfirmationEmail(firstName) {
  const safeName = escapeHtml(firstName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>We’ve received your submission – Re:kula</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF5FD;font-family:Arial,Helvetica,sans-serif;">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Thanks for reaching out. Our team will get back to you within 48 hours.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EAF5FD;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#BFE3F8;padding:36px 24px;">
              <a href="${WEBSITE_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;">
                <img src="${LOGO_URL}" alt="Re:kula" width="68" height="85" style="display:block;margin:0 auto 12px auto;width:68px;height:auto;border:0;outline:none;" />
              </a>
              <div style="font-size:30px;font-weight:bold;color:#1F3A52;letter-spacing:0.5px;">Re:kula</div>
              <div style="font-size:13px;color:#3E6A8A;letter-spacing:2px;text-transform:uppercase;margin-top:6px;">Grow Again</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 16px 40px;">
              <h1 style="margin:0 0 16px 0;font-size:24px;line-height:32px;color:#1F3A52;">
                Thank you, ${safeName}!
              </h1>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:26px;color:#4A5F72;">
                We’ve received your submission and we’re so glad you reached out to Re:kula.
              </p>
              <p style="margin:0;font-size:16px;line-height:26px;color:#4A5F72;">
                Our team will review your details and <strong style="color:#1F3A52;">get back to you within 48 hours.</strong>
              </p>
            </td>
          </tr>

          <!-- Highlight box -->
          <tr>
            <td style="padding:16px 40px 8px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EAF5FD;border-left:4px solid #6BB8E8;border-radius:8px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:13px;font-weight:bold;color:#3E6A8A;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">What happens next</div>
                    <div style="font-size:15px;line-height:24px;color:#4A5F72;">
                      A member of our team will read your submission and contact you using the details you provided.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:28px 40px 12px 40px;">
              <a href="${WEBSITE_URL}" style="display:inline-block;background-color:#6BB8E8;color:#FFFFFF;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:999px;">
                Visit our website
              </a>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding:20px 40px 40px 40px;">
              <p style="margin:0;font-size:16px;line-height:26px;color:#4A5F72;">
                Warm regards,<br>
                <strong style="color:#1F3A52;">The Re:kula Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#F4FAFE;padding:20px 24px;border-top:1px solid #D6EAF7;">
              <p style="margin:0;font-size:12px;line-height:18px;color:#7A90A3;">
                You’re receiving this email because you submitted a form on our website.<br>
                &copy; Re:kula. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate Submitter Confirmation / Receipt Email Content
 */
function buildSubmitterReceipt(formType, data, submissionId) {
  const email = (data.email || data.authorEmail || '').trim();
  if (!email) return null;

  const rawName = data.fullName || data.contactPerson || data.name || data.authorDisplayName || '';
  const firstName = extractFirstName(rawName);

  const subject = 'We’ve received your submission – Re:kula';
  const html = renderUserConfirmationEmail(firstName);

  return { to: email, subject, html };
}

/**
 * Sends both Admin Notification (to shawn.kulanigt@gmail.com) and Submitter Receipt via Resend.
 * Designed with fail-safe error isolation so email delivery issues never break the core database submission.
 *
 * @param {string} formType
 * @param {Record<string, any>} data
 * @param {string} submissionId
 * @returns {Promise<{ adminSent: boolean; receiptSent: boolean; errors: string[] }>}
 */
export async function sendFormNotificationEmails(formType, data, submissionId) {
  const result = {
    adminSent: false,
    receiptSent: false,
    errors: []
  };

  const resend = getResendClient();
  if (!resend) {
    result.errors.push('Resend client not configured (missing RESEND_API_KEY).');
    return result;
  }

  const from = getSender();
  const adminRecipients = getAdminRecipients();

  // 1. Prepare Admin Notification
  const adminEmailData = buildAdminNotification(formType, data, submissionId);

  // 2. Prepare Submitter Receipt
  const receiptEmailData = buildSubmitterReceipt(formType, data, submissionId);

  const emailTasks = [];

  // Task A: Admin notification to shawn.kulanigt@gmail.com (and any additional admin address)
  for (const adminTo of adminRecipients) {
    emailTasks.push(
      resend.emails
        .send({
          from,
          to: adminTo,
          subject: adminEmailData.subject,
          html: adminEmailData.html
        })
        .then(res => {
          if (res.error) {
            throw new Error(res.error.message || JSON.stringify(res.error));
          }
          result.adminSent = true;
          console.log(`[RESEND SUCCESS] Admin notification sent to ${adminTo} (ID: ${res.data?.id}) for submission ${submissionId}`);
        })
        .catch(err => {
          const msg = `Failed to send admin notification to ${adminTo}: ${err.message}`;
          console.error(`[RESEND ADMIN ERROR]: ${msg}`);
          result.errors.push(msg);
        })
    );
  }

  // Task B: Submitter receipt
  if (receiptEmailData && receiptEmailData.to) {
    emailTasks.push(
      resend.emails
        .send({
          from,
          to: receiptEmailData.to,
          subject: receiptEmailData.subject,
          html: receiptEmailData.html
        })
        .then(res => {
          if (res.error) {
            throw new Error(res.error.message || JSON.stringify(res.error));
          }
          result.receiptSent = true;
          console.log(`[RESEND SUCCESS] Submitter receipt sent to ${receiptEmailData.to} (ID: ${res.data?.id})`);
        })
        .catch(err => {
          const msg = `Failed to send submitter receipt to ${receiptEmailData.to}: ${err.message}`;
          console.error(`[RESEND RECEIPT ERROR]: ${msg}`);
          result.errors.push(msg);
        })
    );
  }

  await Promise.allSettled(emailTasks);

  return result;
}
