import React from 'react';
import { Sys4Text } from '../../ui/Sys4Text';

export const PrivacyPolicy = () => {
  return (
    <div className='s4-container'>
      <section id='privacy-policy'>
        <h3 className='text-5xl mb-8 font-bold'>Privacy policy</h3>
        <div className='max-w-5xl'>
          <p className='my-4'>
            At <Sys4Text />, we are committed to protecting your privacy.
            <br />
            This Privacy Policy explains how we collect, use, and disclose your
            personal information when you use our application.
          </p>
          <h4 className='font-bold m-0 p-0'>Information We Collect:</h4>
          <p>
            When you use our application, we may collect the following
            information:
          </p>
          <ul className='list-disc list-inside'>
            <li>
              Personal information: such as your name, email address, and phone
              number.
            </li>
            <li>
              Usage information: such as your device information, IP address,
              and browsing behavior.
            </li>
            <li>
              Location information: such as your current location, if you choose
              to share it with us.
            </li>
          </ul>

          <h4 className='font-bold m-0 p-0'>How We Use Your Information:</h4>
          <p>We use your personal information to:</p>
          <ul className='list-disc list-inside'>
            <li>Provide you with our services and features.</li>
            <li>
              Communicate with you about our application and related services.
            </li>
            <li>Respond to your inquiries and requests.</li>
            <li>Improve our application and services.</li>
          </ul>
          <p>We use your usage information and location information to:</p>
          <ul className='list-disc list-inside'>
            <li>Analyze how you use our application.</li>
            <li>Improve our application and services.</li>
            <li>Provide you with personalized content and features.</li>
          </ul>

          <h4 className='font-bold m-0 p-0'>How We Share Your Information:</h4>
          <p>We may share your personal information with:</p>
          <ul className='list-disc list-inside'>
            <li>
              Our affiliates and partners, for the purposes of providing our
              services.
            </li>
            <li>
              Third-party service providers, who perform services on our behalf,
              such as hosting, data analysis, and customer service.
            </li>
            <li>
              Law enforcement authorities or other government officials, when
              required by law or to protect our rights or the rights of others.
            </li>
          </ul>
          <h4 className='font-bold m-0 p-0'>Your Choices:</h4>
          <p>You can choose to:</p>
          <ul className='list-disc list-inside'>
            <li>
              Limit the information we collect by adjusting the settings on your
              device or browser.
            </li>
            <li>
              Opt-out of receiving marketing communications from us by following
              the instructions in the communications.
            </li>
          </ul>

          <h4 className='font-bold m-0 p-0'>Security:</h4>
          <p>
            We use reasonable security measures to protect your personal
            information from unauthorized access and disclosure. However, no
            security measure can guarantee the security of your information.
          </p>

          <h4 className='font-bold m-0 p-0'>Changes to this Privacy Policy:</h4>
          <p>
            We may update this Privacy Policy from time to time. The updated
            Privacy Policy will be posted on our website and will be effective
            as of the date of posting.
          </p>

          <h4 className='font-bold m-0 p-0'>Contact Us:</h4>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at privacy@sys4.dev.
          </p>
        </div>
      </section>
    </div>
  );
};
