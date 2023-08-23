import { useContext } from 'react';
import { AuthContext } from '../Context/index';
import { SearchBar } from '../Components/SearchBar';

export function Meals() {
  const { emailState } = useContext(AuthContext);

  return (
    <div>
      <h1>Comidas</h1>
      <h1>{ emailState }</h1>
      {SearchBar()}
    </div>
  );
}
