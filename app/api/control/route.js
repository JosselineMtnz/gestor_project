import { NextResponse } from "next/server";
import conexion from "../../conexion/db";

export async function POST(req) {
  try {
    const { user, password } = await req.json();

    const [rows] = await conexion.query("SELECT * FROM users WHERE user = ?", [
      user,
    ]);

    //console.log("Query results:", rows);

    if (rows.length > 0) {
      const storedPassword = rows[0].password;
      const role = rows[0].role;

      console.log("Contraseña de la BD:", storedPassword);
      console.log("Contraseña proporcionada por el usuario:", password);

      if (password === storedPassword) {
        return NextResponse.json(
          { message: "Inicio de sesión exitoso.", role },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Credenciales inválidas." },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Credenciales inválidas." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error en el controlador de API:", error);
    return NextResponse.json(
      { message: "Error del servidor." },
      { status: 500 }
    );
  }
}
