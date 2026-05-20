import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from '../components/Icons';

interface ContactProps {
  addToast: (text: string, type: 'success' | 'info' | 'warning') => void;
}

export const Contact: React.FC<ContactProps> = ({ addToast }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<'east' | 'west' | 'central'>('central');

  const offices = {
    central: {
      name: 'Downtown Civic Headquarters',
      address: '742 State St, Central District, Austin, TX',
      phone: '+1 (512) 555-0190',
      hours: 'Mon - Fri (8:00 AM - 5:00 PM)'
    },
    east: {
      name: 'East-Side Employment Hub',
      address: '1090 Airport Blvd, Suite C, Austin, TX',
      phone: '+1 (512) 555-0143',
      hours: 'Mon, Wed, Fri (9:00 AM - 4:00 PM)'
    },
    west: {
      name: 'West-Verge Industry Center',
      address: '4302 Bee Caves Rd, Austin, TX',
      phone: '+1 (512) 555-0111',
      hours: 'Tue, Thu (10:00 AM - 6:00 PM)'
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !message) {
      addToast('Please complete all form fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(`Inquiry regarding "${subject || 'General Assistance'}" received! We will reply via ${userEmail} within 24 hours.`, 'success');
      setUserName('');
      setUserEmail('');
      setSubject('');
      setMessage('');
    }, 1100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Page Title */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full border border-indigo-200/50 dark:border-indigo-900/40">
          Support Registry
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
          Get in Touch With Us
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Send us feature feedback, report an employer listing, or seek vocational assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left columns form - span 7 */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send Support Request</h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Inquiry Subject (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Account activation assistance"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Detailed Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Describe your inquiry or support requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none text-xs text-slate-800 dark:text-white font-sans focus:border-purple-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Sending secure request...
                </>
              ) : (
                <>
                  Submit Query
                  <Icon name="Send" size={15} />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right columns maps & directions - span 5 */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick contact numbers card */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Channels</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Telephone Hotlines</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 font-mono">{offices[selectedOffice].phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Support Emails</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">support@localjobconnector.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED MAP SIMULATION - High Fidelity Interaction */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Interactive County Map</h3>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400 animate-pulse">● Live status</span>
            </div>

            {/* Interactive office select tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              {(['central', 'east', 'west'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedOffice(key)}
                  className={`py-2 text-[10px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                    selectedOffice === key
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {key} Office
                </button>
              ))}
            </div>

            {/* Responsive map canvas / SVG graphic */}
            <div className="relative h-44 rounded-2xl bg-indigo-50 dark:bg-slate-900/80 overflow-hidden border border-slate-100 dark:border-slate-800 flex items-center justify-center text-center p-4">
              
              {/* Fake geometric county grid lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Decorative location pins on SVG */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-dashed border-blue-500/20 pointer-events-none animate-spin-slow" />
              
              {/* Dynamically sliding active marker based on selectedOffice */}
              <motion.div
                animate={{
                  x: selectedOffice === 'central' ? 0 : selectedOffice === 'east' ? 70 : -70,
                  y: selectedOffice === 'central' ? -10 : selectedOffice === 'east' ? 20 : 15
                }}
                className="absolute z-10 flex flex-col items-center cursor-pointer"
              >
                <div className="p-1 px-2.5 rounded-full bg-slate-950 text-white text-[8px] font-bold shadow-md whitespace-nowrap mb-1">
                  Active Locator
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-600/35 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border border-white" />
                </div>
              </motion.div>

              {/* Central base marker decoration */}
              <div className="absolute left-1/3 top-1/4 opacity-40">
                <Icon name="MapPin" size={14} className="text-slate-400" />
              </div>
              <div className="absolute right-1/4 top-1/5 opacity-40">
                <Icon name="MapPin" size={14} className="text-slate-400" />
              </div>

              {/* Waterway / lake visual decoration */}
              <div className="absolute bottom-4 left-6 w-32 h-3 bg-blue-400/20 rounded-full blur pointer-events-none transform -rotate-12" />

              <span className="absolute bottom-2 left-2 text-[8px] font-bold text-slate-400">
                Austin Metro Coordinate Layout Simulation
              </span>
            </div>

            {/* Selected Office Details */}
            <div className="space-y-1 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                {offices[selectedOffice].name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                {offices[selectedOffice].address}
              </p>
              <div className="text-[10px] font-semibold text-indigo-500 mt-2 block">
                Hours: {offices[selectedOffice].hours}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
