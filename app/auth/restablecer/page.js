"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./restablecer.module.css";

export default function Restablecer() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      alert("No puede dejar campos vacios.");
      return;
    }

    try {
      const response = await fetch("/api/control", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email }),
      });

      if (response.ok) {
        alert("Contraseña cambiada con éxito!");
        router.push("../auth/login");
      } else {
        alert("Error al actualizar contraseña.");
        const data = await response.json();
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar contraseña.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.restablecerContainer}>
        <h2>Ingrese su nueva contraseña</h2>
        <form onSubmit={handleSubmit} className={styles.restablecerForm}>
          <input
            className={styles.email}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button className={styles.restablecer} type="submit">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
