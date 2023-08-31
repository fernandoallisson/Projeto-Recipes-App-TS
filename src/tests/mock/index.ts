import { vi } from 'vitest';
import { mockData } from './mockData';

export const makeMockFetch = () => {
  global.fetch = vi.fn((url): any => {
    const getMockData = (data: any) => ({
      json: async () => data,
    });

    if (url === ('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')) {
      return getMockData({ meals: mockData.meals });
    }
    if (url === ('https://www.themealdb.com/api/json/v1/1/search.php?f=c')) {
      return getMockData({ meals: mockData.meals });
    }
    if (url === ('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken')) {
      return getMockData({ meals: mockData.meals });
    }
    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')) {
      return getMockData({ drinks: mockData.drinks });
    }
    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m')) {
      return getMockData({ drinks: mockData.drinks });
    }
    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whitecap')) {
      return getMockData({ drinks: mockData.drinks });
    }
    if (url === ('https://www.themealdb.com/api/json/v1/1/search.php?s=sushi')) {
      return getMockData({ meals: mockData.sushi });
    }
    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vesper')) {
      return getMockData({ drinks: mockData.vesper });
    }
    if (url === ('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau')) {
      return getMockData({ meals: null });
    }
    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau')) {
      return getMockData({ drinks: null });
    }
    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=GG')) {
      return getMockData({ dinks: mockData.drinks });
    }
    if (url === ('https://www.themealdb.com/api/json/v1/1/search.php?s=Corba')) {
      return getMockData({ meals: mockData.meals });
    }
  });
};
