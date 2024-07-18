import { useCallback, useEffect, useState } from 'react';
import { Employee, PeopleDetails, StatusType } from '@app/types/people';
import { useSearchParams } from 'next/navigation';
import { PEOPLE_DETAILS } from './People.utils';
import { useForm } from 'react-hook-form';
import { PeopleTableForm, peopleTableFormName } from './People.interface';
import { Option } from '@app/components/common/Combobox';

export const usePeople = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const form = useForm<PeopleTableForm>({
    mode: 'onChange',
    defaultValues: {
      [peopleTableFormName.band]: null,
      [peopleTableFormName.search]: '',
    },
  });

  const [tab, setTab] = useState<Option | undefined>();
  const [fetchedPeople, setFetchedPeople] = useState<PeopleDetails>();
  const [filteredPeople, setFilteredPeople] = useState<Employee[]>([]);
  const [tabsData, setTabsData] = useState<Option[]>([]);

  const fetchPeople = useCallback(async () => {
    setFetchedPeople(PEOPLE_DETAILS);
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  // INFO: set all available tabs
  useEffect(() => {
    if (fetchedPeople) {
      const tabs: Option[] = [
        { name: `${StatusType.active} (${fetchedPeople.active})`, id: StatusType.active },
        { name: `${StatusType.deactivated} (${fetchedPeople.deactivated})`, id: StatusType.deactivated },
        { name: `${StatusType.draft} (${fetchedPeople.draft})`, id: StatusType.draft },
      ];
      setTabsData(tabs);
    }
  }, [fetchedPeople]);

  // INFO: set current tab
  useEffect(() => {
    if (tabParam) {
      const currentTab = tabsData.find((tab) => tab.id === tabParam);
      setTab(currentTab);
    }
  }, [tabParam, tabsData]);

  // TODO: use url params update hook to set new band in url.
  // useEffect(() => {
  //   if (values.band) {
  //     urlChangeHandler(tab, 1, values.band);
  //   }
  // }, [tab, urlChangeHandler, values]);

  // INFO: set people based on filters
  useEffect(() => {
    const filteredPeople = fetchedPeople?.results.filter(
      (person) => person.status.toLocaleLowerCase() === tab?.id.toLocaleLowerCase(),
    );

    if (filteredPeople) {
      setFilteredPeople(filteredPeople);
    }
  }, [fetchedPeople, tab?.id]);

  const handleChangeTab = (newTab: Option) => {
    console.log('newTab', newTab);

    // TODO: use url params update hook to set new tab in url.
    // urlChangeHandler(pressedTab);
  };

  const handleClearBand = () => {
    form.setValue('band', null);
  };

  return {
    tab,
    handleChangeTab,
    tabsData,
    filteredPeople,
    form,
    handleClearBand,
  };
};
