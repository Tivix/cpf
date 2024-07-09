'use client';

import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Tabs } from '@app/components/modules/Tabs';
import { ListboxComponent } from '@app/components/common/ListboxComponent';
import { ComboboxComponent } from '@app/components/common/ComboboxComponent';
import { MouseEvent, useEffect, useState } from 'react';
import { Employee, FetchedPeopleTypes, StatusType } from '@app/types/people';
import { EmployeeCard } from '@app/components/modules/EmployeeCard';
import { bands, tabs } from '@app/const';
import { generateClassNames } from '@app/utils';
import { Pagination } from '@app/components/common/Pagination/Pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { getPeople } from '@app/api/people';

// DELETE WHEN API AVAILABLE

const PEOPLE_DETAILS = {
  total: 100,
  page: 1,
  count: 11,
  results: [
    {
      id: 4262433,
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
      status: StatusType,
    },
    {
      id: 42624,
      name: 'Marvin',
      title: 'DevOps Developer',
      laddersDetails: [
        {
          ladderName: 'DevOps',
          currentBand: 5,
          activeGoal: false,
          goalProgress: 65,
          latestActivity: 2,
        },
        {
          ladderName: 'Manager',
          currentBand: 1,
          activeGoal: false,
          goalProgress: 25,
          latestActivity: 4,
        },
        {
          ladderName: 'QA',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 35,
          latestActivity: 1,
        },
      ],
      status: StatusType,
    },
    {
      id: 9933,
      name: 'Joe',
      title: 'Back-end',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 3,
          activeGoal: true,
          goalProgress: 45,
          latestActivity: 3,
        },
      ],
      status: StatusType,
    },
    {
      id: 493683,
      name: 'John',
      title: 'Back-end, Regular',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 2,
          activeGoal: false,
          goalProgress: 15,
          latestActivity: 2,
        },
      ],
      status: StatusType,
    },
    {
      id: 422433,
      name: 'Joe',
      title: 'Back-end, Senior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 1,
          activeGoal: true,
          goalProgress: 45,
          latestActivity: 3,
        },
      ],
      status: StatusType,
    },
    {
      id: 4893,
      name: 'Alex',
      title: 'Junior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 45,
          latestActivity: 3,
        },
      ],
      status: StatusType,
    },
    {
      id: 42673,
      name: 'Joe',
      title: 'QA, Junior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 4,
          activeGoal: true,
          goalProgress: 25,
          latestActivity: 2,
        },
      ],
      status: StatusType,
    },
    {
      id: 4773,
      name: 'John',
      title: 'QA, Junior',
      laddersDetails: [
        {
          ladderName: 'QA',
          currentBand: 2,
          activeGoal: true,
          goalProgress: 95,
          latestActivity: 2,
        },
      ],
      status: StatusType,
    },
    {
      id: 33,
      name: 'J. Adams',
      title: 'DevOps, Junior',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 5,
          activeGoal: true,
          goalProgress: 75,
          latestActivity: 4,
        },
      ],
      status: StatusType,
    },
    {
      id: 433,
      name: 'Fred',
      title: 'Front End, Junior',
      laddersDetails: [
        {
          ladderName: 'QA',
          currentBand: 3,
          activeGoal: true,
          goalProgress: 35,
          latestActivity: 2,
        },
      ],
      status: StatusType,
    },
    {
      id: 42243,
      name: 'Joe',
      title: 'QA, Regular',
      laddersDetails: [
        {
          ladderName: 'Back End',
          currentBand: 4,
          activeGoal: false,
          goalProgress: 75,
          latestActivity: 2,
        },
      ],
      status: StatusType,
    },
  ],
  active: 11,
  draft: 80,
  deactivated: 9,
};

