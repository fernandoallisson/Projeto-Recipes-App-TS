// Criar um contexto para pegar o usuário logado do Local Storage

import { createContext } from 'react';

export type AuthContextType = {
  emailState: string;
  handleSetEmailState: (email: string) => void;
};

export const AuthContext = createContext({} as AuthContextType);
