import { useMemo, useState } from 'react';
import { ComboboxProps } from './Combobox.interface';

export const useCombobox = (options: ComboboxProps['options'], selectedOptions: ComboboxProps['selectedOptions']) => {
  const [query, setQuery] = useState('');

  const uniqOptions =
    Array.isArray(selectedOptions) && selectedOptions.length > 0
      ? options.filter((option) => !selectedOptions?.find((selectedOption) => selectedOption?.id === option.id))
      : options;

  const filteredOptions = useMemo(
    () =>
      uniqOptions
        .sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
        .filter((option) => option.name.toLowerCase().includes(query.toLowerCase())),
    [uniqOptions, query],
  );

  return { filteredOptions, setQuery };
};
