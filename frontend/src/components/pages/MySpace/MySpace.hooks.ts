import { useCallback, useEffect, useState } from 'react';
import { MySpaceHooks } from './MySpace.interface';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { DEFAULT_TAB } from './contants';

export const useMySpace = (): MySpaceHooks => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState<string>(tab ?? DEFAULT_TAB);

  const handleReplace = useCallback(() => {
    if (!currentTab) {
      router.replace(`${pathname}?tab=ladder&band=1`);
    } else if (currentTab === 'ladder') {
      const band = searchParams.get('band');
      if (band) {
        router.replace(`${pathname}?tab=${currentTab}&band=${band}`);
      } else {
        router.replace(`${pathname}?tab=ladder&band=1`);
      }
    } else {
      router.replace(`${pathname}?tab=${currentTab}`);
    }
  }, [currentTab, pathname, router, searchParams]);

  useEffect(() => {
    handleReplace();
  }, [handleReplace]);

  return {
    currentTab,
    setCurrentTab,
  };
};
