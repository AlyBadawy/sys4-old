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
    <div className='flex flex-col'>
      {props.label && (
        <label htmlFor='firstName' className=''>
          {props.label}
        </label>
      )}
      <div className='relative flex flex-1'>
        <input
          type={showPassword ? 'text' : 'password'}
          id={props.id}
          ref={props.inputRef}
          placeholder={props.placeholder || ''}
          required={props.required}
          disabled={props.disabled}
          className={`flex-1 s4-input ${
            props.fullRound ? 'rounded-l-full' : 'rounded-l-md'
          }`}
          onChange={props.onChange}
        />
        <button
          className={`px-2 ${
            props.fullRound ? 'rounded-r-full' : 'rounded-r-md'
          } bg-cyan-950 text-lg`}
          disabled={props.disabled}
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'></div>
      </div>
    </div>
  );
};
