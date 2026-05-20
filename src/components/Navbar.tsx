import React from 'react';
import { motion } from 'motion/react';
import { Icon } from './Icons';
import { User } from '../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedCategoryId: (catId: string | null) => void;
  setSelectedJobId: (jobId: string | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  savedJobsCount: number;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  setSelectedCategoryId,
  setSelectedJobId,
  currentUser,
  setCurrentUser,
  savedJobsCount,
  darkMode,
  setDarkMode,
  addToast
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'jobs', label: 'Find Jobs' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === 'categories') {
      setSelectedCategoryId(null);
    }
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    addToast('Logged out successfully', 'info');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <Icon name="Briefcase" className="w-[20px] h-[20px]" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Local Job
              </span>
              <span className="text-lg font-bold text-slate-800 dark:text-white block -mt-1 leading-tight">
                Connector
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={18} />
            </button>

            {/* Saved Jobs Bookmark */}
            <button
              onClick={() => handleNavClick('jobs')}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer relative"
              title="Saved Jobs"
            >
              <Icon name="Bookmark" size={18} />
              {savedJobsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-extrabold text-white animate-pulse">
                  {savedJobsCount}
                </span>
              )}
            </button>

            {/* User State */}
            {currentUser ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400">
                    {currentUser.role === 'employer' ? 'Employer' : 'Seeker'}
                  </span>
                </div>
                {currentUser.role === 'employer' && (
                  <button
                    onClick={() => handleNavClick('post-job')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Icon name="PlusCircle" size={14} />
                    Post Job
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer"
                  title="Log out"
                >
                  <Icon name="LogOut" size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handleNavClick('auth')}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    handleNavClick('auth');
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Actions & Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={18} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dynamic Slideout Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          <div className="px-4 py-3 space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Separator */}
            <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

            {/* User details on Mobile */}
            {currentUser ? (
              <div className="space-y-2 py-2 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Icon name="User" size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {currentUser.role}
                    </div>
                  </div>
                </div>
                {currentUser.role === 'employer' && (
                  <button
                    onClick={() => handleNavClick('post-job')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Icon name="PlusCircle" size={16} />
                    Post a Job opportunity
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100"
                >
                  <Icon name="LogOut" size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 p-2">
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 text-center"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};
