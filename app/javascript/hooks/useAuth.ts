import { useAppSelector } from '../store/store';

export const useSignedIn = () => {
  return useAppSelector((state) => state.user.isLoggedIn);
};
