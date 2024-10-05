import conexion from "../../../conexion/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Añade el parámetro req aquí
  const { searchParams } = new URL(req.url);
  const usuario = searchParams.get("usuario");

  console.log(usuario);

  try {
    const [rows] = await conexion.query(
      "SELECT * FROM tareas WHERE usuario_asignado = ?",
      [usuario]
    );

    if (rows.length > 0) {
      return NextResponse.json(rows, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No se encontraron tareas en la base de datos" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
