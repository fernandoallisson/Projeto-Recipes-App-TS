// Criar um contexto para pegar o usuário logado do Local Storage

import { createContext } from 'react';

export type AuthContextType = {
  emailState: string;
  handleSetEmailState: (email: string) => void;
};

export type FetchMealsContextType = {
  mealsState: { meals : [] };
  handleSetMealsState: (meals: []) => void;
};

export type FetchDrinksContextType = {
  drinksState: [];
  handleSetDrinksState: (drinks: []) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const FetchMealsContext = createContext({} as FetchMealsContextType);

export const FetchDrinksContext = createContext({} as FetchDrinksContextType);
