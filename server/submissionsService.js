import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load environment variables if not already loaded
config();

const connectionString = process.env.DATABASE_URL;

function getSql() {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured on the server.');
  }
  return neon(connectionString);
}

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates and saves a form submission to the database.
 * @param {string} formType
 * @param {Record<string, any>} data
 * @param {{ ip?: string; userAgent?: string }} meta
 * @returns {Promise<{ success: boolean; submissionId: string; message?: string }>}
 */
export async function handleFormSubmission(formType, data, meta = {}) {
  // 1. Honeypot anti-spam check
  if (data.rekula_hp || data.honeypot) {
    // Silently drop bot submissions without throwing or persisting
    return { success: true, submissionId: 'bot-filtered' };
  }

  // 2. Form Type Validation
  const allowedFormTypes = [
    'consultation',
    'organization',
    'quick-contact',
    'careers',
    'volunteer',
    'testimonial'
  ];

  if (!allowedFormTypes.includes(formType)) {
    throw new Error('Invalid form submission type.');
  }

  // 3. Extract common fields with fallbacks
  const contactName = (
    data.fullName ||
    data.contactPerson ||
    data.name ||
    data.organisationName ||
    data.authorDisplayName ||
    ''
  ).trim();

  const email = (data.email || data.authorEmail || '').trim().toLowerCase();
  const phone = (data.phone || data.whatsappNumber || '').trim();
  const location = (data.location || data.cityProvince || 'South Africa').trim();

  // Basic validation rules
  if (!contactName) {
    throw new Error('Please provide your name.');
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    throw new Error('Please provide a valid email address.');
  }

  const sql = getSql();

  try {
    // 4. Insert Master Submission Record
    const masterInsert = await sql.query(
      `INSERT INTO submissions (form_type, status, contact_name, email, phone, location, payload, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id;`,
      [
        formType,
        'new',
        contactName,
        email,
        phone || null,
        location || null,
        JSON.stringify(data),
        meta.ip || null,
        meta.userAgent || null
      ]
    );

    const submissionId = masterInsert[0].id;

    // 5. Normalized Child Table Inserts
    switch (formType) {
      case 'consultation': {
        const enquiryFor = data.enquiryFor || 'parent';
        const learnerFirstName = (data.learnerFirstName || contactName).trim();
        const ageGrade = data.ageGrade || 'Not specified';
        const schoolingSituation = data.schoolingSituation || null;
        const curriculum = data.curriculum || null;
        const currentSchool = data.currentSchool || null;
        const selectedServices = Array.isArray(data.selectedServices) ? data.selectedServices : [];
        const mainReasons = Array.isArray(data.mainReasons) ? data.mainReasons : [];
        const missedSchoolDates = data.missedSchoolDates || null;
        const workshopDetails = data.workshopDetails || {};
        const learningMode = data.learningMode || 'Either';
        const whenToStart = data.whenToStart || 'As soon as possible';
        const availabilities = Array.isArray(data.availabilities) ? data.availabilities : [];
        const notes = data.notes || null;
        const heardAbout = data.heardAbout || null;
        const guardianConfirmed = Boolean(data.guardianConfirmed);
        const preferredContact = data.preferredContact || 'WhatsApp';
        const bestTime = data.bestTime || 'Afternoon';
        const whatsappConsent = data.whatsappConsent !== false;
        const attachmentName = data.attachmentName || null;
        const attachmentUrl = data.attachmentUrl || null;

        const consultInsert = await sql.query(
          `INSERT INTO consultation_enquiries (
            submission_id, enquiry_for, contact_name, email, phone, whatsapp_consent,
            preferred_contact, best_time, location, learner_first_name, age_grade,
            schooling_situation, curriculum, current_school, selected_services,
            main_reasons, missed_school_dates, workshop_group_type, workshop_learner_count,
            workshop_exam_date, workshop_venue, learning_mode, when_to_start,
            availabilities, notes, heard_about, guardian_confirmed, attachment_name, attachment_url
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
            $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29
          ) RETURNING id;`,
          [
            submissionId,
            enquiryFor,
            contactName,
            email,
            phone,
            whatsappConsent,
            preferredContact,
            bestTime,
            location,
            learnerFirstName,
            ageGrade,
            schoolingSituation,
            curriculum,
            currentSchool,
            selectedServices,
            mainReasons,
            missedSchoolDates,
            workshopDetails.groupType || null,
            workshopDetails.count || null,
            workshopDetails.examDate || null,
            workshopDetails.venue || null,
            learningMode,
            whenToStart,
            availabilities,
            notes,
            heardAbout,
            guardianConfirmed,
            attachmentName,
            attachmentUrl
          ]
        );

        const consultationId = consultInsert[0].id;

        if (attachmentUrl) {
          await sql.query(
            `INSERT INTO submission_attachments (submission_id, file_name, file_url, mime_type, storage_provider)
             VALUES ($1, $2, $3, $4, $5);`,
            [submissionId, attachmentName || 'Attachment', attachmentUrl, data.attachmentMime || 'application/pdf', 'seaweedfs']
          );
        }

        // Insert individual subjects
        if (Array.isArray(data.subjects) && data.subjects.length > 0) {
          for (const subj of data.subjects) {
            if (subj && typeof subj === 'string' && subj.trim()) {
              await sql.query(
                `INSERT INTO consultation_subjects (consultation_id, subject_name) VALUES ($1, $2);`,
                [consultationId, subj.trim()]
              );
            }
          }
        }
        break;
      }

      case 'organization': {
        const orgName = (data.orgName || 'Not specified').trim();
        const orgType = data.orgType || 'School';
        const contactRole = (data.contactRole || 'Coordinator').trim();
        const approxLearners = data.approxLearners || null;
        const gradePhases = Array.isArray(data.gradePhases) ? data.gradePhases : [];
        const curricula = Array.isArray(data.curricula) ? data.curricula : [];
        const serviceNeeded = data.serviceNeeded || null;
        const timeline = data.timeline || null;
        const message = data.message || '';

        await sql.query(
          `INSERT INTO organization_enquiries (
            submission_id, org_name, org_type, contact_name, contact_role,
            email, phone, location, approx_learners, grade_phases, curricula,
            service_needed, timeline, message
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`,
          [
            submissionId,
            orgName,
            orgType,
            contactName,
            contactRole,
            email,
            phone,
            location,
            approxLearners,
            gradePhases,
            curricula,
            serviceNeeded,
            timeline,
            message
          ]
        );
        break;
      }

      case 'quick-contact': {
        const subject = data.subject || 'General Inquiry';
        const message = (data.message || '').trim();

        if (!message) {
          throw new Error('Please include your message.');
        }

        await sql.query(
          `INSERT INTO quick_messages (submission_id, name, email, phone, subject, message)
           VALUES ($1, $2, $3, $4, $5, $6);`,
          [submissionId, contactName, email, phone || null, subject, message]
        );
        break;
      }

      case 'careers': {
        const cityProvince = (data.cityProvince || location).trim();
        const highestQualification = data.highestQualification || 'Not specified';
        const institution = data.institution || 'Not specified';
        const graduationYear = String(data.graduationYear || '');
        const saceStatus = data.saceStatus || 'Not registered';
        const saceNumber = data.saceNumber || null;
        const teachingExperienceYears = String(data.teachingExperienceYears || '0');
        const tutoringMode = data.tutoringMode || 'Both';
        const weeklyAvailabilityHours = String(data.weeklyAvailabilityHours || '10-20');
        const teachingPhilosophy = (data.teachingPhilosophy || '').trim();
        const whatsappConsent = data.whatsappConsent !== false;
        const cvFileName = data.cvFileName || null;
        const cvUrl = data.cvUrl || null;

        const eduInsert = await sql.query(
          `INSERT INTO educator_applications (
            submission_id, name, email, phone, whatsapp_consent, city_province,
            highest_qualification, institution, graduation_year, sace_status,
            sace_number, teaching_experience_years, tutoring_mode,
            weekly_availability_hours, teaching_philosophy, cv_file_name, cv_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          RETURNING id;`,
          [
            submissionId,
            contactName,
            email,
            phone,
            whatsappConsent,
            cityProvince,
            highestQualification,
            institution,
            graduationYear,
            saceStatus,
            saceNumber,
            teachingExperienceYears,
            tutoringMode,
            weeklyAvailabilityHours,
            teachingPhilosophy,
            cvFileName,
            cvUrl
          ]
        );

        const eduId = eduInsert[0].id;

        if (cvUrl) {
          await sql.query(
            `INSERT INTO submission_attachments (submission_id, file_name, file_url, mime_type, storage_provider)
             VALUES ($1, $2, $3, $4, $5);`,
            [submissionId, cvFileName || 'Curriculum_Vitae.pdf', cvUrl, 'application/pdf', 'seaweedfs']
          );
        }

        if (Array.isArray(data.subjects)) {
          for (const s of data.subjects) {
            if (s && s.subject) {
              await sql.query(
                `INSERT INTO educator_subjects (application_id, subject_name, highest_grade, curricula)
                 VALUES ($1, $2, $3, $4);`,
                [
                  eduId,
                  s.subject,
                  s.highestGrade || null,
                  Array.isArray(s.curricula) ? s.curricula : []
                ]
              );
            }
          }
        }
        break;
      }

      case 'volunteer': {
        const cityProvince = (data.cityProvince || location).trim();
        const currentOccupation = data.currentOccupation || 'Student';
        const volunteerMotivation = (data.volunteerMotivation || '').trim();
        const weeklyHours = String(data.weeklyHours || '2-4 hours');
        const mode = data.mode || 'Online';
        const cvFileName = data.cvFileName || null;
        const cvUrl = data.cvUrl || null;

        const volInsert = await sql.query(
          `INSERT INTO volunteer_applications (
            submission_id, name, email, phone, city_province,
            current_occupation, volunteer_motivation, weekly_hours, mode,
            cv_file_name, cv_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING id;`,
          [
            submissionId,
            contactName,
            email,
            phone,
            cityProvince,
            currentOccupation,
            volunteerMotivation,
            weeklyHours,
            mode,
            cvFileName,
            cvUrl
          ]
        );

        const volId = volInsert[0].id;

        if (cvUrl) {
          await sql.query(
            `INSERT INTO submission_attachments (submission_id, file_name, file_url, mime_type, storage_provider)
             VALUES ($1, $2, $3, $4, $5);`,
            [submissionId, cvFileName || 'Volunteer_CV.pdf', cvUrl, 'application/pdf', 'seaweedfs']
          );
        }

        if (Array.isArray(data.subjects)) {
          for (const s of data.subjects) {
            if (s && s.subject) {
              await sql.query(
                `INSERT INTO volunteer_subjects (application_id, subject_name, highest_grade, curricula)
                 VALUES ($1, $2, $3, $4);`,
                [
                  volId,
                  s.subject,
                  s.highestGrade || null,
                  Array.isArray(s.curricula) ? s.curricula : []
                ]
              );
            }
          }
        }
        break;
      }

      case 'testimonial': {
        const quote = (data.quote || '').trim();
        const authorDisplayName = data.authorDisplayName || contactName;
        const authorRole = data.authorRole || 'Parent';
        const serviceTag = data.serviceTag || 'Academic Support';
        const rating = Math.min(5, Math.max(1, Number(data.rating) || 5));
        const isAnonymous = Boolean(data.isAnonymous);

        if (!quote) {
          throw new Error('Please include your testimonial text.');
        }

        await sql.query(
          `INSERT INTO testimonials (
            submission_id, quote, author_display_name, author_role,
            service_tag, rating, author_email, is_anonymous, is_approved, is_featured
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, false);`,
          [
            submissionId,
            quote,
            authorDisplayName,
            authorRole,
            serviceTag,
            rating,
            email,
            isAnonymous
          ]
        );
        break;
      }
    }

    // Record any additional uploaded attachments linked to SeaweedFS
    if (Array.isArray(data.attachments)) {
      for (const att of data.attachments) {
        if (att && att.url) {
          await sql.query(
            `INSERT INTO submission_attachments (
              submission_id, file_name, file_url, file_size, mime_type, storage_provider
            ) VALUES ($1, $2, $3, $4, $5, $6);`,
            [
              submissionId,
              att.fileName || 'attachment',
              att.url,
              att.fileSize || null,
              att.mimeType || 'application/octet-stream',
              'seaweedfs'
            ]
          );
        }
      }
    }

    return {
      success: true,
      submissionId,
      message: 'Submission successfully received and recorded.'
    };
  } catch (err) {
    // Log complete stack and message server-side only for diagnostics
    console.error('[DB SUBMISSION FAILURE]:', err.message, err.stack);

    // Provide clean, safe error message to client without leaking DB internals
    if (
      err.message.startsWith('Please provide') ||
      err.message.startsWith('Please include') ||
      err.message.startsWith('Invalid')
    ) {
      throw err;
    }

    throw new Error(
      'We could not save your submission to our secure database right now. Please try again or message us directly on WhatsApp (+27 67 435 0849).'
    );
  }
}

/**
 * Health check to verify database connectivity.
 */
export async function checkDatabaseHealth() {
  const sql = getSql();
  const result = await sql.query('SELECT 1 as healthy, NOW() as server_time;');
  return {
    status: 'healthy',
    database: 'Neon PostgreSQL',
    serverTime: result[0]?.server_time
  };
}
