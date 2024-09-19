import mysql from "mysql2/promise";

const conexion = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "gestor_project",
});

export default conexion;
