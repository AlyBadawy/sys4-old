import React, { useRef } from 'react';
import { useGetUserQuery } from '../../store/api/UserApi';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../store/api/UserApi';
import { BsFillExclamationOctagonFill } from 'react-icons/bs';

export const PersonalSettings = () => {
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUserQuery();

  const [updateUser, { isLoading: updateIsLoading, error: updateError }] =
    useUpdateUserMutation();

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const handleSaveButtonClick = async () => {
    await toast.promise(
      updateUser({
        firstName: firstName.current?.value,
        lastName: lastName.current?.value,
        email: email.current?.value,
      }).unwrap(),
      {
        pending: 'Saving...',
        success: 'Information saved!',
        error: 'There was an error while saving your information.',
      },
      {
        toastId: 'updateUser',
      }
    );
  };

  return (
    <div className='flex flex-col'>
      <div className='flex border-b-2 border-cyan-950 pb-4 justify-between'>
        <h1 className='text-xl font-bold'>Account Settings</h1>
      </div>
      <h1 className='text-xl font-bold py-4'>Personal Information</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center'>
          <label htmlFor='firstName' className='pr-2 w-24'>
            First Name:
          </label>
          <input
            type='text'
            id='firstName'
            ref={firstName}
            placeholder='John'
            required
            className='flex-1 s4-input'
            disabled={userIsLoading || !!userError}
            defaultValue={userData?.firstName}
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='lastName' className='pr-2 w-24'>
            Last Name:
          </label>
          <input
            type='text'
            id='lastName'
            ref={lastName}
            placeholder='Doe'
            required
            className='flex-1 s4-input'
            disabled={
              userIsLoading || !!userError || updateIsLoading || !!updateError
            }
            defaultValue={userData?.lastName}
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='email' className='pr-2 w-24'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            ref={email}
            placeholder='iLove@sys4.dev'
            required
            className='flex-1 s4-input'
            disabled={
              userIsLoading || !!userError || updateIsLoading || !!updateError
            }
            defaultValue={userData?.unconfirmedEmail || userData?.email}
          />
        </div>
        {userData?.unconfirmedEmail && (
          <p className='max-w-md ml-24 text-sm text-stone-300'>
            <BsFillExclamationOctagonFill className='inline text-red-500' />{' '}
            Your email is unconfirmed. Please check your email for a link to
            confirm your email. If you need a new confirmation email, click
            here. <br />
            Until your email is confirmed, you will continue to use{' '}
            <span className='font-semibold italic text-amber-700'>
              {userData?.email}
            </span>{' '}
            as your email.
          </p>
        )}
        <button
          type='button'
          className='s4-btn md:max-w-md self-end'
          disabled={
            userIsLoading || !!userError || updateIsLoading || !!updateError
          }
          onClick={() => {
            void handleSaveButtonClick();
          }}
        >
          {updateIsLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};
