"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verProyectos.module.css"; // Importa el archivo CSS como módulo

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

  const handleViewDetails = (projectId) => {
    console.log(`Ver detalles del proyecto ID: ${projectId}`);
  };

  const handleDelete = (projectId) => {
    console.log(`Eliminar proyecto ID: ${projectId}`);
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
            className={styles.deleteButton}
            onClick={() => handleDelete(row.id)}
          >
            Eliminar
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
