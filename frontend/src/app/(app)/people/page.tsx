'use client';

import Image from 'next/image';
import { DotsIcon } from '@app/static/icons/DotsIcon';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { SearchIcon } from '@app/static/icons/SearchIcon';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { InputField } from '@app/components/common/InputField/InputField';
import { useEffect, useState } from 'react';
import { Employee } from '@app/types/common';
import { EmployeeCard } from '@app/components/common/EmployeeCard';

const TABS = [
  {
    title: 'Active',
    employees: 28,
  },
  {
    title: 'Drafts',
    employees: 1,
  },
  {
    title: 'Deactivated',
    employees: 5,
  },
];

const FILTERS = [
  { label: 'Current band', value: 'current_band', id: 1 },
  { label: 'Ladder', value: 'ladder', id: 2 },
];

const PEOPLE = [
  {
    name: 'John Doe',
    title: 'Front End Developer, Junior',
    ladder: 'Front End',
    currentBand: 2,
    activeGoal: true,
    goalProgress: 0.35,
    latestActivity: 5,
    active: true,
    draft: true,
    deactivated: false,
  },
  {
    name: 'Jane Doe',
    title: 'Back End Developer, Senior',
    ladder: 'Back End',
    currentBand: 6,
    activeGoal: false,
    goalProgress: 0,
    latestActivity: 0,
    active: true,
    draft: true,
    deactivated: false,
  },
];

function getPeopleDetails() {
  // TODO use real data when available
  //   const response = await fetch(`http://proxy/cpf/api/people`);

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch bucket details');
  //   }
  //   const data = await response.json();

  //   return mapKeysToCamelCase(data);
  return PEOPLE;
}

export default function People() {
  const people = getPeopleDetails();

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].value);
  const [activePeople, setActivePeople] = useState<Employee[]>();
  const [draftPeople, setDraftPeople] = useState<Employee[]>();
  const [deactivatedPeople, setDeactivatedPeople] = useState<Employee[]>();

  const selectedFilterLabel = FILTERS.find((option) => option.value === selectedFilter)?.label || '';

  useEffect(() => {
    const activePeople: Employee[] = [];
    const draftPeople: Employee[] = [];
    const deactivatedPeople: Employee[] = [];

    if (people) {
      people.forEach((person: Employee) => {
        // Update people data in DB when status changed with PUT request

        if (person.active) return activePeople.push(person);
        if (person.draft) return draftPeople.push(person);
        if (person.deactivated) return deactivatedPeople.push(person);
      });

      setActivePeople(activePeople);
      setDraftPeople(draftPeople);
      setDeactivatedPeople(deactivatedPeople);
    }
  }, [people]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Breadcrumbs breadcrumbs={[{ label: 'People', href: '/people', current: true }]} />
        <button className="py-2 px-5 text-white text-sm font-semibold bg-blue-800 rounded-full">+ Employee</button>
      </div>

      <Tabs active={activeTab} setActive={setActiveTab} tabs={TABS} className="border-b border-navy-200" />

      <table className="w-full text-sm table-auto bg-white rounded-2xl p-6 pb-2 mt-4">
        <thead>
          <tr>
            <td className="w-1/3">
              <div className="w-full flex gap-4 p-4 items-center justify-between">
                <InputField
                  value={search}
                  name="people-search"
                  placeholder="Search"
                  icon={<SearchIcon />}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Dropdown
                  selectedOptionLabel={selectedFilterLabel}
                  options={FILTERS}
                  selectedOptionValue={selectedFilter}
                  setSelectedOption={setSelectedFilter}
                />
              </div>
            </td>
          </tr>
          <tr className="mx-4 uppercase text-navy-500 font-normal">
            <th className="py-4 text-start pl-4">Employee</th>
            <th className="py-4">Ladder</th>
            <th className="py-4">Current Band</th>
            <th className="py-4">Active Goal</th>
            <th className="py-4 text-start">Goal Progress</th>
            <th className="py-4">Latest Activity</th>
            <th className="py-4 " />
          </tr>
        </thead>

        <tbody>
          {people.map((employee: Employee, index) => (
            <EmployeeCard employee={employee} key={index}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
