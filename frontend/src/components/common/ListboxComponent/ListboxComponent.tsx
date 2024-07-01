'use client';

import { ListboxComponentProps } from './ListboxComponent.interface';
import { ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { generateClassNames } from '@app/utils';

export const ListboxComponent = ({
  options,
  selectedOptionValue,
  selectedOptionLabel,
  setSelectedOption,
  resetFilter,
}: ListboxComponentProps) => (
  <div>
    <Listbox value={selectedOptionValue} onChange={setSelectedOption}>
      <div className="relative">
        <ListboxButton
          className={generateClassNames(
            'focus-visible:border-indigo-500 focus-visible:ring-offset-orange-300 relative flex h-12 cursor-default items-center justify-between gap-3 rounded-xl border border-navy-200 bg-white px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2',
            {
              'gap-0 bg-blue-200 px-0': selectedOptionValue !== options[0].value,
            },
          )}
        >
          {selectedOptionValue !== options[0].value ? (
            <>
              <div className="flex h-12 items-center gap-2 pl-3 pr-2">
                <span className="pointer-events-none">
                  <ChevronRightIcon className="h-4 w-4 rotate-90 text-navy-600" aria-hidden="true" />
                </span>
                <span className="block truncate text-navy-900">{selectedOptionLabel}</span>
              </div>
              <span className="flex h-12 cursor-pointer items-center pl-2 pr-3" onClick={resetFilter}>
                <CloseIcon className="h-3 w-[18px] text-navy-600" aria-hidden="true" />
              </span>
            </>
          ) : (
            <>
              <span className="block truncate text-navy-600">{selectedOptionLabel}</span>
              <span className="pointer-events-none flex items-center">
                <ChevronRightIcon className="h-4 w-4 rotate-90 text-navy-600" aria-hidden="true" />
              </span>
            </>
          )}
        </ListboxButton>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <ListboxOptions className="ring-black/5 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none border-navy-200 py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-300 text-navy-600' : 'text-gray-900'
                  }`
                }
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
);
