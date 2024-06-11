import { ReactNode } from 'react';

export type InputFieldProps = JSX.IntrinsicElements['input'] & {
  icon?: ReactNode;
  error?: string;
  helperText?: string;
};
