import React from 'react';
import { Link } from 'react-router-dom';

export const NavItems = () => {
  return (
    <>
      <Link to='/app/development'>Development</Link>
      <Link to='/app/productivity'>Productivity</Link>
      <Link to='/app/news'>News</Link>
      <Link to='/app/health'>Health</Link>
      <Link to='/app/education'>Education</Link>
    </>
  );
};
