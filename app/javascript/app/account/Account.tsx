import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { TbArrowsRight } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAccountLayout } from '../../store/slices/LayoutSlice';
import { AccountLayout } from '../../types/AccountLayout';
import { PersonalSettings } from './PersonalSettings';
import { SessionsSettings } from './SessionsSettings';

export const Account = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector((state) => state.layout.account);
  return (
    <div className='flex flex-col w-full gap-2 md:flex-row flex-1 py-2'>
      <div className='flex items-center md:items-start md:flex-col md:justify-start gap-4 text-center border-b-2 md:border-b-0 md:border-r-2 border-cyan-600 px-4 pb-4'>
        <button
          className={`link items-center ${
            layout === AccountLayout.Personal ? 'active' : ''
          }`}
          onClick={() => {
            dispatch(setAccountLayout(AccountLayout.Personal));
          }}
        >
          <BsPerson className='inline mb-1' /> Personal
        </button>
        <button
          className={`link ${
            layout === AccountLayout.Sessions ? 'active' : ''
          }`}
          onClick={() => {
            dispatch(setAccountLayout(AccountLayout.Sessions));
          }}
        >
          <TbArrowsRight className='inline mb-1' /> Sessions
        </button>
      </div>
      <div className='px-4 flex-1'>
        {layout === AccountLayout.Personal && <PersonalSettings />}
        {layout === AccountLayout.Sessions && <SessionsSettings />}
      </div>
    </div>
  );
};
