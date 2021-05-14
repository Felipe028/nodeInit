const clienteModel = require('../model/clienteModel')
const clienteDAO = require('../DAO/clienteDAO')

async function buscarDadosCliente(req, res) {
	console.log(req.query)
	
	if ((!req.query.cdPessoaFisica && !req.query.sexo && !req.query.dataInicial && !req.query.dataFinal) && (!req.query.mensagem || !req.query.titulo)) {
		return res.status(400).send({
			"status": false,
			'message': "Falta de parametros",
		})
	}

	if(req.query.cdPessoaFisica && (!req.query.sexo || !req.query.dataInicial || !req.query.dataFinal)){
		const cliente = await clienteDAO.buscarDadosCliente(req.query.cdPessoaFisica)
		//console.log(cliente)
		if(!cliente){
			return res.status(200).send({
				"status": false,
				'message': "Cliente não existe",
			})
		}
		else{
			return res.status(200).send({
				"status": true,
				'message': "Cliente encontrado",
				"dados": cliente
			})
		}
	}
	else if(req.query.sexo && (!req.query.cdPessoaFisica && !req.query.dataInicial && !req.query.dataFinal)){
		const cliente = await clienteDAO.buscarDadosClienteSexo(req.query.sexo)
		console.log(cliente)
		if(!cliente){
			return res.status(200).send({
				"status": false,
				'message': "Erro na consulta do sexo",
			})
		}
		else{
			return res.status(200).send({
				"status": true,
				'message': "Clientes encontrados por sexo",
				"dados": cliente
			})
		}
	}
	else if((req.query.dataInicial || req.query.dataFinal) && (!req.query.cdPessoaFisica && !req.query.sexo)){
		const cliente = await clienteDAO.buscarDadosClienteIdade(req.query.dataInicial, req.query.dataFinal)
		console.log(cliente)
		if(!cliente){
			return res.status(200).send({
				"status": false,
				'message': "Erro na consulta por idade",
			})
		}
		else{
			return res.status(200).send({
				"status": true,
				'message': "Clientes encontrados por idade",
				"dados": cliente
			})
		}
	}
 
}

module.exports = {
	buscarDadosCliente
}
