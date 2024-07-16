import { MouseEvent, useEffect, useState } from 'react';
import { Employee, StatusType } from '@app/types/people';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { PEOPLE_DETAILS } from './People.utils';
import { useForm } from 'react-hook-form';
import { PeopleTableForm, peopleTableFormName } from './People.interface';

export const usePeople = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<PeopleTableForm>({
    mode: 'onChange',
    defaultValues: {
      [peopleTableFormName.band]: {},
      [peopleTableFormName.search]: '',
    },
  });

  const tabParam = searchParams.get('tab');
  const pageParam = searchParams.get('page');
  const bandParam = searchParams.get('band');

  const [activeTab, setActiveTab] = useState(tabParam || 'active');
  const [page, setPage] = useState(Number(pageParam) || 1);

  const [fetchedPeople, setFetchedPeople] = useState<Employee[]>();
  const [tabsData, setTabsData] = useState([
    {
      title: StatusType.active,
      count: 0,
    },
    {
      title: StatusType.draft,
      count: 0,
    },
    {
      title: StatusType.deactivated,
      count: 0,
    },
  ]);

  const [peopleTypeAmount, setPeopleTypeAmount] = useState(-1);
  const [pagePosition, setPagePosition] = useState(1);

  useEffect(() => {
    const selectedPagePosition =
      pageParam && document.querySelector(`[data-page="${pageParam}"]`)?.getAttribute('data-position');

    selectedPagePosition && setPagePosition(+selectedPagePosition);
  }, [pageParam]);

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
    if (pageParam && +pageParam !== page) {
      setPage(+pageParam);
    }
  }, [tabParam, pageParam, bandParam, activeTab, page]);

  useEffect(() => {
    getPeopleDetails(activeTab);
  }, [activeTab, page]);

  const getPeopleDetails = async (tab: string): Promise<void> => {
    const people = PEOPLE_DETAILS;
    console.log('people', people);
    console.log('tab', tab);
    const filteredPeople = people.results.filter(
      (person) => person.status.toLocaleLowerCase() === tab.toLocaleLowerCase(),
    );

    setTabsData([
      {
        title: StatusType.active,
        count: people.active,
      },
      {
        title: StatusType.draft,
        count: people.draft,
      },
      {
        title: StatusType.deactivated,
        count: people.deactivated,
      },
    ]);

    setFetchedPeople(filteredPeople);
    setPeopleTypeAmount(people.count);
  };

  const urlChangeHandler = (passedTab: string = activeTab, passedPage: string = page.toString()) => {
    router.push(`${pathname}?tab=${passedTab}&page=${passedPage}`);
  };

  const tabClickHandler = (tab: string) => {
    urlChangeHandler(tab, '1');
  };

  const pageClickHandler = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, pageNumber?: number) => {
    const clickedPagePosition = event.currentTarget.dataset.position;
    clickedPagePosition && setPagePosition(+clickedPagePosition);

    if (!pageNumber) return urlChangeHandler(undefined, event.currentTarget.innerText);

    urlChangeHandler(undefined, pageNumber.toString());
  };

  const bandChangeHandler = () => {
    urlChangeHandler(undefined, '1');
  };

  const resetBandHandler = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.stopPropagation();
    urlChangeHandler(activeTab, '1');
  };

  return {
    activeTab,
    tabClickHandler,
    tabsData,
    bandChangeHandler,
    resetBandHandler,
    pageClickHandler,
    fetchedPeople,
    peopleTypeAmount,
    page,
    pagePosition,
    form,
  };
};
