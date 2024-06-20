'use client';

import { SearchIcon } from '@app/static/icons/SearchIcon';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { InputField } from '@app/components/common/InputField/InputField';
import { useEffect, useState } from 'react';
import { Employee } from '@app/types/common';
import { EmployeeCard } from '@app/components/common/EmployeeCard';

const FILTERS = [
  { label: 'Current band', value: 'current_band', id: 1 },
  { label: 'Ladder', value: 'ladder', id: 2 },
];

const PEOPLE = [
  {
    name: 'John Doe',
    title: 'Front End Developer, Junior',
    laddersDetails: [
      {
        ladderName: 'Front End',
        currentBand: 2,
        activeGoal: true,
        goalProgress: 35,
        latestActivity: 5,
      },
    ],
    active: true,
    draft: true,
    deactivated: false,
  },
  {
    name: 'Jane Doe',
    title: 'Back End Developer, Senior',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 6,
        activeGoal: false,
        goalProgress: 0,
        latestActivity: 0,
      },
    ],
    active: false,
    draft: false,
    deactivated: true,
  },
  {
    name: 'Jane Does',
    title: 'QA, Senior',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 5,
        activeGoal: true,
        goalProgress: 80,
        latestActivity: 2,
      },
      {
        ladderName: 'Manager',
        currentBand: 2,
        activeGoal: true,
        goalProgress: 65,
        latestActivity: 4,
      },
    ],
    active: true,
    draft: true,
    deactivated: false,
  },
  {
    name: 'Tim Brooks',
    title: 'DevOps, Senior',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 4,
        activeGoal: true,
        goalProgress: 15,
        latestActivity: 3,
      },
    ],
    active: false,
    draft: true,
    deactivated: false,
  },
  {
    name: 'Marvin Joe',
    title: 'Engineering Manager, Senior',
    laddersDetails: [
      {
        ladderName: 'Front End',
        currentBand: 1,
        activeGoal: false,
        goalProgress: 0,
        latestActivity: 3,
      },
    ],
    active: false,
    draft: false,
    deactivated: true,
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

  const [activeTab, setActiveTab] = useState('Active');
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].value);
  const [activePeople, setActivePeople] = useState<Employee[]>();
  const [draftPeople, setDraftPeople] = useState<Employee[]>();
  const [deactivatedPeople, setDeactivatedPeople] = useState<Employee[]>();

  const selectedFilterLabel = FILTERS.find((option) => option.value === selectedFilter)?.label || '';

  const TABS = [
    {
      title: 'Active',
      employees: activePeople?.length,
    },
    {
      title: 'Drafts',
      employees: draftPeople?.length,
    },
    {
      title: 'Deactivated',
      employees: deactivatedPeople?.length,
    },
  ];

  useEffect(() => {
    const activePeople: Employee[] = [];
    const draftPeople: Employee[] = [];
    const deactivatedPeople: Employee[] = [];

    if (people) {
      people.forEach((employee: Employee) => {
        // Update people data in DB when status changed with PUT request

        if (employee.active) return activePeople.push(employee);
        if (employee.draft) return draftPeople.push(employee);
        if (employee.deactivated) return deactivatedPeople.push(employee);
      });

      setActivePeople(activePeople);
      setDraftPeople(draftPeople);
      setDeactivatedPeople(deactivatedPeople);
    }
  }, [people]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs breadcrumbs={[{ label: 'People', href: '/people', current: true }]} />
        <button className="py-2 px-5 text-white text-sm font-semibold bg-blue-800 rounded-full">+ Employee</button>
      </div>

      <Tabs active={activeTab} setActive={setActiveTab} tabs={TABS} className="border-b border-navy-200" />

      <div className="flex flex-col gap-2 bg-white rounded-2xl p-6 pb-2">
        <div className="w-1/3">
          <div className="w-full flex gap-4 items-center justify-between">
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
        </div>

        <table className="text-sm table-auto">
          <thead>
            <tr className="h-14 mx-4 text-xs uppercase text-navy-500 *:px-4 *:font-medium *:text-start">
              <th>Employee</th>
              <th>Ladder</th>
              <th className="[&]:text-end">Current Band</th>
              <th className="[&]:text-end">Active Goal</th>
              <th className="pr-4 [&]:pl-14">Goal Progress</th>
              <th className="[&]:text-center">Latest Activity</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {people.map((employee: Employee, index) => (
              <EmployeeCard employee={employee} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
