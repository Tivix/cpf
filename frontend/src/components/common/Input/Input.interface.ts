import { ClassName } from '@app/types/common';
import { ReactNode } from 'react';
import { FieldValues, RegisterOptions } from 'react-hook-form';

export interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  options?: RegisterOptions<FieldValues, string>;
  leftIcon?: ReactNode;
  className?: ClassName;
}
