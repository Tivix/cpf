import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PEOPLE_DETAILS } from './People.utils';
import { useForm } from 'react-hook-form';
import { Employee, PeopleDetails, PeopleStatus, PeopleTableForm, peopleTableFormName } from './People.interface';
import { useQueryParams } from '@app/hooks';
import { Option } from '@app/types/common';

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

  const [tab, setTab] = useState<Option<keyof typeof PeopleStatus> | undefined>();
  const [fetchedPeople, setFetchedPeople] = useState<PeopleDetails>();
  const [filteredPeople, setFilteredPeople] = useState<Employee[]>([]);
  const [tabsData, setTabsData] = useState<Option<keyof typeof PeopleStatus>[]>([]);
  const { setParams } = useQueryParams();
  const values = form.watch();

  const fetchPeople = useCallback(async () => {
    setFetchedPeople(PEOPLE_DETAILS);
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  // INFO: set all available tabs
  useEffect(() => {
    if (fetchedPeople) {
      const tabs: Option<keyof typeof PeopleStatus>[] = [
        { name: `${PeopleStatus.active} (${fetchedPeople.active})`, id: PeopleStatus.active },
        { name: `${PeopleStatus.drafts} (${fetchedPeople.draft})`, id: PeopleStatus.drafts },
        { name: `${PeopleStatus.deactivated} (${fetchedPeople.deactivated})`, id: PeopleStatus.deactivated },
      ];
      setTabsData(tabs);
    }
  }, [fetchedPeople]);

  // INFO: set current tab based on url param
  useEffect(() => {
    if (tabParam) {
      const currentTab = tabsData.find((tab) => tab.id === tabParam);
      setTab(currentTab);
    }
  }, [tabParam, tabsData]);

  useEffect(() => {
    setParams({ band: values?.band?.id });
  }, [setParams, values.band]);

  // INFO: set people based on filters
  useEffect(() => {
    const filteredPeople = fetchedPeople?.results.filter(
      (person) => person?.status?.toLocaleLowerCase() === tab?.id.toLocaleLowerCase(),
    );

    if (filteredPeople) {
      setFilteredPeople(filteredPeople);
    }
  }, [fetchedPeople, tab?.id]);

  const handleChangeTab = (newTab: Option) => {
    setParams({ tab: newTab.id });
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
