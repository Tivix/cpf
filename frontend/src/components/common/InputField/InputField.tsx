'use client';

import { InputFieldProps } from './InputField.interface';

export const InputField = ({ placeholder, id, value, icon, ...props }: InputFieldProps) => {
  return (
    <div className="mx-auto w-full rounded-xl">
      <label htmlFor={id} className="text-gray-900 sr-only mb-2 text-sm font-medium">
        {placeholder}
      </label>
      <div className="relative">
        {icon && <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">{icon}</div>}
        <input
          id={id}
          value={value || ''}
          className="bg-gray-50 bg-gray-700 placeholder-gray-400 block w-full rounded-lg border border-navy-200 p-3 ps-10 text-sm text-navy-600 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          required
          {...props}
        />
      </div>
    </div>
  );
};

InputField.displayName = 'InputField';
