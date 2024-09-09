export default function handler(req, res) {
  if (req.method === "POST") {
    const { user, password } = req.body;

    // Simulación de una validación de usuario. En producción, aquí iría la lógica para validar el usuario con la base de datos.
    if (user === "user" && password === "12345") {
      res.status(200).json({ message: "Inicio de sesión exitoso." });
    } else {
      res.status(401).json({ message: "Credenciales inválidas." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
