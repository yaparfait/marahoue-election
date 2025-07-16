const db = require("./db");
const uuid = require("uuid");

async function getAllPartiPolitics() {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM partipolitique");
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getPartiPoliticByID(idparti) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM partipolitique WHERE idparti=?", [idparti]);
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function createPartiPolitic(libparti, sigle) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO partipolitique (idparti, libparti, sigle) VALUES (?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, libparti, sigle]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

module.exports = {getAllPartiPolitics, getPartiPoliticByID, createPartiPolitic}