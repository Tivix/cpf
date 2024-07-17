import { MySpaceHooks } from './MySpace.interface';
import { DEFAULT_TAB } from './contants';
import { useQueryParam, StringParam, withDefault } from 'use-query-params';

export const useMySpace = (): MySpaceHooks => {
  const [currentTab, setCurrentTab] = useQueryParam('tab', withDefault(StringParam, DEFAULT_TAB));

  return {
    currentTab,
    setCurrentTab,
  };
};
