import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface IQueryParams {
  [key: string]: string | undefined | null;
}

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = useCallback(
    (params: IQueryParams) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.keys(params).forEach((key) => {
        const value = params[key];

        if (value === undefined || value === null) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, value);
        }
      });

      const newUrl = `${pathname}?${currentParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, router, searchParams],
  );

  return { setParams };
};
