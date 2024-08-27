'use client';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { usePeople } from './People.hook';
import Link from 'next/link';
import { FormProvider } from '@app/components/common/FormProvider';
import { Input } from '@app/components/common/Input';
import { SearchIcon } from '@app/static/icons/SearchIcon';
import { bands } from './People.utils';
import { PeopleProps, PeopleTableForm, peopleTableFormName } from './People.interface';
import { routes } from '@app/constants';
import { Button } from '@app/components/common/Button';
import { Listbox } from '@app/components/common/Listbox';
import { PeopleTable } from './Modules/PeopleTable';
import { Tabs } from '@app/components/common/Tabs';
import { PlusIcon } from '@app/static/icons/PlusIcon';

import { FC } from 'react';

export const People: FC<PeopleProps> = ({ data }) => {
  const { tab, setTab, tabs, form, handleClearBand } = usePeople();

  return (
    <FormProvider<PeopleTableForm> form={form}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs breadcrumbs={[{ label: 'People', href: '/people', current: true }]} />
          <Button className="h-auto p-0">
            <Link
              href={routes.people.addNew.personalDetails}
              className="flex h-11 w-[136px] flex-1 items-center justify-center text-sm"
            >
              <PlusIcon className="mr-2" />
              <div className="font-semibold">Employee</div>
            </Link>
          </Button>
        </div>

        <Tabs current={tab} onTabChange={setTab} tabs={tabs} />
        {Array.isArray(data) && data.length > 0 ? (
          <>
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-6">
              <div className="w-2/5">
                <div className="flex flex-wrap gap-3 lg:flex-nowrap">
                  <Input
                    name="search"
                    className="min-w-[304px]"
                    placeholder="Search"
                    leftIcon={<SearchIcon className="h-4 w-4" />}
                  />
                  <Listbox
                    options={bands}
                    name={peopleTableFormName.band}
                    placeholder="Current band"
                    onClear={handleClearBand}
                    className="min-w-[160px]"
                  />
                </div>
              </div>
              <PeopleTable currentTab={tab} people={data} />
            </div>
          </>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </FormProvider>
  );
};
