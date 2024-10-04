const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'gestor_project'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

// Endpoint para crear un proyecto
app.post('/proyectos', (req, res) => {
    const { proyectName, description, assignee } = req.body;
    const sql = 'INSERT INTO proyectos (proyectName, description, assignee) VALUES (?, ?, ?)';
    db.query(sql, [proyectName, description, assignee], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, proyectName, description, assignee });
    });
});

// Endpoint para obtener proyectos
app.get('/proyectos', (req, res) => {
    db.query('SELECT * FROM proyectos', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint para actualizar un proyecto
app.put('/proyectos/:id', (req, res) => {
    const { id } = req.params;
    const { proyectName, description, assignee } = req.body;
    const sql = 'UPDATE proyectos SET proyectName = ?, description = ?, assignee = ? WHERE id = ?';
    db.query(sql, [proyectName, description, assignee, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ id, proyectName, description, assignee });
        } else {
            res.status(404).send({ message: 'Proyecto no encontrado' });
        }
    });
});

// Endpoint para eliminar un proyecto
app.delete('/proyectos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM proyectos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.sendStatus(204); // No content
        } else {
            res.status(404).send({ message: 'Proyecto no encontrado' });
        }
    });
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
