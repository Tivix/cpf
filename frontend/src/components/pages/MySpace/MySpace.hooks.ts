import { MySpaceHooks } from './MySpace.interface';
import { DEFAULT_TAB } from './contants';
import { useQueryParams } from '@app/hooks';

export const useMySpace = (): MySpaceHooks => {
  const [params, setParams] = useQueryParams({ tab: DEFAULT_TAB });

  return {
    currentTab: params.tab ?? DEFAULT_TAB,
    setCurrentTab: (newTab: string) => {
      setParams({ tab: newTab });
    },
  };
};
