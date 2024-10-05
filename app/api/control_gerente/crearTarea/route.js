import conexion from "../../../conexion/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Leer los datos del cuerpo de la solicitud
    const {
      nombreTarea,
      nombreProyecto,
      usuarioAsignado,
      fechaInicio,
      comentario,
      idProyecto,
    } = await request.json();

    console.log("Datos recibidos:", {
      nombreTarea,
      nombreProyecto,
      usuarioAsignado,
      fechaInicio,
      comentario,
      idProyecto,
    });

    // Obtener la fecha actual del sistema para la fecha de creación
    const fechaCreacion = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Ejecutar la consulta para insertar el proyecto en la base de datos
    const [rows] = await conexion.query(
      "INSERT INTO tareas(nombre_tarea, nombre_proyecto, usuario_asignado, fecha_creacion, fecha_inicio, comentario, id_proyecto) VALUES (?,?,?,?,?,?,?)",
      [
        nombreTarea,
        nombreProyecto,
        usuarioAsignado,
        fechaCreacion,
        fechaInicio,
        comentario,
        idProyecto,
      ]
    );

    console.log("Resultado de la inserción:", rows);

    // Verificar si se insertó correctamente
    if (rows.affectedRows > 0) {
      return NextResponse.json(
        { message: "Tarea guardada exitosamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se pudo guardar la Tarea." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al guardar la Tarea:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
