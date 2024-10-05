"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verProyectos.module.css"; // Importa el archivo CSS como módulo

function VerProyectos() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir o cerrar el modal
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado para editar
  const [newStatus, setNewStatus] = useState(""); // Estado actualizado

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/control_admin/verProyectos");
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleViewDetails = (id) => {
    window.location.href = `verDetalles?id=${id}`;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este proyecto?"
    );

    if (confirmDelete) {
      const response = await fetch("/api/control_admin/eliminarProyecto", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      console.log("Respuesta de la eliminación:", response); // Verifica la respuesta

      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
      } else {
        const errorData = await response.json(); // Obtener el mensaje de error
        console.error("Error al eliminar el proyecto:", errorData.message);
      }
    }
  };

  const handleEditStatus = (projectId) => {
    const projectToEdit = projects.find((project) => project.id === projectId);
    setSelectedProject(projectToEdit); // Guardar el proyecto seleccionado
    setNewStatus(projectToEdit.estado); // Inicializar el estado actual en el modal
    setIsModalOpen(true); // Abrir el modal
  };

  const handleSaveStatus = async () => {
    const response = await fetch("/api/control_admin/editarEstadoProyecto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, estado: estado }),
    });

    if (response.ok) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? { ...project, estado: estado } : project
        )
      );
      setIsModalOpen(false); // Cerrar el modal
    } else {
      const errorData = await response.json(); // Obtener el mensaje de error
      console.error(
        "Error al actualizar el estado del proyecto:",
        errorData.message
      );
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre_proyecto, sortable: true },
    {
      name: "Fecha de Inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Fecha Fin Estimada",
      selector: (row) => row.fecha_fin_estimada,
      sortable: true,
    },
    { name: "Estado", selector: (row) => row.estado, sortable: true },
    {
      name: "Opciones",
      cell: (row) => (
        <div className={styles.options}>
          <button
            className={styles.viewButton}
            onClick={() => handleViewDetails(row.id)}
          >
            Ver Detalles
          </button>
          <button
            className={styles.editButton} // Nuevo botón para editar estado
            onClick={() => handleEditStatus(row.id)}
          >
            Editar Estado
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(row.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Proyectos</h2>
        <DataTable
          columns={columns}
          data={projects}
          pagination
          responsive
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
          striped
          className={styles.dataTable}
        />
      </div>

      {/* Modal para editar el estado */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Estado de {selectedProject.nombre_proyecto}</h3>
            <label>
              Nuevo Estado:
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="En Desarrollo">En Desarrollo</option>
                <option value="Pruebas QA">Pruebas QA</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSaveStatus} className={styles.saveButton}>
                Guardar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerProyectos;
