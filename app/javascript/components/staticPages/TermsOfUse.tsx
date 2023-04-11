import React from 'react';
import { Sys4Text } from '../ui/Sys4Text';

export const TermsOfUse = () => {
  return (
    <>
      <section id='terms-of-use'>
        <h3 className='text-5xl mb-8 font-bold'>Terms of use</h3>
        <div className='max-w-5xl'>
          <p>
            Welcome to <Sys4Text />, the System for managing all your needs. By
            using <Sys4Text />, you agree to these Terms of Use, which
            constitute a binding agreement between you and SYS4. If you do not
            agree to these Terms of Use, do not use <Sys4Text />.
          </p>
          <ul className='list-decimal list-inside'>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>Use of Application: </span>
              <br />
              You may use <Sys4Text /> for personal and non-commercial purposes
              only. You must not use <Sys4Text /> for any illegal or
              unauthorized purpose, and you must comply with all applicable laws
              and regulations.
            </li>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>User Account: </span>
              <br />
              You may need to create a user account to use certain features of{' '}
              <Sys4Text />. You are responsible for maintaining the
              confidentiality of your account information, including your
              password, and for any activity that occurs under your account. You
              must not share your account information with anyone else.
            </li>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>Intellectual Property: </span>
              <br />
              <Sys4Text /> and its contents are protected by copyright,
              trademark, and other laws. You may not copy, modify, distribute,
              or use <Sys4Text /> or its contents without our prior written
              consent.
            </li>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>Disclaimer of Warranties: </span>
              <br />
              <Sys4Text /> is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis, without any warranties of any kind, either
              express or implied. We do not warrant that <Sys4Text /> will meet
              your requirements or be uninterrupted, timely, secure, or
              error-free.
            </li>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>Limitation of Liability: </span>
              <br />
              In no event shall SYS4 or its affiliates, licensors, or service
              providers be liable for any indirect, incidental, special, or
              consequential damages arising out of or in connection with your
              use of <Sys4Text />, whether based on warranty, contract, tort, or
              any other legal theory.
            </li>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>Modification of Terms of Use: </span>
              <br />
              We reserve the right to modify these Terms of Use at any time,
              without prior notice. Your continued use of <Sys4Text /> after
              such modifications constitutes your acceptance of the modified
              Terms of Use.
            </li>
            <li className='mt-4 mb-1'>
              <span className='font-bold'>Governing Law: </span>
              <br />
              These Terms of Use shall be governed by and construed in
              accordance with the laws of NJ, USA. Any dispute arising out of or
              in connection with these Terms of Use shall be submitted to the
              exclusive jurisdiction of the courts of NJ, USA.
            </li>
          </ul>
          <p>
            If you have any questions or concerns about these Terms of Use,
            please contact us at info@sys4.dev.
          </p>
        </div>
      </section>
    </>
  );
};