interface TransactionIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}
const TransactionIcon = ({ className, ...props }: TransactionIconProps) => (
  <svg
    className={className}
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 4L16 0V3H1V5H16V8L20 4Z" fill="#475569" />
    <path d="M0 12L4 16V13H19V11H4V8L0 12Z" fill="#475569" />
  </svg>
);
export default TransactionIcon;
