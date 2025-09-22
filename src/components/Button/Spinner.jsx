import clsx from 'clsx';

export const Spinner = ({ className = '' }) => (
  <svg
    className={clsx('animate-spin text-current', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
    />
  </svg>
);
