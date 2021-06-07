const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userControllers');

const login = require('../middleware/login')

routes.get('/teste', (req, res) => {
  return res.json({message: 'Deu Certo'})
})

// --- Usarios ---
routes.get('/usuarios', login.obrigatorio, userController.listarUsuarios);
routes.get('/usuarios/:id', login.obrigatorio,userController.listarUsuarioId)
routes.post('/registrar', userController.register);
routes.post('/login', userController.login);
routes.get('/auth', userController.auth);


module.exports = routes;