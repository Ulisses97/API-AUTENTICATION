const express = require('express');
const server = express();
const routes = require('./routes/routes');


const Connection = require('./database/config');


// Conectar ao banco de dados
//require('./database/config')
Connection();

server.use(express.json());

//server.use('/api', require('./routes/routes'));
server.use('/api', routes);

server.listen(5000, console.log('Server Iniciado'));