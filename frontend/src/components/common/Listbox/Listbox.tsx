import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Listbox as HeadlessListbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import { ListboxProps } from './Listbox.interface';
import { generateClassNames } from '@app/utils';
import { ChevronUpIcon } from '@app/static/icons/ChevronUpIcon';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { useListBox } from './Listbox.hooks';

export const Listbox: FC<ListboxProps> = ({ name, options, placeholder, onClear, className }) => {
  const { control } = useFormContext();
  const { handleClear } = useListBox(onClear);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const selected = !!value;

        return (
          <div className="w-full">
            <HeadlessListbox value={value} onChange={onChange}>
              <ListboxButton
                className={generateClassNames(
                  'text-black relative flex h-12 w-full items-center rounded-lg border border-navy-200 px-4 text-left',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-red-600',
                  { 'bg-blue-200': selected },
                  { 'text-navy-600': !value && placeholder },
                  className,
                )}
              >
                {selected && (
                  <div className="pr-2">
                    <ChevronUpIcon className="px rotate-180" />
                  </div>
                )}
                <div className="flex flex-1 items-center justify-between">
                  {!value && placeholder ? placeholder : value?.name}
                  {selected ? (
                    <div onClick={handleClear}>
                      <CloseIcon />
                    </div>
                  ) : (
                    <ChevronUpIcon className="h-4 w-4 rotate-180" />
                  )}
                </div>
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className={generateClassNames(
                  'mt-1 w-[var(--button-width)] rounded-xl border border-navy-200 bg-white p-1 shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none',
                  'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                )}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.id}
                    value={option}
                    className="group flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-navy-100"
                  >
                    <div className="text-black text-sm/6">{option.name}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </HeadlessListbox>
          </div>
        );
      }}
    />
  );
};
