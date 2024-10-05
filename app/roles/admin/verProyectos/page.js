"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verProyectos.module.css";

function VerProyectos() {
  const [projects, setProjects] = useState([]);

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

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre_proyecto, sortable: true },
    {
      name: "Fecha de Inicio",
      selector: (row) => new Date(row.fecha_inicio).toLocaleDateString("es-ES"), // Formato legible
      sortable: true,
    },
    {
      name: "Fecha Fin Estimada",
      selector: (row) =>
        new Date(row.fecha_fin_estimada).toLocaleDateString("es-ES"), // Formato legible
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
    </div>
  );
}

export default VerProyectos;
