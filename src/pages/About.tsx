import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '../components/Icons';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Nora Alston',
      role: 'Executive Director',
      bio: 'Former city planning advisor dedicated to regional community empowerment initiatives.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Julian Vance',
      role: 'Head of Employer Outreach',
      bio: 'Connecting local small business owners and enterprise hiring managers with optimal tech tools.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Marta Rodriguez',
      role: 'Seeker Advocacy Lead',
      bio: 'Fostering resume development courses and job readiness training seminars across the county.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    }
  ];

  const milestones = [
    { year: '2024', title: 'Platform Conception', desc: 'Conceived by local community advocates looking to resolve inner-city employment deserts.' },
    { year: '2025', title: '1,000 Matches', desc: 'Celebrated matching our thousandth applicant with an incredible nearby logistics firm.' },
    { year: '2026', title: 'Regional Expansion', desc: 'Partnered with city councils to launch custom government training programs.' }
  ];

  return (
    <div className="space-y-20 pb-20 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100/60 dark:from-slate-900/40 dark:to-slate-900 py-16 md:py-24 border-b border-slate-100 dark:border-slate-800 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-900/40">
            About Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Fostering Proximity and <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Community Prosperity
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Local Job Connector was built on a simple premise: a community thrives when its residents work locally, decreasing commute stress and retaining wealth in the local ecosystem.
          </p>
        </div>
      </section>

      {/* 2. THE CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/35 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Icon name="Compass" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Absolute Accessibility</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
              No technical paywalls or subscription limits for seekers. We believe matching is a basic civic benefit.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/35 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Icon name="Users" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Strict Local Trust</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
              Every job listing is curated and verified by local entity checks. No phishing, spam, or scams allowed.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/35 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <Icon name="Award" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Economic Impact</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
              Helping businesses fill vacant roles 3x faster by aligning parameters to candidate distances.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE / MILESTONES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Our Foundations Timeline</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">A brief chronicle detailing our rapid regional deployment.</p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 space-y-10 max-w-2xl mx-auto">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative">
              {/* Dot decoration */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4.5 h-4.5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm" />
              
              <div className="space-y-1">
                <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono">
                  {m.year}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-1">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Community Team</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">People Behind the Portal</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Empathetic specialists building bridges across regional talent groups.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-4"
            >
              <img
                referrerPolicy="no-referrer"
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-indigo-500/10 shadow-sm"
              />
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {member.name}
                </h3>
                <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400">
                  {member.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};
