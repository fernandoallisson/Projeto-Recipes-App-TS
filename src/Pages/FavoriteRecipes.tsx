import { useContext } from 'react';
import { AuthContext } from '../Context/index';
import { Header } from '../Components/Header';

export function FavoriteRecipes() {
  const { emailState } = useContext(AuthContext);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <h1>{emailState}</h1>
    </div>
  );
}
