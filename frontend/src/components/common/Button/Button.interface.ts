import { ReactElement } from 'react';

export interface ButtonProps {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  title?: string;
  type?: ButtonType;
  disabled?: boolean;
  color?: ButtonColor;
}

export interface StyledButtonProps {
  disabled?: boolean | undefined;
  lightColor: string;
  darkColor: string;
}

export type ButtonType = 'solid' | 'border' | 'borderless' | 'link';

export type ButtonColor = 'blue' | 'navy' | 'red';
