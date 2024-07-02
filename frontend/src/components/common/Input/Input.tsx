import { FC, memo } from 'react';
import { InputProps } from './Input.interface';
import { useFormContext } from 'react-hook-form';
import { generateClassNames } from '@app/utils';

const InputComponent: FC<InputProps> = memo(
  ({ form, label, name, placeholder, error, options = {}, ...otherProps }) => {
    return (
      <div>
        {label && <label htmlFor={`input-${name}`}>{label}</label>}
        <input
          className={generateClassNames(
            'outline-black h-12 w-full rounded-xl border border-navy-200 px-4 outline-none focus:border-navy-700',
            {
              'border-red-600 focus:border-red-600': error?.length,
            },
          )}
          placeholder={placeholder}
          id={`input-${name}`}
          {...form.register(name, options)}
          {...otherProps}
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.form.formState.isDirty === nextProps.form.formState.isDirty,
);

InputComponent.displayName = 'InputComponent';

export const Input: FC<Omit<InputProps, 'form'>> = ({ ...props }) => {
  const form = useFormContext();
  return <InputComponent form={form} {...props} />;
};
