// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Gestor de Proyectos",
  description: "Web para gestionar proyectos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
