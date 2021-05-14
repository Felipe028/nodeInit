const clienteDAO = require('../DAO/clienteDAO')

class cliente {
	
	
	constructor(cdPessoaFisica){
		
		this.cdPessoaFisica = cdPessoaFisica
		this.fabric()
		/* this.nome = nome
		this.idade = idade
		this.sexo = sexo
		this.idNotificação = idNotificação
		this.cdPlataforma = cdPlataforma */

		this.ultimoLogin = '';
		this.plataformaDispositivo = ''
		this.cdUsuario =''
		this.dsChaveNotificacao = ''
	}
	
	maiorIdade(){
        return this.idadeAdulto; 
    }
	
	async fabric(){
		if (this.cdPessoaFisica){
			const sw =  await clienteDAO.buscarDadosCliente(this.cdPessoaFisica)
			console.log(sw)
			if ( sw.length == 1 ) {
				console.log(sw.ULTIMO_LOGIN)
				this.ultimoLogin 			= sw.ULTIMO_LOGIN
				/* this.plataformaDispositivo 	= sw.CD_PLATAFORMA_DISPOSITIVO
				this.cdUsuario 				= sw.CD_USUARIO
				this.dsChaveNotificacao 	= sw.DS_CHAVE_NOTIFICACAO */
			}

			else {
				return false;
			}

		}
	}

}

module.exports = {
	cliente
}