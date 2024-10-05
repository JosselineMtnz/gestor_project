import styles from "./card.module.css";

const Card = ({ tareas }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );

    if (confirmDelete) {
      const response = await fetch(`/api/control_gerente/eliminarTarea`, {
        // Asegúrate de usar el endpoint correcto para eliminar la tarea
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Filtra las tareas que no coinciden con el ID eliminado
        alert("Tarea eliminada!");
        window.location.reload();
      } else {
        const errorData = await response.json(); // Obtener el mensaje de error
        console.error("Error al eliminar la tarea:", errorData.message);
      }
    }
  };

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardTitle}>Tareas del Proyecto</h2>
      {tareas.length > 0 ? (
        tareas.map((tarea) => (
          <div className={styles.card} key={tarea.id}>
            <h3 className={styles.taskTitle}>{tarea.nombre_tarea}</h3>
            <p className={styles.taskInfo}>
              <strong>Asignado a:</strong> {tarea.usuario_asignado}
            </p>
            <p className={styles.taskInfo}>
              <strong>Fecha de Inicio:</strong>{" "}
              {new Date(tarea.fecha_inicio).toLocaleDateString("es-ES")}
            </p>
            {tarea.fecha_fin && (
              <p className={styles.taskInfo}>
                <strong>Fecha Fin:</strong>{" "}
                {new Date(tarea.fecha_fin).toLocaleDateString("es-ES")}
              </p>
            )}
            <p className={styles.taskInfo}>
              <strong>Estado:</strong> {tarea.estado}
            </p>
            <p className={styles.taskInfo}>
              <strong>Comentario:</strong> {tarea.comentario}
            </p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(tarea.id)}
            >
              Eliminar Tarea
            </button>
          </div>
        ))
      ) : (
        <p>No hay tareas asignadas a este proyecto.</p>
      )}
    </div>
  );
};

export default Card;
