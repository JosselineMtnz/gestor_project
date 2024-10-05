import conexion from "../../../conexion/db"; // Importar la conexión a la base de datos
import { NextResponse } from "next/server"; // Importar NextResponse para manejar las respuestas

export async function POST(req) {
  try {
    const { id, estado } = await req.json(); // Obtener los datos del cuerpo de la solicitud

    // Verificar si se han recibido ambos parámetros
    if (!id || !estado) {
      return NextResponse.json(
        { message: "El 'id' y 'estado' son obligatorios." },
        { status: 400 }
      );
    }

    // Mostrar el ID y el nuevo rol en consola
    console.log(
      "Actualizando el estado para el ID:",
      id,
      "Nuevo estado:",
      estado
    );

    // Actualizar el rol del usuario en la base de datos
    const [result] = await conexion.query(
      "UPDATE proyectos SET estado = ? WHERE id = ?",
      [role, id]
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Estado actualizado exitosamente." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se encontró el proyecto o no se realizaron cambios." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al actualizar el estado del proyecto:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
