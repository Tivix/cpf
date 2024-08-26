import { ClassName, Option } from '@app/types/common';
import { ReactNode } from 'react';

export interface ComboboxProps {
  label?: string;
  options: Option[];
  selectedOptions?: Option[];
  name: string;
  renderRightContent?: () => ReactNode;
  className?: ClassName;
}
