'use client';
import { Typography } from '@app/components/common/Typography';
import { MySpaceProps } from '@app/components/pages/MySpace/MySpace.interface';
import { Header } from '@app/components/pages/MySpace/modules/Header';
import {Tabs} from "@app/components/common/Tabs";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {routes} from "@app/constants";

const mySpaceTabs = [
  {
    key: 'ladder',
    label: 'Ladder',
    href: `${routes.mySpace.index}?tab=ladder`,
  },
  {
    key: 'score-card',
    label: 'Score Card',
    href: `${routes.mySpace.index}?tab=score-card`,
  },
  {
    key: 'goals',
    label: 'Goals',
    href: `${routes.mySpace.index}?tab=goals`,
  },{
    key: 'projects',
    label: 'Projects',
    href: `${routes.mySpace.index}?tab=projects`,
  },
  {
    key: 'activity',
    label: 'Activity',
    href: `${routes.mySpace.index}?tab=activity`,
  }
]

const DEFAULT_TAB = 'ladder';

export const MySpace: React.FC<MySpaceProps> = ({ data }) => {
  const { user, currentLevel, nextLevel } = data;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState<string>(tab ?? DEFAULT_TAB);

  const handleReplace = useCallback(() => {
    if (!currentTab) {
      router.replace(`${pathname}?tab=${DEFAULT_TAB}`);
    } else {
      router.replace(`${pathname}?tab=${currentTab}`);
    }
  }, [currentTab, pathname, router]);

  useEffect(() => {
    handleReplace();
  }, [handleReplace]);


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
