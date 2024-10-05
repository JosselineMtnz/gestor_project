import conexion from "../../../conexion/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Leer los datos del cuerpo de la solicitud
    const {
      nombreProyecto,
      fechaInicio,
      fechaFinEstimada,
      descripcion,
      usuarioAsignado,
    } = await request.json();

    // Obtener la fecha actual del sistema para la fecha de creación
    const fechaCreacion = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Ejecutar la consulta para insertar el proyecto en la base de datos
    const [rows] = await conexion.query(
      "INSERT INTO proyectos(nombre_proyecto, fecha_inicio, fecha_fin_estimada, descripcion, fecha_creacion, usuario_asignado) VALUES (?,?,?,?,?,?)",
      [
        nombreProyecto,
        fechaInicio,
        fechaFinEstimada,
        descripcion,
        fechaCreacion,
        usuarioAsignado,
      ]
    );

    // Verificar si se insertó correctamente
    if (rows.affectedRows > 0) {
      return NextResponse.json(
        { message: "Proyecto guardado exitosamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se pudo guardar el proyecto." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al guardar el proyecto:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
