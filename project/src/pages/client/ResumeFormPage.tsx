import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  UserIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  CodeBracketIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { getCategoryById } from '../../utils/categoryData';
import { ResumeCategory, ResumeFormData } from '../../types';
import PersonalInfoForm from '../../components/forms/PersonalInfoForm';
import EducationForm from '../../components/forms/EducationForm';
import ExperienceForm from '../../components/forms/ExperienceForm';
import SkillsForm from '../../components/forms/SkillsForm';
import ProjectsForm from '../../components/forms/ProjectsForm';
import AdditionalInfoForm from '../../components/forms/AdditionalInfoForm';
import PaymentForm from '../../components/forms/PaymentForm';
import FormStepper from '../../components/forms/FormStepper';
import toast from 'react-hot-toast';

const steps = [
  { id: 'personal', name: 'Personal Info', icon: UserIcon },
  { id: 'education', name: 'Education', icon: AcademicCapIcon },
  { id: 'experience', name: 'Experience', icon: BriefcaseIcon },
  { id: 'skills', name: 'Skills', icon: CodeBracketIcon },
  { id: 'projects', name: 'Projects', icon: DocumentTextIcon },
  { id: 'additional', name: 'Additional Info', icon: DocumentTextIcon },
  { id: 'payment', name: 'Payment', icon: CreditCardIcon },
];

const ResumeFormPage = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const categoryInfo = getCategoryById(category as ResumeCategory);
  
  if (!categoryInfo) {
    return <div>Invalid category</div>;
  }
  
  // Initial form values
  const initialValues: ResumeFormData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      linkedIn: '',
      portfolio: '',
      github: '',
      additionalLinks: [],
    },
    objective: '',
    education: [
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: null,
        grade: '',
      },
    ],
    experience: [
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: null,
        current: true,
        description: '',
        achievements: [],
      },
    ],
    skills: [
      { name: '', level: 'Intermediate' },
    ],
    projects: [
      {
        title: '',
        description: '',
        technologies: [],
        role: '',
        url: '',
      },
    ],
    certifications: [],
    languages: [],
    hobbies: [],
    additionalInfo: '',
  };
  
  // Validation schema for the form
  const validationSchema = [
    // Step 1: Personal Info
    Yup.object({
      personalInfo: Yup.object({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
      }),
      objective: Yup.string().required('Career objective is required'),
    }),
    
    // Step 2: Education
    Yup.object({
      education: Yup.array().of(
        Yup.object({
          institution: Yup.string().required('Institution name is required'),
          degree: Yup.string().required('Degree is required'),
          fieldOfStudy: Yup.string().required('Field of study is required'),
          startDate: Yup.string().required('Start date is required'),
        })
      ).min(1, 'At least one education entry is required'),
    }),
    
    // Step 3: Experience
    Yup.object({
      experience: Yup.array().of(
        Yup.object({
          company: Yup.string().required('Company name is required'),
          position: Yup.string().required('Position is required'),
          startDate: Yup.string().required('Start date is required'),
          description: Yup.string().required('Description is required'),
        })
      ),
    }),
    
    // Step 4: Skills
    Yup.object({
      skills: Yup.array().of(
        Yup.object({
          name: Yup.string().required('Skill name is required'),
        })
      ).min(1, 'At least one skill is required'),
    }),
    
    // Step 5: Projects
    Yup.object({
      projects: Yup.array().of(
        Yup.object({
          title: Yup.string(),
          description: Yup.string(),
        })
      ),
    }),
    
    // Step 6: Additional Info - no required fields
    Yup.object({}),
    
    // Step 7: Payment - will be handled separately
    Yup.object({}),
  ];
  
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema[currentStep],
    onSubmit: async (values) => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit the form
        await handleSubmit(values);
      }
    },
  });
  
  const handleSubmit = async (values: ResumeFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      // Simulate redirection after success
      setTimeout(() => {
        toast.success('Resume request submitted successfully!');
        navigate('/client/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };
  
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm formik={formik} categoryInfo={categoryInfo} />;
      case 1:
        return <EducationForm formik={formik} />;
      case 2:
        return <ExperienceForm formik={formik} />;
      case 3:
        return <SkillsForm formik={formik} categoryInfo={categoryInfo} />;
      case 4:
        return <ProjectsForm formik={formik} />;
      case 5:
        return <AdditionalInfoForm formik={formik} />;
      case 6:
        return <PaymentForm categoryInfo={categoryInfo} />;
      default:
        return null;
    }
  };
  
  if (isSuccess) {
    return (
      <motion.div
        className="max-w-lg mx-auto mt-8 card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-6">
          <div className="h-20 w-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Resume Request Submitted!</h2>
          <p className="text-neutral-600 mb-6">
            Your resume request has been submitted successfully. Our team will start working on it shortly.
          </p>
          <div className="bg-neutral-50 rounded-lg p-4 text-left text-sm mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Category:</span>
              <span>{categoryInfo.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subcategory:</span>
              <span>{categoryInfo.subcategories[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span className="font-medium text-primary-600">₹{categoryInfo.price}</span>
            </div>
          </div>
          <p className="text-neutral-600 mb-6">
            You will be redirected to your dashboard where you can track the status of your request.
          </p>
          <div className="flex justify-center">
            <svg className="animate-spin h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
          {categoryInfo.name} Resume Form
        </h2>
        <p className="text-neutral-600">
          Please fill out the form below to request your professional {categoryInfo.name.toLowerCase()} resume.
        </p>
      </motion.div>
      
      <FormStepper steps={steps} currentStep={currentStep} />
      
      <motion.div
        className="card mt-8"
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                {steps[currentStep].name}
              </h3>
              
              {renderStepContent(currentStep)}
            </div>
            
            <div className="flex justify-between pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
                className={`btn ${currentStep === 0 ? 'invisible' : 'btn-outline'}`}
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  'Submit Order'
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </FormikProvider>
      </motion.div>
    </div>
  );
};

export default ResumeFormPage;