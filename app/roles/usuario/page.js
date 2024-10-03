"use client";

import styles from "./verProyectos.module.css";
import Navbar from "@/app/ui/navbar/pages";
import Footer from "@/app/ui/footer/pages";
import { useState, useEffect } from "react";

function verProyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch("/api/control_usuarios");
        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProyectos();
  }, []);

  //Funcion de los botones
  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div>
      <Navbar></Navbar>
      <h2 className={styles.title}>Mis proyectos</h2>

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Proyecto</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin Estimada</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto) => (
              <tr key={proyecto.id}>
                <td>{proyecto.id}</td>
                <td>{proyecto.nombre_proyecto}</td>
                <td>{proyecto.fecha_inicio}</td>
                <td>{proyecto.fecha_fin_estimada}</td>
                <td>{proyecto.estado}</td>
                <td>
                  <button onClick={() => handleEdit(proyecto.id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(proyecto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default verProyectos;
