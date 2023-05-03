import React from 'react';
import { Link } from 'react-router-dom';
import { GetStartedButton } from '../GetStartedButton';
import { useSignedIn } from '../../hooks/useAuth';

const signedInMenu = (
  <>
    <Link to='/app/account'>Account</Link>
  </>
);

const signedOutMenu = (
  <>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact Us</Link>
  </>
);

export const NavItems = () => {
  const isSignedIn = useSignedIn();
  return (
    <>
      {isSignedIn ? signedInMenu : signedOutMenu}
      <div className='my-6 pt-4'>
        <GetStartedButton />
      </div>
    </>
  );
};
