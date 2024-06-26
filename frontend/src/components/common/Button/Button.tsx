import { generateClassNames } from '@app/utils';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: StyleTypes;
  variant?: Variants;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export type StyleTypes = 'primary' | 'natural' | 'warning';

export type Variants = 'solid' | 'border' | 'borderless' | 'link';

const types: {
  [key in StyleTypes]: {
    [key in Variants]: string;
  };
} = {
  primary: {
    solid: 'bg-blue-600 text-white hover:bg-blue-900',
    border:
      'bg-white text-blue-800 border border-blue-800 hover:bg-navy-100 active:bg-white active:text-blue-900 active:border-blue-900',
    borderless: 'px-2 bg-transparent text-blue-800 hover:bg-navy-100 active:bg-white active:text-blue-900',
    link: 'px-0 bg-transparent text-blue-800 hover:underline hover:text-blue-900 active:text-blue-900 active:no-underline',
  },
  natural: {
    solid: 'bg-navy-600 text-white hover:bg-navy-700',
    border: 'bg-white text-navy-600 border border-navy-300 hover:bg-navy-100',
    borderless: 'px-2 bg-transparent text-navy-600 hover:bg-navy-50 active:bg-navy-100',
    link: 'px-0 bg-transparent text-navy-600 hover:underline hover:text-navy-700 active:no-underline',
  },
  warning: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    border: 'bg-white text-red-600 border border-red-600 hover:bg-navy-100 hover:text-red-700',
    borderless:
      'px-2 bg-transparent text-red-600 hover:bg-navy-50 hover:border-[1.5px] hover:border-red-700 hover:text-red-700',
    link: 'px-0 bg-transparent text-red-600 hover:underline hover:text-red-700 active:no-underline',
  },
};

const Button = ({
  styleType = 'primary',
  variant = 'solid',
  disabled = false,
  className,
  children,
  ...props
}: Props) => {
  const buttonClass = generateClassNames(
    'h-11 px-5 items-center justify-center rounded-full transition duration-200',
    {
      [types[styleType][variant]]: !disabled,
      'bg-navy-200 border-navy-200 text-navy-300 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
