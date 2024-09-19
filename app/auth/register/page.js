"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !user || !password || !email) {
      alert("No puede dejar campos vacios.");
      return;
    }

    try {
      const response = await fetch("/api/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, user, password, email }),
      });

      if (response.ok) {
        alert("Usuario registrado exitosamente!");
        router.push("../auth/login");
      } else {
        alert("Error al registrar usuario.");
        const data = await response.json();
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar usuario.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h2>Ingrese los datos solicitados</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <input
            className={styles.name}
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={styles.email}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <button className={styles.registrar} type="submit">
            Registrar Usuario
          </button>
        </form>
      </div>
    </div>
  );
}
