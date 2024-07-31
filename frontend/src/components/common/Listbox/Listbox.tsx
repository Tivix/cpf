import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Listbox as HeadlessListbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import { ListboxProps } from './Listbox.interface';
import { generateClassNames } from '@app/utils';
import { ChevronUpIcon } from '@app/static/icons/ChevronUpIcon';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { useListBox } from './Listbox.hooks';
import { Button } from '../Button';

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
              <div className="flex h-full items-center">
                <ListboxButton
                  className={generateClassNames(
                    'text-black relative flex h-12 w-full items-center rounded-xl border border-navy-200 px-3 text-left transition duration-150',
                    'hover:bg-navy-100 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-red-600',
                    {
                      'rounded-e-none rounded-s-xl border-y-0 border-l-0 border-r-white bg-blue-200 hover:bg-blue-300':
                        selected,
                    },
                    { 'text-navy-600': !value && placeholder },
                    className,
                  )}
                >
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {!value && placeholder ? placeholder : value?.name}
                    </div>
                    <div className="flex items-center">
                      <ChevronUpIcon className="rotate-180" />
                    </div>
                  </div>
                </ListboxButton>
                {selected && (
                  <Button
                    onClick={handleClear}
                    styleType="natural"
                    variant="link"
                    className={generateClassNames('flex h-full items-center rounded-none px-3 hover:bg-blue-300', {
                      'rounded-e-xl border border-none border-navy-200 bg-blue-200': selected,
                    })}
                  >
                    <CloseIcon />
                  </Button>
                )}
              </div>
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
                    className="group flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-1.5 data-[focus]:bg-navy-100"
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
