const mariadb = require('mariadb');
// Expose the Pool object within this module
/*
module.exports = Object.freeze({
    pool: mariadb.createPool({
        host: 'localhost',
        port: '3306', 
        user: 'root', //  	  
        password: '', // 
        database: 'election', // 
        connectionLimit: 10
    })
});
*/
module.exports = Object.freeze({
    pool: mariadb.createPool({
        host: 'localhost',
        port: '3306', 
        user: 'yapr0046_atara', 
        password: 'ataraLAG05',
        database: 'yapr0046_election',
        connectionLimit: 10
    })
});