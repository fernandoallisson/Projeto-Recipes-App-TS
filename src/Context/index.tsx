// Criar um contexto para pegar o usuário logado do Local Storage

import { createContext } from 'react';

export type AuthContextType = {
  emailState: string;
  handleSetEmailState: (email: string) => void;
};

export type FetchMealsContextType = {
  meals: any;
};

export const AuthContext = createContext({} as AuthContextType);

export const FetchMealsContext = createContext({} as any);

export const FetchDrinksContext = createContext({} as any);
