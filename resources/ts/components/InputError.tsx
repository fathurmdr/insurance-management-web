import { HtmlHTMLAttributes } from 'react';

interface InputErrorProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
  message?: string;
  className: string;
}

function InputError({ message, className = '', ...props }: InputErrorProps) {
  return message ? (
    <p {...props} className={'text-sm text-red-600 ' + className}>
      {message}
    </p>
  ) : null;
}

export default InputError;
