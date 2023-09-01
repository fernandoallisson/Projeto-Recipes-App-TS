import { useLocation, useNavigate } from 'react-router-dom';

export function ButtonStart() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hanleStartRecipe = () => {
    if (pathname.includes('meals')) {
      navigate('/meals/52771/in-progress');
    }
    if (pathname.includes('drinks')) {
      navigate('/drinks/178319/in-progress');
    }
  };

  return (
    <div>
      <button
        className="startRecipe"
        data-testid="start-recipe-btn"
        onClick={ hanleStartRecipe }
      >
        Start Recipe
      </button>
    </div>
  );
}