export default function People() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const pageParam = searchParams.get('page');
  const bandParam = searchParams.get('band');

  const [tab, setTab] = useState(tabParam ? tabParam : 'active');
  const [page, setPage] = useState(pageParam ? +pageParam : 1);
  const [band, setBand] = useState(bandParam ? bandParam : bands[0].value);
  const [fetchedPeople, setFetchedPeople] = useState<Employee[]>();
  const [fetchedPeopleTypes, setFetchedPeopleTypes] = useState<FetchedPeopleTypes>();
  const [peopleTypeAmount, setPeopleTypeAmount] = useState(-1);

  const selectedFilterLabel = bands.find((option) => option.value === band)?.label || 'Current band';

  const peopleTabs = [
    {
      title: tabs[0].title,
      employees: fetchedPeopleTypes?.active,
    },
    {
      title: tabs[1].title,
      employees: fetchedPeopleTypes?.draft,
    },
    {
      title: tabs[2].title,
      employees: fetchedPeopleTypes?.deactivated,
    },
  ];

  useEffect(() => {
    if (tabParam && tabParam !== tab) {
      setTab(tabParam);
    }
    if (pageParam && +pageParam !== page) {
      setPage(+pageParam);
    }
    if (bandParam && bandParam !== band.split('_')[1]) {
      bandParam && setBand(bands.filter((band) => band.id - 1 === +bandParam)[0].value);
    }
  }, [tabParam, pageParam, bandParam, band, page, tab]);

  useEffect(() => {
    getPeopleDetails(tab, page.toString(), band);
  }, [tab, page, band]);

  const getPeopleDetails = async (tab: string, page: string, band: string): Promise<void> => {
    // UNCOMMENT WHEN API AVAILABLE AND DELETE CONSOLE.LOG - ESLINT ERROR NO UNUSED VARS
    const people = await getPeople(tab, page, band.split('_')[1]);
    console.log('FETCHED PEOPLE', people);

    const fetchedPeopleGroups = {
      active: PEOPLE_DETAILS.active,
      draft: PEOPLE_DETAILS.draft,
      deactivated: PEOPLE_DETAILS.deactivated,
    };
    // const fetchedPeopleGroups = {
    //   active: people.active,
    //   draft: people.draft,
    //   deactivated: people.deactivated
    // }
    setFetchedPeople(PEOPLE_DETAILS.results);
    // setFetchedPeople(people.results);
    setFetchedPeopleTypes(fetchedPeopleGroups);
    setPeopleTypeAmount(PEOPLE_DETAILS.count);
    // setPeopleTypeAmount(people.count);
  };

  const urlChangeHandler = (
    passedTab: string = tab,
    passedPage: string = page.toString(),
    passedBand: string = band,
  ) => {
    const bandQuery = passedBand ? `&band=${passedBand}` : '';
    router.push(`${pathname}?tab=${passedTab}&page=${passedPage}${bandQuery}`);
  };

  const tabClickHandler = (tab: string) => {
    band !== bands[0].value && setBand(bands[0].value);
    urlChangeHandler(tab, '1', '');
  };

  const pageClickHandler = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, pageNumber?: number) => {
    if (!pageNumber) return urlChangeHandler(undefined, event.currentTarget.value, band.split('_')[1]);

    urlChangeHandler(undefined, pageNumber.toString(), band.split('_')[1]);
  };

  const bandChangeHandler = (band: string) => {
    !band && setBand(bands[0].value);
    urlChangeHandler(undefined, '1', band && band.split('_')[1]);
  };

  const resetBandHandler = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.stopPropagation();
    setBand(bands[0].value);
    urlChangeHandler(tab, '1', bands[0].value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs breadcrumbs={[{ label: 'People', href: '/people', current: true }]} />
        <button className="rounded-full bg-blue-800 px-5 py-2 text-sm font-semibold text-white">+ Employee</button>
      </div>

      <Tabs
        active={tab}
        setActive={(tab) => tabClickHandler(tab)}
        tabs={peopleTabs}
        className="border-b border-navy-200"
      />

      <div className="flex flex-col gap-2 rounded-2xl bg-white p-6 pb-2">
        <div>
          <div className="flex gap-3">
            <ComboboxComponent
            // people={selectedTabPeople}
            // setSearchedPerson={(person) => displaySearchbarResults(person)}
            />
            <ListboxComponent
              selectedOptionLabel={selectedFilterLabel}
              options={bands}
              selectedOptionValue={band}
              setSelectedOption={(band) => bandChangeHandler(band)}
              resetFilter={(event) => resetBandHandler(event)}
            />
          </div>
        </div>

        <div
          className={generateClassNames(
            'grid auto-rows-[minmax(64px,_auto)] grid-cols-[auto_repeat(3,_160px)_248px_160px_48px] grid-rows-[56px]',
            {
              'grid-cols-[auto_repeat(2,_200px)_400px_48px]': tab === peopleTabs[1].title,
              'grid-cols-[400px_repeat(3,_1fr)]': tab === peopleTabs[2].title,
            },
          )}
        >
          <div className="contents text-xs font-medium uppercase text-navy-500 *:self-center *:px-4">
            <div>Employee</div>
            <div>Ladder</div>
            <div className="text-right">Current band</div>

            {tab === peopleTabs[0].title && (
              <>
                <div className="text-right">Active goal</div>
                <div className="[&]:pl-14">Goal progress</div>
                <div className="text-center">Latest activity</div>
              </>
            )}

            {tab === peopleTabs[1].title && <div className="[&]:pl-14">Action</div>}
            <div></div>
          </div>
          {fetchedPeople?.map((employee: Employee, index) => (
            <EmployeeCard key={index} employee={employee} tabSelected={tab} />
          ))}
        </div>

        <Pagination
          itemsAmount={peopleTypeAmount}
          setPageNumber={(e, number) => pageClickHandler(e, number)}
          pageNumber={page}
        />
      </div>
    </div>
  );
}
