import conexion from "../../conexion/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user, password } = await req.json();

    const [rows] = await conexion.query("SELECT * FROM users WHERE user = ?", [
      user,
    ]);

    if (rows.length > 0) {
      const storedPassword = rows[0].password;
      const role = rows[0].role;

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

export async function PUT(req) {
  try {
    const { password, email } = await req.json();

    const [result] = await conexion.query(
      "UPDATE users SET password=? WHERE email=?",
      [password, email]
    );

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
}

export async function POSTRegister(req) {
  try {
    const { name, user, password, email } = await req.json();

    const [result] = await conexion.query(
      "INSERT INTO users (name, user, password, email) VALUES (?, ?, ?, ?)",
      [name, user, password, email]
    );

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
}
