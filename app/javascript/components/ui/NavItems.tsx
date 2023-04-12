import React from 'react';
import { Link } from 'react-router-dom';

export const NavItems = () => {
  return (
    <>
      <Link to='/app/development' className='text-cyan-400 hover:text-cyan-500'>
        Development
      </Link>
      <Link
        to='/app/productivity'
        className='text-cyan-400 hover:text-cyan-500'
      >
        Productivity
      </Link>
      <Link to='/app/news' className='text-cyan-400 hover:text-cyan-500'>
        News
      </Link>
      <Link to='/app/health' className='text-cyan-400 hover:text-cyan-500'>
        Health
      </Link>
      <Link to='/app/education' className='text-cyan-400 hover:text-cyan-500'>
        Education
      </Link>
    </>
  );
};
