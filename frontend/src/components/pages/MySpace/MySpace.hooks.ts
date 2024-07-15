import { MySpaceHooks } from './MySpace.interface';
import { DEFAULT_TAB } from './contants';
import { useSearchParamsReplacer } from '../../../hooks';

export const useMySpace = (): MySpaceHooks => {
  const { currentValue, handleValueChange } = useSearchParamsReplacer('tab', DEFAULT_TAB);

  return {
    currentTab: currentValue,
    setCurrentTab: handleValueChange,
  };
};
