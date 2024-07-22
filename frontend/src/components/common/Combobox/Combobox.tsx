'use client';

import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react';
import { useMemo, useState } from 'react';
import { ComboboxProps } from './Combobox.interface';
import { Option } from '@app/types/common';
import { Controller, useFormContext } from 'react-hook-form';
import { generateClassNames } from '@app/utils';

export const Combobox: React.FC<ComboboxProps> = ({ label, options, name, renderRightContent, className }) => {
  const [query, setQuery] = useState('');
  const { control } = useFormContext();

  const filteredOptions = useMemo(
    () =>
      options
        .sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
        .filter((option) => option.name.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <HeadlessCombobox
          as="div"
          immediate
          value={value}
          onChange={(person) => {
            setQuery('');
            onChange(person);
          }}
          className={generateClassNames('flex flex-1 flex-col gap-y-2', className)}
        >
          {label && <Label className="font-semibold text-navy-900">{label}</Label>}
          <div className="flex flex-1 items-center">
            <div className="relative w-full">
              <ComboboxInput
                className="w-full rounded-xl border-0 bg-white px-4 py-3 text-navy-600 shadow-sm outline-none ring-1 ring-inset ring-navy-200 focus:ring-1 focus:ring-inset focus:ring-navy-700"
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery('')}
                displayValue={(item: Option) => item?.name}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 px-4">
                <ChevronRightIcon className="text-gray-400 h-4 w-4 rotate-90 text-navy-600" aria-hidden="true" />
              </ComboboxButton>

              {filteredOptions?.length > 0 && (
                <ComboboxOptions className="ring-black absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.map((option) => (
                    <ComboboxOption
                      key={option.id}
                      value={option}
                      className="relative cursor-default select-none py-2 pl-3 pr-9 text-navy-900 data-[focus]:cursor-pointer data-[focus]:bg-navy-200 data-[focus]:font-medium"
                    >
                      <span className="block truncate">{option.name}</span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
            {renderRightContent?.()}
          </div>
        </HeadlessCombobox>
      )}
    />
  );
};
