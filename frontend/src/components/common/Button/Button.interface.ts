import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: StyleTypes;
  variant?: Variants;
  disabled?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type StyleTypes = 'primary' | 'natural' | 'red';

export type Variants = 'solid' | 'border' | 'borderless' | 'link';
