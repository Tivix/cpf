import { HTMLProps } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface Option {
  id: string | number;
  name: string;
  available?: boolean;
}

export type ClassName = HTMLProps<HTMLElement>['className'];
