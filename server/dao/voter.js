const db = require("./db");
const uuid = require("uuid");

async function createVote(idcand, idsrutin, idbv, score) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO voter (idvote, idcand, idsrutin, idbv, score) VALUES (?, ?, ?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, idcand, idsrutin, idbv, score]);
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function updateVote(idvote, score) {
    let conn;
    try {
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Update contact data
        await conn.query("UPDATE voter SET score = ? WHERE idvote = ?", [score, idvote]);
        //console.log(result);
        return "Mise a jour effectuée avec succès";
    } catch (err) {
        console.log(err);
        return "Echec de la mise a jour";
    } finally {
        if (conn) await conn.end();
    }
}

async function getVoteByBureau(idbv, idsrutin) {
    let conn;
    try {
        // Use pool.query to get all contacts   
        conn = await db.pool.getConnection(); 
        let query = "SELECT c.idcand,c.nomcand,c.nomusuel,c.nomliste,pa.idparti,pa.libparti,pa.sigle,v.idvote,v.score FROM participer p " +
                    "LEFT JOIN candidat c on c.idcand=p.idcand " +
                    "LEFT JOIN partipolitique pa on pa.idparti=p.idparti " +
                    "LEFT JOIN voter v on v.idcand=c.idcand " +
                    "WHERE v.idbv=? and v.idsrutin=? and p.idscrutin=? ORDER BY p.priorite,c.nomcand";
   
        let results = await conn.query(query, [idbv, idsrutin, idsrutin]);
        
        if (results.length === 0){
            const queryCand = "SELECT p.idcand FROM participer p WHERE p.idscrutin=?";
            const resultCand = await conn.query(queryCand, [idsrutin]);
            const votes =  resultCand.map((r) => [`${uuid.v4()}`, `${r.idcand}`, `${idsrutin}`, `${idbv}`, 0]) 
            const insertQuery = "INSERT INTO voter (idvote, idcand, idsrutin, idbv, score) VALUES (?, ?, ?, ?, ?)";
            await conn.batch(insertQuery, votes);
            results = await conn.query(query, [idbv, idsrutin, idsrutin]);
            //return results;
        } 
        return results;     
    } catch (err) {
        // Print errors
        console.log(err);
    }
    finally{
        if (conn) await conn.end();
    }
}

async function getResultatByScrutin(idscrutin) {
    try {
        // Use pool.query to get all contacts
        let query = 'SELECT c.idcand,c.nomcand,c.nomusuel,c.nomliste,pa.idparti,pa.libparti,pa.sigle,sum(v.score) as score ' +
                    'FROM participer p ' +
                    'LEFT JOIN candidat c on c.idcand=p.idcand ' +
                    'LEFT JOIN partipolitique pa on pa.idparti=p.idparti ' +
                    'LEFT JOIN voter v on v.idcand=c.idcand WHERE v.idsrutin=? and p.idscrutin=? ' + 
                    'GROUP BY p.priorite,c.idcand,c.nomcand ';

        const results = await db.pool.query(query, [idscrutin, idscrutin]);

        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getResultatByScrutinLieuvote(idscrutin, idlieuvote) {
    try {
        // Use pool.query to get all contacts
        let query = 'SELECT c.idcand,c.nomcand,c.nomusuel,c.nomliste,pa.idparti,pa.libparti,pa.sigle,sum(v.score) as score ' +
                    'FROM participer p ' +
                    'LEFT JOIN candidat c on c.idcand=p.idcand ' +
                    'LEFT JOIN partipolitique pa on pa.idparti=p.idparti ' +                 
                    'LEFT JOIN voter v on v.idcand=c.idcand ' +                  
                    'LEFT JOIN bureauvote bv on bv.idbv=v.idbv ' +
                    'LEFT JOIN lieuvote l on l.idlieuvote=bv.idlieuvote ' +
                    'WHERE v.idsrutin=? and p.idscrutin=? and l.idlieuvote=? ' + 
                    'GROUP BY p.priorite,c.idcand,c.nomcand ';

        const results = await db.pool.query(query, [idscrutin, idscrutin, idlieuvote]);

        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

module.exports = {createVote, updateVote, getVoteByBureau, getResultatByScrutin, getResultatByScrutinLieuvote};