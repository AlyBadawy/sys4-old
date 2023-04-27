import React, { useRef } from 'react';
import { useGetUserQuery } from '../../store/api/UserApi';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../store/api/UserApi';
import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import { PasswordField } from '../../ui/PasswordField';

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
  const currentPassword = useRef<HTMLInputElement>(null);

  const handleUpdateUser = async () => {
    await toast
      .promise(
        updateUser({
          firstName: firstName.current?.value,
          lastName: lastName.current?.value,
          email: email.current?.value,
          currentPassword: currentPassword.current?.value,
        }).unwrap(),
        {
          pending: 'Saving...',
          success: 'Information saved!',
          error: 'There was an error while saving your information.',
        },
        {
          toastId: 'updateUser',
        }
      )
      .catch(() => {
        // do nothing
      });
  };

  return (
    <div className='flex flex-col' data-testid='personal-settings-page'>
      <div className='flex border-b-2 border-cyan-950 pb-4 justify-between'>
        <h1 className='text-xl font-bold'>Account Settings</h1>
      </div>
      <h2 className='text-lg font-bold py-4'>Personal Information</h2>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='firstName' className='pr-2 w-24'>
            First name:
          </label>
          <input
            type='text'
            id='firstName'
            ref={firstName}
            placeholder='John'
            required
            className='flex-1 s4-input rounded-md'
            disabled={userIsLoading || !!userError || updateIsLoading}
            defaultValue={userData?.firstName}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='lastName' className='pr-2 w-24'>
            Last name:
          </label>
          <input
            type='text'
            id='lastName'
            ref={lastName}
            placeholder='Doe'
            required
            className='flex-1 s4-input rounded-md'
            disabled={userIsLoading || !!userError || updateIsLoading}
            defaultValue={userData?.lastName}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='pr-2 w-24'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            ref={email}
            placeholder='iLove@sys4.dev'
            required
            className='flex-1 s4-input rounded-md'
            disabled={userIsLoading || !!userError || updateIsLoading}
            defaultValue={userData?.unconfirmedEmail || userData?.email}
          />
          {userData?.unconfirmedEmail && (
            <p className='max-w-md text-sm text-stone-300'>
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
        </div>
        <PasswordField
          id='password'
          label='Current password:'
          inputRef={currentPassword}
        />
        {(updateError || userError) && (
          <p className='text-sm'>
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
              (updateError as any)?.data?.message ||
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                (userError as any)?.data?.message ||
                'Something went wrong!'
            }
          </p>
        )}
        <button
          type='button'
          className='s4-btn md:max-w-md self-end'
          disabled={userIsLoading || !!userError || updateIsLoading}
          onClick={() => {
            void handleUpdateUser();
          }}
        >
          {updateIsLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};
