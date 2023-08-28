import { vi } from 'vitest';
import { mockData } from './mockData';

type MockDataType = {
  meals: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }
};

export const makeMockFetch = () => {
  global.fetch = vi.fn((url) => Promise.resolve({
    json: async (): Promise<MockDataType> => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken') { // Pesquisa por nome chicken
        return { meals: mockData.meals };
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=c') { // Pesquisa por primeira letra c
        return { meals: mockData.meals };
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken') { // Pesquisa por ingrediente chicken
        return { meals: mockData.meals };
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita') { // Pesquisa por nome margarita
        return { drinks: mockData.drinks };
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m') { // Pesquisa por primeira letra m
        return { drinks: mockData.drinks };
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=margarita') { // Pesquisa por ingrediente margarita
        return { drinks: mockData.drinks };
      }
    },
  }));
};
