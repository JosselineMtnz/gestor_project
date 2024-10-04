import conexion from "../../../conexion/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await conexion.query("SELECT * FROM proyectos");

    if (rows.length > 0) {
      return NextResponse.json(rows, { status: 200 });
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
