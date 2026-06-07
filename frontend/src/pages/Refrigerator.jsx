import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

import IngredientItem from '../components/IngredientItem';

export default function Refrigerator() {

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {

    const fetchIngredients = async() => {
      try {
        const response = await api.get('/geladeira')
        setIngredients(response.data)
      } catch(error) {
          console.error("Error fetching ingredients:", error)
      }
    };

    fetchIngredients()

  }, []);


  const handleDelete = (id) => { console.log("Deletar ID:", id)}

  return (
    <div>
      <h1> My Fried fridge </h1>
      
      <ul>
        {ingredients.map((item) =>(
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
