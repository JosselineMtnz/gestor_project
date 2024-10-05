"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Obtener parámetros de búsqueda
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verDetalles.module.css"; // Archivo CSS como módulo

function VerDetalles() {
  const [projects, setProjects] = useState([]); // Para manejar proyectos
  const searchParams = useSearchParams(); // Obtener los parámetros de la URL
  const id = searchParams.get("id"); // Obtener el ID de la URL

  useEffect(() => {
    const fetchProjects = async () => {
      if (id) {
        try {
          const response = await fetch(
            `/api/control_admin/verDetalles?id=${id}`
          );
          if (!response.ok) {
            throw new Error("Error al obtener el proyecto");
          }
          const data = await response.json();
          setProjects([data]); // Coloca el proyecto en un array para mapearlo
        } catch (error) {
          console.error("Error al obtener los detalles del proyecto:", error);
        }
      }
    };

    fetchProjects();
  }, [id]); // Ejecuta el efecto cuando cambia el 'id'

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
                    <strong>Usuario asignado:</strong>{" "}
                    {project.usuario_asignado}
                  </p>
                  <p>
                    <strong>Estado:</strong> {project.estado}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {project.descripcion}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No hay información disponible</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default VerDetalles;
