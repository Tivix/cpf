'use client';
import { Typography } from '@app/components/common/Typography';
import { MySpaceProps } from './MySpace.interface';
import { Header } from './modules/Header';
import { Tabs } from '@app/components/common/Tabs';
import { useMySpace } from './MySpace.hooks';
import { mySpaceTabs } from './contants';
import { LadderTab } from './modules/LadderTab';
import Link from 'next/link';
import { PlusIcon } from '@app/static/icons/PlusIcon';
import { routes } from '@app/constants';
import { Button } from '@app/components/common/Button';

export const MySpace: React.FC<MySpaceProps> = ({ user, ladder }) => {
  const { currentTab, setCurrentTab } = useMySpace();

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="body-l/semibold" as="h1">
        My Space
      </Typography>
      <Header
        user={user}
        currentLevel={{ band: ladder?.userLadder?.band?.bandNumber, score: -Infinity }}
        nextLevel={{ band: ladder?.nextBand?.bandNumber, threshold: ladder?.nextBand?.threshold }}
      />
      <Tabs tabs={mySpaceTabs} current={currentTab} onTabChange={setCurrentTab} className="justify-center" />
      <div>
        <div className="flex items-center justify-between">
          <Typography variant="body-m/regular" className="text-navy-600">
            Complete various skills through a single project.
          </Typography>
          <Button className="h-auto p-0">
            <Link
              href={routes.mySpace.addNew.projectDetails}
              className="flex h-11 w-[166px] flex-1 items-center justify-center text-sm"
            >
              <PlusIcon className="mr-2" />
              <div className="font-semibold">Create project</div>
            </Link>
          </Button>
        </div>
        {currentTab.id === 'ladder' && ladder && <LadderTab bands={ladder.bands} ladder={ladder?.userLadder} />}
      </div>
    </div>
  );
};
