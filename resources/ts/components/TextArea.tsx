import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  id?: string;
  isFocused?: boolean;
}
function TextArea({
  label,
  className = '',
  id,
  isFocused,
  ...props
}: TextInputProps) {
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocused && textArea.current) {
      textArea.current.focus();
    }
  }, []);

  return (
    <div className="mb-4.5">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={id}
        className={`min-h-[12rem] w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${className}`}
        ref={textArea}
      />
    </div>
  );
}

export default TextArea;
