import React from 'react';
import { motion } from 'motion/react';
import { Icon, IconName } from '../components/Icons';
import { mockCategories } from '../data/mockJobs';

interface CategoriesProps {
  setCurrentPage: (page: string) => void;
  setSelectedCategoryId: (catId: string | null) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  setCurrentPage,
  setSelectedCategoryId
}) => {
  const handleCategoryClick = (catName: string) => {
    setSelectedCategoryId(catName);
    setCurrentPage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Page Title */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-900/40 select-none">
          Sector Catalogs
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
          Explore by Industry Sector
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Click any industry below to search verified jobs categorized by experienced local recruiters.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {mockCategories.map((cat) => (
          <motion.div
            key={cat.id}
            variants={itemVariants}
            onClick={() => handleCategoryClick(cat.name)}
            className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all group cursor-pointer flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md`}>
                <Icon name={cat.iconName as IconName} size={22} />
              </div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Empower your skills in {cat.name} and meet specialized community recruiters.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700/60 pt-4 mt-6">
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 px-2.5 py-1 rounded-lg">
                {cat.count} openings
              </span>
              <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1.5 transition-all flex items-center gap-0.5">
                Explore
                <Icon name="ChevronRight" size={12} />
              </span>
            </div>
          </motion.div>
        ))}

        {/* Premium booster category placement */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-slate-800 text-white flex flex-col justify-between min-h-[180px] xl:col-span-1"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400 mb-4">
              <Icon name="Star" size={22} className="fill-current" />
            </div>
            <h3 className="font-extrabold text-base">Request Custom Industry</h3>
            <p className="text-xs text-slate-300 mt-1 lines-clamp-3 leading-relaxed">
              Don't see your specific expertise listed? Submit a request to help us onboard new regional employers.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full mt-6 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition-all border border-white/10 cursor-pointer flex items-center justify-center gap-1"
          >
            Contact Registrar
            <Icon name="ChevronRight" size={12} />
          </button>
        </motion.div>
      </motion.div>

    </div>
  );
};
