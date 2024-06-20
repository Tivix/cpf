'use client';

import { DropdownProps } from './Dropdown.interface';
import { Transition } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { generateClassNames } from '@app/utils';

export const Dropdown = ({
  options,
  selectedOptionValue,
  selectedOptionLabel,
  setSelectedOption,
  resetFilter,
}: DropdownProps) => (
  <div>
    <Listbox value={selectedOptionValue} onChange={setSelectedOption}>
      <div className="relative">
        <Listbox.Button
          className={generateClassNames(
            'relative flex justify-between items-center gap-3 h-12 border border-navy-200 cursor-default rounded-xl bg-white px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300',
            {
              'px-0 gap-0 bg-blue-200': selectedOptionValue !== options[0].value,
            },
          )}
        >
          {selectedOptionValue !== options[0].value ? (
            <>
              <div className="flex items-center gap-2 h-12 pr-2 pl-3">
                <span className="pointer-events-none">
                  <ChevronRightIcon className="h-4 w-4 text-navy-600 rotate-90" aria-hidden="true" />
                </span>
                <span className="block truncate text-navy-900">{selectedOptionLabel}</span>
              </div>
              <span className="flex items-center h-12 pr-3 pl-2 cursor-pointer" onClick={resetFilter}>
                <CloseIcon className="h-3 w-[18px] text-navy-600" aria-hidden="true" />
              </span>
            </>
          ) : (
            <>
              <span className="block truncate text-navy-600">{selectedOptionLabel}</span>
              <span className="pointer-events-none flex items-center">
                <ChevronRightIcon className="h-4 w-4 text-navy-600 rotate-90" aria-hidden="true" />
              </span>
            </>
          )}
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
