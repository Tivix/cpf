import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface IQueryParams {
  [key: string]: string | undefined | null;
}

export const useQueryParams = (
  defaultParams: IQueryParams,
): [params: IQueryParams, setParams: (newParams: IQueryParams) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [params, setParams] = useState(defaultParams);

  const replaceParams = useCallback(() => {
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
  }, [params, searchParams, router, pathname]);

  useEffect(() => {
    replaceParams();
  }, [replaceParams]);

  return [params, setParams];
};
