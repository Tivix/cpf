import { ReactNode } from 'react';

export interface Option {
  id: string;
  name: string;
}

export interface ComboboxProps {
  label?: string;
  options: Option[];
  name: string;
  renderRightContent?: () => ReactNode;
  className?: string;
}
