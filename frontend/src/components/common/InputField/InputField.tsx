'use client';

import { InputFieldProps } from './InputField.interface';

export const InputField = ({ placeholder, id, value, icon, ...props }: InputFieldProps) => {
  return (
    <div className="w-full mx-auto rounded-xl">
      <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900 sr-only">
        {placeholder}
      </label>
      <div className="relative">
        {icon && <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">{icon}</div>}
        <input
          id={id}
          value={value || ''}
          className="block w-full p-3 ps-10 text-sm text-navy-600 border border-navy-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 placeholder-gray-400"
          placeholder={placeholder}
          required
          {...props}
        />
      </div>
    </div>
  );
};

InputField.displayName = 'InputField';
