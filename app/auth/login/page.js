"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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

        // Redirecting based on user role
        switch (data.role) {
          case "admin":
            router.push("../roles/admin");
            break;
          case "gerente":
            router.push("../roles/gerente");
            break;
          case "usuario":
            router.push("../roles/usuario");
            break;
          default:
            setError("Rol de usuario no reconocido");
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
  );
}
