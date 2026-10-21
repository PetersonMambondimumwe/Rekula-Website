import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service, Testimonial, FAQItem, FormSubmission } from '../types';
import {
  Shield,
  Download,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle2,
  Star,
  FileSpreadsheet,
  RefreshCw,
  FolderOpen,
  Sparkles,
  Search,
  Check,
  X,
  FileText,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    services,
    addService,
    updateService,
    deleteService,
    testimonials,
    addTestimonial,
    approveTestimonial,
    toggleFeaturedTestimonial,
    deleteTestimonial,
    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    submissions,
    updateSubmissionStatus,
    deleteSubmission,
    exportSubmissionsToCSV,
    resetAllDataToDefault,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'submissions' | 'services' | 'testimonials' | 'faqs'>('submissions');
  const [submissionFilter, setSubmissionFilter] = useState<string>('all');
  const [inspectSubmission, setInspectSubmission] = useState<FormSubmission | null>(null);

  // New Service Modal / Form state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvSlug, setNewSrvSlug] = useState('');
  const [newSrvTagline, setNewSrvTagline] = useState('');
  const [newSrvWho, setNewSrvWho] = useState('');
  const [newSrvWhat, setNewSrvWhat] = useState('');
  const [newSrvResult, setNewSrvResult] = useState('');
  const [newSrvCurricula, setNewSrvCurricula] = useState<string[]>(['CAPS', 'IEB']);
  const [newSrvStatus, setNewSrvStatus] = useState<'published' | 'draft'>('published');

  // New Testimonial state
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testQuote, setTestQuote] = useState('');
  const [testAuthor, setTestAuthor] = useState('');
  const [testRole, setTestRole] = useState('Parent of a Grade 8 learner');
  const [testService, setTestService] = useState('Curriculum Bridging');
  const [testRating, setTestRating] = useState(5);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle) return;

    const slug = newSrvSlug || newSrvTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addService({
      title: newSrvTitle,
      slug,
      tagline: newSrvTagline || 'Tailored academic support.',
      whoItIsFor: newSrvWho || 'Learners needing focused academic guidance.',
      whatWeDo: newSrvWhat || 'Personalised diagnostic and teaching sessions.',
      result: newSrvResult || 'Renewed confidence and steady academic progress.',
      curricula: newSrvCurricula,
      targetAudiences: ['General Learners'],
      iconName: 'BookOpen',
      status: newSrvStatus,
      order: services.length + 1,
    });

    setIsAddingService(false);
    setNewSrvTitle('');
    setNewSrvSlug('');
    setNewSrvTagline('');
    setNewSrvWho('');
    setNewSrvWhat('');
    setNewSrvResult('');
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuote || !testAuthor) return;

    addTestimonial({
      quote: testQuote,
      authorDisplayName: testAuthor,
      authorRole: testRole,
      serviceTag: testService,
      rating: testRating,
    });

    setIsAddingTestimonial(false);
    setTestQuote('');
    setTestAuthor('');
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (submissionFilter === 'all') return true;
    return sub.formType === submissionFilter;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left text-navy">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-softblue-tint text-softblue text-xs font-semibold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Founder Portal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-navy mt-1">
            Re:kula Management Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-subtle">
            Manage services, approve community reflections, review form submissions, and export data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportSubmissionsToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Submissions (CSV)</span>
          </button>

          <button
            onClick={resetAllDataToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs transition-colors"
            title="Reset to default seed data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-subtle uppercase tracking-wider">
            Total Inquiries
          </p>
          <p className="font-serif text-2xl font-bold text-navy mt-1">
            {submissions.length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-subtle uppercase tracking-wider">
            Active Services
          </p>
          <p className="font-serif text-2xl font-bold text-navy mt-1">
            {services.filter((s) => s.status === 'published').length} / {services.length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-subtle uppercase tracking-wider">
            Approved Stories
          </p>
          <p className="font-serif text-2xl font-bold text-navy mt-1">
            {testimonials.filter((t) => t.isApproved).length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-subtle uppercase tracking-wider">
            Knowledge Base FAQs
          </p>
          <p className="font-serif text-2xl font-bold text-navy mt-1">
            {faqs.length}
          </p>
        </div>
      </section>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'submissions', label: `Inquiries & Submissions (${submissions.length})` },
          { id: 'services', label: `Services Manager (${services.length})` },
          { id: 'testimonials', label: `Testimonials & Consent (${testimonials.length})` },
          { id: 'faqs', label: `FAQ Manager (${faqs.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. SUBMISSIONS TAB */}
      {activeTab === 'submissions' && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-subtle mr-2">Filter form:</span>
              {[
                { id: 'all', label: 'All Forms' },
                { id: 'consultation', label: 'Form 1: Consultation' },
                { id: 'organization', label: 'Form 2: School/Org' },
                { id: 'quick-contact', label: 'Form 3: Quick' },
                { id: 'careers', label: 'Form 4: Careers' },
                { id: 'volunteer', label: 'Form 5: Volunteer' },
                { id: 'testimonial', label: 'Form 6: Story' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSubmissionFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    submissionFilter === f.id
                      ? 'bg-softblue text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-subtle">
              Showing {filteredSubmissions.length} submissions
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-subtle">
              No submissions found for this filter. Test submit any form on the site to see real-time updates!
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-subtle uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Date / Time</th>
                    <th className="p-3.5">Form</th>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Email / Phone</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 whitespace-nowrap text-slate-subtle">
                        {sub.createdAt}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-softblue-tint text-navy font-semibold text-[10px] uppercase">
                          {sub.formType}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-navy">
                        {sub.fullName}
                      </td>
                      <td className="p-3.5 text-slate-subtle">
                        <div>{sub.email}</div>
                        {sub.phone && <div className="text-[11px] font-medium text-emerald-700">{sub.phone}</div>}
                      </td>
                      <td className="p-3.5 text-slate-subtle">
                        {sub.location || '—'}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={sub.status}
                          onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-white font-medium text-navy"
                        >
                          <option value="new">New</option>
                          <option value="in-review">In Review</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setInspectSubmission(sub)}
                          className="text-softblue hover:underline font-medium"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => deleteSubmission(sub.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete submission"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* 2. SERVICES TAB */}
      {activeTab === 'services' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-navy">
                Services Directory & Curricula
              </h2>
              <p className="text-xs text-slate-subtle">
                Add, rename, draft, or hide services. Changes automatically propagate to all forms and navigation dropdowns.
              </p>
            </div>

            <button
              onClick={() => setIsAddingService(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-softblue-tint text-navy">
                      {srv.curricula.join(' • ')}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        srv.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {srv.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-navy">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-softblue font-medium">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-slate-subtle line-clamp-2">
                    {srv.whatWeDo}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() =>
                      updateService(srv.id, {
                        status: srv.status === 'published' ? 'draft' : 'published',
                      })
                    }
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-navy font-medium"
                  >
                    {srv.status === 'published' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Hide to Draft
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Publish Live
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteService(srv.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Service Form Drawer / Box */}
          {isAddingService && (
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-navy">
                  Add New Academic Service
                </h3>
                <button
                  onClick={() => setIsAddingService(false)}
                  className="text-xs text-slate-400 hover:text-navy"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={newSrvTitle}
                      onChange={(e) => setNewSrvTitle(e.target.value)}
                      placeholder="e.g. Remedial Numeracy Support"
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tagline</label>
                    <input
                      type="text"
                      value={newSrvTagline}
                      onChange={(e) => setNewSrvTagline(e.target.value)}
                      placeholder="e.g. Building number sense without fear"
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Who It Is For</label>
                  <textarea
                    rows={2}
                    value={newSrvWho}
                    onChange={(e) => setNewSrvWho(e.target.value)}
                    placeholder="Audience profile..."
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">What We Do</label>
                  <textarea
                    rows={2}
                    value={newSrvWhat}
                    onChange={(e) => setNewSrvWhat(e.target.value)}
                    placeholder="Pedagogical action..."
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">The Result</label>
                  <input
                    type="text"
                    value={newSrvResult}
                    onChange={(e) => setNewSrvResult(e.target.value)}
                    placeholder="Target outcome..."
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <div className="flex gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Status</label>
                    <select
                      value={newSrvStatus}
                      onChange={(e) => setNewSrvStatus(e.target.value as any)}
                      className="p-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft / Hidden</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-navy text-white font-semibold hover:bg-navy-800 shadow-sm"
                >
                  Save Service to CMS
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {/* 3. TESTIMONIALS TAB */}
      {activeTab === 'testimonials' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-navy">
                Testimonial Approvals & Moderation
              </h2>
              <p className="text-xs text-slate-subtle">
                Per strict brief rules: Nothing publishes automatically. Only real reflections with verified consent appear on the website.
              </p>
            </div>

            <button
              onClick={() => setIsAddingTestimonial(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Verified Story</span>
            </button>
          </div>

          <div className="space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        t.isApproved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {t.isApproved ? 'Approved & Public' : 'Pending Verification'}
                    </span>
                    {t.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-softblue text-white">
                        Featured on Home
                      </span>
                    )}
                    <span className="text-slate-subtle">
                      • {t.serviceTag}
                    </span>
                  </div>

                  <p className="font-serif text-sm italic text-navy leading-relaxed">
                    “{t.quote}”
                  </p>

                  <p className="font-bold text-navy">
                    {t.authorDisplayName} <span className="text-slate-subtle font-normal">({t.authorRole})</span>
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <button
                    onClick={() => approveTestimonial(t.id, !t.isApproved)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                      t.isApproved
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {t.isApproved ? 'Unpublish' : 'Approve & Publish'}
                  </button>

                  <button
                    onClick={() => toggleFeaturedTestimonial(t.id)}
                    className="text-softblue hover:underline"
                  >
                    {t.isFeatured ? 'Unfeature on Home' : 'Feature on Home'}
                  </button>

                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Testimonial Form */}
          {isAddingTestimonial && (
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-navy">
                  Add Consent-Verified Testimonial
                </h3>
                <button
                  onClick={() => setIsAddingTestimonial(false)}
                  className="text-xs text-slate-400 hover:text-navy"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateTestimonial} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Quote *</label>
                  <textarea
                    rows={3}
                    required
                    value={testQuote}
                    onChange={(e) => setTestQuote(e.target.value)}
                    placeholder="Enter the author's verified feedback..."
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Display Name *</label>
                    <input
                      type="text"
                      required
                      value={testAuthor}
                      onChange={(e) => setTestAuthor(e.target.value)}
                      placeholder="e.g. Anonymous Parent"
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Role / Descriptor</label>
                    <input
                      type="text"
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      placeholder="e.g. Parent of Grade 10 Cambridge learner"
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Service Tag</label>
                    <input
                      type="text"
                      value={testService}
                      onChange={(e) => setTestService(e.target.value)}
                      placeholder="e.g. Personalised Tutoring"
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-navy text-white font-semibold hover:bg-navy-800 shadow-sm"
                >
                  Save Testimonial
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {/* 4. FAQS TAB */}
      {activeTab === 'faqs' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-navy">
                Knowledge Base & FAQ Management
              </h2>
              <p className="text-xs text-slate-subtle">
                Keep answers clear and aligned with the zero-pricing rule.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy text-sm">
                    {faq.question}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-softblue px-2 py-0.5 rounded-full bg-softblue-tint">
                    {faq.category}
                  </span>
                </div>
                <p className="text-slate-subtle leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detail Inspection Modal for Form Submissions */}
      {inspectSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 text-xs text-navy">
            <button
              onClick={() => setInspectSubmission(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="px-2.5 py-1 rounded-full bg-softblue-tint text-navy font-bold text-[10px] uppercase">
                {inspectSubmission.formType}
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy mt-1">
                {inspectSubmission.fullName}
              </h3>
              <p className="text-slate-subtle">
                Submitted on {inspectSubmission.createdAt} • Status: <span className="font-bold uppercase text-softblue">{inspectSubmission.status}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p><strong>Email:</strong> {inspectSubmission.email}</p>
              <p><strong>Phone:</strong> {inspectSubmission.phone || 'N/A'}</p>
              <p><strong>WhatsApp Consent:</strong> {inspectSubmission.whatsappConsent ? 'Yes' : 'No'}</p>
              <p><strong>Preferred Contact:</strong> {inspectSubmission.preferredContact || 'N/A'}</p>
              <p><strong>Best Time:</strong> {inspectSubmission.bestTime || 'N/A'}</p>
              <p><strong>Location:</strong> {inspectSubmission.location || 'N/A'}</p>
            </div>

            <div>
              <h4 className="font-bold text-navy mb-2">Form Data Payload:</h4>
              <div className="p-4 rounded-2xl bg-navy-950 text-white font-mono text-[11px] overflow-x-auto max-h-60">
                <pre>{JSON.stringify(inspectSubmission.data, null, 2)}</pre>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setInspectSubmission(null)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
