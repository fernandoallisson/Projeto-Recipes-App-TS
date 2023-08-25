import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';

export function Profile() {
  const { emailState } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <Header title="Profile" />
      <h1
        data-testid="profile-email"
      >
        { emailState }
      </h1>
      <button
        onClick={ () => navigate('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => navigate('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        onClick={ () => {
          localStorage.clear();
          navigate('/');
        } }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <footer>{ Footer() }</footer>
    </div>
  );
}
