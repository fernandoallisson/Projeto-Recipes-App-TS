import { useEffect, useState } from 'react';
import { getSearchMealsByName } from '../Services';
import { FetchMealsContext } from './index';

type MealsProviderProps = {
  children: React.ReactNode;
};

export function MealsProvider({ children }: MealsProviderProps) {
  const [mealsState, setMealsState] = useState<any>([]);

  const handleSetMealsState = (meals: []) => {
    setMealsState(meals);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const mealsInfoApi = await getSearchMealsByName(''); // Pega tudo de meals do Nome
      setMealsState(mealsInfoApi);
    };
    fetchProductInfo();
  }, []);

  return (
    <FetchMealsContext.Provider value={ { mealsState, handleSetMealsState } }>
      { children }
    </FetchMealsContext.Provider>
  );
}
