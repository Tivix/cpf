'use client';

import { InputFieldProps } from './InputField.interface';

export const InputField = ({ placeholder, id, value, icon, ...props }: InputFieldProps) => {
  return (
    <div className="w-[304px]">
      <label htmlFor={id}></label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4">{icon}</div>}
        <input
          id={id}
          value={value || ''}
          className="h-12 w-full rounded-xl border border-navy-200 pl-[46px] pr-4 text-navy-600 placeholder-navy-600"
          placeholder={placeholder}
          required
          {...props}
        />
      </div>
    </div>
  );
};

InputField.displayName = 'InputField';
