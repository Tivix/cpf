import { ReactElement, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  title?: string;
  uiType?: ButtonUIType;
  disabled?: boolean;
  color?: ButtonColor;
}

export interface StyledButtonProps {
  disabled?: boolean | undefined;
  $lightColor: string;
  $darkColor: string;
}

export type ButtonUIType = 'solid' | 'border' | 'borderless' | 'link';

export type ButtonColor = 'blue' | 'navy' | 'red';
