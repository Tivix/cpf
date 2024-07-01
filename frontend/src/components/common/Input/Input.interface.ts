import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';

export interface InputProps {
  form: UseFormReturn<FieldValues>;
  label?: string;
  name: string;
  options?: RegisterOptions<FieldValues, string>;
}
