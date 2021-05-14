const oracledb = require('oracledb');
const conn = require('./conexaoDAO')

async function buscarDadosCliente(cdPessoaFisica) {
    //console.log("entrou na funcao no dao", cdPessoaFisica)
        let sql = `select 
        tx.*,
        sa.ds_chave_notificacao
        from (
                select max(s.dt_criacao) ultimo_login, s.cd_plataforma_dispositivo, s.cd_usuario  
                from tb_usuario u
                join tb_sessao s on (s.cd_usuario = u.cd_usuario) 
                where u.cd_pessoa_fisica in (:cdPessoaFisica)
                group by s.cd_plataforma_dispositivo, s.cd_usuario ) tx 
        join tb_sessao sa on ( tx.ultimo_login = sa.dt_criacao and tx.cd_usuario = sa.cd_usuario )   
                `
        const db = await oracledb.getConnection();
        //valida usuario e senha no banco de dados
        return await db.execute(sql,
            {
                ":cdPessoaFisica": { "dir": oracledb.BIND_IN, "type": oracledb.STRING, "val": cdPessoaFisica.toString() }
            },
            {
                outFormat: oracledb.OBJECT
            })
            .then((result) => {
                //console.log(result.rows)
                return result.rows
            })
            .finally(() => db.close())
            .catch((err) => {
                console.log('Erro funcionário não cadastrado', err)
                return null
            })

}

async function buscarDadosClienteSexo(sexo) {
    console.log("entrou na funcao no dao", sexo)
        let sql = `select 
        tx.*,
        sa.ds_chave_notificacao
        from (
                select max(s.dt_criacao) ultimo_login, s.cd_plataforma_dispositivo, s.cd_usuario  
                from tb_usuario u
                join tb_sessao s on (s.cd_usuario = u.cd_usuario) 
                where u.cd_pessoa_fisica in (select pf.cd_pessoa_fisica from tb_usuario u
                    join tasy.pessoa_fisica pf on (u.cd_pessoa_fisica = pf.cd_pessoa_fisica)
                    where u.status = 'true' and pf.ie_sexo = :sexo)
                group by s.cd_plataforma_dispositivo, s.cd_usuario ) tx 
        join tb_sessao sa on ( tx.ultimo_login = sa.dt_criacao and tx.cd_usuario = sa.cd_usuario )   
                `
        const db = await oracledb.getConnection();
        //valida usuario e senha no banco de dados
        return await db.execute(sql,
            {
                ":sexo": { "dir": oracledb.BIND_IN, "type": oracledb.STRING, "val": sexo.toString() }
            },
            {
                outFormat: oracledb.OBJECT
            })
            .then((result) => {
                //console.log(result.rows)
                return result.rows
            })
            .finally(() => db.close())
            .catch((err) => {
                console.log('Erro funcionário não cadastrado', err)
                return null
            })
}


async function buscarDadosClienteIdade(dataInicial, dataFinal) {
    console.log("entrou na funcao no dao dataa", dataInicial, dataFinal)
        let sql = `select 
        tx.*,
        sa.ds_chave_notificacao
        from (
                select max(s.dt_criacao) ultimo_login, s.cd_plataforma_dispositivo, s.cd_usuario  
                from tb_usuario u
                join tb_sessao s on (s.cd_usuario = u.cd_usuario) 
                where u.cd_pessoa_fisica in (select pf.cd_pessoa_fisica from tb_usuario u
                    join tasy.pessoa_fisica pf on (u.cd_pessoa_fisica = pf.cd_pessoa_fisica)
                    where  u.status = 'true' and pf.dt_nascimento BETWEEN to_date(:dataInicio, 'DD/MM/YYYY') and to_date(:dataFinal, 'DD/MM/YYYY'))
                group by s.cd_plataforma_dispositivo, s.cd_usuario ) tx 
        join tb_sessao sa on ( tx.ultimo_login = sa.dt_criacao and tx.cd_usuario = sa.cd_usuario )   
                `
        const db = await oracledb.getConnection();
        //valida usuario e senha no banco de dados
        return await db.execute(sql,
            {
                ":dataInicio": { "dir": oracledb.BIND_IN, "type": oracledb.STRING, "val": dataInicial.toString()},
                ":dataFinal": { "dir": oracledb.BIND_IN, "type": oracledb.STRING, "val": dataFinal.toString()}
            },
            {
                outFormat: oracledb.OBJECT
            })
            .then((result) => {
                //console.log(result.rows)
                return result.rows
            })
            .finally(() => db.close())
            .catch((err) => {
                console.log('Erro funcionário não cadastrado', err)
                return null
            })
}



module.exports = {
    buscarDadosCliente,
    buscarDadosClienteSexo,
    buscarDadosClienteIdade
}
