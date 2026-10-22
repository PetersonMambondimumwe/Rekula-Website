import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('ERROR: DATABASE_URL is not set in .env');
  process.exit(1);
}

const sql = neon(connectionString);

async function runMigration() {
  console.log('--- Starting Database Migration on Neon PostgreSQL ---');

  const statements = [
    // 1. Master Submissions Table
    `CREATE TABLE IF NOT EXISTS submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      form_type VARCHAR(50) NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'new',
      contact_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      location VARCHAR(255),
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      ip_address VARCHAR(100),
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 2. Consultation Enquiries
    `CREATE TABLE IF NOT EXISTS consultation_enquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      enquiry_for VARCHAR(50) NOT NULL,
      contact_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      whatsapp_consent BOOLEAN NOT NULL DEFAULT true,
      preferred_contact VARCHAR(50) NOT NULL DEFAULT 'WhatsApp',
      best_time VARCHAR(50) NOT NULL DEFAULT 'Afternoon',
      location VARCHAR(255) NOT NULL DEFAULT 'South Africa',
      learner_first_name VARCHAR(255) NOT NULL,
      age_grade VARCHAR(100) NOT NULL,
      schooling_situation VARCHAR(100),
      curriculum VARCHAR(100),
      current_school VARCHAR(255),
      selected_services TEXT[] DEFAULT '{}',
      main_reasons TEXT[] DEFAULT '{}',
      missed_school_dates TEXT,
      workshop_group_type VARCHAR(100),
      workshop_learner_count VARCHAR(50),
      workshop_exam_date VARCHAR(50),
      workshop_venue VARCHAR(255),
      learning_mode VARCHAR(50) DEFAULT 'Either',
      when_to_start VARCHAR(100) DEFAULT 'As soon as possible',
      availabilities TEXT[] DEFAULT '{}',
      notes TEXT,
      heard_about VARCHAR(100),
      guardian_confirmed BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 3. Consultation Subjects (One-to-many)
    `CREATE TABLE IF NOT EXISTS consultation_subjects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      consultation_id UUID NOT NULL REFERENCES consultation_enquiries(id) ON DELETE CASCADE,
      subject_name VARCHAR(255) NOT NULL
    );`,

    // 4. Organization / School Partnerships
    `CREATE TABLE IF NOT EXISTS organization_enquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      org_name VARCHAR(255) NOT NULL,
      org_type VARCHAR(100) NOT NULL,
      contact_name VARCHAR(255) NOT NULL,
      contact_role VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      location VARCHAR(255) NOT NULL DEFAULT 'South Africa',
      approx_learners VARCHAR(100),
      grade_phases TEXT[] DEFAULT '{}',
      curricula TEXT[] DEFAULT '{}',
      service_needed VARCHAR(255),
      timeline VARCHAR(100),
      message TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 5. Quick Contact Messages
    `CREATE TABLE IF NOT EXISTS quick_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 6. Educator / Tutor Applications
    `CREATE TABLE IF NOT EXISTS educator_applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      whatsapp_consent BOOLEAN NOT NULL DEFAULT true,
      city_province VARCHAR(255) NOT NULL,
      highest_qualification VARCHAR(255) NOT NULL,
      institution VARCHAR(255) NOT NULL,
      graduation_year VARCHAR(50) NOT NULL,
      sace_status VARCHAR(100) NOT NULL,
      sace_number VARCHAR(100),
      teaching_experience_years VARCHAR(50),
      tutoring_mode VARCHAR(50) NOT NULL,
      weekly_availability_hours VARCHAR(50),
      teaching_philosophy TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 7. Educator Subjects (One-to-many)
    `CREATE TABLE IF NOT EXISTS educator_subjects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      application_id UUID NOT NULL REFERENCES educator_applications(id) ON DELETE CASCADE,
      subject_name VARCHAR(255) NOT NULL,
      highest_grade VARCHAR(100),
      curricula TEXT[] DEFAULT '{}'
    );`,

    // 8. Volunteer Applications
    `CREATE TABLE IF NOT EXISTS volunteer_applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      city_province VARCHAR(255) NOT NULL,
      current_occupation VARCHAR(255) NOT NULL,
      volunteer_motivation TEXT NOT NULL,
      weekly_hours VARCHAR(50) NOT NULL,
      mode VARCHAR(50) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 9. Volunteer Subjects (One-to-many)
    `CREATE TABLE IF NOT EXISTS volunteer_subjects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      application_id UUID NOT NULL REFERENCES volunteer_applications(id) ON DELETE CASCADE,
      subject_name VARCHAR(255) NOT NULL,
      highest_grade VARCHAR(100),
      curricula TEXT[] DEFAULT '{}'
    );`,

    // 10. Testimonials
    `CREATE TABLE IF NOT EXISTS testimonials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      submission_id UUID REFERENCES submissions(id) ON DELETE SET NULL,
      quote TEXT NOT NULL,
      author_display_name VARCHAR(255) NOT NULL,
      author_role VARCHAR(255) NOT NULL,
      service_tag VARCHAR(255) NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
      author_email VARCHAR(255),
      is_anonymous BOOLEAN DEFAULT false,
      is_featured BOOLEAN DEFAULT false,
      is_approved BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,

    // 11. Performance & Audit Indexes
    `CREATE INDEX IF NOT EXISTS idx_submissions_type_status ON submissions(form_type, status);`,
    `CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);`,
    `CREATE INDEX IF NOT EXISTS idx_consultation_sub_id ON consultation_enquiries(submission_id);`,
    `CREATE INDEX IF NOT EXISTS idx_org_sub_id ON organization_enquiries(submission_id);`,
    `CREATE INDEX IF NOT EXISTS idx_quick_sub_id ON quick_messages(submission_id);`,
    `CREATE INDEX IF NOT EXISTS idx_educator_sub_id ON educator_applications(submission_id);`,
    `CREATE INDEX IF NOT EXISTS idx_volunteer_sub_id ON volunteer_applications(submission_id);`,
    `CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved, is_featured);`
  ];

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await sql.query(stmt);
      console.log(`✓ Migration step ${i + 1}/${statements.length} applied successfully.`);
    } catch (err) {
      console.error(`✗ Error executing step ${i + 1}:`, err.message);
      throw err;
    }
  }

  console.log('--- All tables, constraints and indexes migrated successfully! ---');
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
