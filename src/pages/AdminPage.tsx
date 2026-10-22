import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FormSubmission } from '../types';
import {
  Shield,
  Download,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  X,
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
    submissions,
    updateSubmissionStatus,
    deleteSubmission,
    exportSubmissionsToCSV,
    resetAllDataToDefault,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'submissions' | 'services' | 'testimonials' | 'faqs'>('submissions');
  const [submissionFilter, setSubmissionFilter] = useState<string>('all');
  const [inspectSubmission, setInspectSubmission] = useState<FormSubmission | null>(null);

  // New Service state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvSlug, setNewSrvSlug] = useState('');
  const [newSrvTagline, setNewSrvTagline] = useState('');
  const [newSrvWho, setNewSrvWho] = useState('');
  const [newSrvWhat, setNewSrvWhat] = useState('');
  const [newSrvResult, setNewSrvResult] = useState('');
  const [newSrvStatus, setNewSrvStatus] = useState<'published' | 'draft'>('published');

  // New Testimonial state
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testQuote, setTestQuote] = useState('');
  const [testAuthor, setTestAuthor] = useState('');
  const [testRole, setTestRole] = useState('Parent of a Grade 8 learner');
  const [testService, setTestService] = useState('Curriculum Bridging');

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
      curricula: ['CAPS', 'IEB', 'Cambridge International'],
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
      rating: 5,
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
    <div className="w-full bg-void text-cream pt-28 pb-20 px-6 sm:px-12 space-y-10 text-left">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dashed border-border-cork">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-cork text-ember text-[10px] font-mono uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>FOUNDER CMS STUDIO</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-cream mt-1">
            Re:kula Studio Portal.
          </h1>
          <p className="text-xs text-cream-muted font-mono">
            Manage services, review verified testimonials, track inquiries and export data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportSubmissionsToCSV}
            className="rounded-buttons-pill bg-cream text-void hover:bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={resetAllDataToDefault}
            className="rounded-buttons-outlined border border-border-cork text-cream-muted hover:text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
            title="Restore default draft state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-cards bg-surface/50 border border-border-cork">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
            Total Inquiries
          </p>
          <p className="font-serif text-2xl font-medium text-cream mt-1">
            {submissions.length}
          </p>
        </div>
        <div className="p-4 rounded-cards bg-surface/50 border border-border-cork">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
            Active Services
          </p>
          <p className="font-serif text-2xl font-medium text-cream mt-1">
            {services.filter((s) => s.status === 'published').length} / {services.length}
          </p>
        </div>
        <div className="p-4 rounded-cards bg-surface/50 border border-border-cork">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
            Approved Stories
          </p>
          <p className="font-serif text-2xl font-medium text-cream mt-1">
            {testimonials.filter((t) => t.isApproved).length}
          </p>
        </div>
        <div className="p-4 rounded-cards bg-surface/50 border border-border-cork">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cream-muted">
            FAQ Entries
          </p>
          <p className="font-serif text-2xl font-medium text-cream mt-1">
            {faqs.length}
          </p>
        </div>
      </section>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dashed border-border-cork pb-2">
        {[
          { id: 'submissions', label: `Inquiries (${submissions.length})` },
          { id: 'services', label: `Services Manager (${services.length})` },
          { id: 'testimonials', label: `Testimonials (${testimonials.length})` },
          { id: 'faqs', label: `Knowledge Base (${faqs.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === tab.id
                ? 'bg-cream text-void font-bold shadow-sm'
                : 'text-cream-muted hover:text-white'
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
              <span className="font-mono text-cream-muted uppercase text-[10px] mr-2">Filter form:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'consultation', label: 'Consultation' },
                { id: 'organization', label: 'School/Org' },
                { id: 'quick-contact', label: 'Quick' },
                { id: 'careers', label: 'Careers' },
                { id: 'volunteer', label: 'Volunteer' },
                { id: 'testimonial', label: 'Story' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSubmissionFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    submissionFilter === f.id
                      ? 'bg-softblue text-white'
                      : 'bg-surface border border-border-cork text-cream-muted hover:text-cream'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-cream-muted">
              {filteredSubmissions.length} records
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center rounded-cards bg-surface/30 border border-border-cork text-xs text-cream-muted">
              No submissions found for this filter.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-cards border border-border-cork bg-surface/40">
              <table className="w-full text-xs text-left">
                <thead className="bg-void text-cream-muted uppercase tracking-wider font-mono text-[10px] border-b border-border-cork">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Form</th>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-cork">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-surface/70 transition-colors">
                      <td className="p-3.5 whitespace-nowrap text-cream-muted font-mono text-[11px]">
                        {sub.createdAt}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-void border border-border-cork text-softblue text-[9px] font-mono uppercase">
                          {sub.formType}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-cream">
                        {sub.fullName}
                      </td>
                      <td className="p-3.5 text-cream-muted">
                        <div>{sub.email}</div>
                        {sub.phone && <div className="text-[11px] font-mono text-softblue">{sub.phone}</div>}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={sub.status}
                          onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                          className="px-2 py-1 rounded bg-void border border-border-cork text-xs text-cream font-mono"
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
                          className="text-softblue hover:underline font-mono text-xs"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => deleteSubmission(sub.id)}
                          className="text-red-400 hover:text-red-300"
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
            <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
              Services Directory & Curricula
            </h2>

            <button
              onClick={() => setIsAddingService(true)}
              className="rounded-buttons-pill bg-cream text-void hover:bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-cards bg-surface/50 border border-border-cork flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-softblue">{srv.curricula.join(' · ')}</span>
                    <span className={srv.status === 'published' ? 'text-softblue' : 'text-amber-400'}>
                      {srv.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium uppercase tracking-tight text-cream">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-cream-muted line-clamp-2">
                    {srv.whatWeDo}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-border-cork flex items-center justify-between text-xs">
                  <button
                    onClick={() =>
                      updateService(srv.id, {
                        status: srv.status === 'published' ? 'draft' : 'published',
                      })
                    }
                    className="inline-flex items-center gap-1 text-cream-muted hover:text-white font-mono text-[11px] uppercase tracking-wider"
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
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAddingService && (
            <div className="p-6 rounded-cards bg-surface border border-border-cork space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg uppercase tracking-tight font-medium text-cream">
                  Add Academic Service
                </h3>
                <button onClick={() => setIsAddingService(false)} className="text-xs text-cream-muted">
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 text-cream uppercase font-mono text-[10px]">Title *</label>
                  <input
                    type="text"
                    required
                    value={newSrvTitle}
                    onChange={(e) => setNewSrvTitle(e.target.value)}
                    placeholder="Service title..."
                    className="w-full p-2.5 rounded bg-void border border-border-cork text-cream"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-cream uppercase font-mono text-[10px]">What We Do</label>
                  <textarea
                    rows={2}
                    value={newSrvWhat}
                    onChange={(e) => setNewSrvWhat(e.target.value)}
                    placeholder="Syllabus explanation..."
                    className="w-full p-2.5 rounded bg-void border border-border-cork text-cream"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-cream uppercase font-mono text-[10px]">Result</label>
                  <input
                    type="text"
                    value={newSrvResult}
                    onChange={(e) => setNewSrvResult(e.target.value)}
                    placeholder="Target outcome..."
                    className="w-full p-2.5 rounded bg-void border border-border-cork text-cream"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-buttons-pill bg-cream text-void px-6 py-2.5 text-xs uppercase font-medium tracking-wider"
                >
                  Save Service
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
            <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
              Testimonials Moderation
            </h2>

            <button
              onClick={() => setIsAddingTestimonial(true)}
              className="rounded-buttons-pill bg-cream text-void hover:bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Verified Story</span>
            </button>
          </div>

          <div className="space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-cards bg-surface/50 border border-border-cork flex flex-col sm:flex-row items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                    <span className={t.isApproved ? 'text-softblue' : 'text-amber-400'}>
                      {t.isApproved ? 'Approved' : 'Pending Consent Verification'}
                    </span>
                    {t.isFeatured && <span className="text-softblue">• Featured</span>}
                    <span className="text-cream-muted">• {t.serviceTag}</span>
                  </div>

                  <p className="font-serif text-sm italic text-cream leading-relaxed">
                    “{t.quote}”
                  </p>

                  <p className="font-medium text-cream">
                    {t.authorDisplayName} <span className="text-cream-muted font-normal">({t.authorRole})</span>
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <button
                    onClick={() => approveTestimonial(t.id, !t.isApproved)}
                    className="px-3 py-1.5 rounded-full bg-void border border-border-cork text-cream hover:border-cream text-[10px] uppercase font-mono tracking-wider"
                  >
                    {t.isApproved ? 'Unpublish' : 'Approve'}
                  </button>

                  <button
                    onClick={() => toggleFeaturedTestimonial(t.id)}
                    className="text-softblue text-[11px] font-mono hover:underline"
                  >
                    {t.isFeatured ? 'Unfeature' : 'Feature on Home'}
                  </button>

                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAddingTestimonial && (
            <div className="p-6 rounded-cards bg-surface border border-border-cork space-y-3 text-xs">
              <h3 className="font-serif text-base uppercase font-medium text-cream">Add Consent-Verified Story</h3>
              <textarea
                rows={3}
                required
                value={testQuote}
                onChange={(e) => setTestQuote(e.target.value)}
                placeholder="Enter verified reflection..."
                className="w-full p-2.5 rounded bg-void border border-border-cork text-cream"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={testAuthor}
                  onChange={(e) => setTestAuthor(e.target.value)}
                  placeholder="Display name (e.g. Anonymous Parent)..."
                  className="w-full p-2.5 rounded bg-void border border-border-cork text-cream"
                />
                <input
                  type="text"
                  value={testRole}
                  onChange={(e) => setTestRole(e.target.value)}
                  placeholder="Descriptor (e.g. Cambridge AS Parent)..."
                  className="w-full p-2.5 rounded bg-void border border-border-cork text-cream"
                />
              </div>
              <button
                type="button"
                onClick={handleCreateTestimonial}
                className="rounded-buttons-pill bg-cream text-void px-6 py-2.5 text-xs uppercase font-medium tracking-wider"
              >
                Save
              </button>
            </div>
          )}
        </section>
      )}

      {/* 4. FAQS TAB */}
      {activeTab === 'faqs' && (
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-medium uppercase tracking-tight text-cream">
            FAQ Knowledge Base
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 rounded-cards bg-surface/40 border border-border-cork text-xs space-y-1.5">
                <span className="font-medium text-cream text-sm">{faq.question}</span>
                <p className="text-cream-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inspection Modal */}
      {inspectSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-cards bg-surface border border-border-cork p-6 sm:p-8 space-y-4 text-xs text-cream max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setInspectSubmission(null)}
              className="absolute top-5 right-5 w-7 h-7 rounded-full bg-void border border-border-cork text-cream-muted flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <h3 className="font-serif text-xl uppercase font-medium text-cream">{inspectSubmission.fullName}</h3>
            <p className="text-cream-muted font-mono">{inspectSubmission.createdAt} · {inspectSubmission.email}</p>

            {(inspectSubmission.data?.cvUrl || inspectSubmission.data?.attachmentUrl) && (
              <div className="p-3 bg-void/80 rounded border border-softblue/30 flex items-center justify-between">
                <span className="font-mono text-[11px] text-cream-muted truncate max-w-xs">
                  SeaweedFS Stored Document: {inspectSubmission.data.cvFileName || inspectSubmission.data.attachmentName || 'Attachment'}
                </span>
                <a
                  href={inspectSubmission.data.cvUrl || inspectSubmission.data.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded bg-softblue text-white text-[10px] font-mono uppercase tracking-wider hover:bg-softblue/80 transition-colors shrink-0"
                >
                  View on SeaweedFS
                </a>
              </div>
            )}

            <div className="p-4 rounded bg-void border border-border-cork font-mono text-[11px] overflow-x-auto">
              <pre>{JSON.stringify(inspectSubmission.data, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
