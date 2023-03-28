import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useLoginMutation } from './AuthApi';
import { setCredentials } from './AuthSlice';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
      errRef.current?.focus();
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      <p ref={errRef}>{errMsg}</p>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          id="email"
          ref={emailRef}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          id="password"
          ref={pwdRef}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={(e) => {
            void handleSubmit(e);
          }}
        ></button>
      </form>
    </section>
  );

  return content;
};
