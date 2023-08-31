import { vi } from 'vitest';
import { mockData, mockDataDrinks, mockDataMeals } from './mockData';

export const makeMockFetch = () => {
  global.fetch = vi.fn((url): any => {
    const getMockData = (data: any) => ({
      json: async () => data,
    });
    switch (url) {
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken':
        return getMockData({ meals: mockData.meals });
      case 'https://www.themealdb.com/api/json/v1/1/search.php?f=c':
        return getMockData({ meals: mockData.meals });
      case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken':
        return getMockData({ meals: mockData.meals });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita':
        return getMockData({ drinks: mockData.drinks });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m':
        return getMockData({ drinks: mockData.drinks });
      case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whitecap':
        return getMockData({ drinks: mockData.drinks });
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=sushi':
        return getMockData({ meals: mockData.sushi });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vesper':
        return getMockData({ drinks: mockData.vesper });
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau':
        return getMockData({ meals: null });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau':
        return getMockData({ drinks: null });
      case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
        return getMockData({ meals: mockDataMeals });
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return getMockData({ drinks: mockDataDrinks });
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return getMockData({ meals: mockData.meals });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return getMockData({ drinks: mockData.drinks });
      case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken':
        return getMockData({ meals: mockData.meals });
      case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail':
        return getMockData({ drinks: mockData.drinks });
        default:
        return getMockData({ meals: mockData.meals });
    }
  });
};
