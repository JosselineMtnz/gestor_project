import { NextResponse } from "next/server";
import conexion from "../../conexion/db";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { name, user, password, email } = await req.json();

      const [result] = await conexion.query(
        "INSERT INTO users (name, user, password, email) VALUES (?, ?, ?, ?)",
        [name, user, password, email]
      );

      //console.log("Query results:", result);

      if (result.affectedRows > 0) {
        return NextResponse.json(
          { message: "Usuario creado con éxito." },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Error al registrar usuario." },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { message: "Error del servidor." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Este metodo no es permitido." },
      { status: 401 }
    );
  }
}
