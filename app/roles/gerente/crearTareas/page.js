"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "@/app/ui/navbar/pages";
import styles from "./crearTareas.module.css";

function CrearTarea() {
  const [nombreTarea, setNombreTarea] = useState("");
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [idProyecto, setIdProyecto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [comentario, setComentario] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProjectSuggestions, setShowProjectSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("/api/control_gerente/buscarUsuarioAsignado");
        const data = await response.json();
        if (response.ok) {
          setUsuarios(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch("/api/control_gerente/buscarProyecto");
        const data = await response.json();
        if (response.ok) {
          setProyectos(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };
    fetchProyectos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tarea = {
      nombreTarea,
      nombreProyecto,
      usuarioAsignado,
      fechaInicio,
      comentario,
      idProyecto,
    };

    try {
      const response = await fetch("/api/control_gerente/crearTarea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarea),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Tarea creada exitosamente!");
        router.push("/roles/gerente/verProyectos");
      } else {
        alert(data.message || "No se pudo crear la tarea.");
      }
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      alert("Hubo un error al crear la tarea.");
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProyectos = proyectos.filter((proyecto) =>
    proyecto.nombre_proyecto.toLowerCase().includes(nombreProyecto.toLowerCase())
  );

  const handleUsuarioSelect = (usuario) => {
    setUsuarioAsignado(usuario.name);
    setSearchTerm(usuario.name);
    setShowSuggestions(false);
  };

  const handleProyectoSelect = (proyecto) => {
    setNombreProyecto(proyecto.nombre_proyecto);
    setIdProyecto(proyecto.id);
    setShowProjectSuggestions(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0 && filteredUsuarios.length > 0);
  };

  const handleProyectoChange = (e) => {
    setNombreProyecto(e.target.value);
    setShowProjectSuggestions(e.target.value.length > 0 && filteredProyectos.length > 0);
  };

  return (
    <div>
      <Navbar />
      <h2 className={styles.title}>Crear Tarea</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Seleccionar proyecto:</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Buscar proyecto..."
            value={nombreProyecto}
            onChange={handleProyectoChange}
            required
          />
          <input type="text" value={idProyecto} readOnly style={{ display: "none" }} />
          {showProjectSuggestions && (
            <ul className={styles.suggestionsList}>
              {filteredProyectos.map((proyecto) => (
                <li
                  key={proyecto.id}
                  className={styles.suggestionItem}
                  onClick={() => handleProyectoSelect(proyecto)}
                >
                  {proyecto.nombre_proyecto}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre de la tarea:</label>
          <input
            type="text"
            className={styles.input}
            value={nombreTarea}
            onChange={(e) => setNombreTarea(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Fecha de Inicio:</label>
          <input
            type="date"
            className={styles.input}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Usuario Asignado:</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {showSuggestions && (
            <ul className={styles.suggestionsList}>
              {filteredUsuarios.map((usuario) => (
                <li
                  key={usuario.id}
                  className={styles.suggestionItem}
                  onClick={() => handleUsuarioSelect(usuario)}
                >
                  {usuario.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Comentario:</label>
          <textarea
            className={styles.textarea}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Crear Tarea
        </button>
      </form>
    </div>
  );
}

export default CrearTarea;
