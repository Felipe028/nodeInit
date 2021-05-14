const clienteDAO = require('./clienteModel')

class clientes {
	constructor(){
		
	}
	
	maiorIdade(){
        return this.idadeAdulto; 
    }
	
	async get(){
		return await clienteDAO.buscarDadosCliente(this.cdPessoaFisica);
	}

}

module.exports = {
	cliente
}