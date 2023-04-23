import React from 'react';
import { useGetSessionsQuery } from '../../store/api/SessionsApi';
import { SessionWrapper } from './SessionWrapper';
import { FiRefreshCw } from 'react-icons/fi';
import { LoadingSession } from './LoadingSession';

export const SessionsSettings = () => {
  const { data, isLoading, error, refetch, isFetching } = useGetSessionsQuery();
  if (error) return <div>Error!</div>;

  return (
    <div className='flex flex-col'>
      <div className='flex border-b-2 border-cyan-950 pt-4 justify-between'>
        <h3 className='text-xl'>Your sessions:</h3>
        <button
          onClick={() => void refetch()}
          className='flex items-center gap-2 link'
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>
      {(isLoading || isFetching) && <LoadingSession />}
      {data && !isLoading && !isFetching && (
        <>
          {data
            .filter((session) => session.current)
            .map((session) => (
              <SessionWrapper session={session} key={session.id} />
            ))}
          {data
            .filter((session) => !session.current)
            .map((session) => (
              <SessionWrapper session={session} key={session.id} />
            ))}
          <p className='border-t-2 border-cyan-950 text-stone-300 text-xs pt-2'>
            Sessions that are older than a month will be automatically deleted.
          </p>
        </>
      )}
    </div>
  );
};
