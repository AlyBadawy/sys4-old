import React from 'react';
import { useGetStatusQuery } from '../../store/api/statusApi';

export const Dashboard = () => {
  const { data, error, isLoading } = useGetStatusQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return (
    <>
      <section id='home-hero'>
        <div className='flex flex-col-reverse items-center px-6 mx-auto mt-24 mb-32 space-y-6 space-y-reverse md:flex-row '>
          {data && <>Status is: {JSON.stringify(data)}!</>}
        </div>
      </section>
    </>
  );
};
