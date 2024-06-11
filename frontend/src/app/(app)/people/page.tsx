'use client';

import Image from 'next/image';
import { DotsIcon } from '@app/static/icons/DotsIcon';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { SearchIcon } from '@app/static/icons/SearchIcon';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { InputField } from '@app/components/common/InputField/InputField';
import { useState } from 'react';

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
  },
  {
    name: 'Jane Doe',
    title: 'Back End Developer, Senior',
    ladder: 'Back End',
    currentBand: 6,
    activeGoal: false,
    goalProgress: 0,
    latestActivity: 0,
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

  const selectedFilterLabel = FILTERS.find((option) => option.value === selectedFilter)?.label || '';

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
          {people.map((person) => (
            <tr className="text-navy-700 text-sm w-full px-4 gap-2 p-10 border-t border-navy-200" key={person.name}>
              <td className="p-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 overflow-hidden rounded-full relative">
                    <Image
                      width={256}
                      height={256}
                      alt=""
                      src="/images/image.jpeg"
                      className="overflow-hidden w-full h-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-navy-900 text-sm">{person.name}</h3>
                    <p className="text-navy-600 text-sm">{person.title}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">{person.ladder}</td>
              <td className="p-4 text-end">{person.currentBand}</td>
              <td className="text-navy-600 text-base p-4">
                <div className="flex justify-end">{person.activeGoal ? <CheckmarkIcon /> : null}</div>
              </td>
              <td className="p-4 text-end">
                {person.activeGoal && (
                  <div className="flex items-center gap-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 bg-navy-300">
                      <div className={`bg-blue-800 h-2 rounded-full w-[${person.goalProgress * 100}%]`} />
                    </div>
                    <p>{person.goalProgress * 100}%</p>
                  </div>
                )}
              </td>
              <td className="p-4 justify-center">
                <div className="flex justify-center">
                  <div className="bg-blue-800 p-2 rounded-full text-white w-7 h-7 font-semibold text-center items-center flex justify-center">
                    {person.latestActivity}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="bg-white cursor-pointer">
                  <DotsIcon className="w-6 h-6 rounded-full bg-white" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
