import { useLocation, useNavigate } from 'react-router-dom';

export function ButtonStart() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];

  const hanleStartRecipe = () => {
    if (pathname.includes('meals')) {
      navigate(`/meals/${id}/in-progress`);
    }
    if (pathname.includes('drinks')) {
      navigate(`/drinks/${id}/in-progress`);
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
