"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import logo from "../../img/logo.png";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      const user = {
        role: storedUserRole,
      };
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("../../auth/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="#">
        <Image src={logo} alt="Logo" width={150} height={40} />
      </Link>
      <ul className={styles.navLinks}>
        {user && user.role === "admin" && (
          <>
            <li>
              <Link href="crearProyecto">
                <p>Crear nuevo proyecto</p>
              </Link>
            </li>
            <li>
              <Link href="verProyectos">
                <p>Ver proyectos</p>
              </Link>
            </li>
            <li>
              <Link href="verUsuarios">
                <p>Ver usuarios</p>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        )}
        {user && user.role === "gerente" && (
          <>
            <li>
              <Link href="crearTareas">
                <p>Crear Tareas</p>
              </Link>
            </li>
            <li>
              <Link href="verProyectos">
                <p>Ver proyectos</p>
              </Link>
            </li>
            <li>
              <Link href="crearTareas">
                <p>Crear tarea</p>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
