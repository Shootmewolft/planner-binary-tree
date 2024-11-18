interface Props {
  className?: string;
}

export const Arrows = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m7 15 5 5 5-5"></path>
      <path d="m7 9 5-5 5 5"></path>
    </svg>
  );
};
