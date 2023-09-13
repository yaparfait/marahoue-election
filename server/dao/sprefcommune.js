const db = require("./db");
const uuid = require("uuid")

async function createSprefCom(libsprefcom, spref, iddept) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO election.spref_commune (idsprefcom, libsprefcom, spref, iddept) VALUES (?, ?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, libsprefcom, spref, iddept]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function getSprefComByDepartement(iddept) {
    try {
        // Use pool.query to get all contacts
        const result = await db.pool.query("SELECT * FROM election.spref_commune WHERE iddept=? ORDER BY spref", [iddept]);
        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getSprefCommune() {
    try {
        // Use pool.query to get all contacts
        const sqlQuery = "SELECT idsprefcom,libsprefcom,spref,scom.iddept,libdept FROM election.spref_commune scom, election.departement dp WHERE scom.iddept=dp.iddept ORDER BY scom.iddept,spref";
        const result = await db.pool.query(sqlQuery);
        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

module.exports = { createSprefCom , getSprefComByDepartement , getSprefCommune };
