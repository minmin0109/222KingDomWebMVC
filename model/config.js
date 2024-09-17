const mariadb = require('mariadb');

// Create pool - สร้าง pool ของการเชื่อมต่อกับ MariaDB
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'supit0109',
    database: 'user_authentication',
    connectionLimit: 5
});

//connect and check for error
pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();
    return;
});

module.exports = pool;
