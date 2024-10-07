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

    // Validar que todos los campos estén presentes
    if (!nombreTarea || !nombreProyecto || !usuarioAsignado || !fechaInicio || !comentario || !idProyecto) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 } // Bad Request
      );
    }

    // Validar que la fecha de inicio esté en un formato correcto
    if (isNaN(Date.parse(fechaInicio))) {
      return NextResponse.json(
        { message: "Fecha de inicio inválida." },
        { status: 400 }
      );
    }

    // Obtener la fecha actual del sistema para la fecha de creación
    const fechaCreacion = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Verificar que el proyecto exista
    const [proyectoExists] = await conexion.query(
      "SELECT COUNT(*) as count FROM proyectos WHERE id = ?",
      [idProyecto]
    );

    if (proyectoExists[0].count === 0) {
      return NextResponse.json(
        { message: "El proyecto especificado no existe." },
        { status: 404 }
      );
    }

    // Ejecutar la consulta para insertar la tarea en la base de datos
    const [rows] = await conexion.query(
      "INSERT INTO tareas(nombre_tarea, nombre_proyecto, usuario_asignado, fecha_inicio, comentario, id_proyecto) VALUES (?,?,?,?,?,?)",
      [
        nombreTarea,
        nombreProyecto,
        usuarioAsignado,
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
        { message: "No se pudo guardar la tarea." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error al guardar la tarea:", error);
    return NextResponse.json(
      { message: "Error del servidor.", error: error.message }, // Incluye el mensaje de error
      { status: 500 }
    );
  }
}


