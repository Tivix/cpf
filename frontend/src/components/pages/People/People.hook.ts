import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PaginationParams, PeopleTableForm, peopleTableFormName } from './People.interface';
import { useQueryParams } from '@app/hooks';
import { Option } from '@app/types/common';
import { userStatus } from '@app/types/user';
import { useSearchParams } from 'next/navigation';
import { rowsPresets } from '@app/components/common/Pagination/Pagination';

const tabs = [
  { name: userStatus.active, id: userStatus.active },
  { name: userStatus.draft, id: userStatus.draft },
  { name: userStatus.deactivated, id: userStatus.deactivated },
];

export const usePeople = () => {
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({ offset: 0, limit: rowsPresets[0].id });

  const { setParams } = useQueryParams();
  const searchParams = useSearchParams();
  const searchNameParam = searchParams.get('search');
  const searchTabParam = searchParams.get('tab');

  const form = useForm<PeopleTableForm>({
    mode: 'onChange',
    defaultValues: {
      [peopleTableFormName.band]: null,
      [peopleTableFormName.search]: searchNameParam || null,
      [peopleTableFormName.rows]: rowsPresets[0] || null,
      [peopleTableFormName.page]: 1 || null,
    },
  });

  const [tab, setTab] = useState<Option>(tabs.find((tab) => tab.name === searchTabParam) || tabs[0]);
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

  useEffect(() => {
    form.setValue('page', 1);
  }, [form, values.rows]);

  const handleClearBand = () => {
    form.setValue('band', null);
  };

  useEffect(() => {
    setPaginationParams({
      offset: 0,
      limit: Number(values?.rows?.id),
    });
  }, [values?.rows]);

  useEffect(() => {
    setPaginationParams({
      offset: Number(values?.rows?.id) * (values?.page - 1 || 0),
      limit: Number(values?.rows?.id),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.page]);

  const onFormSubmit = () => null;

  const onPageChangeHandler = (page: number) => form.setValue('page', page);

  return {
    tab,
    setTab,
    tabs,
    form,
    handleClearBand,
    onFormSubmit,
    values,
    paginationParams,
    onPageChangeHandler,
  };
};
