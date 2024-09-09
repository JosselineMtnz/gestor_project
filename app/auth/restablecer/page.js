"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./restablecer.module.css";

export default function Restablecer() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    router.push("../auth/login");
  };

  return (
    <div className={styles.restablecerContainer}>
      <h2>Ingrese su nueva contraseña</h2>
      <form onSubmit={handleSubmit} className={styles.restablecerForm}>
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
  );
}
