import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: StyleTypes;
  variant?: Variants;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export type StyleTypes = 'primary' | 'natural' | 'warning';

export type Variants = 'solid' | 'border' | 'borderless' | 'link';
