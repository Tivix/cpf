import { generateClassNames } from '@app/utils';
import React, {PropsWithChildren} from 'react';
import {TypographyProps, TypographyVariants} from "@app/components/common/Typography/Typography.interface";

const variantsStyles: {
    [key in TypographyVariants]: string;
} = {
  'hint/caps-medium': 'text-xs tracking-[.6em] uppercase font-medium',
  'hint/regular': 'text-xs tracking-[.2em] font-normal',
  'hint/medium': 'text-xs font-medium',
  'hint/semibold': 'text-xs font-semibold',
  'hint/bold': 'text-xs font-bold',
  'body-s/regular': 'text-sm tracking-[.1em] font-normal',
  'body-s/medium': 'text-sm tracking-[.2em] font-medium',
  'body-s/semibold': 'text-sm tracking-[.2em] font-semibold',
  'body-s/bold': 'text-sm tracking-[.1em] font-bold',
  'body-m/regular': 'text-base tracking-[.2em] font-normal',
  'body-m/medium': 'text-base font-medium',
  'body-m/semibold': 'text-base font-semibold',
  'body-m/bold': 'text-base font-bold',
  'body-l/regular': 'text-lg font-normal',
  'body-l/medium': 'text-lg font-medium',
  'body-l/semibold': 'text-lg font-semibold',
  'body-l/bold': 'text-xl font-bold',
  'head-s/regular': 'text-xl font-normal',
  'head-s/medium': 'text-xl font-medium',
  'head-s/semibold': 'text-xl font-semibold',
  'head-s/bold': 'text-xl font-bold',
  'head-m/regular': 'text-2xl font-normal',
  'head-m/medium': 'text-2xl font-medium',
  'head-m/semibold': 'text-2xl font-semibold',
  'head-m/bold': 'text-2xl font-bold',
  'head-l/regular': 'text-3xl font-normal',
  'head-l/medium': 'text-3xl font-medium',
  'head-l/semibold': 'text-3xl font-semibold',
  'head-l/bold': 'text-3xl font-bold',
  'head-xl/regular': 'text-4xl font-normal',
  'head-xl/medium': 'text-4xl font-medium',
  'head-xl/semibold': 'text-4xl font-semibold',
  'head-xl/bold': 'text-4xl font-bold',
  'head-2xl/regular': 'text-5xl font-normal',
  'head-2xl/medium': 'text-5xl font-medium',
  'head-2xl/semibold': 'text-5xl font-semibold',
  'head-2xl/bold': 'text-5xl font-bold',
};

export const Typography = ({
                         variant = 'body-m/regular',
                         className,
                         children,
                       }: PropsWithChildren<TypographyProps>) => {
  const classnames = generateClassNames(
      'navy-900',
      variantsStyles[variant],
      className,
  );

  return (
      <span className={classnames}>
        {children}
      </span>
  );
};
