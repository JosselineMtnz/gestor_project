<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verProyectos.module.css";

function VerProyectos() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const name = localStorage.getItem("name");

      try {
        const response = await fetch(
          `/api/control_gerente/verProyectos?usuario=${name}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los proyectos");
        }

        const data = await response.json();
        console.log(data); // Verifica que el campo 'nombre_proyecto' esté presente
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleViewDetails = (id) => {
    window.location.href = `verDetalles?id=${id}`;
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre",
      selector: (row) => row.nombre_proyecto || "Nombre no disponible",
      sortable: true,
    },
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
            onClick={() => {
              console.log("Nombre del proyecto:", row.nombre_proyecto); // Verifica que el nombre del proyecto no sea undefined
              handleViewDetails(row.id, row.nombre_proyecto);
            }}
          >
            Ver Detalles
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
=======
>>>>>>> 5de718ca0b8fbcf8a3ab29d3c04a159946ac39a7
