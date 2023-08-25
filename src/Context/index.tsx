import { createContext } from 'react';

export type AuthContextType = {
  emailState: string;
  handleSetEmailState: (email: string) => void;
};

export type RecipesContextType = {
  productsInfo: {
    meals: [];
  } | any;
  setHandleProductsInfo: (produtcs: { meals: [] }) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const RecipesContext = createContext({} as RecipesContextType);
