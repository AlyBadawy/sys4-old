import React, { useState } from 'react';
import { PasswordField } from '../../ui/PasswordField';
import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../store/api/UserApi';

export const PasswordSettings = () => {
  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const [updateUser, { isLoading: updateIsLoading, error: updateError }] =
    useUpdateUserMutation();

  const currentPasswordChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPasswordValue(e.target.value);
  };
  const newPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordValue(e.target.value);
  };
  const confirmPasswordChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordValue(e.target.value);
  };

  const handleSaveButtonClick = async () => {
    await toast
      .promise(
        updateUser({
          currentPassword: currentPasswordValue,
          password: newPasswordValue,
          passwordConfirmation: confirmPasswordValue,
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
    <div className='flex flex-col' data-testid='password-settings-page'>
      <div className='flex border-b-2 border-cyan-950 pb-4 justify-between'>
        <h1 className='text-xl font-bold'>Security</h1>
      </div>
      <h2 className='text-lg font-bold py-4'>Change Password</h2>
      <div className='flex flex-col gap-4'>
        <PasswordField
          id='currentPassword'
          label='Current password:'
          onChange={currentPasswordChangeHandler}
        />
        <PasswordField
          id='newPassword'
          label='New password:'
          onChange={newPasswordChangeHandler}
        />
        <PasswordField
          id='confirmPassword'
          label='Confirm password:'
          onChange={confirmPasswordChangeHandler}
        />
        {newPasswordValue !== confirmPasswordValue && (
          <p className='text-sm'>
            <BsFillExclamationOctagonFill className='inline text-red-500' /> New
            password and confirm password do not match.
          </p>
        )}
        {updateError && (
          <p className='text-sm'>
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
              (updateError as any).data?.message || 'something went wrong!'
            }
          </p>
        )}
        <button
          type='button'
          className='s4-btn md:max-w-md self-end'
          onClick={() => void handleSaveButtonClick()}
          disabled={
            newPasswordValue !== confirmPasswordValue ||
            updateIsLoading ||
            !newPasswordValue ||
            !currentPasswordValue
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};
