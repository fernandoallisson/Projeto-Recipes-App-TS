// Contexto
import { createContext, useContext, useState } from 'react';

export type UseType = {
  emailState: string,
  setEmailState: (email: string) => void,
};

const userContext = createContext<UseType>({} as UseType);

export const useUserContext = () => {
  const context = useContext(userContext);
  return context;
};

export function UserProvider({ children }: any) {
  const [emailState, setEmailState] = useState('');

  const saveEmail = (email: string) => {
    setEmailState(email);
  };

  return (
    <userContext.Provider value={ { emailState, setEmailState } }>
      {children}
    </userContext.Provider>
  );
}
// tentei fazer de uma forma que presquisei, deu certo mas não sei dizer se é a melhor forma. ass: erick henrique
