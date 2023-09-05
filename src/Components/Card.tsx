import { useContext } from 'react';
import { RecipesContext } from '../Context';

type CardProps = {
  handleClick: (id: string) => void;
};

export function Card({ handleClick }: CardProps) {
  const { productsInfo } = useContext(RecipesContext);

  return (
    <div>
      {productsInfo && productsInfo.map((product: any, index: number) => (
        <div
          key={ product.idDrink || product.idMeal }
          data-testid={ `${index}-recipe-card` }
          role="button"
          tabIndex={ 0 }
          onClick={ () => { handleClick(product.idDrink || product.idMeal); } }
          onKeyDown={ (e) => {
            if (e.key === 'Enter') {
              handleClick(product.idDrink || product.idMeal);
            }
          } }
        >
          <p
            data-testid={ `${index}-card-name` }
          >
            {product.strDrink || product.strMeal}
          </p>
          <img
            src={ product.strDrinkThumb || product.strMealThumb }
            alt={ product.strDrink || product.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}
