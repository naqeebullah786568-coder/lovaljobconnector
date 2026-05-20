import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from '../components/Icons';
import { Job, User } from '../types';
import { mockCategories } from '../data/mockJobs';

interface PostJobProps {
  currentUser: User | null;
  setCurrentPage: (page: string) => void;
  addNewJob: (newJob: Job) => void;
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const PostJob: React.FC<PostJobProps> = ({
  currentUser,
  setCurrentPage,
  addNewJob,
  addToast
}) => {
  // Form values
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('IT & Software');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship'>('Full-time');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill company if employer details exist
  React.useEffect(() => {
    if (currentUser?.role === 'employer') {
      setCompany(currentUser.name);
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !company || !salary || !location || !description || !requirementsInput) {
      addToast('Please complete all fields to publish job listing.', 'warning');
      return;
    }

    setIsSubmitting(true);

    // Parse comma or line-break separated requirements into array
    const requirements = requirementsInput
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    setTimeout(() => {
      const gradientOptions = [
        'bg-gradient-to-br from-blue-400 to-indigo-600',
        'bg-gradient-to-br from-purple-400 to-pink-600',
        'bg-gradient-to-br from-teal-400 to-emerald-600',
        'bg-gradient-to-br from-amber-400 to-orange-600',
        'bg-gradient-to-br from-sky-400 to-blue-700'
      ];
      const randomGradient = gradientOptions[Math.floor(Math.random() * gradientOptions.length)];

      const freshJob: Job = {
        id: `custom-job-${Date.now()}`,
        title,
        company,
        logo: randomGradient,
        salary,
        location,
        category,
        type,
        description,
        requirements: requirements.length > 0 ? requirements : ['Prior field experience.', 'Outstanding communications.'],
        postedAt: 'Just now',
        isFeatured: true // Feature newly submitted job
      };

      addNewJob(freshJob);
      setIsSubmitting(false);
      addToast(`Successfully published "${title}" at ${company}!`, 'success');
      
      // Navigate to find jobs directory
      setCurrentPage('jobs');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Reset
      setTitle('');
      setSalary('');
      setLocation('');
      setDescription('');
      setRequirementsInput('');
    }, 1000);
  };

  const loadDemoData = () => {
    setTitle('Full Stack Web Developer');
    setCompany('Creative Tech Hub');
    setSalary('$85,000 - $105,000 / year');
    setLocation('Downtown Portland / Remote');
    setCategory('IT & Software');
    setType('Remote');
    setDescription('We are looking for a versatile Full Stack Developer to help build clean local software prototypes. In this role you will write code using React, Node.js, and coordinate deployment processes with other remote designers.');
    setRequirementsInput('3+ years of professional full stack experience.\nFluent mastery of React, TypeScript, and SQL databases.\nExcellent written documentation skills.');
    addToast('Demo position specifications populated!', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create Job Listing
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fill out candidate parameters and salary packaging to publish your listing instantly.
          </p>
        </div>
        <button
          type="button"
          onClick={loadDemoData}
          className="px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/20 cursor-pointer transition-all flex items-center gap-1 block"
        >
          <Icon name="PlusCircle" size={13} />
          Autofill Form Demo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form blocks */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* Row 1: Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Project Manager"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Tech Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Salary & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Salary / Compensation *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. $70,000 - $85,000 / yr"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Austin, TX or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Category & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Industry Placement Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-700 dark:text-slate-200 font-sans focus:border-blue-500 transition-colors cursor-pointer"
                >
                  {mockCategories.map((cat) => (
                    <option key={cat.id} className="text-slate-800 bg-white" value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Job Type Class *</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-700 dark:text-slate-200 font-sans focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option className="text-slate-800 bg-white" value="Full-time">Full-time</option>
                  <option className="text-slate-800 bg-white" value="Part-time">Part-time</option>
                  <option className="text-slate-800 bg-white" value="Contract">Contract</option>
                  <option className="text-slate-800 bg-white" value="Remote">Remote</option>
                  <option className="text-slate-800 bg-white" value="Internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Comprehensive Role Description *</label>
              <textarea
                required
                rows={4}
                placeholder="Submit outline detailing company plans, technologies used, or primary responsibilities involved..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Requirements line-separated */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Requirements / Qualifications *</label>
              <textarea
                required
                rows={3}
                placeholder="Write one requirement per line (e.g. '3+ years of React mastery')"
                value={requirementsInput}
                onChange={(e) => setRequirementsInput(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Publishing position...
                </>
              ) : (
                <>
                  Publish Job Opportunity
                  <Icon name="PlusCircle" size={16} />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Info panels */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Publishing Guide</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ensure your listings have honest salaries, localized locations or dynamic remote labels to find the absolute best match candidates.
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Job goes live instantly in the local feed.</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Matches can send resumes securely right in-app.</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Receive instant notification updates of applicants.</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-3xl border border-blue-500/10 space-y-3 text-center">
            <h4 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Premium Listing Booster</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Want to match 3x faster? Boost this post to appear high at the top of organic email reports and local newsletters.
            </p>
            <button
              type="button"
              onClick={() => addToast('Premium Booster is currently in sandbox demo mode!', 'info')}
              className="w-full py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl text-xs font-semibold hover:shadow transition-all cursor-pointer"
            >
              Learn More about Boost
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
