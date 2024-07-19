import { ChangeEvent } from 'react';
import { TabsProps } from './Tabs.interface';

export const useTabs = (tabs: TabsProps['tabs'], onTabChange: TabsProps['onTabChange']) => {
  const handleSelectTab = (e: ChangeEvent<HTMLSelectElement>) => {
    const tab = tabs.find((tab) => tab.name === e.target.value);
    if (tab) onTabChange(tab);
  };
  return { handleSelectTab };
};
