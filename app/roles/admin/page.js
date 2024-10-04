import Navbar from "@/app/ui/navbar/pages";
import Footer from "@/app/ui/footer/pages";
import React from 'react';
import TaskList from '../components/ProyectList';
import './admin.css';
import ProyectList from "../components/ProyectList";

function AdminPage() {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Bienvenido Admin</h1>
      <br></br>
      <h2>Gestión de Proyectos</h2>
      <ProyectList />
    </div>
  );
}

export default AdminPage;
