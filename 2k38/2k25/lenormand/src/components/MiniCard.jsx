import React from 'react';
import './MiniCard.css'; // Estilos para a mini-carta

const MiniCard = ({ card, isSelected, onClick, onDragStart }) => {
  return (
    <div 
      className={`mini-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={onClick} // Adiciona acessibilidade
      title={card.name} // Exibe o nome da carta ao passar o mouse
      draggable // Permite que a carta seja arrastável
      onDragStart={onDragStart} // Evento ao iniciar o arraste
      onDragEnd={(e) => e.preventDefault()} // Previne comportamento padrão
    >
      <span className="card-emoji" style={{ fontSize: '2rem' }}>{card.emoji}</span> {/* Aumenta o tamanho do emoji */}
    </div>
  );
};

export default MiniCard;
