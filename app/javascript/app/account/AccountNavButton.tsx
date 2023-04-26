import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAccountLayout } from '../../store/slices/LayoutSlice';
import { AccountLayout } from '../../types/AccountLayout';

type Props = {
  layout: AccountLayout;
  icon: React.ReactNode;
  text: string;
};

export const AccountNavButton = ({ layout, icon, text }: Props) => {
  const currentLayout = useAppSelector((state) => state.layout.account);
  const dispatch = useAppDispatch();

  return (
    <button
      className={`link ${currentLayout === layout ? 'active' : ''}`}
      onClick={() => {
        dispatch(setAccountLayout(layout));
      }}
    >
      <div className='flex items-center gap-1'>
        {icon}
        {text}
      </div>
    </button>
  );
};
