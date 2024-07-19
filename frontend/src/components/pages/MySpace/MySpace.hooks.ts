import { useCallback, useEffect, useState } from 'react';
import { mySpaceTabs } from './contants';
import { Option } from '@app/components/common/Combobox';
import { useQueryParams } from '@app/hooks';

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
