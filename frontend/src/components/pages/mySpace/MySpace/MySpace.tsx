'use client';
import { Typography } from '@app/components/common/Typography';
import { MySpaceProps } from './MySpace.interface';
import { Header } from './modules/Header';
import { Tabs } from '@app/components/common/Tabs';
import { useMySpace } from './MySpace.hooks';
import { mySpaceTabs } from './contants';
import { LadderTab } from './modules/LadderTab';

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
        {currentTab.id === 'ladder' && ladder && <LadderTab bands={ladder.bands} ladder={ladder?.userLadder} />}
      </div>
    </div>
  );
};
