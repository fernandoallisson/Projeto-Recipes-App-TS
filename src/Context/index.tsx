import { createContext } from 'react';

export type AuthContextType = {
  emailState: string;
  handleSetEmailState: (email: string) => void;
};

export type RecipesContextType = {
  productsInfo: [];
  setHanleProductsInfo: (produtcs: []) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const RecipesContext = createContext({} as RecipesContextType);
