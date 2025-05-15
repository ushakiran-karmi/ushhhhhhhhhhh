// User types
export enum UserRole {
  CLIENT = 'client',
  WRITER = 'writer',
  SUPERVISOR = 'supervisor'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token: string;
}

// Resume category types
export enum ResumeCategory {
  IT = 'IT',
  GENERAL = 'NON_IT_GENERAL',
  HEALTHCARE = 'HEALTHCARE',
  FINANCE = 'FINANCE',
  LEGAL = 'LEGAL',
  EDUCATION = 'EDUCATION',
  ENGINEERING = 'ENGINEERING',
  CREATIVE = 'CREATIVE',
  MANAGEMENT = 'MANAGEMENT',
  OTHER = 'OTHER_CUSTOM'
}

export interface CategoryInfo {
  id: ResumeCategory;
  name: string;
  subcategories: string[];
  price: number;
}

// Resume request types
export enum ResumeStatus {
  PENDING_ASSIGNMENT = 'PENDING_ASSIGNMENT',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED'
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  grade?: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies?: string[];
  role?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ResumeFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    linkedIn?: string;
    portfolio?: string;
    github?: string;
    additionalLinks?: { title: string; url: string }[];
  };
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications?: { name: string; issuer: string; date: string; url?: string }[];
  languages?: { language: string; proficiency: string }[];
  hobbies?: string[];
  references?: { name: string; position: string; company: string; contact: string }[];
  additionalInfo?: string;
  
  // Category-specific fields
  categorySpecific?: {
    [key: string]: any;
    // Examples:
    // IT: { githubUrl: string, stack: string[], tools: string[] }
    // LEGAL: { barId: string, caseTypes: string[], jurisdictions: string[] }
    // MEDICAL: { registrationNo: string, specialization: string }
  };
}

export interface ResumeRequest {
  id: string;
  clientId: string;
  writerId?: string;
  supervisorId?: string;
  category: ResumeCategory;
  subcategory: string;
  status: ResumeStatus;
  formData: ResumeFormData;
  originalResumeUrl?: string;
  completedResumeUrl?: string;
  certificatesUrls?: string[];
  price: number;
  paymentId?: string;
  paymentStatus?: 'PENDING' | 'COMPLETED' | 'FAILED';
  feedback?: {
    rating: number;
    comment?: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  assignedAt?: string;
  completedAt?: string;
  deliveredAt?: string;
}

// Wallet types
export interface Transaction {
  id: string;
  writerId: string;
  resumeRequestId?: string;
  type: 'CREDIT' | 'WITHDRAWAL';
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  description: string;
  createdAt: string;
  processedAt?: string;
}

export interface Wallet {
  id: string;
  writerId: string;
  balance: number;
  pendingBalance: number;
  transactions: Transaction[];
  updatedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'ASSIGNMENT' | 'COMPLETION' | 'DELIVERY' | 'PAYMENT' | 'FEEDBACK' | 'WITHDRAWAL';
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}