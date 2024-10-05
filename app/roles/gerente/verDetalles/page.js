"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Obtener parámetros de búsqueda
import Navbar from "@/app/ui/navbar/pages";
import Card from "@/app/ui/cards/page"; // Ajusta la ruta según la estructura de tu proyecto
import styles from "./verDetalles.module.css"; // Archivo CSS como módulo

function VerDetalles() {
  const [projects, setProjects] = useState([]); // Para manejar proyectos
  const [isEditing, setIsEditing] = useState(false); // Estado para habilitar el formulario de edición
  const [newState, setNewState] = useState(""); // Estado para el nuevo estado del proyecto
  const [newEndDate, setNewEndDate] = useState(""); // Estado para la nueva fecha final
  const [tareas, setTareas] = useState([]);
  const searchParams = useSearchParams(); // Obtener los parámetros de la URL
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchTareas = async () => {
        try {
          const response = await fetch(
            `/api/control_gerente/buscarTareas?id=${id}`
          );
          const data = await response.json();
          if (response.ok) {
            setTareas(data); // Asigna las tareas obtenidas al estado
          } else {
            console.error("Error al obtener tareas:", data.message);
          }
        } catch (error) {
          console.error("Error al obtener tareas:", error);
        }
      };

      fetchTareas();
    }
  }, [id]); // Ejecuta el efecto solo si 'nombreProyecto' cambia

  useEffect(() => {
    if (id) {
      const fetchProjects = async () => {
        try {
          const response = await fetch(
            `/api/control_gerente/verDetalles?id=${id}`
          );
          const data = await response.json();
          if (response.ok) {
            setProjects([data]); // Coloca el proyecto en un array para mapearlo
            setNewState(data.estado); // Inicializa el estado del formulario con el estado actual
            setNewEndDate(data.fecha_fin_estimada); // Inicializa la fecha final con la fecha actual
          } else {
            console.error("Error al obtener el proyecto");
          }
        } catch (error) {
          console.error("Error al obtener los detalles del proyecto:", error);
        }
      };

      fetchProjects();
    }
  }, [id]); // Ejecuta el efecto solo cuando cambien 'id'

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Alterna el estado de edición
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatea la fecha a "YYYY-MM-DD"
    const formattedEndDate = newEndDate.split("T")[0]; // Obtiene la parte de la fecha

    // Mostrar la información que se enviará al servidor
    const projectData = {
      id: id, // ID del proyecto que se está editando
      estado: newState,
      fecha_fin_real: formattedEndDate, // Usa la fecha formateada
    };

    try {
      const response = await fetch(`/api/control_gerente/actualizarProyecto`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData), // Envía el objeto con la información del proyecto
      });

      if (response.ok) {
        const updatedProject = await response.json(); // Obtén el proyecto actualizado

        // Actualiza el estado local de los proyectos
        setProjects((prevProjects) =>
          prevProjects.map(
            (project) => (project.id === id ? updatedProject : project) // Reemplaza el proyecto actualizado
          )
        );

        alert("Proyecto actualizado exitosamente!");
        // Recargar la página
        window.location.reload();
      } else {
        throw new Error("Error al actualizar el proyecto");
      }
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <ul className={styles.projectList}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className={styles.projectItem}>
                <div className={styles.projectDetails}>
                  <h3 className={styles.projectName}>
                    {project.nombre_proyecto}
                  </h3>
                  <p>
                    <strong>Fecha de Creación:</strong>{" "}
                    {new Date(project.fecha_creacion).toLocaleDateString(
                      "es-ES"
                    )}
                  </p>
                  <p>
                    <strong>Fecha de Inicio:</strong>{" "}
                    {new Date(project.fecha_inicio).toLocaleDateString("es-ES")}
                  </p>
                  <p>
                    <strong>Fecha Fin Estimada:</strong>{" "}
                    {new Date(project.fecha_fin_estimada).toLocaleDateString(
                      "es-ES"
                    )}
                  </p>
                  <p>
                    <strong>Estado:</strong> {project.estado}
                  </p>
                  {project.estado === "Finalizado" && (
                    <p>
                      <strong>Fecha fin:</strong>{" "}
                      {new Date(project.fecha_fin_real).toLocaleDateString(
                        "es-ES"
                      )}
                    </p>
                  )}
                  <p>
                    <strong>Descripción:</strong> {project.descripcion}
                  </p>
                  {project.estado !== "Finalizado" && (
                    <button
                      onClick={handleEditClick}
                      className={styles.editButton}
                    >
                      {isEditing ? "Cancelar" : "Editar"}
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No hay información disponible</p>
          )}
        </ul>
        <Card tareas={tareas} />

        {isEditing && (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <h3>Editar Proyecto</h3>
            <label>
              Nuevo estado:
              <select
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                required
              >
                <option>Seleccionar estado</option>
                <option value="En desarrollo">En desarrollo</option>
                <option value="Pruebas QA">Pruebas QA</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>

            {newState === "Finalizado" && (
              <label>
                Fecha Fin:
                <input
                  type="date"
                  value={newEndDate.split("T")[0]} // Ajusta el formato de la fecha
                  onChange={(e) => setNewEndDate(e.target.value)}
                  required
                />
              </label>
            )}

            <button type="submit">Guardar Cambios</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default VerDetalles;
