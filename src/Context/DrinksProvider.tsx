import { useEffect, useState } from 'react';
import { getSearchDrinksByName } from '../Services';
import { FetchDrinksContext } from './index';

type DrinksProviderProps = {
  children: React.ReactNode;
};

export function DrinksProvider({ children }: DrinksProviderProps) {
  const [drinksState, setDrinksState] = useState<any>([]);

  const handleSetDrinksState = (drinks:[]) => {
    setDrinksState(drinks);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const drinksInfoApi = await getSearchDrinksByName('');
      setDrinksState(drinksInfoApi);
    };
    fetchProductInfo();
  }, []);

  return (
    <FetchDrinksContext.Provider value={ { drinksState, handleSetDrinksState } }>
      <div>
        { children }
      </div>
    </FetchDrinksContext.Provider>
  );
}
