'use client';

import { SearchIcon } from '@app/static/icons/SearchIcon';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { InputField } from '@app/components/common/InputField/InputField';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Employee } from '@app/types/common';
import { EmployeeCard } from '@app/components/common/EmployeeCard';
import { filters, tabs } from '@app/const';
import { generateClassNames } from '@app/utils';

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
    draft: false,
    deactivated: false,
  },
  {
    name: 'Jane Doe',
    title: 'Back End Developer, Senior',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 5,
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
    active: false,
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
    active: true,
    draft: false,
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
  const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
  const [selectedTabPeople, setSelectedTabPeople] = useState<Employee[]>();

  const selectedFilterLabel = filters.find((option) => option.value === selectedFilter)?.label || '';

  const activePeopleAmount = useMemo(() => people.filter((employee) => employee.active).length, [people]);
  const draftPeopleAmount = useMemo(() => people.filter((employee) => employee.draft).length, [people]);
  const deactivatedPeopleAmount = useMemo(() => people.filter((employee) => employee.deactivated).length, [people]);

  const TABS = [
    {
      title: tabs[0],
      employees: activePeopleAmount,
    },
    {
      title: tabs[1],
      employees: draftPeopleAmount,
    },
    {
      title: tabs[2],
      employees: deactivatedPeopleAmount,
    },
  ];

  useEffect(() => {
    if (people) {
      if (activeTab === TABS[0].title) {
        setSelectedTabPeople(people.filter((employee) => employee.active));
      } else if (activeTab === TABS[1].title) {
        setSelectedTabPeople(people.filter((employee) => employee.draft));
      } else {
        setSelectedTabPeople(people.filter((employee) => employee.deactivated));
      }
    }
  }, [people, activeTab]);

  const resetFilterHandler = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.stopPropagation();
    setSelectedFilter(filters[0].value);
  };

  const filterPeople = (people?: Employee[]) => {
    if (selectedFilter === filters[0].value) return people;

    return people?.filter((employee: Employee) =>
      employee.laddersDetails.find((ladder) => ladder.currentBand === +selectedFilter.split('_')[1]),
    );
  };

  const setActiveTabHandler = (tab: string) => {
    setActiveTab(tab);
    setSelectedFilter(filters[0].value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs breadcrumbs={[{ label: 'People', href: '/people', current: true }]} />
        <button className="py-2 px-5 text-white text-sm font-semibold bg-blue-800 rounded-full">+ Employee</button>
      </div>

      <Tabs
        active={activeTab}
        setActive={(tab) => setActiveTabHandler(tab)}
        tabs={TABS}
        className="border-b border-navy-200"
      />

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
              options={filters}
              selectedOptionValue={selectedFilter}
              setSelectedOption={setSelectedFilter}
              resetFilter={(event) => resetFilterHandler(event)}
            />
          </div>
        </div>

        <table className="text-sm table-auto">
          <thead>
            <tr
              className={generateClassNames(
                'h-14 text-xs uppercase text-navy-500 *:px-4 *:py-0 *:font-medium *:text-start',
                {
                  '*:w-40': activeTab === TABS[0].title,
                  '*:w-[200px]': activeTab === TABS[1].title,
                  '[&&>*]:w-1/4': activeTab === TABS[2].title,
                },
              )}
            >
              <th
                className={generateClassNames('[&]:w-auto', {
                  'flex items-center [&&]:w-[400px] h-14': activeTab === TABS[2].title,
                })}
              >
                Employee
              </th>
              <th>Ladder</th>
              <th className="[&]:text-end">Current Band</th>
              {activeTab === TABS[0].title && (
                <>
                  <th className="[&]:text-end">Active Goal</th>
                  <th className="[&]:w-[248px] [&]:pl-14">Goal Progress</th>
                  <th className="[&]:text-center">Latest Activity</th>
                </>
              )}
              {activeTab === TABS[1].title && <th className="[&]:w-[400px] [&]:pl-14">Action</th>}
              <th className="[&]:w-12" />
            </tr>
          </thead>

          <tbody>
            {filterPeople(selectedTabPeople)?.map((employee: Employee, index) => (
              <EmployeeCard key={index} employee={employee} tabSelected={activeTab} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
