import conexion from "../../../conexion/db"; // Asegúrate de que la ruta hacia tu archivo de conexión sea correcta
import { NextResponse } from "next/server";

export async function GET(request) {
  // Obtener los parámetros de la URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  console.log(id);

  if (!id) {
    return NextResponse.json(
      { message: "Nombre de proyecto no proporcionado." },
      { status: 400 }
    );
  }

  try {
    // Consulta para obtener las tareas asociadas al proyecto
    const [rows] = await conexion.query(
      "SELECT * FROM tareas WHERE id_proyecto = ?;",
      [id]
    );

    if (rows.length > 0) {
      // Devolver las tareas en formato JSON
      return NextResponse.json(rows, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No se encontraron tareas para este proyecto." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al buscar las tareas:", error);
    return NextResponse.json(
      { message: "Error al buscar las tareas." },
      { status: 500 }
    );
  }
}
