import { Resend } from 'resend';
import { config } from 'dotenv';

// Ensure environment variables are loaded
config();

/**
 * Re:kula Academic Support Transactional Email Service
 * Powered by Resend API
 */

const DEFAULT_FROM = 'Re:kula Academic Support <notifications@mambondimumwe.com>';
const DEFAULT_ADMIN = 'u19094290@tuks.co.za';
const WHATSAPP_NUMBER = '+27 67 435 0849';
const WHATSAPP_LINK = 'https://wa.me/27674350849';
const WEBSITE_URL = 'https://rekula.co.za';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[EMAIL SERVICE WARNING] RESEND_API_KEY is not set in environment variables. Outbound emails will be skipped.');
    return null;
  }
  return new Resend(apiKey);
}

function getSender() {
  return process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
}

function getAdminRecipient() {
  return process.env.ADMIN_EMAIL || DEFAULT_ADMIN;
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
 * Master responsive HTML email layout with Re:kula editorial styling
 */
function renderEmailShell({ title, badge, contentHtml, ctaText, ctaUrl, isReceipt = false }) {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #070d14;
      color: #ffedd7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    a {
      color: #d97706;
      text-decoration: none;
    }
    .container {
      width: 100%;
      max-width: 620px;
      margin: 0 auto;
      background-color: #0b1522;
      border: 1px solid rgba(255, 237, 215, 0.12);
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      padding: 36px 32px 24px 32px;
      background: linear-gradient(180deg, #0f1d30 0%, #0b1522 100%);
      border-bottom: 1px solid rgba(255, 237, 215, 0.08);
      text-align: left;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #d97706;
      background: rgba(217, 119, 6, 0.14);
      border: 1px solid rgba(217, 119, 6, 0.3);
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    .logo-text {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #ffedd7;
      margin: 0 0 6px 0;
    }
    .logo-accent {
      color: #d97706;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.4;
      color: #ffedd7;
      margin: 8px 0 0 0;
    }
    .body {
      padding: 32px;
      color: rgba(255, 237, 215, 0.9);
      font-size: 15px;
      line-height: 1.6;
    }
    .card {
      background-color: #08101a;
      border: 1px solid rgba(255, 237, 215, 0.08);
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .kv-row {
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 237, 215, 0.06);
    }
    .kv-row:last-child {
      border-bottom: none;
    }
    .kv-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255, 237, 215, 0.55);
      margin-bottom: 3px;
    }
    .kv-value {
      font-size: 14px;
      font-weight: 500;
      color: #ffedd7;
    }
    .button {
      display: inline-block;
      padding: 13px 26px;
      background-color: #d97706;
      color: #070d14 !important;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
      border-radius: 6px;
      text-align: center;
      margin-top: 24px;
    }
    .footer {
      padding: 24px 32px;
      background-color: #060b11;
      border-top: 1px solid rgba(255, 237, 215, 0.08);
      font-size: 12px;
      line-height: 1.6;
      color: rgba(255, 237, 215, 0.5);
    }
    .footer a {
      color: rgba(255, 237, 215, 0.7);
      text-decoration: underline;
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #070d14;">
  <div class="container">
    <div class="header">
      ${badge ? `<div class="badge">${escapeHtml(badge)}</div>` : ''}
      <div class="logo-text">Re<span class="logo-accent">:</span>kula</div>
      <div class="title">${escapeHtml(title)}</div>
    </div>
    <div class="body">
      ${contentHtml}
      ${ctaText && ctaUrl ? `
        <div style="text-align: left; margin-top: 28px;">
          <a href="${escapeHtml(ctaUrl)}" class="button" target="_blank" rel="noopener noreferrer">${escapeHtml(ctaText)}</a>
        </div>
      ` : ''}
    </div>
    <div class="footer">
      <p style="margin: 0 0 10px 0;">
        <strong>Re:kula Academic Support</strong> • South Africa<br>
        Direct WhatsApp: <a href="${WHATSAPP_LINK}">${WHATSAPP_NUMBER}</a>
      </p>
      ${isReceipt ? `
        <p style="margin: 0 0 10px 0; font-size: 11px; color: rgba(255, 237, 215, 0.45);">
          POPIA Compliance: Your personal information is processed strictly for academic support coordination in accordance with the Protection of Personal Information Act. Your details are never sold or shared with unauthorized third parties.
        </p>
      ` : `
        <p style="margin: 0; font-size: 11px; color: rgba(255, 237, 215, 0.45);">
          Internal system transmission generated by Re:kula Website Submission Engine.
        </p>
      `}
      <p style="margin: 0; font-size: 11px; color: rgba(255, 237, 215, 0.35);">
        &copy; ${currentYear} Re:kula Academic Support. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Builds key-value summary rows
 */
function renderKv(label, value) {
  if (value === null || value === undefined || value === '') return '';
  return `
    <div class="kv-row">
      <div class="kv-label">${escapeHtml(label)}</div>
      <div class="kv-value">${escapeHtml(value)}</div>
    </div>`;
}

/**
 * Generate Admin Notification Email Content
 */
function buildAdminNotification(formType, data, submissionId) {
  const contactName = data.fullName || data.contactPerson || data.name || data.organisationName || data.authorDisplayName || 'Applicant';
  const email = data.email || data.authorEmail || 'Not provided';
  const phone = data.phone || data.whatsappNumber || 'Not provided';
  const location = data.location || data.cityProvince || 'South Africa';

  let subject = `[Re:kula Form] New ${formType} submission from ${contactName}`;
  let badge = `INBOUND • ${formType.toUpperCase()}`;
  let title = `New ${formType.replace('-', ' ').toUpperCase()} Submission`;
  let detailsHtml = '';

  switch (formType) {
    case 'consultation': {
      subject = `[Consultation Enquiry] ${contactName} • ${data.ageGrade || 'Learner'}`;
      badge = 'CONSULTATION ENQUIRY';
      title = `New Academic Support Enquiry: ${contactName}`;

      const subjects = Array.isArray(data.subjects) ? data.subjects.filter(Boolean).join(', ') : '';
      const services = Array.isArray(data.selectedServices) ? data.selectedServices.join(', ') : '';
      const reasons = Array.isArray(data.mainReasons) ? data.mainReasons.join(', ') : '';
      const availabilities = Array.isArray(data.availabilities) ? data.availabilities.join(', ') : '';

      detailsHtml = `
        <p>A new consultation request has been submitted through the website. Here are the enquiry details:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Enquiry Type', data.enquiryFor || 'Parent')}
          ${renderKv('Contact Person', contactName)}
          ${renderKv('Email Address', email)}
          ${renderKv('Phone / WhatsApp', phone)}
          ${renderKv('Preferred Contact', `${data.preferredContact || 'WhatsApp'} (${data.bestTime || 'Anytime'})`)}
          ${renderKv('Location', location)}
          ${renderKv('Learner First Name', data.learnerFirstName || contactName)}
          ${renderKv('Grade / Phase', data.ageGrade || 'Not specified')}
          ${renderKv('Current School', data.currentSchool || 'Not specified')}
          ${renderKv('Curriculum', data.curriculum || 'CAPS / IEB / Cambridge')}
          ${renderKv('Schooling Situation', data.schoolingSituation || 'Traditional school')}
          ${renderKv('Services Requested', services || '1-on-1 Academic Support')}
          ${renderKv('Subjects', subjects || 'Not listed')}
          ${renderKv('Main Focus / Struggles', reasons || 'General Support')}
          ${renderKv('Missed School Dates', data.missedSchoolDates || 'None')}
          ${renderKv('Learning Mode', data.learningMode || 'Either')}
          ${renderKv('Start Timeline', data.whenToStart || 'As soon as possible')}
          ${renderKv('Weekly Availability', availabilities || 'Flexible')}
          ${data.attachmentUrl ? `
            <div class="kv-row">
              <div class="kv-label">Attached Document (SeaweedFS)</div>
              <div class="kv-value">
                <a href="${escapeHtml(data.attachmentUrl)}" target="_blank" rel="noopener noreferrer" style="color: #d97706; font-weight: 700; text-decoration: underline;">
                  Download ${escapeHtml(data.attachmentName || 'Learner Document')} &rarr;
                </a>
              </div>
            </div>
          ` : ''}
          ${renderKv('Additional Notes', data.notes || 'None')}
          ${renderKv('How they found Re:kula', data.heardAbout || 'Not specified')}
        </div>
      `;
      break;
    }

    case 'organization': {
      subject = `[School / Organisation Enquiry] ${data.orgName || contactName}`;
      badge = 'ORGANISATION INQUIRY';
      title = `Partnership Enquiry: ${data.orgName || 'Organisation'}`;

      const gradePhases = Array.isArray(data.gradePhases) ? data.gradePhases.join(', ') : '';
      const curricula = Array.isArray(data.curricula) ? data.curricula.join(', ') : '';

      detailsHtml = `
        <p>A school, NGO or institutional partner has submitted an enquiry:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Organisation Name', data.orgName || 'Not specified')}
          ${renderKv('Organisation Type', data.orgType || 'School')}
          ${renderKv('Contact Person', contactName)}
          ${renderKv('Role / Title', data.contactRole || 'Coordinator')}
          ${renderKv('Email Address', email)}
          ${renderKv('Phone Number', phone)}
          ${renderKv('Location', location)}
          ${renderKv('Approximate Learners', data.approxLearners || 'Not specified')}
          ${renderKv('Grade Phases', gradePhases || 'Various')}
          ${renderKv('Curricula', curricula || 'CAPS / IEB')}
          ${renderKv('Service Needed', data.serviceNeeded || 'Institutional Program')}
          ${renderKv('Desired Timeline', data.timeline || 'Immediate')}
          ${renderKv('Message / Details', data.message || 'No additional message provided.')}
        </div>
      `;
      break;
    }

    case 'quick-contact': {
      subject = `[Quick Message] ${data.subject || 'Enquiry'} from ${contactName}`;
      badge = 'QUICK MESSAGE';
      title = `Direct Message: ${contactName}`;

      detailsHtml = `
        <p>A visitor has sent a direct message from the contact page:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Sender Name', contactName)}
          ${renderKv('Email Address', email)}
          ${renderKv('Phone Number', phone)}
          ${renderKv('Subject', data.subject || 'General Inquiry')}
          ${renderKv('Message Content', data.message || '')}
        </div>
      `;
      break;
    }

    case 'careers': {
      subject = `[Educator Application] ${contactName} • ${data.highestQualification || 'Educator'}`;
      badge = 'EDUCATOR APPLICATION';
      title = `New Educator Application: ${contactName}`;

      const subjectsStr = Array.isArray(data.subjects)
        ? data.subjects.map(s => `${s.subject} (up to ${s.highestGrade || 'Grade 12'})`).join('; ')
        : 'None listed';

      detailsHtml = `
        <p>An educator has applied to join the Re:kula teaching team:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Applicant Name', contactName)}
          ${renderKv('Email Address', email)}
          ${renderKv('Phone / WhatsApp', phone)}
          ${renderKv('City / Province', location)}
          ${renderKv('Highest Qualification', data.highestQualification || 'Not specified')}
          ${renderKv('Institution', data.institution || 'Not specified')}
          ${renderKv('Graduation Year', data.graduationYear || 'Not specified')}
          ${renderKv('SACE Status', `${data.saceStatus || 'Not registered'} ${data.saceNumber ? `(No: ${data.saceNumber})` : ''}`)}
          ${renderKv('Teaching Experience', `${data.teachingExperienceYears || '0'} years`)}
          ${renderKv('Teaching Subjects', subjectsStr)}
          ${renderKv('Tutoring Mode', data.tutoringMode || 'Both Online and In-person')}
          ${renderKv('Weekly Availability', `${data.weeklyAvailabilityHours || '10-20'} hours/week`)}
          ${data.cvUrl ? `
            <div class="kv-row">
              <div class="kv-label">Curriculum Vitae (SeaweedFS Storage)</div>
              <div class="kv-value">
                <a href="${escapeHtml(data.cvUrl)}" target="_blank" rel="noopener noreferrer" style="color: #d97706; font-weight: 700; text-decoration: underline;">
                  View / Download ${escapeHtml(data.cvFileName || 'Educator CV')} &rarr;
                </a>
              </div>
            </div>
          ` : renderKv('Curriculum Vitae', 'No file attached')}
          ${renderKv('Teaching Philosophy', data.teachingPhilosophy || 'None provided')}
        </div>
      `;
      break;
    }

    case 'volunteer': {
      subject = `[Volunteer Application] ${contactName} • ${data.currentOccupation || 'Volunteer'}`;
      badge = 'VOLUNTEER APPLICATION';
      title = `New Volunteer Application: ${contactName}`;

      const subjectsStr = Array.isArray(data.subjects)
        ? data.subjects.map(s => `${s.subject} (up to ${s.highestGrade || 'Grade 12'})`).join('; ')
        : 'None listed';

      detailsHtml = `
        <p>A volunteer has applied to contribute to Re:kula community learning programs:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Volunteer Name', contactName)}
          ${renderKv('Email Address', email)}
          ${renderKv('Phone / WhatsApp', phone)}
          ${renderKv('City / Province', location)}
          ${renderKv('Current Occupation', data.currentOccupation || 'Student')}
          ${renderKv('Weekly Availability', data.weeklyHours || '2-4 hours/week')}
          ${renderKv('Preferred Mode', data.mode || 'Online')}
          ${renderKv('Subjects to Support', subjectsStr)}
          ${data.cvUrl ? `
            <div class="kv-row">
              <div class="kv-label">Curriculum Vitae (SeaweedFS Storage)</div>
              <div class="kv-value">
                <a href="${escapeHtml(data.cvUrl)}" target="_blank" rel="noopener noreferrer" style="color: #d97706; font-weight: 700; text-decoration: underline;">
                  View / Download ${escapeHtml(data.cvFileName || 'Volunteer CV')} &rarr;
                </a>
              </div>
            </div>
          ` : renderKv('Curriculum Vitae', 'No file attached')}
          ${renderKv('Volunteer Motivation', data.volunteerMotivation || 'None provided')}
        </div>
      `;
      break;
    }

    case 'testimonial': {
      subject = `[New Testimonial] ${contactName} (${data.authorRole || 'Parent'}) - ${data.rating || 5} Stars`;
      badge = 'TESTIMONIAL SUBMISSION';
      title = `New Testimonial from ${contactName}`;

      detailsHtml = `
        <p>A client has submitted a testimonial for review and publication:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Author Name', contactName)}
          ${renderKv('Role', data.authorRole || 'Parent')}
          ${renderKv('Email Address', email)}
          ${renderKv('Service Tag', data.serviceTag || 'Academic Support')}
          ${renderKv('Rating', `${data.rating || 5} / 5 Stars`)}
          ${renderKv('Show Anonymously?', data.isAnonymous ? 'Yes' : 'No')}
          ${renderKv('Quote', data.quote || '')}
        </div>
      `;
      break;
    }

    default: {
      detailsHtml = `
        <p>New submission received:</p>
        <div class="card">
          ${renderKv('Submission ID', submissionId)}
          ${renderKv('Form Type', formType)}
          ${renderKv('Contact Name', contactName)}
          ${renderKv('Email Address', email)}
          ${renderKv('Phone', phone)}
        </div>
      `;
    }
  }

  const html = renderEmailShell({
    title,
    badge,
    contentHtml: detailsHtml,
    ctaText: phone ? `Message ${contactName} on WhatsApp` : null,
    ctaUrl: phone ? `https://wa.me/${phone.replace(/[^0-9]/g, '')}` : null,
    isReceipt: false
  });

  return { subject, html };
}

/**
 * Generate Submitter Confirmation / Receipt Email Content
 */
function buildSubmitterReceipt(formType, data, submissionId) {
  const contactName = data.fullName || data.contactPerson || data.name || data.authorDisplayName || 'there';
  const email = data.email || data.authorEmail;

  if (!email) return null;

  let subject = 'We have received your enquiry: Re:kula Academic Support';
  let badge = 'ENQUIRY CONFIRMED';
  let title = `Hello ${contactName}, thank you for reaching out`;
  let messageBody = '';

  switch (formType) {
    case 'consultation': {
      subject = 'Your Learning Support Enquiry: Re:kula Academic Support';
      badge = 'CONSULTATION RECEIVED';
      title = `Thank you ${contactName}, your enquiry is received`;
      messageBody = `
        <p>Thank you for getting in touch with <strong>Re:kula Academic Support</strong>. We know that reaching out for learning assistance is an important step, and we treat every learner's journey with dedicated attention.</p>
        <div class="card">
          <p style="margin-top: 0;"><strong>Enquiry Reference:</strong> ${escapeHtml(submissionId)}</p>
          <p><strong>What happens next:</strong></p>
          <ol style="margin-bottom: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Our <strong>Lead Educator</strong> will carefully review the academic background, grade level and subjects you indicated.</li>
            <li style="margin-bottom: 8px;">We will contact you via your preferred communication method (${escapeHtml(data.preferredContact || 'WhatsApp')}) within 24 to 48 hours.</li>
            <li>We will schedule a personalized diagnostic consultation to map out a structured learning path.</li>
          </ol>
        </div>
        <p>If you have urgent questions or upcoming test deadlines, feel free to reach out to us directly on WhatsApp:</p>
      `;
      break;
    }

    case 'organization': {
      subject = 'School & Organisation Partnership Enquiry: Re:kula';
      badge = 'PARTNERSHIP ENQUIRY';
      title = `Thank you ${contactName}, we have received your enquiry`;
      messageBody = `
        <p>Thank you for considering <strong>Re:kula Academic Support</strong> as a learning partner for ${escapeHtml(data.orgName || 'your institution')}.</p>
        <div class="card">
          <p style="margin-top: 0;"><strong>Enquiry Reference:</strong> ${escapeHtml(submissionId)}</p>
          <p style="margin-bottom: 0;">Our Lead Educator will review your requirements regarding learner cohorts, curriculum needs and timeline, then reach out to schedule an exploratory discussion.</p>
        </div>
        <p>For urgent scheduling or immediate inquiries, you can also reach our team directly on WhatsApp:</p>
      `;
      break;
    }

    case 'quick-contact': {
      subject = 'We received your message: Re:kula Academic Support';
      badge = 'MESSAGE RECEIVED';
      title = `Thank you ${contactName}, message received`;
      messageBody = `
        <p>Thank you for contacting <strong>Re:kula Academic Support</strong>. We have securely received your message regarding <em>"${escapeHtml(data.subject || 'General Inquiry')}"</em>.</p>
        <div class="card">
          <p style="margin-top: 0; margin-bottom: 0;">Our Lead Educator reviews all messages and will respond to you promptly via email or phone.</p>
        </div>
        <p>If your matter is time-sensitive, feel free to connect directly via WhatsApp:</p>
      `;
      break;
    }

    case 'careers': {
      subject = 'Educator Application Received: Re:kula Academic Support';
      badge = 'APPLICATION RECEIVED';
      title = `Thank you ${contactName}, application received`;
      messageBody = `
        <p>Thank you for your interest in joining the <strong>Re:kula Academic Support</strong> educator network.</p>
        <div class="card">
          <p style="margin-top: 0;"><strong>Application Reference:</strong> ${escapeHtml(submissionId)}</p>
          <p style="margin-bottom: 0;">We hold our educators to high standards of subject mastery, pedagogical empathy and communicative clarity. Our academic review team will review your qualifications, teaching philosophy and experience. Should your profile align with our current learner demand, we will be in touch to schedule an interview.</p>
        </div>
        <p>We appreciate your dedication to quality education.</p>
      `;
      break;
    }

    case 'volunteer': {
      subject = 'Volunteer Application Received: Re:kula Academic Support';
      badge = 'APPLICATION RECEIVED';
      title = `Thank you ${contactName}, application received`;
      messageBody = `
        <p>Thank you for offering your time and knowledge to support learners across South Africa through <strong>Re:kula</strong>.</p>
        <div class="card">
          <p style="margin-top: 0;"><strong>Application Reference:</strong> ${escapeHtml(submissionId)}</p>
          <p style="margin-bottom: 0;">Our team will review your availability and subject preferences. When a matching community initiative or learner cohort opens up, we will contact you with next steps.</p>
        </div>
      `;
      break;
    }

    case 'testimonial': {
      subject = 'Thank you for your feedback: Re:kula Academic Support';
      badge = 'FEEDBACK RECEIVED';
      title = `Thank you ${contactName} for sharing your experience`;
      messageBody = `
        <p>Thank you for taking the time to share your feedback about <strong>Re:kula Academic Support</strong>. Honest feedback helps us continually refine our academic guidance and support more learners effectively.</p>
        <div class="card">
          <p style="margin-top: 0; margin-bottom: 0;">Your testimonial has been submitted for review and will be added to our community testimonials upon verification.</p>
        </div>
      `;
      break;
    }

    default: {
      messageBody = `
        <p>Thank you for reaching out to <strong>Re:kula Academic Support</strong>. We have received your submission (Ref: ${escapeHtml(submissionId)}) and will be in touch shortly.</p>
      `;
    }
  }

  const html = renderEmailShell({
    title,
    badge,
    contentHtml: `
      ${messageBody}
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 237, 215, 0.08);">
        <p style="margin: 0; font-size: 14px; color: rgba(255, 237, 215, 0.8);">
          Warm regards,<br>
          <strong style="color: #ffedd7;">Lead Educator &amp; The Re:kula Team</strong><br>
          <span style="font-size: 12px; color: rgba(255, 237, 215, 0.5);">Re:kula Academic Support • South Africa</span>
        </p>
      </div>
    `,
    ctaText: 'Chat on WhatsApp',
    ctaUrl: WHATSAPP_LINK,
    isReceipt: true
  });

  return { to: email, subject, html };
}

/**
 * Sends both Admin Notification and Submitter Receipt via Resend.
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
  const adminEmail = getAdminRecipient();

  // 1. Prepare Admin Notification
  const adminEmailData = buildAdminNotification(formType, data, submissionId);

  // 2. Prepare Submitter Receipt
  const receiptEmailData = buildSubmitterReceipt(formType, data, submissionId);

  const emailTasks = [];

  // Task A: Admin notification
  emailTasks.push(
    resend.emails
      .send({
        from,
        to: adminEmail,
        subject: adminEmailData.subject,
        html: adminEmailData.html
      })
      .then(res => {
        if (res.error) {
          throw new Error(res.error.message || JSON.stringify(res.error));
        }
        result.adminSent = true;
        console.log(`[RESEND SUCCESS] Admin notification sent (ID: ${res.data?.id}) for submission ${submissionId}`);
      })
      .catch(err => {
        const msg = `Failed to send admin notification: ${err.message}`;
        console.error(`[RESEND ADMIN ERROR]: ${msg}`);
        result.errors.push(msg);
      })
  );

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
