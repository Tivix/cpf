import { FC, memo } from 'react';
import { InputProps } from './Input.interface';
import { useFormContext } from 'react-hook-form';

const InputComponent: FC<InputProps> = memo(
  ({ form, label, name, options = {}, ...otherProps }) => {
    console.log('render');

    return (
      <div className="border">
        {label && <label htmlFor={`input-${name}`}>{label}</label>}
        <input id={`input-${name}`} {...form.register(name, options)} {...otherProps} />
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
