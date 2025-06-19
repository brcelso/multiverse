import React, { useState } from 'react';
import CardContainer from './components/CardContainer';
import { cards, combinations } from './data/cardsData';
import './App.css';
import TaskList from './components/TaskList';


function AppContent() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardList, setCardList] = useState(cards);

  const handleCardSelect = (card) => {
    setSelectedCards(prevSelected => {
      if (prevSelected.includes(card)) {
        return prevSelected.filter(c => c !== card);
      } else {
        return [...prevSelected, card];
      }
    });
  };

  const generateStory = () => {
    const messages = [];
    if (selectedCards.length === 1) {
      messages.push(selectedCards[0].description);
      return messages;
    }

    for (let i = 0; i < selectedCards.length - 1; i++) {
      const leftCard = selectedCards[i];
      const rightCard = selectedCards[i + 1];
      const leftCombinationKey = `${leftCard.id}-${rightCard.id}`;
      const leftCombination = combinations.find(comb => comb.id === leftCombinationKey);

      if (leftCombination && !messages.includes(leftCombination.description)) {
        messages.push(leftCombination.description);
      }
    }

    return messages.length > 0 ? messages : ['Nenhuma combinação encontrada.'];
  };

  return (
    <div className="app-content">
      <h1 className="app-title">Sistema de História de Cartas</h1>
      <CardContainer 
        cards={cardList} 
        selectedCards={selectedCards} 
        handleCardSelect={handleCardSelect} 
        setCards={setCardList} 
      />
      <div className="story-messages">
        {generateStory().map((message, index) => (
          <p key={index} className="story-message">{message}</p>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      {/* Renderiza o conteúdo da página duas vezes, lado a lado */}
      <AppContent />
      <TaskList />
    </div>
  );
}

export default App;
