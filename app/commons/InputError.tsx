interface Props {
  message: string | undefined;
  className?: string;
}
const InputError: React.FC<Props> = ({ message, className, ...props }) => {
  return message ? (
    <p {...props} className={`text-sm text-rose-600   ${className}`}>
      {message}
    </p>
  ) : null;
};

export default InputError;
