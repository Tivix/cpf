export interface TypographyProps {
  variant?: TypographyVariants;
  as?: TextElement;
  className?: string;
}

export type TypographyVariants =
  | 'hint/caps-medium'
  | 'hint/regular'
  | 'hint/medium'
  | 'hint/semibold'
  | 'hint/bold'
  | 'body-s/regular'
  | 'body-s/medium'
  | 'body-s/semibold'
  | 'body-s/bold'
  | 'body-m/regular'
  | 'body-m/medium'
  | 'body-m/semibold'
  | 'body-m/bold'
  | 'body-l/regular'
  | 'body-l/medium'
  | 'body-l/semibold'
  | 'body-l/bold'
  | 'head-s/regular'
  | 'head-s/medium'
  | 'head-s/semibold'
  | 'head-s/bold'
  | 'head-m/regular'
  | 'head-m/medium'
  | 'head-m/semibold'
  | 'head-m/bold'
  | 'head-l/regular'
  | 'head-l/medium'
  | 'head-l/semibold'
  | 'head-l/bold'
  | 'head-xl/regular'
  | 'head-xl/medium'
  | 'head-xl/semibold'
  | 'head-xl/bold'
  | 'head-2xl/regular'
  | 'head-2xl/medium'
  | 'head-2xl/semibold'
  | 'head-2xl/bold';

export type TextElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';