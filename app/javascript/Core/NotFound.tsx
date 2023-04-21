import React from 'react';
import { Link } from 'react-router-dom';
import { Sys4Text } from '../ui/Sys4Text';
import { NavBar } from '../ui/NavBar';
import { Footer } from '../ui/footer/Footer';

export const NotFound = () => {
  return (
    <div className='flex flex-col min-h-screen' id='layout-main'>
      <main className='flex flex-col flex-1 mx-4'>
        <NavBar />
        <div className='mx-5 m-auto flex flex-col space-y-6 md:w-1/2 md:mx-auto'>
          <h1 className='text-xl font-bold align-middle md:text-3xl lg:text-4xl'>
            <Sys4Text />
            <sup>04</sup>
            <br />
            Page not found!
          </h1>
          <p>
            We are sorry, but the page you are looking for does not exist or has
            been moved.
          </p>
          <p>
            Please check the URL for any typos or errors, or try searching for
            what you are looking for using the search bar at the top of the
            page. You can also browse our website using the navigation menu or
            return to the homepage by clicking the button below:
          </p>
          <p>
            <Link to='/'>Return to Homepage</Link>
          </p>
          <p>
            If you continue to experience issues or have any questions, please
            feel free to contact us at support@sys4.dev. We apologize for any
            inconvenience and thank you for your understanding.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
