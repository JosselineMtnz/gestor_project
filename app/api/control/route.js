// app/api/control/route.js
export async function POST(req) {
  try {
    const { user, password } = await req.json();

    const users = {
      admin: { password: "admin123", role: "admin" },
      gerente: { password: "gerente123", role: "gerente" },
      usuario: { password: "usuario123", role: "usuario" },
    };

    console.log("Datos recibidos:", user, password);

    if (users[user] && users[user].password === password) {
      const role = users[user].role;
      return new Response(
        JSON.stringify({ message: "Inicio de sesión exitoso.", role }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Credenciales inválidas." }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error en el controlador de API:", error);
    return new Response(JSON.stringify({ message: "Error del servidor." }), {
      status: 500,
    });
  }
}
