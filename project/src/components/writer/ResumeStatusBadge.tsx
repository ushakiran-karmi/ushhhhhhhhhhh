import { ResumeStatus } from '../../types';

interface ResumeStatusBadgeProps {
  status: ResumeStatus;
  large?: boolean;
}

const ResumeStatusBadge = ({ status, large = false }: ResumeStatusBadgeProps) => {
  const getStatusStyles = (status: ResumeStatus) => {
    switch (status) {
      case ResumeStatus.PENDING_ASSIGNMENT:
        return 'bg-neutral-100 text-neutral-800';
      case ResumeStatus.ASSIGNED:
        return 'bg-warning-100 text-warning-800';
      case ResumeStatus.IN_PROGRESS:
        return 'bg-secondary-100 text-secondary-800';
      case ResumeStatus.COMPLETED:
        return 'bg-success-100 text-success-800';
      case ResumeStatus.DELIVERED:
        return 'bg-accent-100 text-accent-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  const getStatusText = (status: ResumeStatus): string => {
    switch (status) {
      case ResumeStatus.PENDING_ASSIGNMENT:
        return 'Pending Assignment';
      case ResumeStatus.ASSIGNED:
        return 'Assigned';
      case ResumeStatus.IN_PROGRESS:
        return 'In Progress';
      case ResumeStatus.COMPLETED:
        return 'Completed';
      case ResumeStatus.DELIVERED:
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <span className={`inline-flex items-center rounded-full ${getStatusStyles(status)} ${
      large ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'
    }`}>
      {getStatusText(status)}
    </span>
  );
};

export default ResumeStatusBadge;