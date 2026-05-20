import React, { useState } from 'react';
import { Icon } from './Icons';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, addToast }) => {
  const [emailValue, setEmailValue] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue) return;
    addToast('Successfully subscribed to job alerts!', 'success');
    setEmailValue('');
  };

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1 - Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white">
                <Icon name="Briefcase" className="w-[20px] h-[20px]" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Local Job
                </span>
                <span className="text-lg font-bold text-white block -mt-1 leading-tight">
                  Connector
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering regional economies by closing the distance between qualified local candidates and thriving community employers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Icon name="Laptop" size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all">
                <Icon name="Globe" size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Icon name="Phone" size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  Home (Dashboard)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('jobs')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  Find Local Jobs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('categories')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  Job Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Job Types */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Search Categories</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleLinkClick('categories')} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Information Technology (IT)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('categories')} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Healthcare & Medical
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('categories')} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Secondary & High Education
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('categories')} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Sales & Marketing
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('categories')} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Remote & Distant Placement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Subscribe to get local job digests delivered straight to your inbox weekly. No spam, ever.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="Enter email address"
                className="flex-grow px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-sans"
              />
              <button
                type="submit"
                className="px-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition-all shadow-md cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            &copy; {currentYear} Local Job Connector Platform. All rights reserved. Registered nonprofit and local placement entity.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Community Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
