import { useContext } from 'react';
import { AuthContext } from '../Context/index';
import { Header, HeaderProps } from '../Components/Header/Index';

export function Drinks() {
  const { emailState } = useContext(AuthContext);

  const handleSubmit = () => {
    const { pathname } = window.location;
  };
  return (
    <>
      <Header title="Drinks" />
      <h1>{emailState}</h1>
      <label htmlFor="email">
        <div>
          <h1>{emailState}</h1>
        </div>
      </label>
    </>
  );
}
