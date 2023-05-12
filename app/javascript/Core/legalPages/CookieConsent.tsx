import React from 'react';
import { MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const USER_CONSENT_COOKIE_KEY = '_sys4_cookies_accepted';

export const CookieConsent = () => {
  const [consent, setConsent] = useState<unknown>();
  const cookies = new Cookies();

  useEffect(() => {
    setConsent(cookies.get(USER_CONSENT_COOKIE_KEY));
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (consent !== 'accepted') {
      cookies.set(USER_CONSENT_COOKIE_KEY, 'accepted', { path: '/' });
      setConsent('accepted');
    }
  };

  if (consent === 'accepted') {
    return null;
  }

  return (
    <section
      className='fixed bottom-0 left-0 w-full opacity-90'
      id='cookie-consent'
    >
      <div className='flex flex-col items-start px-5 py-3 space-y-2 bg-amber-200 md:flex-row md:space-y-0 md:items-stretch md:space-x-2'>
        <div className='flex items-center flex-grow text-gray-900'>
          <p className='text-sm font-medium'>
            This site uses services that use cookies to deliver better
            experience and analyze traffic. You can learn more about the
            services we use at our <Link to='/privacy'>Privacy Policy</Link> and{' '}
            <Link to='/cookies'>Cookies policy</Link>.
          </p>
        </div>
        <div className='flex items-center'>
          <button
            className='p-3 text-sm font-bold text-stone-300 uppercase bg-gray-700 whitespace-nowrap'
            onClick={onClick}
          >
            Got it
          </button>
        </div>
      </div>
    </section>
  );
};
