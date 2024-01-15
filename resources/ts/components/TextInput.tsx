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
      {prefix ? (
        <div
          className={`flex w-full items-center overflow-hidden rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 font-medium outline-none transition focus-within:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:focus-within:border-primary ${className} ${
            props.disabled && 'bg-whiter'
          }`}
        >
          <span className="mx-1 peer-disabled:bg-whiter">{prefix}</span>
          <input
            {...props}
            id={id}
            className={`peer w-full rounded bg-transparent p-1 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter ${className}`}
            ref={input}
          />
        </div>
      ) : (
        <input
          {...props}
          id={id}
          className={`w-full overflow-hidden rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${className}`}
          ref={input}
        />
      )}
    </div>
  );
}

export default TextInput;
