import { InputHTMLAttributes, useEffect, useRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  className?: string;
  id?: string;
  isFocused?: boolean;
}
function TextInput({
  label,
  prefix,
  className = '',
  id,
  isFocused,
  ...props
}: TextInputProps) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="mb-4.5">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <div
        className={`flex w-full flex-row-reverse items-center overflow-hidden rounded border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus-within:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-within:border-primary ${className}`}
      >
        <input
          {...props}
          id={id}
          className={`peer w-full rounded bg-transparent px-5 py-3 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter ${className}`}
          ref={input}
        />
        {prefix && (
          <span className="z-10 -mr-3 py-3 pl-4 peer-disabled:bg-whiter">
            {prefix}
          </span>
        )}
      </div>
    </div>
  );
}

export default TextInput;
