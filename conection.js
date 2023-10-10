import mysql from 'mysql2'
import http from 'http'

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'no_resty'
// });

class DbManager {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'no_resty'
        })
    }

    connect = () => {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if(error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    createTable = (tableName, fields) => {
        return new Promise((resolve, reject) => {
            if (!fields || !fields.lenght) {
                return `${fields.name} ${fields.type}`
            } else {
                reject(new Error('No se proporcionaron campos para la tabla'));
                return;
            }

            const fieldDefinitions = fields.map((field) => {
                if (field.name && field.type) {
                    return `${field.name} ${field.type}`
                } else {
                    reject(new Error('Cada campo debe tener un nombre y unn tipo'));
                }
            })

            const createTableStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`

            this.connection.query(createTableStatement, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
};

// instancia de mi calse DbManager
const dbManager = new DbManager();

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/createTable') {
        const body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', async () => {
            
        })
    }
})


// connection.connect((error) => {
//     if (error) {
//         throw new Error(`pille el error papi: ${error.message}`);
//     } 
//     console.log('Conexion mela y se viene esto:');
//     connection.query('CREATE DATABASE mydb', (err, result, statement) => {
//         const dbCreationStatement = `CREATE DATABASE ${statement}`
//         const tableCreationStatement = `CREATE TABLE ${statement} ()`

//         if (err) {
//             throw new Error(` hubo un error: ${err.message}`);
//         } 
//         console.log('DB created')
//     })
// });

// connection.query(`SELECT * FROM clients`, (error, results, fields) => {
//     if (error) {
//         console.log('Error al ejectuar la consulta', error);
//         return
//     }

//     console.log('Resultados de la consulta:', results);
    
//     connection.end((error) => {
//         if (error){
//         console.log('Error al cerrar la conexion')
//         }
//         console.log('conexion cerrada');
//     })
// });