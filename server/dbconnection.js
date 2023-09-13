const mariadb = require('mariadb');

async function asyncFunction() {
    let conn;
    try {
        // Create a new connection
        conn = await mariadb.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
        });

        // Print connection thread
        console.log(`Connected! (id=${conn.threadId})`);
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Close connection
        if (conn) await conn.end();
    }
}

async function testConnection() {
    let conn;
    let resp = '';
    try {
        // Create a new connection
        conn = await mariadb.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
        });

        // Print connection thread
        resp = `Connected! (id=${conn.threadId})`;
    } catch (err) {
        // Print error   
        resp = `Not Connected! Error ${err.message}`;
    } finally {
        // Close connection
        if (conn) await conn.end();
        resp = `${resp} and Finally Disconnected!`;
    }
    return resp;
}

module.exports = { asyncFunction , testConnection };
//asyncFunction();