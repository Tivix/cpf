'use client';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { usePeople } from './People.hook';
import Link from 'next/link';
import { FormProvider } from '@app/components/common/FormProvider';
import { Input } from '@app/components/common/Input';
import { SearchIcon } from '@app/static/icons/SearchIcon';
import { bands } from './People.utils';
import { PeopleTableForm, peopleTableFormName } from './People.interface';
import { routes } from '@app/constants';
import { Button } from '@app/components/common/Button';
import { Listbox } from '@app/components/common/Listbox';
import { PeopleTable } from './Modules/PeopleTable';
import { Tabs } from '@app/components/common/Tabs';
import { PlusIcon } from '@app/static/icons/PlusIcon';

export const People = () => {
  const { tab, handleChangeTab, tabsData, filteredPeople, form, handleClearBand } = usePeople();

  return (
    <FormProvider<PeopleTableForm> form={form}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs breadcrumbs={[{ label: 'People', href: '/people', current: true }]} />
          <Button>
            <Link href={routes.people.addNew.personalDetails} className="flex items-center text-sm">
              <PlusIcon className="mr-2" />
              <div>Employee</div>
            </Link>
          </Button>
        </div>

        {tab && <Tabs current={tab} onTabChange={handleChangeTab} tabs={tabsData} />}
        <div className="flex flex-col gap-2 rounded-2xl bg-white p-6">
          <div className="w-2/5">
            <div className="flex gap-3">
              <Input name="search" placeholder="Search" leftIcon={<SearchIcon className="h-4 w-4" />} />
              <Listbox
                options={bands}
                name={peopleTableFormName.band}
                placeholder="Current band"
                onClear={handleClearBand}
              />
            </div>
          </div>
          <PeopleTable people={filteredPeople} />
        </div>
      </div>
    </FormProvider>
  );
};
