'use client';
import { Typography } from '@app/components/common/Typography';
import { MySpaceProps } from './MySpace.interface';
import { Header } from '@app/components/pages/MySpace/modules/Header';
import { Tabs } from '@app/components/common/Tabs';
import { useMySpace } from './MySpace.hooks';
import { mySpaceTabs } from './contants';

export const MySpace: React.FC<MySpaceProps> = ({ data }) => {
  const { user, currentLevel, nextLevel } = data;
  const { currentTab, setCurrentTab } = useMySpace();

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="body-l/semibold" as="h1">
        My Space
      </Typography>
      <Header user={user} currentLevel={currentLevel} nextLevel={nextLevel} />
      <Tabs tabs={mySpaceTabs} currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};