function IngredientItem({ item, onDelete }) {
  return (
    <li>
      {item.quantity} {item.unit_measurement} of {item.ingredient}
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
}

export default IngredientItem;
