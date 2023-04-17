import React from 'react';
import { GetStartedButton } from '../ui/GetStartedButton';
import { Sys4Text } from '../ui/Sys4Text';
import { SystemSectionItem } from './SystemSectionItem';

export const Home = () => {
  return (
    <>
      <section id='home-hero'>
        <div className='flex flex-col-reverse items-center px-6 mx-auto mt-24 mb-32 space-y-6 space-y-reverse md:flex-row '>
          {/* Hero-Text */}
          <div className='flex flex-col mb-12 space-y-12 md:w-1/2'>
            <h1 className='max-w-md text-4xl font-bold text-center md:text-5xl md:text-left'>
              Unlock the full potential of your systems with <Sys4Text />
            </h1>
            <p className='max-w-md text-center text-cyan-700 md:text-left'>
              <Sys4Text /> provides a comprehensive set of tools and resources
              to cater to different areas of interest, including development,
              socializing with friends, education, health, news, and much more.
              With <Sys4Text />, you can enjoy a seamless experience across
              multiple domains, all in one convenient location.
            </p>
            <div className='flex justify-center md:justify-start'>
              <GetStartedButton />
            </div>
          </div>

          {/* Image */}
          <div className='md:w-1/2 animate-pulse'>
            <img
              src='/images/sys4-logo-4.svg'
              alt='Hero Image'
              className='w-3/4 mx-auto'
            />
          </div>
        </div>
      </section>

      <section id='home-features'>
        <div className='flex flex-col px-4 mx-auto my-10 space-y-12 md:space-y-0 md:flex-row'>
          <div className='flex flex-col space-y-12 md:w-1/2 text-center md:text-left items-center md:items-start'>
            <h2 className='text-4xl font-bold max-w-sm '>
              <Sys4Text /> is a platform for all your needs
            </h2>
            <p className='text-cyan-700 max-w-sm md:max-w-md'>
              <Sys4Text /> is divided into different systems to cater to various
              domains of interest. Each system provides a range of tools and
              resources to help users with their tasks and activities. The
              following are the systems available in <Sys4Text />:
            </p>
          </div>
          <div className='flex flex-col space-y-8 md:w-1/2  md:max-w-md'>
            <SystemSectionItem number='01' title='System for Development'>
              The Development System is a comprehensive resource for software
              developers. It offers a range of tools, including IDEs, compilers,
              debuggers, and libraries. The system also offers collaboration
              features, allowing users to work on projects together.
            </SystemSectionItem>
            <SystemSectionItem number='02' title='System for News'>
              The News System provides users with the latest news and current
              events from around the world. Users can customize their news feed,
              select specific topics, and get alerts on breaking news. The
              system also offers editorial content, opinion pieces, and
              multimedia content.
            </SystemSectionItem>
            <SystemSectionItem number='03' title='System for Health'>
              The Health System helps users track their fitness goals, monitor
              their health status, and access useful resources for leading a
              healthy lifestyle. The system offers features such as exercise
              tracking, food logging, and symptom tracking. Users can also
              access articles and videos related to health and wellness.
            </SystemSectionItem>
            <SystemSectionItem number='04' title='System for Education'>
              The Education System offers learning resources, including courses,
              tutorials, and educational videos. Users can learn new skills,
              improve their knowledge, and earn certifications. The system also
              offers gamification features, allowing users to earn badges and
              rewards for completing courses.
            </SystemSectionItem>
            <SystemSectionItem number='05' title='System for Productivity'>
              The Productivity System helps users manage their time and
              productivity. The system offers features such as task management,
              time tracking, and calendar management. Users can also access
              articles and videos related to productivity and time management.
            </SystemSectionItem>
          </div>
        </div>
      </section>

      {/* <section id='cta' className='bg-orange-700'>
        <div className='container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0'>
          <h2 className='text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left'>
            simple, fast, and secure way to manage your systems
          </h2>
          <div>Lorem ipsum dolor sit amet</div>
        </div>
      </section> */}
    </>
  );
};
