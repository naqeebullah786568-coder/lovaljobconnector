import React from 'react';
import {
  Briefcase,
  Search,
  Menu,
  X,
  Bookmark,
  MapPin,
  DollarSign,
  PlusCircle,
  Grid,
  Info,
  Phone,
  User,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  Filter,
  ArrowLeft,
  CheckCircle,
  Building,
  Laptop,
  HeartPulse,
  GraduationCap,
  TrendingUp,
  Megaphone,
  Globe,
  Star,
  Send,
  Lock,
  Mail,
  Compass,
  Bell,
  Award,
  Users,
  Target,
  Heart,
  Calendar,
  Eye,
  Check
} from 'lucide-react';

const icons = {
  Briefcase,
  Search,
  Menu,
  X,
  Bookmark,
  MapPin,
  DollarSign,
  PlusCircle,
  Grid,
  Info,
  Phone,
  User,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  Filter,
  ArrowLeft,
  CheckCircle,
  Building,
  Laptop,
  HeartPulse,
  GraduationCap,
  TrendingUp,
  Megaphone,
  Globe,
  Star,
  Send,
  Lock,
  Mail,
  Compass,
  Bell,
  Award,
  Users,
  Target,
  Heart,
  Calendar,
  Eye,
  Check
};

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => {
  const IconComponent = icons[name];
  if (!IconComponent) {
    return <Briefcase className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
};
