import { ReactNode, SelectHTMLAttributes, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  id?: string;
  isFocused?: boolean;
  children?: ReactNode;
}
function SelectInput({
  label,
  className = '',
  id,
  isFocused,
  children,
  ...props
}: SelectInputProps) {
  const select = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isFocused && select.current) {
      select.current.focus();
    }
  }, []);

  return (
    <div className="mb-4.5">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <div className="relative bg-white dark:bg-form-input">
        <select
          {...props}
          className={`relative w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input ${className}`}
          ref={select}
        >
          {children}
        </select>
        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <FaChevronDown className="text-lg" />
        </span>
      </div>
    </div>
  );
}

export default SelectInput;
