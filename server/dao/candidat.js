const db = require("./db");
const uuid = require("uuid")

async function getCandidats() {
    try {
        // Use pool.query to get all candidats
        const results = await db.pool.query("SELECT idcand, nomcand, nomusuel, nomliste, c.idcivilite, libcivilite, libcourt, p.idparti, libparti, sigle FROM candidat cand "+
                                            "LEFT JOIN civilite c ON c.idcivilite=cand.idcivilite LEFT JOIN partipolitique p ON p.idparti=cand.idparti");
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function createCandidat(nomcand, nomusuel, nomliste, idcivilite, idparti) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        const insertQuery = "INSERT INTO candidat (idcand, nomcand, nomusuel, nomliste, idcivilite, idparti) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, nomcand, nomusuel, nomliste, idcivilite, idparti]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function getCandidatById(idcand) {
    try {
        const result = await db.pool.query("SELECT * FROM candidat WHERE idcand=?", [idcand]);

        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function updateCandidat(idcand, nomcand, nomusuel, nomliste, idcivilite, idparti) {
    let conn;
    try {
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Update contact data
        const result = await conn.query("UPDATE candidat SET nomcand = ?, nomusuel = ?, nomliste = ?, idcivilite = ?, idparti = ?  WHERE idcand = ?", 
                                        [nomcand, nomusuel, nomliste, idcivilite, idparti, idcand]);
        //console.log(result);
        return "Mise a jour effectuée avec succès";
    } catch (err) {
        console.log(err);
        return "Echec de la mise a jour";
    } finally {
        if (conn) await conn.end();
    }
}

async function deleteCandidat(idcand) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query("DELETE FROM candidat WHERE idcand = ?", [idcand]);
        return "Suppression effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de la suppression";
    } finally {
        if (conn) await conn.end();
    }
}

async function getAllCivilites() {
    try {
        const result = await db.pool.query("SELECT * FROM civilite");

        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

module.exports = { getCandidats , createCandidat, getCandidatById, updateCandidat, deleteCandidat, getAllCivilites };