import { useState } from 'react';

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailIsValid = (email) => {
    // Implemente a validação do email (pode usar uma expressão regular)

    return true; // Retorna true se o email for válido
  };

  const isFormValid = () => {
    return emailIsValid(email) && password.length > 6;
  };

  const handleLogin = () => {
    if (isFormValid()) {
      // Salve o email no localStorage
      localStorage.setItem('user', JSON.stringify({ email }));
    }
  };

  return (
    <AuthContext.Provider
      value={ {
        email,
        setEmail,
        password,
        setPassword,
        isFormValid,
        handleLogin } }
    >
      {children}
    </AuthContext.Provider>
  );
}
