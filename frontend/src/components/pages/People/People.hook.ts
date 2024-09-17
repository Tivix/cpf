import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PeopleTableForm, peopleTableFormName } from './People.interface';
import { useQueryParams } from '@app/hooks';
import { Option } from '@app/types/common';
import { userStatus } from '@app/types/user';

const tabs = [
  { name: userStatus.active, id: userStatus.active },
  { name: userStatus.draft, id: userStatus.draft },
  { name: userStatus.deactivated, id: userStatus.deactivated },
];

export const usePeople = () => {
  const form = useForm<PeopleTableForm>({
    mode: 'onChange',
    defaultValues: {
      [peopleTableFormName.band]: null,
      [peopleTableFormName.search]: '',
    },
  });

  const [tab, setTab] = useState<Option>(tabs[0]);
  const { setParams } = useQueryParams();
  const values = form.watch();

  const handleChangeTab = useCallback(() => {
    setParams({ tab: tab.id });
  }, [setParams, tab]);

  useEffect(() => {
    handleChangeTab();
  }, [handleChangeTab, tab]);

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
  };
};
