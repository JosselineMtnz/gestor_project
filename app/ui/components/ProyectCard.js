'use client';
import React, { useState } from 'react';
import TaskForm from './TaskForm';
import useLocalStorage from './useLocalStorage'; // Importa el custom hook

const ProyectCard = ({ proyect, onDelete, onEdit }) => {
  const [tasks, setTasks] = useLocalStorage(`tasks_${proyect.id}`, []); // Usa el hook aquí
  const [showTaskForm, setShowTaskForm] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, completed: false, canceled: false }]);
    setShowTaskForm(false);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const cancelTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].canceled = true;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="proyect-card">
      <h3 className='h3proyect'>{proyect.proyectName}</h3>
      <p>{proyect.description}</p>
      <button className='edit-button' onClick={() => onEdit(proyect)}>Editar</button>
      <button className='delete-button' onClick={() => onDelete(proyect.id)}>Eliminar</button>

      <button onClick={() => setShowTaskForm(!showTaskForm)}>
        {showTaskForm ? 'Cancelar' : 'Agregar Tarea'}
      </button>

      {showTaskForm && <TaskForm addTask={addTask} />}
      <hr />
      <div className="task-list">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className={`task-card ${task.completed ? 'completed' : ''} ${task.canceled ? 'canceled' : ''}`}
          >
            <h3 className='h3task'>{task.taskName}</h3>
            <p>{task.description}</p>
            <p><strong>Fecha de inicio:</strong> {task.startDate}</p>
            <p><strong>Fecha de final:</strong> {task.endDate}</p>
            <div className="task-buttons">
              {!task.completed && !task.canceled && (
                <>
                  <button onClick={() => completeTask(index)}>Tarea Completada</button>
                  <button onClick={() => cancelTask(index)}>Tarea Cancelada</button>
                </>
              )}
              <button onClick={() => deleteTask(index)}>Eliminar Tarea</button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProyectCard;
