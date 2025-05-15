import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Step {
  id: string;
  name: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
}

const FormStepper = ({ steps, currentStep }: FormStepperProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const currentStepElement = element.children[currentStep] as HTMLElement;
      
      if (currentStepElement) {
        const scrollPosition = currentStepElement.offsetLeft - element.offsetWidth / 2 + currentStepElement.offsetWidth / 2;
        element.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentStep]);

  return (
    <nav className="bg-white rounded-lg shadow-sm p-4">
      <div className="overflow-x-auto pb-2" ref={scrollRef}>
        <ol className="flex min-w-max">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.id} className={`relative flex items-center ${index < steps.length - 1 ? 'pr-8' : ''}`}>
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 h-0.5 w-8 -translate-x-full bg-neutral-200">
                    {index <= currentStep && (
                      <motion.div
                        className="absolute inset-0 bg-primary-600"
                        initial={{ width: index < currentStep ? '100%' : '0%' }}
                        animate={{ width: index <= currentStep ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                )}
                <div className="group flex flex-col items-center">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    index < currentStep
                      ? 'bg-primary-600'
                      : index === currentStep
                      ? 'border-2 border-primary-600 bg-white'
                      : 'border-2 border-neutral-300 bg-white'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      index < currentStep
                        ? 'text-white'
                        : index === currentStep
                        ? 'text-primary-600'
                        : 'text-neutral-400'
                    }`} />
                  </span>
                  <span className={`mt-2 text-xs font-medium ${
                    index <= currentStep ? 'text-primary-600' : 'text-neutral-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default FormStepper;