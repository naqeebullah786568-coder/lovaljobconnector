export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string; // Tailwind gradient-friendly name or icon name
  salary: string;
  location: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  description: string;
  requirements: string[];
  responsibilities?: string[];
  postedAt: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Lucide icon identifier
  count: number;
  color: string; // Tailwind class color for bg/text
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface User {
  email: string;
  name: string;
  role: 'seeker' | 'employer';
}
