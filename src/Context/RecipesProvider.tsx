import { useState } from 'react';
import { RecipesContext } from './index';

type RecipesProviderProps = {
  children: React.ReactNode;
};

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [productsInfo, setProductInfo] = useState<[]>([]);

  const setHanleProductsInfo = (recipes: []) => {
    setProductInfo(recipes);
  };

  return (
    <RecipesContext.Provider value={ { productsInfo, setHanleProductsInfo } }>
      <div>
        { children }
      </div>
    </RecipesContext.Provider>
  );
}
