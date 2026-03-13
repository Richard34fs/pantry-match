import styles from './RecipeCard.module.css';

function RecipeCard({ recipe }) {
  return(
    <div className = { styles.cardContainer }>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} className = { styles.recipeImage } />
      <p> Missing ingredients: {recipe.missedIngredientCount}</p>
    </div>
  );
};

export default RecipeCard;
