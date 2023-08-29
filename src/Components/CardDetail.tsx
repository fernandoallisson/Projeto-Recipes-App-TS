import { Drink, Meal } from '../types';

type CardDetailProps = {
  meals?: Meal;
  drinks?: Drink;
};

export function CardDetail({ meals, drinks }: CardDetailProps) {
  const handleTest = () => {
    console.log(meals, drinks);
  };
  return (
    <div>
      <button onClick={ handleTest }>Teste Details</button>

    </div>
  );
}
