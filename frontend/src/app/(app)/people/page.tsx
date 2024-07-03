'use client';

import { SearchIcon } from '@app/static/icons/SearchIcon';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { ListboxComponent } from '@app/components/common/ListboxComponent';
import { InputField } from '@app/components/common/InputField/InputField';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Employee } from '@app/types/common';
import { EmployeeCard } from '@app/components/modules/EmployeeCard';
import { filters, rowsPerPage, tabs } from '@app/const';
import { generateClassNames } from '@app/utils';
import { Pagination } from '@app/components/common/Pagination/Pagination';

const PEOPLE = [
  {
    id: 426243,
    name: 'A. Smith',
    title: 'Front-End Developer, Junior',
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
    title: 'Back-End Developer, Senior',
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
      active: true,
      draft: false,
      deactivated: false,
    },
  },
  {
    id: 54328701,
    name: 'Thomas Anderson',
    title: 'QA, Seniorr',
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
      {
        ladderName: 'Front End',
        currentBand: 2,
        activeGoal: true,
        goalProgress: 95,
        latestActivity: 2,
      },
    ],
    status: {
      active: true,
      draft: false,
      deactivated: false,
    },
  },
  {
    id: 4321,
    name: 'Tim B.',
    title: 'DevOps, Regular',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 2,
        activeGoal: false,
        goalProgress: 15,
        latestActivity: 3,
      },
      {
        ladderName: 'Front End',
        currentBand: 1,
        activeGoal: true,
        goalProgress: 45,
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
    id: 489901,
    name: 'Marvin Joes',
    title: 'Engineering Manager, Junior',
    laddersDetails: [
      {
        ladderName: 'Front End',
        currentBand: 2,
        activeGoal: false,
        goalProgress: 0,
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
    id: 426243,
    name: 'John Doe',
    title: 'Front End Developer',
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
    title: 'Back End Developer, Junior',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 2,
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
    title: 'QA',
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
        activeGoal: false,
        goalProgress: 65,
        latestActivity: 4,
      },
      {
        ladderName: 'QA',
        currentBand: 1,
        activeGoal: true,
        goalProgress: 75,
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
    id: 4321,
    name: 'T. Brooks',
    title: 'DevOps, Intern',
    laddersDetails: [
      {
        ladderName: 'Back End',
        currentBand: 2,
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
    name: 'M. Joe',
    title: 'Engineering Manager',
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
      active: true,
      draft: false,
      deactivated: false,
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
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredPeople, setFilteredPeople] = useState<Employee[]>();

  const selectedFilterLabel = filters.find((option) => option.value === selectedFilter)?.label || '';

  const activePeople = useMemo(() => people.filter((employee) => employee.status.active), [people]);
  const draftPeople = useMemo(() => people.filter((employee) => employee.status.draft), [people]);
  const deactivatedPeople = useMemo(() => people.filter((employee) => employee.status.deactivated), [people]);

  const peopleTabs = useMemo(() => {
    return [
      {
        title: tabs[0].title,
        employees: activePeople.length,
      },
      {
        title: tabs[1].title,
        employees: draftPeople.length,
      },
      {
        title: tabs[2].title,
        employees: deactivatedPeople.length,
      },
    ];
  }, [activePeople, draftPeople, deactivatedPeople]);

  useEffect(() => {
    if (people) {
      if (activeTab === peopleTabs[0].title) {
        setSelectedTabPeople(activePeople);
      } else if (activeTab === peopleTabs[1].title) {
        setSelectedTabPeople(draftPeople);
      } else {
        setSelectedTabPeople(deactivatedPeople);
      }
    }
  }, [people, activeTab, peopleTabs, activePeople, draftPeople, deactivatedPeople]);

  useEffect(() => {
    if (selectedTabPeople) {
      const filteredPeople = filterPeople(selectedTabPeople);

      setFilteredPeople(filteredPeople);
      setPageNumber(1);
    }
  }, [selectedFilter, selectedTabPeople]);

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

  const paginatePeople = (people?: Employee[]) => {
    return people?.slice(pageNumber * rowsPerPage - rowsPerPage, rowsPerPage * pageNumber);
  };

  const setActiveTabHandler = (tab: string) => {
    setActiveTab(tab);
    setSelectedFilter(filters[0].value);
  };

  const pageClickHandler = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, pageNumber?: number) => {
    if (!pageNumber) return setPageNumber(+event.currentTarget.value);

    setPageNumber(pageNumber);
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
          {paginatePeople(filteredPeople)?.map((employee: Employee, index) => (
            <EmployeeCard key={index} employee={employee} tabSelected={activeTab} />
          ))}
        </div>

        <Pagination
          itemsAmount={filteredPeople?.length}
          setPageNumber={(e, number) => pageClickHandler(e, number)}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
}
