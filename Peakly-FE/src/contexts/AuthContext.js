import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import {
  getToken,
  removeToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getInitialData,
  setInitialData,
  removeInitialData,
} from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompleteOnboarding, setHasCompleteOnboarding] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const [token, initialData] = await Promise.all([getToken(), getInitialData()]);

        setIsLoggedIn(!!token);
        setHasCompleteOnboarding(!!initialData);
      } catch (e) {
        console.error('인증 초기화 실패: ', e);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (token, refresh_token) => {
    await setToken(token);
    if (refresh_token) {
      await setRefreshToken(refresh_token);
    }

    const onboardingDone = await getInitialData();
    setHasCompleteOnboarding(onboardingDone);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await Promise.all([removeToken(), removeRefreshToken(), removeInitialData()]);
    setIsLoggedIn(false);
    setHasCompleteOnboarding(false);
  };

  const completeOnboarding = async (data) => {
    const dataToSave = data || true;
    await setInitialData(dataToSave);
    setHasCompleteOnboarding(true);
  };

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      isLoading,
      hasCompleteOnboarding,
      login,
      logout,
      completeOnboarding,
    }),
    [isLoggedIn, isLoading, hasCompleteOnboarding],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 반드시 AuthProvider 안에서 사용되어야 합니다.');
  }
  return context;
};
