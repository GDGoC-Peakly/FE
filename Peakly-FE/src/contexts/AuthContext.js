import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import {
  getToken,
  removeToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
} from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();

        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
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
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await Promise.all([removeToken(), removeRefreshToken()]);
    setIsLoggedIn(false);
  };

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      isLoading,
      login,
      logout,
    }),
    [isLoggedIn, isLoading],
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
