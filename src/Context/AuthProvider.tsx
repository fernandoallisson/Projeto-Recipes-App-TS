import { useEffect, useState } from 'react';
import { AuthContext } from './index';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [emailState, setEmailState] = useState<string>('');

  const handleSetEmailState = (email: string) => {
    setEmailState(email);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const email = JSON.parse(user);
      setEmailState(email.email);
    }
  }, []);

  return (
    <AuthContext.Provider value={ { emailState, handleSetEmailState } }>
      <div>
        { children }
      </div>
    </AuthContext.Provider>
  );
}
