import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function PUT(req) {
  if (req.method === "PUT") {
    try {
      const { password, email } = await req.json();

      const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "gestor_project",
      });

      const [result] = await connection.query(
        "UPDATE users SET password=? WHERE email=?",
        [password, email]
      );

      console.log("Query results:", result);

      if (result.affectedRows > 0) {
        return NextResponse.json(
          { message: "Contraseña cambiada con éxito." },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Error al modificar la contraseña." },
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
