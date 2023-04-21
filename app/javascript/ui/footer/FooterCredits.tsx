import React from 'react';
import { Sys4Text } from '../Sys4Text';
import { useGitRevision } from '../../hooks/useWindow';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const FooterCredits = () => {
  const gitRevision = useGitRevision();
  return (
    <>
      Copyright &copy; 2023 <Sys4Text />. All rights reserved. <br />
      Created by{' '}
      <a href='https://alybadawy.com' target='_blank' rel='noreferrer'>
        Aly Badawy
      </a>
      {gitRevision['message'] && (
        <p>
          {gitRevision.message}{' '}
          <a
            href='https://github.com/sys4-dev/sys4/releases'
            target='_blank'
            rel='noreferrer'
          >
            <FaExternalLinkAlt className='inline self-center mb-1' />
          </a>
        </p>
      )}
    </>
  );
};
