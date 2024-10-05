"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verMisTareas.module.css"; // Importa el archivo CSS como módulo

function verMisTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      const name = localStorage.getItem("name");

      try {
        const response = await fetch(
          `/api/control_usuario/verMisTareas?usuario=${name}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las tareas");
        }

        const data = await response.json();
        console.log(data);
        setTareas(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTareas();
  }, []); // Agrega name a la lista de dependencias

  const handleViewDetails = (tareaId) => {
    window.location.href = `verDetalles?id=${id}`;
  };

  const handleDelete = async (tareaId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tareas?"
    );

    if (confirmDelete) {
      const response = await fetch("/api/control_usuario/eliminarTarea", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      console.log("Respuesta de la eliminación:", response); // Verifica la respuesta

      if (response.ok) {
        setTareas((prevTareas) =>
          prevTareas.filter((tarea) => tarea.id !== id)
        );
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el proyecto:", errorData.message);
      }
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre Tarea",
      selector: (row) => row.nombre_tarea,
      sortable: true,
    },
    {
      name: "Nombre Proyecto",
      selector: (row) => row.nombre_proyecto,
      sortable: true,
    },
    {
      name: "Fecha de Inicio",
      selector: (row) => row.fecha_inicio,
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
        <h2 className={styles.title}>Mis Tareas</h2>
        <DataTable
          columns={columns}
          data={tareas}
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

export default verMisTareas;
