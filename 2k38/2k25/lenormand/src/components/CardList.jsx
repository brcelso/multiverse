// src/components/CardList.jsx

import React from 'react';
import Card from './Card';
import { cards } from '../data/cardsData';

function CardList({ onCardSelect }) {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} onSelect={onCardSelect} />
      ))}
    </div>
  );
}

export default CardList;
