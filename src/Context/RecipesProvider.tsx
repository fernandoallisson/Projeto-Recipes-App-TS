import { useState } from 'react';
import { RecipesContext } from './index';
import { FavoriteType, RecipeDetailsType } from '../types';

type RecipesProviderProps = {
  children: React.ReactNode;
};

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [productsInfo, setProductInfo] = useState<{ meals: []; }>({ meals: [] });
  const [favorite, setFavorite] = useState<FavoriteType[]>({} as FavoriteType[]);
  const [onlyRecipes, setOnlyRecipes] = useState<RecipeDetailsType>({
  } as RecipeDetailsType);

  const setHandleProductsInfo = (recipes: { meals: []; }) => {
    setProductInfo(recipes);
  };

  const hanleSetOnlyRecipes = (recipes: RecipeDetailsType) => {
    setOnlyRecipes(recipes);
  };

  const handleSetFavorite = (recipe: FavoriteType) => {
    setFavorite([...favorite, recipe]);
  };

  return (
    <RecipesContext.Provider
      value={
      {
        productsInfo,
        setHandleProductsInfo,
        onlyRecipes,
        hanleSetOnlyRecipes,
        favorite,
        handleSetFavorite,
      }
      }
    >
      <div>
        { children }
      </div>
    </RecipesContext.Provider>
  );
}

// const [done, setDone] = useState<{ meals: []; }>({ meals: [] });
// const [inProgress, setInProgress] = useState<{ meals: []; }>({ meals: [] });
