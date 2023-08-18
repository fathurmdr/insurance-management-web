import { FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  children?: ReactNode;
}

function Form({ title, children, ...props }: FormProps) {
  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {title && (
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">{title}</h3>
          </div>
        )}
        <form {...props}>
          <div className="p-6.5">{children}</div>
        </form>
      </div>
    </div>
  );
}

export default Form;
