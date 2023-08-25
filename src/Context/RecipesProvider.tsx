import { useState } from 'react';
import { RecipesContext } from './index';

type RecipesProviderProps = {
  children: React.ReactNode;
};

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [productsInfo, setProductInfo] = useState<{ meals: []; }>({ meals: [] });

  const setHandleProductsInfo = (recipes: { meals: []; }) => {
    setProductInfo(recipes);
  };

  return (
    <RecipesContext.Provider value={ { productsInfo, setHandleProductsInfo } }>
      <div>
        { children }
      </div>
    </RecipesContext.Provider>
  );
}
