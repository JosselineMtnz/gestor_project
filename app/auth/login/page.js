"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Comprobar si ya hay un usuario logueado
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      router.push(`../roles/${storedUserRole}/verProyectos`);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userRole", data.role);
<<<<<<< HEAD
        localStorage.setItem("name", data.name); // Guardar el nombre aquí

        console.log(data);

        // Redirigir según el rol
        if (data.role === "usuario") {
          router.push(`../roles/usuario/verMisProyectos`);
        } else {
          router.push(`../roles/${data.role}/verProyectos`);
=======
        if (data.role === "admin" || data.role === "gerente") {
          router.push(`../roles/${data.role}/verProyectos`);
        } else {
          router.push(`../roles/usuario/verMisProyectos`);
>>>>>>> 5de718ca0b8fbcf8a3ab29d3c04a159946ac39a7
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Error de servidor. Intente de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            className={styles.user}
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            className={styles.pass}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.ingresar} type="submit">
            Ingresar
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {/* Restablecer contraseña */}
        <p className={styles.restablecerPrompt}>
          ¿No recuerdas tu contraseña?{" "}
          <a href="/auth/restablecer" className={styles.restablecerLink}>
            Cambiala acá
          </a>
        </p>

        {/* Opción de crear usuario */}
        <p className={styles.registerPrompt}>
          ¿No tienes usuario?{" "}
          <a href="/auth/register" className={styles.registerLink}>
            Regístrate acá
          </a>
        </p>
      </div>
    </div>
  );
}
