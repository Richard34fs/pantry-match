import { useState } from 'react';
import api from '../services/api.js';
import RecipeCard from '../components/RecipeCard.jsx'

function Recipes() {
  
  const [recipes, setRecipes] = useState([]);

  const handleFindRecipes = async() => {
    try {
      const response = await api.get('/receitas');
      setRecipes(response.data);
    } catch(error) {
        console.error("Error to find Recipes: ", error);
    };
  };

  return (
    <div>
      <h2>Recipes Suggestions</h2>
      <button onClick={ handleFindRecipes }>Find Recipes</button>
      <div style={{ display: 'flex', flexWarp: 'wrap' }}>
        {recipes.map((item) =>(
          <RecipeCard
            key={item.id}
            recipe={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
