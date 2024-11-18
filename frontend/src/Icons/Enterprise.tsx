interface Props {
  className?: string;
}

export const Enterprise =({className}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="None"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 2h10"></path>
      <path d="M5 6h14"></path>
      <rect width="18" height="12" x="3" y="10" rx="2"></rect>
    </svg>
  );
}
