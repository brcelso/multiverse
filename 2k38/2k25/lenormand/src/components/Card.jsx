// src/components/Card.jsx

import React from 'react';

function Card({ card, onSelect }) {
  return (
    <div>
      <h3>{card.name}</h3>
      <button onClick={() => onSelect(card)}>Selecionar</button>
    </div>
  );
}

export default Card;