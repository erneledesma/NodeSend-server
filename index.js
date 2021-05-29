const express = require('express');
const conectarDb = require('./config/db');

// crear el servidor
const app = express();

// conectar a la Base de Datos
conectarDb();

// puerto de la app
const port = process.env.PORT || 4000;

// Habiliar los valores de un body
app.use( express.json() );

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(` El servidor esta funcionando en el puerto ${port}`);
})