import { useCallback, useEffect, useState } from 'react';
import { mySpaceTabs } from './contants';
import { useQueryParams } from '@app/hooks';
import { Option } from '@app/types/common';

export const useMySpace = () => {
  const [currentTab, setCurrentTab] = useState<Option>(mySpaceTabs[0]);
  const { setParams } = useQueryParams();

  const handleReplace = useCallback(() => {
    setParams({ tab: currentTab?.id });
  }, [currentTab?.id, setParams]);

  useEffect(() => {
    handleReplace();
  }, [handleReplace]);

  return {
    currentTab,
    setCurrentTab,
  };
};
