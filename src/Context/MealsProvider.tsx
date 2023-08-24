import { useEffect, useState } from 'react';
import { getSearchByName } from '../Services';
import { FetchMealsContext } from './index';

type MealsProviderProps = {
  children: React.ReactNode;
};

export function MealsProvider({ children }: MealsProviderProps) {
  const [mealsState, setMealsState] = useState<[]>([]);

  const handleSetMealsState = (meals: []) => {
    setMealsState(meals);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const mealsInfoApi = await getSearchByName('');
      setMealsState(mealsInfoApi);
    };
    fetchProductInfo();
  }, []);

  return (
    <FetchMealsContext.Provider value={ { mealsState, handleSetMealsState } }>
      <div>
        { children }
      </div>
    </FetchMealsContext.Provider>
  );
}
