const db = require("./db");
const uuid = require("uuid")

BigInt.prototype.toJSON = function() {  
    return this.toString();             
}; 

async function getLieuVote() {
    try {
        // Use pool.query to get all contacts
        const sqlQuery = 'SELECT l.idlieuvote, l.liblieuvote, l.nbreinscrit, scom.idsprefcom, scom.libsprefcom, COUNT(b.idbv) as nbrebv FROM election.lieuvote l, election.spref_commune scom, election.bureauvote b ' +
                         'WHERE l.idlocalite=scom.idsprefcom AND l.idlieuvote=b.idlieuvote ' +
                         'GROUP BY l.idlieuvote, l.liblieuvote ORDER BY l.liblieuvote';
        const results = await db.pool.query(sqlQuery);
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getLieuVoteByLocalites(idlocalite) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM election.lieuvote l WHERE l.idlocalite=? ORDER BY l.liblieuvote", [idlocalite]);
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getLieuVoteById(idlieuvote) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM election.lieuvote WHERE idlieuvote=?", [idlieuvote]);

        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function createLieuVote(liblieuvote, idlocalite, nbreinscrit,nbBureauvote) {   
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO election.lieuvote (idlieuvote, liblieuvote, nbreinscrit, idlocalite) VALUES (?, ?, ?, ?)";
        await conn.query(insertQuery, [myuuid, liblieuvote, nbreinscrit, idlocalite]);
        for (let i = 0; i < nbBureauvote; i++) {
            let bvuuid = uuid.v4();
            let insertbvQuery = "INSERT INTO election.bureauvote (idbv, libbv, nbreinscrit, nbrevotant, suffrageexprime, bulletinnul, bulletinblanc, abstention, valider, idlieuvote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let libBV = i+1 < 10 ? 'BV0' + (i+1).toString() : 'BV' + (i+1).toString();
            await conn.query(insertbvQuery, [bvuuid, libBV, 0, 0, 0, 0, 0, 0, 1, myuuid]);
        }
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function updateLieuVote(idlieuvote, liblieuvote, nbreinscrit) {
    let conn;
    try {
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Update contact data
        const result = await conn.query("UPDATE election.lieuvote SET liblieuvote = ?, nbreinscrit = ? WHERE idlieuvote = ?", [liblieuvote, nbreinscrit, idlieuvote]);
        //console.log(result);
        return "Mise a jour effectuée avec succès";
    } catch (err) {
        console.log(err);
        return "Echec de la mise a jour";
    } finally {
        if (conn) await conn.end();
    }
}

async function deleteLieuVote(idlieuvote) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        await conn.query("DELETE FROM election.bureauvote WHERE idlieuvote = ?", [idlieuvote]);
        await conn.query("DELETE FROM election.lieuvote WHERE idlieuvote = ?", [idlieuvote]);
        return "Suppression effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de la suppression";
    } finally {
        if (conn) await conn.end();
    }
}

async function getBureauVoteByLieu(idlieuvote) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM election.bureauvote b WHERE b.idlieuvote=? ORDER BY b.libbv", [idlieuvote]);
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function createBureauVote(libbv, idlieuvote) {
    let conn;
    try {
        let myuuid = uuid.v4();
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Use connection.query to get all contacts
        const insertQuery = "INSERT INTO election.bureauvote (idbv, libbv, nbreinscrit, nbrevotant, suffrageexprime, bulletinnul, bulletinblanc, abstention, valider, idlieuvote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const result = await conn.query(insertQuery, [myuuid, libbv, 0, 0, 0, 0, 0, 0, 0, 1, idlieuvote]);
        
        return "Insertion effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion";
    } finally {
        if (conn) await conn.end();
    }
}

async function updateBureauVote(idbv, libbv, nbreinscrit) {
    let conn;
    try {
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        // Update contact data
        const result = await conn.query("UPDATE election.bureauvote SET libbv = ?, nbreinscrit = ? WHERE idbv = ?", [libbv, nbreinscrit, idbv]);
        //console.log(result);
        return "Mise a jour effectuée avec succès";
    } catch (err) {
        console.log(err);
        return "Echec de la mise a jour";
    } finally {
        if (conn) await conn.end();
    }
}

async function deleteBureauVote(idbv) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query("DELETE FROM election.bureauvote WHERE idbv = ?", [idbv]);
        return "Suppression effectuée avec succès";
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de la suppression";
    } finally {
        if (conn) await conn.end();
    }
}

module.exports = {getLieuVote, getLieuVoteByLocalites, getLieuVoteById, createLieuVote, updateLieuVote, deleteLieuVote, createBureauVote, updateBureauVote, deleteBureauVote, getBureauVoteByLieu};