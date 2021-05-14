const oracledb = require('oracledb')
const dotenv = require('dotenv')
//const logUtils = require('../logUtils')('daoutils-js')

dotenv.config()
//console.log(process.env)
const Config = {
    user: process.env.APPV2_USER,
    password: process.env.APPV2_PASSWD,
    connectionString: `${process.env.APPV2_SERVER}/${process.env.APPV2_DB}`,
    poolMin: 5,
    poolMax: 10,
    poolPingInterval: 10,
    autoCommit: true
}

async function getConnection(){
    try {
        await oracledb.createPool(Config, err => {
            if (!err)
                console.log(`Pool de Conexãoes Aberto! [${process.env.APPV2_DB}]`)
            else{
                console.log(err, 'getConnection','Erro ao conectar')
            }
        })
        return oracledb
    } catch (err) {
        console.log(err, 'getConnection','Erro ao conectar')
        return undefined
    }
}

module.exports = getConnection()