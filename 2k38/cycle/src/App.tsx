import { useState } from "react";
import { GameSelector } from './components/GameSelector';
import CardGame from './components/CardGame';
import DynamicPriceChart from './components/DynamicPriceChart';
import { Games } from './data';
import './App.css';

const gameNames = Object.keys(Games);

function App() {
  const [selectedGame, setSelectedGame] = useState(gameNames[0]);

  return (
    <div className="app-container">
      {/* Seletor de jogo */}
      <GameSelector 
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame} 
        gameOptions={gameNames}
      />

      {/* CardGame: resumo do jogo */}
      <CardGame game={Games[selectedGame]} />

      {/* Gráfico dinâmico */}
      <div style={{ marginTop: '2rem' }}>
        <DynamicPriceChart gameData={Games[selectedGame]} />
      </div>
    </div>
  );
}

export default App;