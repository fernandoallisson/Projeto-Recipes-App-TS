import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecomendations } from '../Services';
import { Drink, Meal } from '../types';

type RecipeDetailsType = {
  meals: Meal[] | any;
  drinks: Drink[] | any;
};

export function Carousel() {
  const [recomendations, setRecomendations] = useState<RecipeDetailsType>({
  } as RecipeDetailsType);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      const fetchData = async () => {
        const data = await getRecomendations('drinks');
        setRecomendations(data);
      };
      fetchData();
    }
    if (location.pathname.includes('drinks')) {
      const fetchData = async () => {
        const data = await getRecomendations('meals');
        setRecomendations(data);
      };
      fetchData();
    }
  }, [location]);
  return (
    <div>
      {(recomendations.drinks) && (
        <div className="container">
          { recomendations.drinks.slice(0, 6).map((element: Drink, index: number) => (
            <div key={ element.idDrink } data-testid={ `${index}-recommendation-card` }>
              <h1
                data-testid={ `${index}-recommendation-title` }
              >
                { element.strDrink }
              </h1>
              <h3 data-testid="recipe-category">{ element.strAlcoholic }</h3>
              <img
                data-testid="recipe-photo"
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
                style={ { width: '300px', height: '200px' } }
              />
            </div>
          ))}
        </div>
      )}
      {recomendations.meals && (
        <div className="container">
          { recomendations.meals.slice(0, 6).map((element: Meal, index: number) => (
            <div key={ element.idMeal } data-testid={ `${index}-recommendation-card` }>
              <h1
                data-testid={ `${index}-recommendation-title` }
              >
                { element.strMeal }
              </h1>
              <h3 data-testid="recipe-category">{ element.strCategory }</h3>
              <img
                data-testid="recipe-photo"
                src={ element.strMealThumb }
                alt={ element.strMeal }
                style={ { width: '300px', height: '200px' } }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
