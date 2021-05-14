const express = require ('express')
const router = express.Router ()
const clienteController = require ('../controllers/clienteController');


// Recuperar todos os funcionários
router.post('/cliente/buscar', clienteController.buscarDadosCliente)
router.get('/cliente/buscar', clienteController.buscarDadosCliente)

module.exports = router