'use client';
import React, { useState } from 'react';
import './Components.css';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ taskName, description, startDate, endDate });
    setTaskName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nombre de la Tarea" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Descripción de la Tarea" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
        required 
      />
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
        required 
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
