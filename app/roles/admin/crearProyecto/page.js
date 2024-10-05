"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import Navbar from "@/app/ui/navbar/pages";
import styles from "./crearProyecto.module.css";

function CrearProyecto() {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinEstimada, setFechaFinEstimada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [gerentes, setGerentes] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter(); // Inicializa el router

  // Obtener la lista de gerentes desde la API
  useEffect(() => {
    const fetchGerentes = async () => {
      try {
        const response = await fetch(
          "/api/control_admin/buscarUsuarioAsignado"
        );
        const data = await response.json();
        //console.log(data);
        if (response.ok) {
          setGerentes(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener gerentes:", error);
      }
    };

    fetchGerentes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proyecto = {
      nombreProyecto,
      fechaInicio,
      fechaFinEstimada,
      descripcion,
      usuarioAsignado,
    };

    try {
      const response = await fetch("/api/control_admin/crearProyecto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Proyecto creado exitosamente!");
        router.push("/roles/admin/verProyectos"); // Redirige a la página de ver proyectos
      } else {
        alert(data.message || "No se pudo crear el proyecto.");
      }
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
      alert("Hubo un error al crear el proyecto.");
    }
  };

  // Filtrar los gerentes con base en el término de búsqueda
  const filteredGerentes = gerentes.filter((gerente) =>
    gerente.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar la selección de un gerente
  const handleGerenteSelect = (gerente) => {
    setUsuarioAsignado(gerente.name);
    setSearchTerm(gerente.name); // Establecemos el nombre del gerente en el campo de búsqueda
    setShowSuggestions(false); // Ocultar la lista de sugerencias después de seleccionar
  };

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    // Mostrar las sugerencias si hay coincidencias y el campo no está vacío
    if (e.target.value.length > 0 && filteredGerentes.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false); // Ocultar la lista si no hay coincidencias o si el campo está vacío
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className={styles.title}>Crear Proyecto</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre del Proyecto:</label>
          <input
            type="text"
            className={styles.input}
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
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
          <label className={styles.label}>Fecha Fin Estimada:</label>
          <input
            type="date"
            className={styles.input}
            value={fechaFinEstimada}
            onChange={(e) => setFechaFinEstimada(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Usuario Asignado:</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Buscar gerente..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {showSuggestions && (
            <ul className={styles.suggestionsList}>
              {filteredGerentes.map((gerente) => (
                <li
                  key={gerente.id}
                  className={styles.suggestionItem}
                  onClick={() => handleGerenteSelect(gerente)}
                >
                  {gerente.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción:</label>
          <textarea
            className={styles.textarea}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Crear Proyecto
        </button>
      </form>
    </div>
  );
}

export default CrearProyecto;
