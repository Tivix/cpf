export const DashedCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect
      x="1"
      y="1"
      width="20"
      height="20"
      rx="10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
  </svg>
);
