import { useState, useEffect } from 'react';
import api from '../services/api.js';
import IngredientItem from '../components/IngredientItem'

function Refrigerator() {

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsName, setIngredientsName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitMeasurement, setUnitMeasurement] = useState("");

  const fetchIngredients = async () => {
    try{
      const response = await api.get('/geladeira');
      setIngredients(response.data);
    } catch (error) {
        console.error("Error to fetch refrigerator:", error);
    }
  };

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try{
      await api.post('/geladeira', {
        "userId": 1,
        "ingredientName": ingredientsName,
        "quantity": quantity,
        "unitMeasurement": unitMeasurement 
      })

      fetchIngredients();
      setIngredientsName("");
      setQuantity("");
      setUnitMeasurement("");

    } catch (error){
      console.error("Error to add a ingredient", error);
    };
  };

  const handleDelete = async(id) => {
    try {
      await api.delete(`/geladeira/${id}`)
      fetchIngredients();
    } catch (error) {
      console.error("Error to delete an igredient", error);
    };
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <h2>My Refrigerator</h2>
      <form onSubmit={handleAddIngredient}>
        <input value={ingredientsName} onChange={(e) => setIngredientsName(e.target.value)}/>
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        <input value={unitMeasurement} onChange={(e) => setUnitMeasurement(e.target.value)}/>
        <button type="submit">Add</button>
      </form>

      <ul>
        {ingredients.map((item) => (
          <IngredientItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default Refrigerator;
