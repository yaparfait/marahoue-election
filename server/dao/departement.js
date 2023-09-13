const db = require("./db");
const uuid = require("uuid")

async function getDepartementsByRegion(idregion) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT d.iddept, d.libdept, r.idregion, r.libregion FROM election.departement d, election.region r WHERE d.idregion=r.idregion AND d.idregion=?", [idregion]);

        // Print list of contacts
        /*
        console.log(`--> Region : ${region}`);
        for (i = 0, len = rows.length; i < len; i++) {
            console.log(`(id=${rows[i].iddept}) ${rows[i].libdept} `);
        }
        */
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getDepartements() {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM election.departement");
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function createDepartement(libdept, idregion) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO election.departement (iddept, libdept, idregion) VALUES (?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, libdept, idregion]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function getDepartementById(iddept) {
    try {
        // Use pool.query to get all contacts
        const result = await db.pool.query("SELECT * FROM election.departement WHERE iddept=?", [iddept]);

        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function updateDepartement(iddept, libdept) {
    let conn;
    try {
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Update contact data
        const result = await conn.query("UPDATE election.departement SET libdept = ? WHERE iddept = ?", [libdept, iddept]);
        //console.log(result);
        return "Mise a jour effectuée avec succès";
    } catch (err) {
        console.log(err);
        return "Echec de la mise a jour";
    } finally {
        if (conn) await conn.end();
    }
}

async function deleteDepartement(iddept) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query("DELETE FROM election.departement WHERE iddept = ?", [iddept]);
        return "Suppression effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de la suppression";
    } finally {
        if (conn) await conn.end();
    }
}

module.exports = { getDepartementsByRegion , updateDepartement, getDepartementById, getDepartements, createDepartement, deleteDepartement};