import React, { useState, useEffect } from 'react';
import ProyectForm from './ProyectForm';
import ProyectCard from './ProyectCard';

const ProyectManager = () => {
  const [proyects, setProyects] = useState([]);

  // Llamar a la API para obtener los proyectos al cargar
  useEffect(() => {
    fetch('/api/projects')  // Asegúrate de que esta sea la ruta correcta de tu API
      .then(response => response.json())
      .then(data => setProyects(data))
      .catch(error => console.error('Error al obtener los proyectos:', error));
  }, []);

  const addProyect = (newProyect) => {
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProyect)
    })
      .then(() => {
        setProyects([...proyects, newProyect]);
      })
      .catch(error => console.error('Error al agregar el proyecto:', error));
  };

  const deleteProyect = (id) => {
    fetch(`/api/projects/${id}`, { method: 'DELETE' })
      .then(() => {
        setProyects(proyects.filter(proyect => proyect.id !== id));
      })
      .catch(error => console.error('Error al eliminar el proyecto:', error));
  };

  return (
    <div>
      <ProyectForm addProyect={addProyect} />
      <div className="proyect-list">
        {proyects.map(proyect => (
          <ProyectCard
            key={proyect.id}
            proyect={proyect}
            onDelete={() => deleteProyect(proyect.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProyectManager;
