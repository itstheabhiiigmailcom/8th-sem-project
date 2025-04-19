import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchAuthenticatedUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchAuthenticatedUser();
        // console.log('user : ', user);
        setUser(user);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    setAuthLoading(true);
    setError(null);
    try {
      const { user } = await loginUser(credentials);
      // console.log('logged in user : ', user);
      setUser(user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (data) => {
    setAuthLoading(true);
    setError(null);
    try {
      const { data } = await registerUser(data);
      // console.log(user);
      setUser(data);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, authLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
