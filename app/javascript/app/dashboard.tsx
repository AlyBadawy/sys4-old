import React from 'react';
import { useGetStatusQuery } from '../store/api/statusApi';

export const Dashboard = () => {
  const { data, isLoading, error } = useGetStatusQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return (
    <>
      <section id='home-hero'>
        <div className='flex flex-colitems-center px-6 mx-auto my-2 space-y-6 md:flex-row '>
          {data && <>Status is: {JSON.stringify(data)}!</>}
        </div>
      </section>
    </>
  );
};
