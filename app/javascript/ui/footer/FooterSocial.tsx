import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

export const FooterSocial = () => {
  return (
    <div className='flex justify-center space-x-4 text-xl'>
      <a href='#'>
        <FaFacebookF />
      </a>
      <a href='#'>
        <FaTwitter />
      </a>
      <a href='#'>
        <FaGithub />
      </a>
      <a href='#'>
        <FaInstagram />
      </a>
    </div>
  );
};
