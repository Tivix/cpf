import React, { PropsWithChildren } from 'react';
import { TypographyProps, TypographyVariants } from '@app/components/common/Typography/Typography.interface';
import {generateClassNames} from "@app/utils";

const variantsStyles: {
  [key in TypographyVariants]: string;
} = {
  'hint/caps-medium': 'text-xs tracking-widest uppercase font-medium',
  'hint/regular': 'text-xs tracking-wider font-normal',
  'hint/medium': 'text-xs font-medium',
  'hint/semibold': 'text-xs font-semibold',
  'hint/bold': 'text-xs font-bold',
  'body-s/regular': 'text-sm tracking-wide font-normal',
  'body-s/medium': 'text-sm tracking-wider font-medium',
  'body-s/semibold': 'text-sm tracking-wider font-semibold',
  'body-s/bold': 'text-sm tracking-wide font-bold',
  'body-m/regular': 'text-base tracking-wider font-normal',
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
  as,
  className,
  children,
}: PropsWithChildren<TypographyProps>) => {
  const classnames = generateClassNames(
      'text-navy-900',
      variantsStyles[variant],
      className ?? '',
  );

    switch (as) {
      case 'h1':
        return <h1 className={classnames}>{children}</h1>;
      case 'h2':
        return <h2 className={classnames}>{children}</h2>;
      case 'h3':
        return <h3 className={classnames}>{children}</h3>;
      case 'h4':
        return <h4 className={classnames}>{children}</h4>;
      case 'h5':
        return <h5 className={classnames}>{children}</h5>;
      case 'h6':
        return <p className={classnames}>{children}</p>;
      case 'p':
      default:
        return <p className={classnames}>{children}</p>;
    }
};
