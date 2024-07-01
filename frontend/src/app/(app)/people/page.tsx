'use client';

import { SearchIcon } from '@app/static/icons/SearchIcon';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { ListboxComponent } from '@app/components/common/ListboxComponent';
import { InputField } from '@app/components/common/InputField/InputField';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Employee } from '@app/types/common';
import { EmployeeCard } from '@app/components/modules/EmployeeCard';
import { filters, tabs } from '@app/const';
import { generateClassNames } from '@app/utils';

const PEOPLE = [
  {
    id: 426243,
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
    status: {
      active: true,
      draft: false,
      deactivated: false,
    },
  },
  {
    id: 5329732,
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
    status: {
      active: false,
      draft: false,
      deactivated: true,
    },
  },
  {
    id: 54328701,
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
    status: {
      active: false,
      draft: true,
      deactivated: false,
    },
  },
  {
    id: 4321,
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
    status: {
      active: true,
      draft: false,
      deactivated: false,
    },
  },
  {
    id: 489901,
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
    status: {
      active: false,
      draft: false,
      deactivated: true,
    },
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

  const activePeopleAmount = useMemo(() => people.filter((employee) => employee.status.active).length, [people]);
  const draftPeopleAmount = useMemo(() => people.filter((employee) => employee.status.draft).length, [people]);
  const deactivatedPeopleAmount = useMemo(
    () => people.filter((employee) => employee.status.deactivated).length,
    [people],
  );

  const peopleTabs = useMemo(() => {
    return [
      {
        title: tabs[0].title,
        employees: activePeopleAmount,
      },
      {
        title: tabs[1].title,
        employees: draftPeopleAmount,
      },
      {
        title: tabs[2].title,
        employees: deactivatedPeopleAmount,
      },
    ];
  }, [activePeopleAmount, draftPeopleAmount, deactivatedPeopleAmount]);

  useEffect(() => {
    if (people) {
      if (activeTab === peopleTabs[0].title) {
        setSelectedTabPeople(people.filter((employee) => employee.status.active));
      } else if (activeTab === peopleTabs[1].title) {
        setSelectedTabPeople(people.filter((employee) => employee.status.draft));
      } else {
        setSelectedTabPeople(people.filter((employee) => employee.status.deactivated));
      }
    }
  }, [people, activeTab, peopleTabs]);

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
        <button className="rounded-full bg-blue-800 px-5 py-2 text-sm font-semibold text-white">+ Employee</button>
      </div>

      <Tabs
        active={activeTab}
        setActive={(tab) => setActiveTabHandler(tab)}
        tabs={peopleTabs}
        className="border-b border-navy-200"
      />

      <div className="flex flex-col gap-2 rounded-2xl bg-white p-6 pb-2">
        <div className="w-1/3">
          <div className="flex w-full items-center justify-between gap-4">
            <InputField
              value={search}
              name="people-search"
              placeholder="Search"
              icon={<SearchIcon />}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ListboxComponent
              selectedOptionLabel={selectedFilterLabel}
              options={filters}
              selectedOptionValue={selectedFilter}
              setSelectedOption={setSelectedFilter}
              resetFilter={(event) => resetFilterHandler(event)}
            />
          </div>
        </div>

        <div
          className={generateClassNames(
            'grid auto-rows-[minmax(64px,_auto)] grid-cols-[auto_repeat(3,_160px)_248px_160px_48px] grid-rows-[56px]',
            {
              'grid-cols-[auto_repeat(2,_200px)_400px_48px]': activeTab === peopleTabs[1].title,
              'grid-cols-[400px_repeat(3,_1fr)]': activeTab === peopleTabs[2].title,
            },
          )}
        >
          <div className="contents text-xs font-medium uppercase text-navy-500 *:self-center *:px-4">
            <div>Employee</div>
            <div>Ladder</div>
            <div className="text-right">Current band</div>

            {activeTab === peopleTabs[0].title && (
              <>
                <div className="text-right">Active goal</div>
                <div className="[&]:pl-14">Goal progress</div>
                <div className="text-center">Latest activity</div>
              </>
            )}

            {activeTab === peopleTabs[1].title && <div className="[&]:pl-14">Action</div>}
            <div></div>
          </div>
          {filterPeople(selectedTabPeople)?.map((employee: Employee, index) => (
            <EmployeeCard key={index} employee={employee} tabSelected={activeTab} />
          ))}
        </div>
      </div>
    </div>
  );
}
