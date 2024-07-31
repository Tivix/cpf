export interface Point {
  x: number;
  y: number;
}

export interface Option<T extends string = string> {
  id: T;
  name: string;
}
