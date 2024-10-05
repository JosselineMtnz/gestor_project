"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/app/ui/navbar/pages";
import styles from "./verUsuarios.module.css";

function VerProyectos() {
  const [projects, setProjects] = useState([]); // Datos de usuarios
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir o cerrar el modal
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para editar
  const [newRole, setNewRole] = useState(""); // Rol actualizado

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await fetch("/api/control_admin/verUsuarios");
      const data = await response.json();
      setProjects(data);
    };
    fetchUsuarios();
  }, []);

  const handleEdit = (userId) => {
    // Encontrar el usuario seleccionado por ID
    const userToEdit = projects.find((user) => user.id === userId);
    setSelectedUser(userToEdit); // Guardar el usuario seleccionado
    setNewRole(userToEdit.role); // Inicializar el rol actual en el modal
    setIsModalOpen(true); // Abrir el modal
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (confirmDelete) {
      const response = await fetch("/api/control_admin/eliminarUsuario", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      console.log("Respuesta de la eliminación:", response); // Verifica la respuesta

      if (response.ok) {
        // Si la eliminación fue exitosa, actualizar la lista de usuarios
        setProjects((prevProjects) =>
          prevProjects.filter((user) => user.id !== userId)
        );
      } else {
        const errorData = await response.json(); // Obtener el mensaje de error
        console.error("Error al eliminar el usuario:", errorData.message);
      }
    }
  };

  const handleSave = async () => {
    // Aquí se hace la petición para actualizar el rol en la base de datos
    const response = await fetch("/api/control_admin/editarRolUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedUser.id, role: newRole }),
    });

    if (response.ok) {
      // Si la actualización fue exitosa, actualizar el rol en la tabla
      setProjects((prevProjects) =>
        prevProjects.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
      setIsModalOpen(false); // Cerrar el modal
    } else {
      console.error("Error al actualizar el rol del usuario.");
    }
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

      {/* Modal para editar el rol */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Rol de {selectedUser.name}</h3>
            <label>
              Nuevo Rol:
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="admin">admin</option>
                <option value="usuario">usuario</option>
                <option value="gerente">gerente</option>
              </select>
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSave} className={styles.saveButton}>
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
