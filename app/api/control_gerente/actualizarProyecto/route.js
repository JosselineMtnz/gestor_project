import conexion from "../../../conexion/db"; // Importar la conexión a la base de datos
import { NextResponse } from "next/server"; // Importar NextResponse para manejar las respuestas

export async function PUT(req) {
  try {
    const { id, estado, fecha_fin_real } = await req.json(); // Obtener los datos del cuerpo de la solicitud

    // Verificar si se han recibido los parámetros
    if (!id || !estado) {
      return NextResponse.json(
        { message: "El id y el estado son obligatorios." },
        { status: 400 }
      );
    }

    // Mostrar la información en consola
    console.log(
      "Actualizando para el ID:",
      id,
      "Nuevo estado:",
      estado,
      "Nueva fecha fin: ",
      fecha_fin_real
    );

    // Actualizar el proyecto en la base de datos
    const [result] = await conexion.query(
      "UPDATE proyectos SET estado = ?, fecha_fin_real = ? WHERE id = ?",
      [estado, fecha_fin_real, id]
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Proyecto actualizado exitosamente." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se encontró el proyecto o no se realizaron cambios." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
