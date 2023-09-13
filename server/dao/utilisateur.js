const db = require("./db");
const uuid = require("uuid");
const bcrypt = require('bcryptjs');

async function getAllUsers() {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM utilisateur");
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getUserByID(iduser) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM utilisateur WHERE idutilisateur=?", [iduser]);
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function getUserByLogin(username) {
    try {
        // Use pool.query to get all contacts
        const results = await db.pool.query("SELECT * FROM utilisateur WHERE username=?", [username]);
        return results;
    } catch (err) {
        // Print errors
        console.log(err);
    }
}

async function registerUser(nomprenom, email, username, password, profile) {
    let conn;
    try {
        let myuuid = uuid.v4();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();
        const insertQuery = "INSERT INTO utilisateur (idutilisateur, nomprenom, email, username, password, profile, active) VALUES (?, ?, ?, ?, ?, ?, 1)";
        await conn.query(insertQuery, [myuuid, nomprenom, email, username, hash, profile]);
        return "Insertion effectuée avec succès";       
    } catch (err) {
        // Print errors
        console.log(err);
        return "Echec de l'insertion, verifier les Logs";
    } finally {
        if (conn) await conn.end();
    }
}

async function loginUser(username, password) {
    try {
        // Use pool.query to get all contacts
        const users = await db.pool.query("SELECT * FROM utilisateur WHERE username=? AND password=?", [username, password]);
        if (users.length === 0){
            return "Erreur: Nom d'utilisateur ou mot de passe incorrect";
        } else {
            return users[0];
        }       
    } catch (err) {
        // Print errors
        console.log("Erreur: ", err);
    }
}

module.exports = {getAllUsers, registerUser, loginUser, getUserByID, getUserByLogin}