import { useState } from 'react';
import { RecipesContext } from './index';
import { FavoriteType, IngredientsListType, RecipeDetailsType } from '../types';
import { Meals } from '../Pages/Meals';

type RecipesProviderProps = {
  children: React.ReactNode;
};

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [productsInfo, setProductInfo] = useState<{ meals: []; }>({ meals: [] });
  const [favorite, setFavorite] = useState<FavoriteType[]>([]);
  const [onlyRecipes, setOnlyRecipes] = useState<RecipeDetailsType>({
  } as RecipeDetailsType);
  const [ingredients, setIngredients] = useState<IngredientsListType[]>([]);

  const setHandleProductsInfo = (recipes: { meals: []; }) => {
    setProductInfo(recipes);
  };

  const hanleSetOnlyRecipes = (recipes: RecipeDetailsType) => {
    setOnlyRecipes(recipes);
  };

  const handleSetFavorite = (recipe: FavoriteType) => {
    setFavorite([...favorite, recipe]);
  };

  const handleSetIngredients = (ingredientsList: IngredientsListType) => {
    setIngredients([
      ...ingredients,
      ingredientsList,
    ]);
    // Salvar no Local Storage
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: ingredients,
    } || {
      meals: ingredients,
    }));
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
        ingredients,
        handleSetIngredients,
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
