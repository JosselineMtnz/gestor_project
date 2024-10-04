import Navbar from "@/app/ui/navbar/pages";
import Footer from "@/app/ui/footer/pages";
import React from "react";
import TaskList from "../../../ui/components/ProyectList";
import "./crearProyecto.module.css";
import ProyectList from "../../../ui/components/ProyectList";

function crearProyecto() {
  return (
    <div>
      <Navbar></Navbar>
      <h2>Crear Proyecto</h2>
      <ProyectList />
    </div>
  );
}

export default crearProyecto;
