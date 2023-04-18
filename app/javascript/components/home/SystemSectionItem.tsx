import React from 'react';

type Props = {
  number: string;
  title: string;
  children: React.ReactNode;
};

export const SystemSectionItem = ({ number, title, children }: Props) => {
  return (
    <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
      <div className='rounded-l-full bg-gradient-to-r from-cyan-600 to-cyan-800 md:bg-none'>
        <div className='flex items-center space-x-2'>
          <div className='px-4 py-2 rounded-full md:py-1 bg-amber-400 text-cyan-900 shadow-md'>
            {number}
          </div>
          <h3 className='text-base font-bold md:mb-4 md:hidden'>{title}</h3>
        </div>
      </div>
      <div>
        <h3 className='hidden mb-4 text-lg font-bold md:block'>{title}</h3>
        <p className='text-gray-400'>{children}</p>
      </div>
    </div>
  );
};
