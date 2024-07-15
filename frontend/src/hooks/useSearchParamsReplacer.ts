import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface ISearchParamsReplacer {
  currentValue: string;
  handleValueChange: (newValue: string) => void;
}

export const useSearchParamsReplacer = (paramName: string, defaultValue: string): ISearchParamsReplacer => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get(paramName);

  const [currentValue, setCurrentValue] = useState<string>(value ?? defaultValue);

  const composeOtherParams = useCallback(() => {
    let composedParams = '';

    for (const [key, value] of searchParams.entries()) {
      if (key === paramName) continue;

      composedParams += `${key}=${value}&`;
    }

    return composedParams;
  }, [searchParams, paramName]);

  const handleReplace = useCallback(() => {
    const otherParams = composeOtherParams();

    if (!currentValue) {
      router.replace(`${pathname}?${otherParams}${paramName}=${defaultValue}`);
    } else {
      router.replace(`${pathname}?${otherParams}${paramName}=${currentValue}`);
    }
  }, [currentValue, pathname, router, composeOtherParams, defaultValue, paramName]);

  const handleValueChange = useCallback((newValue: string) => {
    setCurrentValue(newValue);
  }, []);

  useEffect(() => {
    handleReplace();
  }, [handleReplace]);

  return {
    currentValue,
    handleValueChange,
  };
};
