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

// export async function initDb() {
//     return new Promise(async (resolve, reject) => {

//         try {
//             await mssql.connect(sqlConfig)
//             console.log('db connection done')
//             resolve()
//         } catch(err) {
//             console.log('erro while db connection - ', err)
//             reject(err)
//         }
//     })
// }

// initDb()