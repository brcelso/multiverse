import React from 'react';
import './CICD.css'; // Para adicionar estilos

const CICD = () => {
  const handleButtonClick = (status) => {
    alert(`Status: ${status}`);
  };

  return (
    <div className="cicd-container">
      <button className="cicd-button todo" onClick={() => handleButtonClick('To Do')}>
        <span className="button-label">🛠️</span> {/* Emoji de "To Do" */}
      </button>
      <button className="cicd-button doing" onClick={() => handleButtonClick('Doing')}>
        <span className="button-label">🚧</span> {/* Emoji de "Em Construção" */}
      </button>
      <button className="cicd-button done" onClick={() => handleButtonClick('Done')}>
        <span className="button-label">✅</span> {/* Emoji de "Done" */}
      </button>
    </div>
  );
};

export default CICD;
