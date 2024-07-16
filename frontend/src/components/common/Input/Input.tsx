import { FC, memo } from 'react';
import { InputProps } from './Input.interface';
import { useFormContext } from 'react-hook-form';
import { generateClassNames } from '@app/utils';
import { ErrorMessage } from '@hookform/error-message';
import { AlertTriangleIcon } from '@app/static/icons/AlertTriangleIcon';

export const Input: FC<InputProps> = memo(({ label, name, placeholder, leftIcon, options = {}, ...otherProps }) => {
  const { formState, register, getFieldState } = useFormContext();
  const error = getFieldState(name).error;

  return (
    <div className="flex flex-col gap-y-3">
      {label && (
        <label className="text-navy-900" htmlFor={`input-${name}`}>
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{leftIcon}</div>
        )}
        <input
          className={generateClassNames(
            'outline-black h-12 w-full rounded-xl border border-navy-200 pl-8 pr-4 outline-none focus:border-navy-700',
            { 'border-red-600 focus:border-red-600': !!error },
          )}
          placeholder={placeholder}
          id={`input-${name}`}
          {...register(name, options)}
          {...otherProps}
        />
      </div>
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <div className="flex items-center gap-x-2">
            <AlertTriangleIcon />
            <div className="text-sm text-red-600 first-letter:uppercase">{message}</div>
          </div>
        )}
      />
    </div>
  );
});

Input.displayName = 'Input';
