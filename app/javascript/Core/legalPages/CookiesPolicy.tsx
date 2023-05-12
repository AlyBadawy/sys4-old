import React from 'react';
import { Sys4Text } from '../../ui/Sys4Text';

export const CookiesPolicy = () => {
  return (
    <div className='s4-container'>
      <section id='privacy-policy'>
        <h3 className='text-5xl mb-8 font-bold'>Cookies Policy</h3>
        <p>
          <Sys4Text />
          (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) uses cookies on
          the https://sys4.dev website (the &quot;Service&quot;). By using the
          Service, you consent to the use of cookies.
        </p>
        <h4 className='font-bold m-0 p-0'>What are cookies?</h4>
        <p>
          Cookies are small pieces of text sent by your web browser by a website
          you visit. A cookie file is stored in your web browser and allows the
          Service or a third-party to recognize you and make your next visit
          easier and more useful to you.
        </p>
        <h4 className='font-bold mt-4 mb-1 text-xl'>
          How <Sys4Text /> uses cookies
        </h4>
        <p>
          When you use and access the Service, we may place a number of cookies
          files in your web browser. We use cookies for the following purposes:
        </p>
        <ul className='list-disc list-inside'>
          <li>To enable certain functions of the Service</li>
          <li>To provide analytics</li>
          <li>To store your preferences</li>
        </ul>
        <p>
          We use both session and persistent cookies on the Service and we use
          different types of cookies to run the Service:
        </p>
        <ul className='list-decimal list-inside'>
          <li>
            <span className='font-bold'>Essential cookies:</span> These cookies
            are required for the website to function properly and cannot be
            turned off in our systems.
          </li>
          <li>
            <span className='font-bold'>Analytics cookies:</span> These cookies
            help us improve the Service by collecting information on how users
            interact with the website.
          </li>
          <li>
            <span className='font-bold'>Preference cookies:</span> These cookies
            allow the Service to remember your preferences such as language,
            region, or font size.
          </li>
        </ul>
        <h4 className='font-bold mt-4 mb-1 text-xl'>Third-party cookies</h4>
        <p>
          In addition to our own cookies, we may also use third-party cookies
          for the following purposes:
        </p>
        <ul className='list-decimal list-inside'>
          <li>To provide advertising and marketing services</li>
          <li>To provide social media features</li>
          <li>To analyze traffic to the website</li>
        </ul>
        <h2>What are your choices regarding cookies?</h2>
        <p>
          If you would like to delete cookies or instruct your web browser to
          delete or refuse cookies, please visit the help pages of your web
          browser. Please note, however, that if you delete cookies or refuse to
          accept them, you might not be able to use all of the features we
          offer.
        </p>
        <h4 className='font-bold mt-4 mb-1 text-xl'>
          Where can you find more information about cookies?
        </h4>
        <p>
          You can learn more about cookies and how to manage them by visiting
          the{' '}
          <a href='https://www.allaboutcookies.org/'>
            All About Cookies website
          </a>
          .
        </p>
      </section>
    </div>
  );
};
