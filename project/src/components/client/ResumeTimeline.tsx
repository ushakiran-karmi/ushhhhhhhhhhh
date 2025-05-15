import { 
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import { ResumeRequest, ResumeStatus } from '../../types';

interface ResumeTimelineProps {
  request: ResumeRequest;
}

const ResumeTimeline = ({ request }: ResumeTimelineProps) => {
  const steps = [
    {
      name: 'Resume Requested',
      description: 'Your resume request has been received',
      icon: CheckCircleIcon,
      date: request.createdAt,
      status: 'complete',
    },
    {
      name: 'Writer Assigned',
      description: 'A professional writer has been assigned to your resume',
      icon: request.assignedAt ? CheckCircleIcon : ClockIcon,
      date: request.assignedAt,
      status: request.assignedAt ? 'complete' : 'pending',
    },
    {
      name: 'Resume Creation',
      description: 'Writer is creating your professional resume',
      icon: (request.status === ResumeStatus.IN_PROGRESS || 
             request.status === ResumeStatus.COMPLETED ||
             request.status === ResumeStatus.DELIVERED) 
        ? CheckCircleIcon : ClockIcon,
      date: request.assignedAt, // No specific date for this step, using assignedAt
      status: (request.status === ResumeStatus.IN_PROGRESS || 
               request.status === ResumeStatus.COMPLETED ||
               request.status === ResumeStatus.DELIVERED) 
        ? 'complete' : 'pending',
    },
    {
      name: 'Resume Completed',
      description: 'Your resume has been completed and is ready for download',
      icon: (request.status === ResumeStatus.COMPLETED || 
             request.status === ResumeStatus.DELIVERED) 
        ? CheckCircleIcon : ClockIcon,
      date: request.completedAt,
      status: (request.status === ResumeStatus.COMPLETED || 
               request.status === ResumeStatus.DELIVERED) 
        ? 'complete' : 'pending',
    },
    {
      name: 'Resume Delivered',
      description: 'You have downloaded your completed resume',
      icon: request.status === ResumeStatus.DELIVERED 
        ? CheckCircleIcon : ClockIcon,
      date: request.deliveredAt,
      status: request.status === ResumeStatus.DELIVERED 
        ? 'complete' : 'pending',
    },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {steps.map((step, stepIdx) => (
          <li key={step.name}>
            <div className="relative pb-8">
              {stepIdx !== steps.length - 1 ? (
                <span
                  className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                    step.status === 'complete' ? 'bg-primary-600' : 'bg-neutral-200'
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      step.status === 'complete' 
                        ? 'bg-primary-600' 
                        : 'bg-neutral-200'
                    }`}
                  >
                    <step.icon 
                      className={`h-5 w-5 ${
                        step.status === 'complete' ? 'text-white' : 'text-neutral-500'
                      }`} 
                      aria-hidden="true" 
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm text-neutral-500">
                    <span className={`font-medium ${
                      step.status === 'complete' ? 'text-primary-700' : 'text-neutral-900'
                    }`}>
                      {step.name}
                    </span>
                    {step.date && step.status === 'complete' && (
                      <span className="whitespace-nowrap ml-2">
                        - {formatDate(step.date)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-neutral-600">
                    {step.description}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeTimeline;