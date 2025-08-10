import { useMemo } from 'react';
import useSWR from 'swr';
import { useSupabaseSession } from './useSupabaseSession';
import { createAuthenticatedFetcher } from '@/utils/fetcher';

export const useFetch = (endpoint: string) => {
  const { token, isLoding } = useSupabaseSession();
  
  const fetcher = useMemo(() => createAuthenticatedFetcher(token), [token]);
  
  const { data, error, isLoading } = useSWR(
    token ? `/api${endpoint}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: isLoding || isLoading,
  };
};