'use client';

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { SearchIcon } from '@app/static/icons/SearchIcon';
import React, { useEffect, useState } from 'react';
import { Employee } from '@app/types/common';
import { ComboboxComponentProps } from './ComboboxComponent.interface';

export const ComboboxComponent = ({ people, setSearchedPerson }: ComboboxComponentProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Employee | string>('');
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (selectedPerson) {
      setSearchedPerson([selectedPerson as Employee]);
    }
  }, [selectedPerson, setSearchedPerson]);

  const resetResults = () => {
    setSelectedPerson('');
    setSearchedPerson([]);
  };

  return (
    <Combobox
      value={selectedPerson as Employee}
      onChange={(value) => value && setSelectedPerson(value)}
      onClose={() => !query && resetResults()}
    >
      <div className="relative flex w-[304px] items-center">
        <div className="absolute left-4">
          <SearchIcon />
        </div>
        <ComboboxInput
          aria-label="Employee"
          displayValue={(selectedPerson: Employee) => query && selectedPerson?.name}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="h-12 w-full rounded-xl border border-navy-200 pl-[46px] pr-4 text-navy-900 placeholder-navy-600"
        />
      </div>
      {!!filteredPeople?.length && (
        <ComboboxOptions
          anchor="bottom"
          className="mt-1 w-[304px] rounded-xl border border-navy-200 bg-white py-[6px] text-navy-600 placeholder-navy-600 shadow-[0_2px_6px_0_#383A441A]"
        >
          {filteredPeople?.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="flex h-11 items-center px-3 text-navy-700 data-[focus]:bg-navy-50"
            >
              {person.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};
