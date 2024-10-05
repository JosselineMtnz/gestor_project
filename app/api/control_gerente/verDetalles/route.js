import conexion from "../../../conexion/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "El parámetro 'id' es obligatorio." },
        { status: 400 }
      );
    }

    //console.log("Project ID utilizado para la consulta:", id);

    const [rows] = await conexion.query(
      "SELECT * FROM proyectos WHERE usuario_asignado = ? AND id = ?",
      [id]
    );

    if (rows.length > 0) {
      return NextResponse.json(rows[0], { status: 200 }); // Retorna solo el primer proyecto
    } else {
      return NextResponse.json(
        { message: "No se encontraron proyectos en la base de datos" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
