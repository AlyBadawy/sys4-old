import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TimeWrapper } from '../../ui/TimeWrapper';
import { FaLaptop, FaLocationArrow } from 'react-icons/fa';
import { BiSad } from 'react-icons/bi';

export const LoadingSession = () => {
  return (
    <div className='opacity-50'>
      <div
        key='loading'
        className='shadow-lg bg-cyan-900/50 m-4 p-4 flex items-center gap-6 rounded-xl shadow-black/30 animate-pulse'
      >
        <div className='text-3xl animate-spin'>
          <AiOutlineLoading3Quarters />
        </div>
        <div className='flex-1 flex flex-col gap-1'>
          <h1 className='text-stone-500 text-lg'>
            <TimeWrapper date={new Date()} />
          </h1>
          <p className='text-sm flex items-center gap-2'>
            <FaLaptop /> Looking for sessions....
          </p>
          <p className='text-sm flex items-center gap-2'>
            <FaLocationArrow />
            Planet Earth
          </p>
          <p className='text-sm flex items-center gap-2 text-red-600'>
            <BiSad /> refreshing...
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
