import { createClient } from '@app/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { IEmployeeRequestResult, PaginationParams } from './People.interface';

export const bands = [
  { name: 'Band 1', id: '1' },
  { name: 'Band 2', id: '2' },
  { name: 'Band 3', id: '3' },
  { name: 'Band 4', id: '4' },
  { name: 'Band 5', id: '5' },
];

export const rowsPerPage = 10;
export const paginationMaxPages = 8;
export const startPagesWithoutTruncation = 3;

export const employeeMenuOptions = [
  {
    href: '/people/my-profile',
    label: 'Profile settings',
  },
];

export const useGetPeopleList = (status: string, searchName: string, paginationParams: PaginationParams) => {
  const [data, setData] = useState<IEmployeeRequestResult | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchPeopleList = useCallback(async () => {
    if (status && searchName?.length !== 1) {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_employees', {
        _status: status,
        _searchname: searchName,
        _limit: paginationParams.limit,
        _offset: paginationParams.offset,
      });

      if (error) {
        console.log('error', error);
        setError(error);
      } else {
        setData(data);
      }

      setLoading(false);
    }
  }, [status, searchName, supabase, paginationParams]);

  useEffect(() => {
    fetchPeopleList();
  }, [fetchPeopleList]);

  return { data, error, loading, refetch: fetchPeopleList };
};
