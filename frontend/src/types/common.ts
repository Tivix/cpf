import { HTMLProps } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface Option {
  id: string;
  name: string;
}

export type ClassName = HTMLProps<HTMLElement>['className'];
