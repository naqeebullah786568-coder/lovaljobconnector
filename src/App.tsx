import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { initialMockJobs } from './data/mockJobs';
import { Job, User } from './types';

// Page imports
import { Home } from './pages/Home';
import { FindJobs } from './pages/FindJobs';
import { JobDetails } from './pages/JobDetails';
import { PostJob } from './pages/PostJob';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';

export default function App() {
  // Navigation states
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return localStorage.getItem('localJobConnector_page') || 'home';
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(() => {
    return localStorage.getItem('localJobConnector_selectedJobId') || null;
  });
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Core application states
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('localJobConnector_darkMode') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('localJobConnector_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Initialize standard bookmarks to look warm and alive
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('localJobConnector_savedJobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-3'];
  });

  // Client jobs database state to allow employers to post roles instantly
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('localJobConnector_customJobs');
    if (saved) {
      const parsed: Job[] = JSON.parse(saved);
      return [...parsed, ...initialMockJobs];
    }
    return initialMockJobs;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent local storage syncs
  useEffect(() => {
    localStorage.setItem('localJobConnector_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedJobId) {
      localStorage.setItem('localJobConnector_selectedJobId', selectedJobId);
    } else {
      localStorage.removeItem('localJobConnector_selectedJobId');
    }
  }, [selectedJobId]);

  useEffect(() => {
    localStorage.setItem('localJobConnector_darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('localJobConnector_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('localJobConnector_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('localJobConnector_savedJobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Toast utilities
  const addToast = (text: string, type: 'success' | 'info' | 'warning') => {
    const freshToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text,
      type
    };
    setToasts((prev) => [...prev, freshToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Saved Jobs logic
  const toggleSaveJob = (jobId: string) => {
    const activeJob = jobs.find((j) => j.id === jobId);
    if (!activeJob) return;

    if (savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      addToast(`Removed "${activeJob.title}" from saved bookmarks.`, 'warning');
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
      addToast(`Saved "${activeJob.title}" to bookmarks!`, 'success');
    }
  };

  // Add Employer's newly self-posted job opening
  const addNewJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    
    // Persist custom employer jobs separately to avoid wiping mock listings
    const saved = localStorage.getItem('localJobConnector_customJobs');
    const existingCustom: Job[] = saved ? JSON.parse(saved) : [];
    localStorage.setItem('localJobConnector_customJobs', JSON.stringify([newJob, ...existingCustom]));
  };

  // Dynamic Page Routing
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            jobs={jobs}
            setCurrentPage={setCurrentPage}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedJobId={setSelectedJobId}
            setSearchKeyword={setSearchKeyword}
            savedJobIds={savedJobIds}
            toggleSaveJob={toggleSaveJob}
            addToast={addToast}
          />
        );
      case 'jobs':
        return (
          <FindJobs
            jobs={jobs}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            selectedJobId={selectedJobId}
            setSelectedJobId={setSelectedJobId}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            savedJobIds={savedJobIds}
            toggleSaveJob={toggleSaveJob}
            addToast={addToast}
          />
        );
      case 'job-details':
        return (
          <JobDetails
            jobId={selectedJobId}
            jobs={jobs}
            setCurrentPage={setCurrentPage}
            savedJobIds={savedJobIds}
            toggleSaveJob={toggleSaveJob}
            addToast={addToast}
          />
        );
      case 'post-job':
        return (
          <PostJob
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            addNewJob={addNewJob}
            addToast={addToast}
          />
        );
      case 'categories':
        return (
          <Categories
            setCurrentPage={setCurrentPage}
            setSelectedCategoryId={setSelectedCategoryId}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact addToast={addToast} />;
      case 'auth':
        return (
          <Auth
            setCurrentPage={setCurrentPage}
            setCurrentUser={setCurrentUser}
            addToast={addToast}
          />
        );
      default:
        return (
          <Home
            jobs={jobs}
            setCurrentPage={setCurrentPage}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedJobId={setSelectedJobId}
            setSearchKeyword={setSearchKeyword}
            savedJobIds={savedJobIds}
            toggleSaveJob={toggleSaveJob}
            addToast={addToast}
          />
        );
    }
  };

  return (
    <div className={darkMode ? 'dark bg-slate-900 min-h-screen' : 'bg-slate-50 min-h-screen'}>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
        
        {/* Sticky responsive header navigation */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedCategoryId={setSelectedCategoryId}
          setSelectedJobId={setSelectedJobId}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          savedJobsCount={savedJobIds.length}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          addToast={addToast}
        />

        {/* Global animated transition page wrapper */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Cohesive modern footer component */}
        <Footer setCurrentPage={setCurrentPage} addToast={addToast} />

        {/* Dynamic dismissable toast container alerts */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />

      </div>
    </div>
  );
}
