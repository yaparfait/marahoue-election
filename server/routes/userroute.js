const express = require("express");
const router = express.Router();
const  userdao  = require("../dao/utilisateur.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require("dotenv").config();

const verifyUserToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send("Requête non authorisée");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).send("Accès refusé, pas de Token fourni");
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {username: payload.username, email: payload.email, nomprenom: payload.nomprenom};
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send("Token invalide");
    }
};

router.get("/", verifyUserToken, (req, res) => {
    //console.log("Requete User: "+ JSON.stringify(req.user));
    userdao.getAllUsers().then(data => res.json(data));
});

router.get("/:username", verifyUserToken, (req, res) => {
    userdao.getUserByLogin(req.params.username).then(users => {
        if(!users || users.length===0)
                return res.status(400)
                        .json({ message: "Nom d'utilisateur incorrect"});
        
        res.json({username: users[0].username, email: users[0].email, nomprenom: users[0].nomprenom, profile: users[0].profile});
    })

});

router.post("/register", (req, res) => {
    const user = req.body;
    if (!user.username || !user.password)
        return res.status(400).json({ message: "Nom d'utilisateur et Mot de passe requis"});
    
    userdao.getUserByLogin(user.username).then(users => {
        if(users && users.length > 0)
            return res.status(400)
                      .json({ message: "Ce nom d'utilisateur est déjà utilisé, saisissez un autre"});
        
        userdao.registerUser(user.nomprenom, user.email, user.username, user.password, user.profile)
               .then(data => res.json({ message: data}));
    })
    
});

router.post("/login", (req, res) => {
    // Get credentials from JSON body
	const { username, password } = req.body;
    userdao.getUserByLogin(username).then(users => {
        if(!users || users.length===0)
            return res.status(400)
                      .json({ message: "Nom d'utilisateur incorrect"});
        
        if(users[0].active === 0)
            return res.status(400)
                      .json({ message: "Ce compte est inactif, veuillez contacter l'administrateur"});

        //check if password is correct
        const isPasswordValid = bcrypt.compareSync(password, users[0].password)
        if (!isPasswordValid)
            return res.status(400)
                      .json({ message: "Nom d'utilisateur ou Mot de passe incorrect"});
         
        const token = jwt.sign({username: users[0].username, email: users[0].email, nomprenom: users[0].nomprenom}, process.env.JWT_SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: process.env.JWT_EXPIRES_IN
	    })

        res.json({token: token, user: {username: users[0].username, email: users[0].email, nomprenom: users[0].nomprenom, profile: users[0].profile}})
    })
});

module.exports = router;
