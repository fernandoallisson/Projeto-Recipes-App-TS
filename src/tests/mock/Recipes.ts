import { vi } from 'vitest';
import { mockData } from './mockData';

export const makeMockFetch = () => {
  global.fetch = vi.fn((url): any => {
    const getMockData = (data: any) => ({
      json: async () => data,
    });

    if (url === ('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')) {
      return getMockData({ meals: mockData });
    }
  });
};
