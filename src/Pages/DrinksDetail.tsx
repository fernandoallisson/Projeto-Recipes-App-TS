import React, { useContext } from 'react';
import { AuthContext } from '../Context/index';

export function DrinksDetail() {
  const { emailState } = useContext(AuthContext);

  return (
    <div>
      <h1>{ emailState }</h1>
    </div>
  );
}
