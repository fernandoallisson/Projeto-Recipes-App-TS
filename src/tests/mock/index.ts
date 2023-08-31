import { vi } from 'vitest';
import { mockData, mockDataDrinks, mockDataMeals } from './mockData';

const getMockData = (data: any) => ({
  json: async () => data,
});

const mockEndpoints = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken': { meals: mockData.meals },
  'https://www.themealdb.com/api/json/v1/1/search.php?f=c': { meals: mockData.meals },
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken': { meals: mockData.meals },
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita': { drinks: mockData.drinks },
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m': { drinks: mockData.drinks },
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whitecap': { drinks: mockData.drinks },
  'https://www.themealdb.com/api/json/v1/1/search.php?s=sushi': { meals: mockData.sushi },
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vesper': { drinks: mockData.vesper },
  'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau': { meals: null },
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau': { drinks: null },
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': { meals: mockDataMeals },
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': { drinks: mockDataDrinks },
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': { meals: mockData.meals },
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': { drinks: mockData.drinks },
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken': { meals: mockData.meals },
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': { drinks: mockData.drinks },
} as any;

export const makeMockFetch = () => {
  global.fetch = vi.fn((url: any): any => {
    const mockDataForUrl = mockEndpoints[url] || { meals: mockData.meals }; // Default to meals data
    return getMockData(mockDataForUrl);
  });
};
