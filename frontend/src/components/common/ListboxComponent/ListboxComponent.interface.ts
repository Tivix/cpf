import { MouseEventHandler } from 'react';

export interface Option {
  value: string;
  label: string;
  id: number;
}

export interface ListboxComponentProps {
  options: Option[];
  selectedOptionValue: string;
  selectedOptionLabel: string;
  setSelectedOption: (value: string) => void;
  resetFilter: MouseEventHandler<HTMLDivElement>;
}