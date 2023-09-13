const express = require("express");
const router = express.Router();
const voter  = require("../dao/voter.js");
const  envParam  = require("../dao/param.js");

router.post("/", (req, res) => {
    voter.createVote(req.body.idcand, req.body.idsrutin, req.body.idbv, req.body.score).then((data) => res.json(data))
});

router.put("/", (req, res) => {
    voter.updateVote(req.body.idvote, req.body.score).then((data) => res.json(data))
});

router.get("/:idbv/:idsrutin", (req, res) => {
    voter.getVoteByBureau(req.params.idbv, req.params.idsrutin).then((data) => res.json(data))
});
// Les votes de la mairie
router.get("/mairie/bouafle/:idbv", (req, res) => {
    voter.getVoteByBureau(req.params.idbv, envParam.commune.scrutin).then((data) => res.json(data))
});
// Les votes de la region
router.get("/region/marahoue/bureaux/:idbv", (req, res) => {
    voter.getVoteByBureau(req.params.idbv, envParam.region.scrutin).then((data) => res.json(data))
});
router.get("/mairie/bouafle/resultat/final", (req, res) => {
    voter.getResultatByScrutin(envParam.commune.scrutin).then((data) => res.json(data))
});

module.exports = router;