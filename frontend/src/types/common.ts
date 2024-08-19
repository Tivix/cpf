import { HTMLProps } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface Option<T extends string = string> {
  id: T;
  name: string;
}

export type ClassName = HTMLProps<HTMLElement>['className'];
