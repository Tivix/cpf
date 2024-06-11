'use client';

import { DropdownProps } from './Dropdown.interface';
import { Transition } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';

export const Dropdown = ({ options, selectedOptionValue, selectedOptionLabel, setSelectedOption }: DropdownProps) => (
  <div className="w-full">
    <Listbox value={selectedOptionValue} onChange={setSelectedOption}>
      <div className="relative">
        <Listbox.Button className="relative w-full border border-navy-200 cursor-default rounded-lg bg-white py-3 pl-3 pr-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate text-navy-600">{selectedOptionLabel}</span>
          <span className="pointer-events-none pl-2 absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronRightIcon className="h-4 w-4 text-navy-600 rotate-90" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 border-navy-200 pl-10 pr-4 ${
                    active ? 'bg-navy-200 text-navy-600' : 'text-gray-900'
                  }`
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);
