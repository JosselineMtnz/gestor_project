"use client";

import styles from "./crearProyecto.module.css"; // Asegúrate de que el CSS esté bien definido
import Navbar from "@/app/ui/navbar/pages";
import Footer from "@/app/ui/footer/pages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AdminPage() {
  const initialValues = {
    nombre_proyecto: "",
    fecha_inicio: "",
    fecha_fin_estimada: "",
    descripcion: "",
    estado: "",
  };

  const validationSchema = Yup.object().shape({
    nombre_proyecto: Yup.string().required(
      "El nombre del proyecto es requerido"
    ),
    fecha_inicio: Yup.date().required("La fecha de inicio es requerida"),
    fecha_fin_estimada: Yup.date().required(
      "La fecha de fin estimada es requerida"
    ),
    descripcion: Yup.string().required("La descripción es requerida"),
    estado: Yup.string().required("El estado es requerido"),
  });

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      fecha_creacion: new Date().toISOString(),
    };

    try {
      const response = await axios.post("/api/control_gerente", data);
      console.log("Proyecto creado:", response.data);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.formulario}>
        <h2 className={styles.title}>Nuevo Proyecto</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre_proyecto">Nombre del Proyecto</label>
                <Field name="nombre_proyecto" type="text" />
                <ErrorMessage
                  name="nombre_proyecto"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                <Field name="fecha_inicio" type="date" />
                <ErrorMessage
                  name="fecha_inicio"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fecha_fin_estimada">Fecha Fin Estimada</label>
                <Field name="fecha_fin_estimada" type="date" />
                <ErrorMessage
                  name="fecha_fin_estimada"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="descripcion">Descripción</label>
                <Field name="descripcion" as="textarea" rows="3" />
                <ErrorMessage
                  name="descripcion"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="estado">Estado</label>
                <Field name="estado" as="select">
                  <option value="">Seleccione...</option>
                  <option value="en_progreso">En Progreso</option>
                  <option value="completado">Completado</option>
                  <option value="pendiente">Pendiente</option>
                </Field>
                <ErrorMessage
                  name="estado"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Crear Proyecto
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
