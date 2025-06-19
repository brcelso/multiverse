import React, { useState } from 'react';
import './Task.css'; // Arquivo de estilo

const Task = ({ taskName }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="task-container">
      <h2 className="task-name">{taskName}</h2>
      <div className="cicd-container">
        <button 
          className={`cicd-button todo ${selectedStatus === 'todo' ? 'selected' : ''}`} 
          onClick={() => handleStatusChange('todo')}
        >
          <span className="button-label">🛠️</span> {/* Emoji de "To Do" */}
        </button>
        <button 
          className={`cicd-button doing ${selectedStatus === 'doing' ? 'selected' : ''}`} 
          onClick={() => handleStatusChange('doing')}
        >
          <span className="button-label">🚧</span> {/* Emoji de "Em Construção" */}
        </button>
        <button 
          className={`cicd-button done ${selectedStatus === 'done' ? 'selected' : ''}`} 
          onClick={() => handleStatusChange('done')}
        >
          <span className="button-label">✅</span> {/* Emoji de "Done" */}
        </button>
      </div>
    </div>
  );
};

const TaskList = () => {
  const tasks = ['Ativar a história']; 

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task key={index} taskName={task} />
      ))}
    </div>
  );
};

export default TaskList;
