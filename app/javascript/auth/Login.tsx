import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useLoginMutation } from './AuthApi';
import { setCredentials } from './AuthSlice';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          userId: response.id,
          jwtToken: response.JwtToken,
          email: response.email,
          isLoggedIn: true,
        })
      );
      navigate('/dashboard');
    } catch (err) {
      setErrMsg((err as Error).message);
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */}
      {error && <p>{(error as any).data?.error}</p>}
      {errMsg && <p>{errMsg}</p>}
      <h1>Login</h1>
      <form className='text-black'>
        <input
          type='email'
          id='email'
          ref={emailRef}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type='password'
          id='password'
          ref={pwdRef}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={(e) => {
            void handleSubmit(e);
          }}
        >
          Login
        </button>
      </form>
    </section>
  );

  return content;
};
