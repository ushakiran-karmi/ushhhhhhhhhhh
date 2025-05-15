import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckIcon, 
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { categoryData } from '../utils/categoryData';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const features = [
    {
      title: 'Professional Resume Writers',
      description: 'Our expert writers craft tailored resumes for your specific career path',
      icon: '👔',
    },
    {
      title: 'Industry-Specific Templates',
      description: 'Formats designed for specific fields to highlight your strengths',
      icon: '📝',
    },
    {
      title: 'ATS-Friendly Optimization',
      description: 'All resumes are optimized to pass through Applicant Tracking Systems',
      icon: '🔍',
    },
    {
      title: 'Fast Turnaround Time',
      description: 'Get your professional resume in just 3-5 business days',
      icon: '⏱️',
    },
  ];
  
  const testimonials = [
    {
      quote: "Resume Studio helped me land interviews at my dream companies. The IT resume they created perfectly highlighted my technical skills.",
      author: "Priya S.",
      role: "Software Developer",
    },
    {
      quote: "After struggling with my healthcare resume for months, I turned to Resume Studio. Within a week, I had a professional CV that stood out.",
      author: "Rahul K.",
      role: "Registered Nurse",
    },
    {
      quote: "The finance-specific resume they created helped me transition to a senior role. Worth every rupee!",
      author: "Nisha P.",
      role: "Financial Analyst",
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary-600"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <span className="font-heading font-semibold text-xl text-neutral-900">Resume Studio</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-neutral-900">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-semibold leading-6 text-neutral-900">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-neutral-900">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-semibold leading-6 text-neutral-900">
              Testimonials
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm font-semibold leading-6 text-neutral-900 mr-6">
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            >
              Get started
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary-600"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
                <span className="font-heading font-semibold text-xl text-neutral-900">Resume Studio</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-neutral-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-neutral-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#features"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                  <a
                    href="#pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a
                    href="#testimonials"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </a>
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="mt-4 block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-base font-semibold text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-500 to-secondary-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <motion.h1 
                className="text-4xl font-heading font-bold tracking-tight text-neutral-900 sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Your Perfect Resume, Crafted by Professionals
              </motion.h1>
              <motion.p 
                className="mt-6 text-lg leading-8 text-neutral-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Stand out from the competition with a professionally written resume tailored to your specific industry and career goals.
              </motion.p>
              <motion.div 
                className="mt-10 flex items-center justify-center gap-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/register"
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Get started
                </Link>
                <a href="#how-it-works" className="text-sm font-semibold leading-6 text-neutral-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-16 flow-root sm:mt-24"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="-m-2 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Resume being created by professionals"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary-500 to-primary-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      
      {/* Features section */}
      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Industry-Leading Resume Service</h2>
            <p className="mt-2 text-3xl font-heading font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Everything you need for a standout resume
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Our expert writers craft personalized resumes that highlight your unique skills and experiences to help you land your dream job.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <motion.div 
                  key={feature.title} 
                  className="relative pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <dt className="text-base font-semibold leading-7 text-neutral-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-xl">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-neutral-600">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div id="how-it-works" className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Simple Process</h2>
            <p className="mt-2 text-3xl font-heading font-bold tracking-tight text-neutral-900 sm:text-4xl">
              How Resume Studio Works
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Our streamlined process makes it easy to get a professional resume in just a few simple steps.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <ol className="relative border-l border-primary-300">                  
              <motion.li 
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-bold text-primary-600">1</span>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-neutral-900">Select Your Resume Category</h3>
                <p className="mb-4 text-base font-normal text-neutral-600">Choose from our specialized resume categories tailored to your industry, whether it's IT, healthcare, finance, or any other field.</p>
              </motion.li>
              
              <motion.li 
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-bold text-primary-600">2</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-neutral-900">Fill in Your Details</h3>
                <p className="text-base font-normal text-neutral-600">Complete our comprehensive form with your education, experience, skills, and projects. You can also upload your existing resume for reference.</p>
              </motion.li>
              
              <motion.li 
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-bold text-primary-600">3</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-neutral-900">Professional Writing</h3>
                <p className="text-base font-normal text-neutral-600">Our expert writers craft your resume, highlighting your strengths and tailoring it to your industry's standards. We assign the perfect writer for your specific career path.</p>
              </motion.li>
              
              <motion.li 
                className="ml-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-bold text-primary-600">4</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-neutral-900">Receive & Download</h3>
                <p className="text-base font-normal text-neutral-600">Within 3-5 business days, your professionally written resume will be ready for download in both PDF and DOCX formats. Start applying with confidence!</p>
              </motion.li>
            </ol>
          </div>
        </div>
      </div>
      
      {/* Pricing section */}
      <div id="pricing" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Affordable Pricing</h2>
            <p className="mt-2 text-3xl font-heading font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Choose Your Industry Category
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Our pricing is simple and transparent, with different rates based on your industry and resume complexity.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {categoryData.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-neutral-900">{category.name}</h3>
                <p className="mt-2 text-2xl font-bold text-primary-600">₹{category.price}</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  {category.subcategories.slice(0, 3).map((subcategory, i) => (
                    <li key={i} className="flex">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-500 mr-2" />
                      <span>{subcategory}</span>
                    </li>
                  ))}
                  {category.subcategories.length > 3 && (
                    <li className="flex">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-500 mr-2" />
                      <span>+ {category.subcategories.length - 3} more specializations</span>
                    </li>
                  )}
                </ul>
                <div className="mt-6">
                  <Link
                    to="/register"
                    className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Get started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/register"
              className="text-primary-600 font-medium hover:text-primary-800"
            >
              View all categories <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div id="testimonials" className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-heading font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What Our Clients Say
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Hear from professionals who've found success with our resume writing service.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-between bg-white p-6 shadow-sm rounded-2xl border border-neutral-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div>
                  <div className="flex gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-warning-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-medium leading-6 text-neutral-900">"{testimonial.quote}"</p>
                  </div>
                </div>
                <div className="mt-8 border-t border-neutral-200 pt-4">
                  <div className="text-base font-semibold text-neutral-900">{testimonial.author}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-primary-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-heading font-bold tracking-tight text-white sm:text-4xl">
              Ready to boost your career with a professional resume?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join thousands of professionals who have accelerated their job search with our expertly crafted resumes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started today
              </Link>
              <a href="#pricing" className="text-sm font-semibold leading-6 text-white">
                View pricing <span aria-hidden="true">→</span>
              </a>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#3B82F6" />
                  <stop offset={1} stopColor="#0D9488" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-neutral-400 hover:text-neutral-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-neutral-400">
              &copy; {new Date().getFullYear()} Resume Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;