const express = require("express");
const router = express.Router();
const lieuvote  = require("../dao/lieuvote.js");
const  envParam  = require("../dao/param.js");

router.get("/", (req, res) => {
    lieuvote.getLieuVote().then((data) => res.json(data))
});

router.get("/:id", (req, res) => {
    lieuvote.getLieuVoteById(req.params.id).then((data) => res.json(data))
});

router.get("/spref-com/:id", (req, res) => {
    lieuvote.getLieuVoteByLocalites(req.params.id).then((data) => res.json(data))
});

// Les Lieus de vote de la commune de Bouaflé
router.get("/spref-com/commune/bouafle", (req, res) => {
    lieuvote.getLieuVoteByLocalites(envParam.commune.id).then((data) => res.json(data))
});

router.post("/", (req, res) => {
    lieuvote.createLieuVote(req.body.liblieuvote, req.body.idlocalite, req.body.nbreinscrit, req.body.nbBureauvote).then(data => res.json(data));
});

router.put("/", (req, res) => {
    lieuvote.updateLieuVote(req.body.idlieuvote, req.body.liblieuvote, req.body.nbreinscrit).then(data => res.json(data));
});

router.delete("/:id", (req, res) => {
    lieuvote.deleteLieuVote(req.params.id).then((data) => res.json(data))
});

router.get("/bureau-vote/lieuvote/:id", (req, res) => {
    lieuvote.getBureauVoteByLieu(req.params.id).then(data => res.json(data));
});

router.post("/bureau-vote", (req, res) => {
    lieuvote.createBureauVote(req.body.libbv, req.body.idlieuvote).then(data => res.json(data));
});

router.put("/bureau-vote", (req, res) => {
    lieuvote.updateBureauVote(req.body.idbv, req.body.libbv, req.body.nbreinscrit).then(data => res.json(data));
});

router.delete("/bureau-vote/:id", (req, res) => {
    lieuvote.deleteBureauVote(req.params.id).then(data => res.json(data));
});

module.exports = router;