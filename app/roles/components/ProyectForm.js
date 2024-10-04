'use client';  // Agregar esta línea para indicarle a Next.js que es un componente de cliente.

import React, { useState } from 'react';
import './Components.css';

const ProyectForm = ({ addProyect }) => {
  const [proyectName, setProyectName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProyect = {
      proyectName,
      description,
      assignee,
      id: Date.now(), // Esto puede ser reemplazado por el ID generado en el backend
    };
    addProyect(newProyect);
    setProyectName('');
    setDescription('');
    setAssignee('');
  };

  return (
    <form className="proyect-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del proyecto"
        value={proyectName}
        onChange={(e) => setProyectName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Encargado"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        required
      />
      <button type="submit">Agregar Proyecto</button>
    </form>
  );
};

export default ProyectForm;
