import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  fullRound?: boolean;
};

export const PasswordField = (props: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='flex flex-col w-full'>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <div className='relative flex flex-1'>
        <input
          type={showPassword ? 'text' : 'password'}
          id={props.id}
          data-testid={`${props.id}-test`}
          ref={props.inputRef}
          placeholder={props.placeholder || ''}
          required={props.required}
          disabled={props.disabled}
          className={`flex-1 s4-input pr-12 ${
            props.fullRound ? 'rounded-full' : 'rounded-md'
          }`}
          onChange={props.onChange}
        />
        <button
          className='pl-2 pr-4 text-lg absolute inset-y-0 right-0 text-stone-300'
          disabled={props.disabled}
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
          data-testid={`${props.id}-toggle`}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'></div>
      </div>
    </div>
  );
};
