import React from 'react';
import { TimeWrapper } from '../../ui/TimeWrapper';
import {
  FaLaptop,
  FaLocationArrow,
  FaMobileAlt,
  FaNetworkWired,
  FaStar,
  FaTrash,
} from 'react-icons/fa';
import { BiLogOut, BiLogIn, BiHappy, BiSad } from 'react-icons/bi';
import { Session } from '../../types/Session';
import {
  useDeleteSessionMutation,
  useInvokeSessionMutation,
} from '../../store/api/SessionsApi';
import { GiToaster } from 'react-icons/gi';

type SessionWrapperProps = {
  session: Session;
};

export const SessionWrapper = ({ session }: SessionWrapperProps) => {
  const [invokeSession] = useInvokeSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  return (
    <div
      key={session.id}
      className='shadow-lg bg-cyan-950 my-4 p-4 flex flex-col md:flex-row items-start md:items-center gap-6 rounded-xl shadow-black/30 text-stone-300'
    >
      <div className='text-3xl hidden md:block'>
        <BiLogIn />
      </div>
      <div className='flex-1 flex flex-col gap-1'>
        <h1 className='text-white text-lg font-semibold'>
          {session.current && (
            <div className='flex items-center gap-2'>
              <FaStar className='text-green-500' />
              <TimeWrapper date={session.createdAt} />
            </div>
          )}
          {!session.current && <TimeWrapper date={session.createdAt} />}
        </h1>
        <p className='text-sm flex items-center gap-2'>
          {['pc'].includes(session.deviceType) && <FaLaptop />}
          {['smartphone', 'mobilephone'].includes(session.deviceType) && (
            <FaMobileAlt />
          )}
          {['appliance', 'crawler', 'misc', 'unknown'].includes(
            session.deviceType
          ) && <GiToaster />}
          {session.agent}
        </p>
        <p className='text-sm flex items-center gap-2'>
          <FaLocationArrow />
          {session.location || 'Unknown'}
        </p>
        <p className='text-sm flex items-center gap-2'>
          <FaNetworkWired />
          {session.ip || 'Unknown'}
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

      <div className='flex md:flex-col md:gap-10 text-sm justify-between w-full md:w-auto'>
        {!session.current && (
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
        )}
      </div>
    </div>
  );
};
