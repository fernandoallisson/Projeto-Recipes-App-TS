// Chamada à API do search por Name

export const getSearchMealsByName = async (input: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por First Letter

export const getSearchMealsByFirstLetter = async (input: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Ingredient

export const getSearchMealsByIngredient = async (input: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Name do Drink

export const getSearchDrinksByName = async (input: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por First Letter do Drink

export const getSearchDrinksByFirstLetter = async (input: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Ingredient do Drink

export const getSearchDrinksByIngredient = async (input: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
  );
  const data = await response.json();
  return data;
};
