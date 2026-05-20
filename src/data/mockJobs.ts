import { Job, Category, Testimonial } from '../types';

export const mockCategories: Category[] = [
  { id: 'it', name: 'IT & Software', iconName: 'Laptop', count: 24, color: 'from-blue-500 to-indigo-500' },
  { id: 'healthcare', name: 'Healthcare', iconName: 'HeartPulse', count: 18, color: 'from-purple-500 to-pink-500' },
  { id: 'education', name: 'Education', iconName: 'GraduationCap', count: 12, color: 'from-emerald-500 to-teal-500' },
  { id: 'sales', name: 'Sales & Retail', iconName: 'TrendingUp', count: 31, color: 'from-amber-600 to-orange-500' },
  { id: 'marketing', name: 'Marketing', iconName: 'Megaphone', count: 15, color: 'from-rose-500 to-red-500' },
  { id: 'government', name: 'Government', iconName: 'Building', count: 8, color: 'from-cyan-600 to-blue-500' },
  { id: 'remote', name: 'Remote Jobs', iconName: 'Globe', count: 42, color: 'from-violet-600 to-fuchsia-500' },
];

export const initialMockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    company: 'Apex Tech Solutions',
    logo: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    salary: '$110,000 - $140,000 / year',
    location: 'Remote / Seattle, WA',
    category: 'IT & Software',
    type: 'Remote',
    description: 'We are seeking a highly motivated Senior Frontend Engineer to design and implement exceptional user experiences for our enterprise software suite. In this role, you will work closely with product managers, UX designers, and backend teams to build highly performant React applications.',
    requirements: [
      '5+ years of software engineering experience focusing on frontend web development.',
      'Expert knowledge of React, TypeScript, HTML5, CSS3, and styled-components or Tailwind CSS.',
      'Proven experience building responsive, accessible (WCAG), and state-managed web apps.',
      'Excellent collaborative and documentation skills.'
    ],
    responsibilities: [
      'Lead frontend architecture decisions and promote clean, modular code practices.',
      'Optimize web features for maximum speed, security, and scalability.',
      'Mentor junior team members and conduct code reviews.'
    ],
    postedAt: '2 hours ago',
    isFeatured: true,
  },
  {
    id: 'job-2',
    title: 'Pediatric General Nurse',
    company: 'St. Mary Community Hospital',
    logo: 'bg-gradient-to-br from-pink-400 to-rose-600',
    salary: '$75,000 - $90,000 / year',
    location: 'Downtown Medical District, Austin',
    category: 'Healthcare',
    type: 'Full-time',
    description: 'Come join our passionate and caring pediatric care unit! St. Mary Hospital is dedicated to providing superior clinical care to children and support for families. This role involves administering direct nursing care, cooperating with pediatricians, and fostering a safe, comforting environment for children during treatment.',
    requirements: [
      'Registered Nurse (RN) certification with Active State License.',
      'At least 2 years of clinical experience in a pediatric setting.',
      'BLS and PALS certifications required.',
      'Warm, friendly demeanor with parent relations experience.'
    ],
    responsibilities: [
      'Assess pediatric patient conditions, record medical histories, and administer prescribed meds.',
      'Guide patients and parents regarding post-treatment home care guidelines.',
      'Maintain diligent safety and clean room sterilization standards.'
    ],
    postedAt: '1 day ago',
    isFeatured: true,
  },
  {
    id: 'job-3',
    title: 'High School Mathematics Teacher',
    company: 'Oakridge School District',
    logo: 'bg-gradient-to-br from-teal-400 to-emerald-600',
    salary: '$55,000 - $68,000 / year',
    location: 'Oakridge, OR',
    category: 'Education',
    type: 'Full-time',
    description: 'Oakridge High School invites qualified educators to apply for our Mathematics Teacher role for the upcoming academic semester. We are looking for an innovative teacher who can make algebra, geometry, and calculus exciting, understandable, and accessible to a diverse group of secondary students.',
    requirements: [
      'State-certified Secondary Mathematics Education Teaching License.',
      'Bachelor’s degree in Mathematics, Education, or related analytical field.',
      'Prior classroom teaching experience or student preaching portfolio is highly valued.',
      'Enthusiasm for organizing math competitions or student mentoring'
    ],
    responsibilities: [
      'Plan, schedule, and execute comprehensive daily lesson plans adhering to state educational benchmarks.',
      'Create a supportive, exciting classroom environment encouraging participation.',
      'Evaluate student progress through tests, homework assignments, and term projects.'
    ],
    postedAt: '3 days ago',
    isFeatured: true,
  },
  {
    id: 'job-4',
    title: 'Corporate Account Executive',
    company: 'Veritas Sales Group',
    logo: 'bg-gradient-to-br from-amber-400 to-orange-600',
    salary: '$60,000Base + Uncapped Commission ($95k OTE)',
    location: 'Chicago, IL',
    category: 'Sales & Retail',
    type: 'Contract',
    description: 'Veritas Sales Group is expanding our mid-market corporate sales team. We provide state-of-the-art office workspace systems to regional business firms. We are looking for a tenacious sales professional focused on strategic lead prospecting, outbound campaigns, and custom solution pitches.',
    requirements: [
      '3+ years of professional B2B software or equipment sales experience.',
      'Demonstrated track record of consistently exceeding monthly outbound revenue quotas.',
      'Proficiency with CRM systems like Salesforce and pipeline planning tools.',
      'Outstanding public speaking, negotiation, and closing skills.'
    ],
    responsibilities: [
      'Identify and generate prospective corporate accounts via hyper-focused outbound approaches.',
      'Coordinate and pitch tailored service solutions to stakeholders and purchasing executives.',
      'Actively manage the customer pipeline through to final handshake.'
    ],
    postedAt: '4 days ago',
    isFeatured: false,
  },
  {
    id: 'job-5',
    title: 'Digital Marketing Strategist',
    company: 'Luminate Digital Studio',
    logo: 'bg-gradient-to-br from-purple-400 to-indigo-600',
    salary: '$65,000 - $80,000 / year',
    location: 'Boston, MA',
    category: 'Marketing',
    type: 'Full-time',
    description: 'Luminate Digital Studio is on the lookout for a creative and data-driven Digital Marketing Strategist. You will manage organic and paid media search campaigns, lead social media planning, and compile analytics reports for our portfolio of local and global clients.',
    requirements: [
      'Bachelor’s/Associate degree in Marketing, PR, Communications, or Business.',
      'Proven hands-on experience running Google Ads and Meta Ads campaigns.',
      'Analytical proficiency using Google Analytics 4 and SEO audit software.',
      'Strong copywriting skills for various ad and content layouts.'
    ],
    responsibilities: [
      'Formulate and execute custom multi-channel organic and paid ad strategies.',
      'Perform rigorous target keyword research and write engaging marketing collateral.',
      'Present monthly growth and campaign efficiency reports to clients.'
    ],
    postedAt: '1 week ago',
    isFeatured: false,
  },
  {
    id: 'job-6',
    title: 'County Registry Administrator',
    company: 'State Civil Registry Department',
    logo: 'bg-gradient-to-br from-sky-400 to-blue-700',
    salary: '$50,000 - $62,000 / year',
    location: 'County Court House, Salem',
    category: 'Government',
    type: 'Full-time',
    description: 'The Civil Registry Department is seeking a specialized Clerk and Administrator. This community-first role focuses on processing state licensing applications, issuing official regulatory documents, answering resident questions, and managing local compliance files.',
    requirements: [
      'Associate degree or higher with coursework in public administration or related subjects.',
      'Prior public service, notary public, or registrar database management background.',
      'High attention to detail and rigorous compliance tracking ability.',
      'Friendly conversational manner dealing with the general public.'
    ],
    responsibilities: [
      'Directly process, file, and distribute community licenses, notary declarations, and civil certs.',
      'Maintain structured archives in strict compliance with registry privacy rules.',
      'Resolve resident queries at front-end service counters and via email.'
    ],
    postedAt: '2 weeks ago',
    isFeatured: false,
  },
  {
    id: 'job-7',
    title: 'Patient Care Coordinator',
    company: 'Lakeside Health Clinic',
    logo: 'bg-gradient-to-br from-emerald-400 to-cyan-600',
    salary: '$22 - $28 / hour',
    location: 'Lakeside, MN',
    category: 'Healthcare',
    type: 'Part-time',
    description: 'Lakeside Health Clinic is seeking an empathetic Care Coordinator to support our community wellness programs. You will be responsible for welcoming patients, managing specialized medical appointments, and coordinating insurance verification documents.',
    requirements: [
      'High school diploma or GED equivalent; healthcare admin certificates preferred.',
      'At least 1 year of medical front-desk reception or insurance billing experience.',
      'Proficiency in medical records management systems (EHR).',
      'Warm and patient-first telephone and email communications.'
    ],
    responsibilities: [
      'Coordinate daily patient scheduling and manage clinic phone lines.',
      'Verify insurance coverages, process co-payments, and register incoming records.',
      'Facilitate warm and welcoming clinic experiences for residents.'
    ],
    postedAt: '5 days ago',
    isFeatured: false,
  },
  {
    id: 'job-8',
    title: 'Lead UI/UX Designer',
    company: 'Innovate Studio Corp',
    logo: 'bg-gradient-to-br from-violet-400 to-purple-800',
    salary: '$95,000 - $120,000 / year',
    location: 'Remote',
    category: 'IT & Software',
    type: 'Remote',
    description: 'Innovate Studio is a community-first remote product studio. We create digital platforms for cities, schools, and non-profits. We need an experienced UI/UX Designer to lead the end-to-end craft of wireframes, prototypes, user journeys, and polished visual systems.',
    requirements: [
      '4+ years of professional digital UX design experience with a robust online portfolio.',
      'Superb mastery of Figma, including advanced prototyping and tokenized component systems.',
      'Solid user research skills, synthesis models, and UI layout foundations.',
      'Familiarity with Tailwind CSS parameters is a major plus.'
    ],
    responsibilities: [
      'Translate product parameters into high-fidelity mockups and interaction patterns.',
      'Conduct community research workshops with end-users and write feedback surveys.',
      'Coordinate with engineering developers to ensure perfect visual implementation.'
    ],
    postedAt: '3 hours ago',
    isFeatured: true,
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'Elementary Teacher',
    company: 'Riverdale Academy',
    content: 'Within three days of signing up for Local Job Connector, I had two interviews lined up with schools right in my district. I landed an amazing role five minutes away from my house. The platform was incredibly simple and clear!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    role: 'Hiring Manager',
    company: 'Apex Tech Solutions',
    content: 'We spent weeks posting on massive, global job boards and got hundreds of irrelevant resumes. Switching to Local Job Connector immediately connected us with qualified local specialists who were ready to start immediately. Excellent experience!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Marketing Associate',
    company: 'Luminate Digital',
    content: 'The "Save Job" feature allowed me to bookmark interesting roles on my phone during my commute and apply with my polished resume later in the evening. I highly recommend Local Job Connector for anyone seeking regional roles!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  }
];
