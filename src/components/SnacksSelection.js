import React, { useState } from 'react';
import './SnacksSelection.css';

const SnacksSelection = ({ selectedSnacks, onSnacksChange }) => {
  const [snacksQuantities, setSnacksQuantities] = useState({});

  const snacksMenu = [
    { name: 'Popcorn', price: 150, image: '🍿' },
    { name: 'Nachos', price: 120, image: '🧀' },
    { name: 'Cold Drink', price: 80, image: '🥤' },
    { name: 'Hot Dog', price: 100, image: '🌭' },
    { name: 'Candy', price: 50, image: '🍬' },
    { name: 'French Fries', price: 90, image: '🍟' }
  ];

  const handleQuantityChange = (snackName, quantity) => {
    const newQuantities = { ...snacksQuantities, [snackName]: quantity };
    setSnacksQuantities(newQuantities);

    // Update selected snacks
    const updatedSnacks = Object.entries(newQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => ({
        name,
        quantity: qty,
        price: snacksMenu.find(s => s.name === name).price
      }));

    onSnacksChange(updatedSnacks);
  };

  const getTotalSnacksAmount = () => {
    return selectedSnacks.reduce((total, snack) => total + (snack.price * snack.quantity), 0);
  };

  return (
    <div className="snacks-selection">
      <h3>Add Snacks & Beverages</h3>
      <div className="snacks-grid">
        {snacksMenu.map(snack => (
          <div key={snack.name} className="snack-item">
            <div className="snack-image">{snack.image}</div>
            <div className="snack-details">
              <h4>{snack.name}</h4>
              <p className="snack-price">₹{snack.price}</p>
            </div>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(snack.name, Math.max(0, (snacksQuantities[snack.name] || 0) - 1))}
              >
                -
              </button>
              <span className="quantity">{snacksQuantities[snack.name] || 0}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(snack.name, (snacksQuantities[snack.name] || 0) + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSnacks.length > 0 && (
        <div className="snacks-summary">
          <h4>Selected Snacks:</h4>
          <ul>
            {selectedSnacks.map((snack, index) => (
              <li key={index}>
                {snack.name} x {snack.quantity} = ₹{snack.price * snack.quantity}
              </li>
            ))}
          </ul>
          <div className="snacks-total">
            <strong>Total Snacks: ₹{getTotalSnacksAmount()}</strong>
          </div>
        </div>
      )}

      <div className="snacks-note">
        <p>💡 Snacks will be delivered during intermission</p>
      </div>
    </div>
  );
};

export default SnacksSelection;