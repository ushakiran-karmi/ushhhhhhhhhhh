import { CategoryInfo, ResumeCategory } from '../types';

export const categoryData: CategoryInfo[] = [
  {
    id: ResumeCategory.IT,
    name: 'IT',
    subcategories: ['Software Developer', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer', 'QA Engineer'],
    price: 599
  },
  {
    id: ResumeCategory.GENERAL,
    name: 'Non-IT/General',
    subcategories: ['Sales', 'Marketing', 'Customer Support', 'Administrative', 'Operations'],
    price: 499
  },
  {
    id: ResumeCategory.HEALTHCARE,
    name: 'Healthcare',
    subcategories: ['Doctor', 'Nurse', 'Lab Technician', 'Medical Assistant', 'Healthcare Administrator'],
    price: 699
  },
  {
    id: ResumeCategory.FINANCE,
    name: 'Finance',
    subcategories: ['CA', 'Accountant', 'Financial Analyst', 'Investment Banking', 'Financial Advisor'],
    price: 649
  },
  {
    id: ResumeCategory.LEGAL,
    name: 'Legal',
    subcategories: ['Lawyer', 'Legal Advisor', 'Paralegal', 'Legal Researcher', 'Compliance Officer'],
    price: 749
  },
  {
    id: ResumeCategory.EDUCATION,
    name: 'Education',
    subcategories: ['Teacher', 'Lecturer', 'Educational Consultant', 'School Administrator', 'Curriculum Developer'],
    price: 549
  },
  {
    id: ResumeCategory.ENGINEERING,
    name: 'Engineering',
    subcategories: ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Chemical Engineer', 'Aerospace Engineer'],
    price: 649
  },
  {
    id: ResumeCategory.CREATIVE,
    name: 'Creative',
    subcategories: ['Graphic Designer', 'Content Writer', 'Photographer', 'Video Editor', 'Animator'],
    price: 599
  },
  {
    id: ResumeCategory.MANAGEMENT,
    name: 'Management',
    subcategories: ['HR Manager', 'Project Manager', 'Product Manager', 'Operations Manager', 'General Manager'],
    price: 699
  },
  {
    id: ResumeCategory.OTHER,
    name: 'Other / Custom',
    subcategories: ['Freelancer', 'Fresh Graduate', 'Career Change', 'Internship', 'Other'],
    price: 499
  }
];

export const getCategoryById = (categoryId: ResumeCategory): CategoryInfo | undefined => {
  return categoryData.find(category => category.id === categoryId);
};

export const getCategoryByName = (categoryName: string): CategoryInfo | undefined => {
  return categoryData.find(category => 
    category.name.toLowerCase() === categoryName.toLowerCase()
  );
};

export const getAllSubcategories = (): string[] => {
  return categoryData.flatMap(category => category.subcategories);
};

export const getCategoryFromSubcategory = (subcategory: string): CategoryInfo | undefined => {
  return categoryData.find(category => 
    category.subcategories.some(sub => 
      sub.toLowerCase() === subcategory.toLowerCase()
    )
  );
};