import { Option } from '@app/types/common';
import { ReactNode } from 'react';

export interface ComboboxProps {
  label?: string;
  options: Option[];
  name: string;
  renderRightContent?: () => ReactNode;
  className?: string;
}
