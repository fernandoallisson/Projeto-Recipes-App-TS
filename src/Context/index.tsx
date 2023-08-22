// Contexto
import { createContext } from 'react';

export type UseType = {
  emailState: string,
  setEmailState: (email: string) => void,
};

export const userContext = createContext<UseType>({
  emailState: '',
  setEmailState: () => {},
} as UseType);
