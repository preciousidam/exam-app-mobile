import { useMemo } from 'react';
import { Data, setCredential, useIsLoading, useSelectCurrentUser } from '.';
import { useAppSelector, useAppDispatch } from '../hooks';

export const useAuth = () => {
  
  const user = useAppSelector(useSelectCurrentUser);
  const isLoading = useAppSelector(useIsLoading);

  return useMemo(
    () => ({ user: user, isLoading }),
    [user, isLoading]
  );
};

export const usePushToken = () => {
  const { pushId } = useAppSelector((state) => state.auth);
  return useMemo(() => pushId, [pushId]);
};

export const useInterestsPin = () => {
  const user = useAppSelector(useSelectCurrentUser);
  return useMemo(
    () => ({
      hasInterest: Boolean(user?.interests),
      hasPin: Boolean(user?.pin),
      verified: Boolean(user?.is_verified)
    }),
    [user]
  );
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(setCredential({} as Data));
};
