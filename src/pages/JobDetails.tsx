import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '../components/Icons';
import { Job } from '../types';

interface JobDetailsProps {
  jobId: string | null;
  jobs: Job[];
  setCurrentPage: (page: string) => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  jobId,
  jobs,
  setCurrentPage,
  savedJobIds,
  toggleSaveJob,
  addToast
}) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCoverText, setApplicantCoverText] = useState('');
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedJob = jobs.find((job) => job.id === jobId) || jobs[0];

  if (!selectedJob) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center font-sans">
        <Icon name="Briefcase" className="mx-auto h-12 w-12 text-slate-400" />
        <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-white">Could not locate job record</h2>
        <button
          onClick={() => setCurrentPage('jobs')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold"
        >
          Return to directory
        </button>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(selectedJob.id);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
      addToast(`Attached resume: ${e.target.files[0].name}`, 'info');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      addToast('Please input both your name and email addresses.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApplyModal(false);
      addToast(`Application successfully sent for "${selectedJob.title}"!`, 'success');
      setApplicantName('');
      setApplicantEmail('');
      setApplicantCoverText('');
      setResumeName(null);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Back button link */}
      <button
        onClick={() => {
          setCurrentPage('jobs');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer mb-6"
      >
        <Icon name="ArrowLeft" size={16} />
        Back to Jobs Listing
      </button>

      {/* Hero Header Jumbotron card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        
        {/* Colorful gradient header background decoration */}
        <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative opacity-90">
          <span className="absolute bottom-3 right-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md">
            Verified Account
          </span>
        </div>

        <div className="p-6 sm:p-8 -mt-10 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Logo Box */}
            <div className={`w-20 h-20 rounded-2xl ${selectedJob.logo} flex items-center justify-center text-white text-3xl font-black shadow-md border-4 border-white dark:border-slate-800 flex-shrink-0`}>
              {selectedJob.company.charAt(0)}
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {selectedJob.title}
              </h1>
              
              <div className="flex items-center gap-2 flex-wrap text-slate-500 dark:text-slate-400 text-sm">
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {selectedJob.company}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={13} />
                  {selectedJob.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex-grow sm:flex-grow-0 flex items-center justify-center ${
                isSaved
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900 text-purple-600 dark:text-purple-400'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600'
              }`}
              title={isSaved ? 'Remove listing from saved bookmarks' : 'Bookmark job listing'}
            >
              <Icon name="Bookmark" size={17} />
            </button>

            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm shadow-md flex-grow text-center cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              Apply to Position
              <Icon name="Send" size={14} />
            </button>
          </div>
        </div>

        {/* Quick parameters bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-slate-100 dark:border-slate-700/60 text-center font-sans">
          <div className="p-4 border-r border-b md:border-b-0 border-slate-100 dark:border-slate-700/40">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Industry Category</span>
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{selectedJob.category}</span>
          </div>
          <div className="p-4 border-r border-b md:border-b-0 border-slate-100 dark:border-slate-700/40">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Employment Class</span>
            <span className="block text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">{selectedJob.type}</span>
          </div>
          <div className="p-4 border-r border-slate-100 dark:border-slate-700/40">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Salary Package</span>
            <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">{selectedJob.salary}</span>
          </div>
          <div className="p-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Lead Registry Date</span>
            <span className="block text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">Listed {selectedJob.postedAt} ago</span>
          </div>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left columns - Job Description and Requirements */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Job Overview */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon name="Info" size={18} className="text-blue-600" />
              Role Description Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {selectedJob.description}
            </p>
          </div>

          {/* Job Requirements */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon name="Award" size={18} className="text-purple-600" />
              Candidate Requirements
            </h2>
            <ul className="space-y-3.5">
              {selectedJob.requirements.map((req, i) => (
                <li key={i} className="flex gap-2.5 items-start text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-100 dark:border-purple-900/60">
                    <Icon name="Check" size={12} />
                  </span>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Responsibilities if defined, otherwise generic community guidelines */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon name="Target" size={18} className="text-emerald-600" />
              Main Daily Responsibilities
            </h2>
            <ul className="space-y-3.5">
              {(selectedJob.responsibilities || [
                'Perform tasks efficiently to maintain customer or community-oriented standards.',
                'Cooperate and communicate effectively with other staff, leads, and clients.',
                'Engage in company meetings and offer unique optimizations to current processes.',
                'Maintain absolute safety guidelines, record bookkeeping, or code standards standard to professional industries.'
              ]).map((resp, i) => (
                <li key={i} className="flex gap-2.5 items-start text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/45 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-100 dark:border-emerald-900/60">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right column - Company Information Cards */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Company Portfolio</h3>
            
            <div className="flex items-center gap-3 py-2">
              <div className={`w-12 h-12 rounded-xl ${selectedJob.logo} flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0`}>
                {selectedJob.company.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{selectedJob.company}</h4>
                <span className="text-xs text-slate-400 font-medium">{selectedJob.category} Provider</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
              This organization is a verified local employer committed to hiring local candidates, maintaining competitive salaries, and fostering diverse and inclusive teams.
            </p>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-700/60 pt-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Icon name="Users" size={14} className="text-slate-400" />
                <span>50 - 150 employees</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Icon name="Globe" size={14} className="text-slate-400" />
                <a href="#" className="text-blue-500 hover:underline">Website Portfolio</a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Icon name="Building" size={14} className="text-slate-400" />
                <span>Incorporated entity</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl border border-purple-500/10 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 mx-auto">
              <Icon name="Heart" size={18} />
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Is this a perfect fit?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Applying via Local Job Connector is 100% free and instantly prioritizes your application with verified regional partners.
            </p>
            <button
              onClick={() => setShowApplyModal(true)}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all cursor-pointer"
            >
              Begin Standard Application
            </button>
          </div>
        </div>

      </div>

      {/* POPUP APPLY MODAL */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              
              <div className="p-6 bg-gradient-to-r from-blue-600 block via-indigo-600 to-purple-600 text-white relative">
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="absolute top-4 right-4 text-white/85 hover:text-white p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Icon name="X" size={18} />
                </button>
                <h3 className="font-extrabold text-lg">Position Application</h3>
                <p className="text-xs text-blue-100 mt-0.5 font-medium">Applying as a Seeker for {selectedJob.title} at {selectedJob.company}</p>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Full Legal Name *</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 transition-colors">
                    <Icon name="User" size={15} className="text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="bg-transparent border-none text-xs text-slate-800 dark:text-white w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Primary Email Address *</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 transition-colors">
                    <Icon name="Mail" size={15} className="text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="elena@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="bg-transparent border-none text-xs text-slate-800 dark:text-white w-full focus:outline-none"
                    />
                  </div>
                </div>

                {/* Resume Upload Drag and select simulation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Attach Resume / CV *</label>
                  <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all cursor-pointer relative">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <Icon name="PlusCircle" className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
                    <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                      {resumeName ? `FILE: ${resumeName}` : 'Upload PDF or Word document'}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Drag and drop files up to 10MB</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Cover message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly introduce yourself, your experience, or why you're a great fit..."
                    value={applicantCoverText}
                    onChange={(e) => setApplicantCoverText(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-purple-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Submitting request...
                    </>
                  ) : (
                    <>
                      Submit Final Application
                      <Icon name="CheckCircle" size={15} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
