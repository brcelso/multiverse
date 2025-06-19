import React from 'react';
import MiniCard from './MiniCard'; // Importa o componente MiniCard

const CardContainer = ({ cards, selectedCards, handleCardSelect, setCards }) => {
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('text/plain', cardId); // Armazena o ID da carta arrastada
  };

  const handleDrop = (e, index) => {
    e.preventDefault(); // Impede o comportamento padrão

    const cardId = e.dataTransfer.getData('text/plain'); // Obtém o ID da carta arrastada
    const draggedCardIndex = cards.findIndex(card => card.id === cardId); // Encontra o índice da carta arrastada

    if (draggedCardIndex >= 0 && draggedCardIndex !== index) {
      // Apenas reordena se o índice for válido e diferente
      const newCards = [...cards]; // Faz uma cópia da lista de cartas
      const [draggedCard] = newCards.splice(draggedCardIndex, 1); // Remove a carta arrastada
      newCards.splice(index, 0, draggedCard); // Insere a carta arrastada na nova posição

      setCards(newCards); // Atualiza o estado com a nova ordem
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permite o drop
  };

  return (
    <div className="mini-cards-container">
      {cards.map((card, index) => (
        <MiniCard
          key={card.id}
          card={card}
          isSelected={selectedCards.includes(card)}
          onClick={() => handleCardSelect(card)}
          draggable // Adiciona a propriedade draggable
          onDragStart={(e) => handleDragStart(e, card.id)} // Passa o ID da carta
          onDrop={(e) => handleDrop(e, index)} // Lida com o drop
          onDragOver={handleDragOver} // Permite o drop
        />
      ))}
    </div>
  );
};

export default CardContainer;
