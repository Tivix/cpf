import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: StyleTypes;
  variant?: Variants;
  disabled?: boolean;
  className?: string;
}

export type StyleTypes = 'primary' | 'natural' | 'warning';

export type Variants = 'solid' | 'border' | 'borderless' | 'link';
