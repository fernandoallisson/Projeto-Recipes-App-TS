// Chamada à API do search por Name

export const getSearchByName = async (input: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por First Letter

export const getSearchByFirstLetter = async (input: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
  );
  const data = await response.json();
  return data;
};

// Chamada à API do search por Ingredient

export const getSearchByIngredient = async (input: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`,
  );
  const data = await response.json();
  return data;
};
