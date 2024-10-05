import conexion from "../../../conexion/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "El 'id' es obligatorio." },
        { status: 400 }
      );
    }

    console.log("Eliminando usuario con ID:", id);

    const [result] = await conexion.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);

    console.log("Resultado de la eliminación:", result);

    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Usuario eliminado exitosamente." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se encontró el usuario o no se realizaron cambios." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    return NextResponse.json(
      { message: "Error del servidor. " + error.message },
      { status: 500 }
    );
  }
}
