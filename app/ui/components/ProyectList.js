'use client';
import React, { useState } from 'react';
import ProyectForm from './ProyectForm';
import ProyectCard from './ProyectCard';
import useLocalStorage from './useLocalStorage'; // Importa el custom hook
import './Components.css';

const ProyectList = () => {
  const [proyects, setProyects] = useLocalStorage('proyects', []); // Usa el hook aquí
  const [editingProyect, setEditingProyect] = useState(null);
  const [showProyectForm, setShowProyectForm] = useState(false);

  const addProyect = (proyect) => {
    if (editingProyect) {
      setProyects(proyects.map(p => (p.id === proyect.id ? proyect : p)));
      setEditingProyect(null);
    } else {
      const newProyect = { ...proyect, id: Date.now() };
      setProyects([...proyects, newProyect]);
    }
    setShowProyectForm(false);
  };

  const deleteProyect = (id) => {
    setProyects(proyects.filter(proyect => proyect.id !== id));
  };

  const editProyect = (proyect) => {
    setEditingProyect(proyect);
    setShowProyectForm(true);
  };

  return (
    <div>
      <button className="BtnCrear" onClick={() => {
        setShowProyectForm(!showProyectForm);
        setEditingProyect(null); 
      }}>
        {showProyectForm ? 'Cancelar' : 'Crear Proyecto'}
      </button>

      {showProyectForm && <ProyectForm addProyect={addProyect} editingProyect={editingProyect} />}

      <div className="proyect-list">
        {proyects.map((proyect) => (
          <ProyectCard 
            key={proyect.id} 
            proyect={proyect} 
            onDelete={deleteProyect} 
            onEdit={editProyect} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProyectList;
