import React from 'react';
import { useGetStatusQuery } from '../../store/api/statusApi';

export const Dashboard = () => {
  const { data, error, isLoading } = useGetStatusQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return (
    <>
      <main className='container mx-auto mt-28 px-5 flex'>
        {data && <>Status is: {JSON.stringify(data)}!</>}
      </main>
    </>
  );
};
