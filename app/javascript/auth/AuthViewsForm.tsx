import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const AuthViewsForm = ({ children, title, onSubmit }: Props) => {
  return (
    <form
      className='flex flex-col space-y-6 m-auto'
      onSubmit={(e) => {
        void onSubmit(e);
      }}
    >
      <div className='border border-cyan-800 bg-cyan-900 opacity-90 mx-5 m-auto flex flex-col p-10 rounded-lg shadow-lg space-y-6 min-w-sm md:w-1/2 md:mx-auto items-center flex-1'>
        <img src='/images/sys4-logo.svg' className='w-1/2' />
        <h3 className='text-xl font-bold'>{title}</h3>
        {children}
      </div>
    </form>
  );
};
