"use client";
// import useSWR from 'swr';
// import { useMemo } from 'react';
// import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
// import { createAuthenticatedFetcher } from '@/utils/fetcher';
import Link from 'next/link';
import styled from 'styled-components';
import { TCategoryData } from '@/types';
import { useFetch } from '@/app/_hooks/useFetch';

export default function CategoriesList() {
  const { data, error, isLoading } = useFetch('/admin/categories');

  if (isLoading) 
    return <p>読み込み中...</p>;
  if (error) 
    return <p>エラー: {String(error)}</p>;

  const categories: TCategoryData[] = data?.categories || [];

  return (
    <SCategoryList>
      {categories.map((category) => (
        <SLink href={`/admin/categories/${category.id}`} key={category.id}>
          <SCategory>{category.name}</SCategory>
        </SLink>
      ))}
    </SCategoryList>
  );
}

const SCategoryList = styled.div`
  margin-top: 50px;
  `
const SLink = styled(Link)`
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  border-bottom: 1px solid #333; 
  text-decoration: none;
`
const SCategory = styled.h1`
  font-size: 18px; 
  font-weight: bold; 
  color: #333;
`