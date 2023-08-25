// Chamada à API do search por Name

export const getSearchMealsByName = async (nome: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por First Letter

export const getSearchMealsByFirstLetter = async (firstLetter: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Ingredient

export const getSearchMealsByIngredient = async (ingrediente: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Name do Drink

export const getSearchDrinksByName = async (nome: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por First Letter do Drink

export const getSearchDrinksByFirstLetter = async (firstLetter: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Ingredient do Drink

export const getSearchDrinksByIngredient = async (ingrediente: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );
  const data = await response.json();
  return data;
};
