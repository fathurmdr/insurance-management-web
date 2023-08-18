import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}
function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-white ${
        disabled && 'opacity-25'
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
