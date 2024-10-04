"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verUsuarios.module.css";

function VerProyectos() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/control_admin/verUsuarios");
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    console.log(`Editar el Usuario con ID: ${projectId}`);
  };

  const handleDelete = (projectId) => {
    console.log(`Eliminar Usuario con ID: ${projectId}`);
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.name, sortable: true },
    {
      name: "Usuario",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    { name: "Rol", selector: (row) => row.role, sortable: true },
    {
      name: "Opciones",
      cell: (row) => (
        <div className={styles.options}>
          <button
            className={styles.viewButton}
            onClick={() => handleEdit(row.id)}
          >
            Editar
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
        <h2 className={styles.title}>Usuarios</h2>
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
