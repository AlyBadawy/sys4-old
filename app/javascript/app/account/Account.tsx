import React from 'react';
import { useAppSelector } from '../../store/store';
import { AccountLayout } from '../../types/AccountLayout';
import { PersonalSettings } from './PersonalSettings';
import { SessionsSettings } from './SessionsSettings';
import { AccountNavButton } from './AccountNavButton';
import { PasswordSettings } from './PasswordSettings';
import { BsPerson } from 'react-icons/bs';
import { TbArrowsRight } from 'react-icons/tb';
import { MdPassword } from 'react-icons/md';

export const Account = () => {
  const layout = useAppSelector((state) => state.layout.account);
  return (
    <div className='flex flex-col w-full gap-2 md:flex-row flex-1 py-2'>
      <div className='flex items-center justify-between md:items-start md:flex-col md:justify-start md:gap-4 text-center border-b-2 md:border-b-0 md:border-r-2 border-cyan-600 px-4 pb-4'>
        <AccountNavButton
          icon={<BsPerson />}
          text='Personal'
          layout={AccountLayout.Personal}
        />
        <AccountNavButton
          icon={<MdPassword />}
          text='Password'
          layout={AccountLayout.Password}
        />
        <AccountNavButton
          icon={<TbArrowsRight />}
          text='Sessions'
          layout={AccountLayout.Sessions}
        />
      </div>
      <div className='px-4 flex-1'>
        {layout === AccountLayout.Personal && <PersonalSettings />}
        {layout === AccountLayout.Sessions && <SessionsSettings />}
        {layout === AccountLayout.Password && <PasswordSettings />}
      </div>
    </div>
  );
};
