import { useAppSelector } from '../store/hooks';

export const useSignedIn = () => {
  return useAppSelector((state) => state.auth.isLoggedIn);
};
