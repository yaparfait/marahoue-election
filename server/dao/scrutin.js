const db = require("./db");
const uuid = require("uuid")

async function getScrutins() {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM scrutin");
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getScrutinsWithCands() {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT cand.idcand, cand.nomcand, cand.nomusuel, p.idparticipe, p.nomliste, p.priorite, c.idcivilite, c.libcivilite, pp.idparti, pp.libparti, pp.sigle, " +
                                            "s.idscrutin, s.libscrutin, s.envergure FROM scrutin s LEFT JOIN participer p ON s.idscrutin=p.idscrutin LEFT JOIN candidat cand ON cand.idcand=p.idcand " +
                                            "LEFT JOIN civilite c ON c.idcivilite=cand.idcivilite LEFT JOIN partipolitique pp ON pp.idparti=p.idparti");
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getScrutinById(idscrutin) {
    try {
        // Use pool.query to get all contacts
        const result = await db.pool.query("SELECT * FROM scrutin where idscrutin=?", [idscrutin]);

        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getCandidatsByScrutin(idscrutin) {
    try {
        // Use pool.query to get all contacts
        const result = await db.pool.query("SELECT cand.idcand, cand.nomcand, cand.nomusuel, p.nomliste, p.priorite, c.idcivilite, c.libcivilite, "+ 
                                            "pp.idparti, pp.libparti, pp.sigle FROM candidat cand "+
                                            "INNER JOIN participer p ON p.idcand=cand.idcand LEFT JOIN civilite c ON c.idcivilite=cand.idcivilite "+
                                            "LEFT JOIN partipolitique pp ON pp.idparti=p.idparti "+
                                            "WHERE p.idscrutin=?", [idscrutin]);
        return result;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function createScrutin(libscrutin, envergure) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO scrutin (idscrutin, libscrutin, envergure) VALUES (?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, libscrutin, envergure]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function updateScrutin(idscrutin, libscrutin, envergure) {
    let conn;
    try {
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Update contact data
        const result = await conn.query("UPDATE scrutin SET libscrutin = ?, envergure = ? WHERE idscrutin = ?", [libscrutin, envergure, idscrutin]);
        //console.log(result);
        return "Mise a jour effectuée avec succès";
    } catch (err) {
        console.log(err);
        return "Echec de la mise a jour";
    } finally {
        if (conn) await conn.end();
    }
}

async function deleteScrutin(idscrutin) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        await conn.query("DELETE FROM participer WHERE idscrutin = ?", [idscrutin]);
        await conn.query("DELETE FROM scrutin WHERE idscrutin = ?", [idscrutin]);      
        return "Suppression effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de la suppression";
    } finally {
        if (conn) await conn.end();
    }
}

async function createParticiper(idcand, idscrutin, idparti, idcirconscription, nomliste, priorite) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO participer (idparticipe, idcand, idscrutin, idparti, idcirconscription, nomliste, priorite) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, idscrutin, idparti, idcirconscription, nomliste, priorite]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function deleteParticiper(idparticipe) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        await conn.query("DELETE FROM participer WHERE idparticipe = ?", [idparticipe]);    
        return "Suppression effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de la suppression";
    } finally {
        if (conn) await conn.end();
    }
}

module.exports = { getScrutins, getScrutinsWithCands, getScrutinById, getCandidatsByScrutin, createScrutin, updateScrutin, deleteScrutin };