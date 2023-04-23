import React from 'react';
import { TimeWrapper } from '../../ui/TimeWrapper';
import { FaLaptop, FaLocationArrow, FaTrash } from 'react-icons/fa';
import { BiLogOut, BiLogIn, BiHappy, BiSad } from 'react-icons/bi';
import { Session } from '../../types/Session';
import {
  useDeleteSessionMutation,
  useInvokeSessionMutation,
} from '../../store/api/SessionsApi';

type SessionWrapperProps = {
  session: Session;
};

export const SessionWrapper = ({ session }: SessionWrapperProps) => {
  const [invokeSession] = useInvokeSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  return (
    <div
      key={session.id}
      className='shadow-lg bg-cyan-950 m-4 p-4 flex items-center gap-6 rounded-xl shadow-black/30'
    >
      <div className='text-3xl'>
        <BiLogIn />
      </div>
      <div className='flex-1 flex flex-col gap-1'>
        <h1 className='text-stone-500 text-lg'>
          <TimeWrapper date={session.createdAt} />
        </h1>
        <p className='text-sm flex items-center gap-2'>
          <FaLaptop /> {session.agent}
        </p>
        <p className='text-sm flex items-center gap-2'>
          <FaLocationArrow />
          {session.location || 'unknown'}
        </p>
        <p
          className={`text-sm flex items-center gap-2 ${
            session.valid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {session.valid ? (
            <>
              <BiHappy /> Active
            </>
          ) : (
            <>
              <BiSad /> Expired
            </>
          )}
        </p>
        <p></p>
      </div>

      <div className='flex flex-col gap-4 text-sm'>
        {!session.current ? (
          <>
            <button
              className='flex items-center gap-2 link'
              disabled={!session.valid}
              onClick={() => {
                void invokeSession({ id: session.id });
              }}
            >
              <BiLogOut className='inline' /> Sign out
            </button>
            <button
              className='flex items-center gap-2 link'
              onClick={() => {
                void deleteSession({ id: session.id });
              }}
            >
              <FaTrash className='inline' /> Remove
            </button>
          </>
        ) : (
          'Current session'
        )}
      </div>
    </div>
  );
};
