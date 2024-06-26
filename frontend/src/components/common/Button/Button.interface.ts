import { ReactElement, ButtonHTMLAttributes, PropsWithChildren } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  title?: string;
  uiType?: (typeof ButtonUIType)[keyof typeof ButtonUIType];
  disabled?: boolean;
  buttonColor?: (typeof ButtonColor)[keyof typeof ButtonColor];
}

export interface StyledButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  disabled?: boolean | undefined;
  $lightColor: string;
  $darkColor: string;
}

export const ButtonUIType = {
  SOLID: 'solid',
  BORDER: 'border',
  BORDERLESS: 'borderless',
  LINK: 'link',
} as const;

export const ButtonColor = {
  BLUE: 'blue',
  NAVY: 'navy',
  RED: 'red',
} as const;
