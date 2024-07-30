import mssql from 'mssql'
import 'dotenv/config'

const sqlConfig = {
    user: process.env.sqluserName,
    password: process.env.password,
    database: process.env.dbName,
    server: process.env.host,
    port: parseInt(process.env.sqlPort),
    options: {
        trustServerCertificate: true
    }
}
mssql.connect(sqlConfig)
console.log('db connection done')
export {mssql}
