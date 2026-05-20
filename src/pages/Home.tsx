import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Icon, IconName } from '../components/Icons';
import { Job, Category } from '../types';
import { mockCategories, mockTestimonials } from '../data/mockJobs';

interface HomeProps {
  jobs: Job[];
  setCurrentPage: (page: string) => void;
  setSelectedCategoryId: (catId: string | null) => void;
  setSelectedJobId: (jobId: string | null) => void;
  setSearchKeyword: (kw: string) => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const Home: React.FC<HomeProps> = ({
  jobs,
  setCurrentPage,
  setSelectedCategoryId,
  setSelectedJobId,
  setSearchKeyword,
  savedJobIds,
  toggleSaveJob,
  addToast
}) => {
  const [localKeyword, setLocalKeyword] = useState('');
  const [localLocation, setLocalLocation] = useState('');

  // Handle Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(localKeyword);
    setCurrentPage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast(`Showing roles matching "${localKeyword || 'all'}"`, 'info');
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategoryId(catName);
    setCurrentPage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobDetailsClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredJobs = jobs.filter((job) => job.isFeatured).slice(0, 4);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="space-y-20 pb-20 font-sans transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/40 py-20 lg:py-28 rounded-b-[2.5rem] border-b border-slate-100 dark:border-slate-800">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Tagline */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 uppercase tracking-widest mx-auto">
              <Icon name="Compass" size={12} className="animate-spin-slow text-blue-500" />
              Community Service Portal
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
              Bridging the Gap Between <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Local Talent
              </span>{' '}
              and Thriving Businesses
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Find qualified local work, high-salary opportunities, or list open jobs to connect with skilled candidates right inside your neighborhood.
            </p>
          </motion.div>

          {/* Search Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white dark:bg-slate-800 p-2 rounded-2xl sm:rounded-full shadow-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-2 px-4 py-2 w-full sm:w-auto flex-grow border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-700">
                <Icon name="Search" className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or skills..."
                  value={localKeyword}
                  onChange={(e) => setLocalKeyword(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-sm font-sans"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 w-full sm:w-auto flex-grow">
                <Icon name="MapPin" className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Neighborhood, city, or Remote"
                  value={localLocation}
                  onChange={(e) => setLocalLocation(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-sm font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl sm:rounded-full font-semibold text-sm transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-2"
              >
                Find Jobs
                <Icon name="ChevronRight" size={16} />
              </button>
            </form>
          </motion.div>

          {/* Featured stats highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>150+ Open Openings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>45 Verified Employers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>1.2k Successful Matches</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK ACTION CARD BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/35 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Briefcase" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Looking for Work?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Browse localized part-time, remote, or full-time opportunities that match your distinct skill category.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('jobs')}
              className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all text-left cursor-pointer uppercase tracking-wider"
            >
              Explore Job Listings <Icon name="ChevronRight" size={14} />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/35 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Icon name="PlusCircle" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Are You an Employer?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Publish openings for your local business or remote enterprise quickly and get matches immediately.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('post-job')}
              className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-purple-600 dark:text-purple-400 hover:gap-2.5 transition-all text-left cursor-pointer uppercase tracking-wider"
            >
              Post a Position <Icon name="ChevronRight" size={14} />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all group sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/35 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Compass" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Explore Categories</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Review available sub-specialties including IT, Government services, Secondary Education, and healthcare.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('categories')}
              className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:gap-2.5 transition-all text-left cursor-pointer uppercase tracking-wider"
            >
              View Sectors <Icon name="ChevronRight" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Sectors & Industries
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Browse Jobs by Category
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('categories')}
            className="flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors cursor-pointer"
          >
            See All Categories <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {mockCategories.slice(0, 4).map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              onClick={() => handleCategoryClick(cat.name)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group cursor-pointer text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-all shadow-md`}>
                <Icon name={cat.iconName as IconName} size={22} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {cat.count} open active positions
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. FEATURED JOBS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
              Top Picks
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Job Openings
            </h2>
          </div>
          <button
            onClick={() => {
              setSearchKeyword('');
              setCurrentPage('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
          >
            Browse All Listings <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featuredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/40 dark:hover:border-purple-400/40 hover:shadow-xl transition-all relative flex flex-col justify-between"
              >
                <div>
                  {/* Top line with logo & type badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${job.logo} flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0`}>
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {job.company}
                        </h4>
                        <h3 className="font-bold text-slate-800 dark:text-white text-base mt-0.5 line-clamp-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer" onClick={() => handleJobDetailsClick(job.id)}>
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900 text-purple-600 dark:text-purple-400'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Job'}
                    >
                      <Icon name="Bookmark" size={16} />
                    </button>
                  </div>

                  {/* Badges / locations */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <Icon name="MapPin" size={12} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <Icon name="DollarSign" size={12} />
                      {job.salary}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-6">
                  <span className="text-xs text-slate-400 font-medium">
                    Posted {job.postedAt}
                  </span>
                  <button
                    onClick={() => handleJobDetailsClick(job.id)}
                    className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700/80 hover:border-transparent flex items-center gap-1 cursor-pointer"
                  >
                    View Details
                    <Icon name="ChevronRight" size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Success Stories
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              What Our Community Says
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Discover how Local Job Connector is helping job seekers secure work nearby and helping firms recruit vetted regional staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex gap-0.5 text-amber-500 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>

                  <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed font-serif">
                    “{t.content}”
                  </p>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60">
                  <img
                    referrerPolicy="no-referrer"
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      {t.name}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                      {t.role} {t.company && `at ${t.company}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 md:p-16 relative overflow-hidden text-center text-white shadow-2xl">
          {/* Subtle design elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Expand Your Future?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Create your free Seeker account or Employer company file to kick off your local recruitment drive right now.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setCurrentPage('auth');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-600 font-bold text-sm rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Create Account
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-blue-700/40 hover:bg-blue-700/60 text-white font-bold text-sm rounded-xl transition-all border border-blue-400/40 cursor-pointer"
              >
                Read Mission
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
