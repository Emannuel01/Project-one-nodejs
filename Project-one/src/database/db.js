async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(process.env.DATABASE_ACESS);
    global.connection = connection;
    return connection;
}

module.exports = { connect };
//exporta a conexão com o sql