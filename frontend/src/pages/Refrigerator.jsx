import { useState, useEffect } from 'react';
import api from '../services/api.js';

function Refrigerator() {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try{
        const response = await api.get('/geladeira');
        setIngredients(response.data);
      } catch (error) {
          console.error("Error to fetch refrigerator:", error);
      }
    };
    fetchIngredients();
  }, []);

  return (
    <div>
      <h2>My Refrigerator</h2>
      <ul>
        {ingredients.map((item) => (
          <li key={item.id}>
            {item.quantity} {item.unit_measurement} of {item.ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Refrigerator;
