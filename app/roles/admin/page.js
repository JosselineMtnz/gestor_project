"use client";

import styles from "./controlUsuarios.module.css";
import Navbar from "@/app/ui/navbar/pages";
import Footer from "@/app/ui/footer/pages";
import { useState, useEffect } from "react";

function ControlUsuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/control_admin");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  //Funcion de los botones
  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div>
      <Navbar></Navbar>
      <h2 className={styles.title}>Control de Usuarios</h2>

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>
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

export default ControlUsuarios;
