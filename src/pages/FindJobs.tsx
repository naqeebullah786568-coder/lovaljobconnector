import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '../components/Icons';
import { Job, Category } from '../types';
import { mockCategories } from '../data/mockJobs';

interface FindJobsProps {
  jobs: Job[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (catId: string | null) => void;
  selectedJobId: string | null;
  setSelectedJobId: (jobId: string | null) => void;
  searchKeyword: string;
  setSearchKeyword: (kw: string) => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const FindJobs: React.FC<FindJobsProps> = ({
  jobs,
  currentPage,
  setCurrentPage,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedJobId,
  setSelectedJobId,
  searchKeyword,
  setSearchKeyword,
  savedJobIds,
  toggleSaveJob,
  addToast,
}) => {
  // Local state for search & filters
  const [localKeyword, setLocalKeyword] = useState(searchKeyword);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState(selectedCategoryId || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category selection changes from categories page or home header
  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedCategoryName(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  // Sync keyword search changes from home page hero
  useEffect(() => {
    setLocalKeyword(searchKeyword);
  }, [searchKeyword]);

  // Handle clear/reset all filters
  const handleResetFilters = () => {
    setLocalKeyword('');
    setSearchKeyword('');
    setSelectedLocation('');
    setSelectedCategoryName('All');
    setSelectedCategoryId(null);
    setSelectedType('All');
    setShowSavedOnly(false);
    addToast('Filters reset successfully', 'info');
  };

  // Simulate momentary filter loader for high fidelity interaction
  const triggerFilterRefetch = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450000); // Wait, don't let it load forever! Let's do a fast 400ms simulate timeout!
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const locations = Array.from(new Set(jobs.map((j) => j.location.split('/').pop()?.trim() || j.location))).slice(0, 8);

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      !localKeyword ||
      job.title.toLowerCase().includes(localKeyword.toLowerCase()) ||
      job.company.toLowerCase().includes(localKeyword.toLowerCase()) ||
      job.description.toLowerCase().includes(localKeyword.toLowerCase()) ||
      job.requirements.some((r) => r.toLowerCase().includes(localKeyword.toLowerCase()));

    const matchesLocation =
      !selectedLocation ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesCategory =
      selectedCategoryName === 'All' ||
      job.category.toLowerCase() === selectedCategoryName.toLowerCase();

    const matchesType =
      selectedType === 'All' ||
      job.type === selectedType;

    const matchesSavedOnly = !showSavedOnly || savedJobIds.includes(job.id);

    return matchesKeyword && matchesLocation && matchesCategory && matchesType && matchesSavedOnly;
  });

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Header title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Employment Directories
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review latest active opportunities, filter by categories, and apply instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column: Sidebar Filters */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* Row 1: Search & Reset */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
              <span className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                <Icon name="Filter" size={16} className="text-blue-500" />
                Refine Search
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Keyword search input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Job Keyword
              </label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800 focus-within:border-blue-500 transition-colors">
                <Icon name="Search" size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Developer, Admin..."
                  value={localKeyword}
                  onChange={(e) => {
                    setLocalKeyword(e.target.value);
                    triggerFilterRefetch();
                  }}
                  className="bg-transparent border-none text-xs text-slate-800 dark:text-white w-full placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Location selector dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Location
              </label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800 focus-within:border-blue-500 transition-colors">
                <Icon name="MapPin" size={16} className="text-slate-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    triggerFilterRefetch();
                  }}
                  className="bg-transparent border-none text-xs text-slate-800 dark:text-white w-full placeholder-slate-400 focus:outline-none cursor-pointer"
                >
                  <option value="" className="text-slate-800 bg-white dark:bg-slate-800">All Locations</option>
                  <option value="Remote" className="text-slate-800 bg-white dark:bg-slate-800">Remote</option>
                  {locations.map((loc, i) => (
                    <option key={i} value={loc} className="text-slate-800 bg-white dark:bg-slate-800">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Industry Sector
              </label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800 focus-within:border-blue-500 transition-colors">
                <Icon name="Grid" size={16} className="text-slate-400" />
                <select
                  value={selectedCategoryName}
                  onChange={(e) => {
                    setSelectedCategoryName(e.target.value);
                    triggerFilterRefetch();
                  }}
                  className="bg-transparent border-none text-xs text-slate-800 dark:text-white w-full placeholder-slate-400 focus:outline-none cursor-pointer"
                >
                  <option value="All" className="text-slate-800 bg-white dark:bg-slate-800">All Industries</option>
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.name} className="text-slate-800 bg-white dark:bg-slate-800">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Show Bookmarked Toggle */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setShowSavedOnly(!showSavedOnly);
                  triggerFilterRefetch();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  showSavedOnly
                    ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-300 font-bold'
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon name="Bookmark" size={15} />
                  Saved Bookmarks Only
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${showSavedOnly ? 'bg-purple-200 text-purple-800' : 'bg-slate-200 text-slate-600'}`}>
                  {savedJobIds.length}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Right columns: Job cards and Type filter tabs */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Job Type selection horizontal row */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {['All', 'Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => {
                const isActive = selectedType === type;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      triggerFilterRefetch();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      isActive
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            
            <div className="px-3 text-xs text-slate-400 font-bold text-right ml-auto">
              {filteredJobs.length} active leads found
            </div>
          </div>

          {/* Loader or listings list */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 min-h-[300px]">
              <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-4">
                Recalibrating employment maps...
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center p-6 min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center text-slate-400 mb-4 animate-bounce">
                <Icon name="Briefcase" size={28} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">No job opportunities matched</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Try loosening your search keywords, choosing "All Locations", or resetting all active filtering criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Reset Searches
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredJobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  return (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-purple-500/30 dark:hover:border-purple-400/30 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4 flex-grow">
                        <div className={`w-12 h-12 rounded-xl ${job.logo} flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0`}>
                          {job.company.charAt(0)}
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                              {job.company}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                            <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                              {job.type}
                            </span>
                            <span className="text-xs text-slate-400">
                              Posted {job.postedAt}
                            </span>
                          </div>
                          
                          <h3
                            onClick={() => handleJobClick(job.id)}
                            className="font-bold text-slate-800 dark:text-white text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                          >
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Icon name="MapPin" size={13} className="text-slate-400" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="DollarSign" size={13} className="text-slate-400" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Briefcase" size={13} className="text-slate-400" />
                              {job.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action parameters */}
                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900 text-purple-600 dark:text-purple-400'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600'
                          }`}
                          title={isSaved ? 'Unsave' : 'Save Job opportunity'}
                        >
                          <Icon name="Bookmark" size={15} />
                        </button>

                        <button
                          onClick={() => handleJobClick(job.id)}
                          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1"
                        >
                          View Details
                          <Icon name="ChevronRight" size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

        </div>

      </div>

    </div>
  );
};
