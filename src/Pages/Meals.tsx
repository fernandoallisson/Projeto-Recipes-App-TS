import { useContext } from 'react';
import { AuthContext } from '../Context/index';

export function Meals() {
  const { emailState } = useContext(AuthContext);

  const handleTeste = () => {
    console.log(emailState);
  };
  return (
    <div>
      <button onClick={ handleTeste }>Teste</button>
      <h1>{ emailState }</h1>
    </div>
  );
}
