import { useMemo, useState } from 'react';
import { ComboboxProps } from './Combobox.interface';

export const useCombobox = (
  options: ComboboxProps['options'],
  selectedOptions: ComboboxProps['selectedOptions'],
  sort: ComboboxProps['sort'],
) => {
  const [query, setQuery] = useState('');

  const uniqOptions =
    Array.isArray(selectedOptions) && selectedOptions.length > 0
      ? options.filter((option) => !selectedOptions?.find((selectedOption) => selectedOption?.id === option.id))
      : options;

  const filteredOptions = useMemo(() => {
    if (uniqOptions) {
      const filtered = uniqOptions.filter((option) => option.name.toLowerCase().includes(query.toLowerCase()));
      if (sort) {
        return filtered.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
      }
      return filtered;
    }
    return uniqOptions;
  }, [uniqOptions, sort, query]);

  return { filteredOptions: filteredOptions, setQuery };
};
