import { MouseEvent } from 'react';
import { ListboxProps } from './Listbox.interface';

export const useListBox = (onClear: ListboxProps['onClear']) => {
  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    onClear?.();
  };
  return { handleClear };
};
