import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PeopleTableForm, peopleTableFormName } from './People.interface';
import { useQueryParams } from '@app/hooks';
import { Option } from '@app/types/common';
import { userStatus } from '@app/types/user';
import { useSearchParams } from 'next/navigation';

const tabs = [
  { name: userStatus.active, id: userStatus.active },
  { name: userStatus.draft, id: userStatus.draft },
  { name: userStatus.deactivated, id: userStatus.deactivated },
];

export const usePeople = () => {
  const { setParams } = useQueryParams();
  const searchParams = useSearchParams();
  const searchNameParam = searchParams.get('search');

  const form = useForm<PeopleTableForm>({
    mode: 'onChange',
    defaultValues: {
      [peopleTableFormName.band]: null,
      [peopleTableFormName.search]: searchNameParam || null,
    },
  });

  const [tab, setTab] = useState<Option>(tabs[0]);
  const values = form.watch();

  const handleParamsChange = useCallback(() => {
    const params = {
      tab: tab.id,
      search: values?.search || null,
    };

    setParams(params);
  }, [setParams, tab, values?.search]);

  useEffect(() => {
    handleParamsChange();
  }, [handleParamsChange, values?.search, tab]);

  useEffect(() => {
    if (values?.band?.id) {
      setParams({ band: values?.band?.id });
    }
  }, [setParams, values.band]);

  useEffect(() => {
    if (values?.band?.id) {
      setParams({ band: values?.band?.id });
    }
  }, [setParams, values.band]);

  const handleClearBand = () => {
    form.setValue('band', null);
  };

  return {
    tab,
    setTab,
    tabs,
    form,
    handleClearBand,
    values,
  };
};
