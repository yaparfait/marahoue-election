const express = require("express");
const router = express.Router();
const cand = require("../dao/candidat.js");

router.get("/", (req, res) => {
    cand.getCandidats().then((data) => res.json(data))
});

router.get("/:id", (req, res) => {
    cand.getCandidatById(req.params.id).then((data) => res.json(data))
});

router.post("/", (req, res) => {
    cand.createCandidat(req.body.nomcand, req.body.nomusuel, req.body.nomliste, req.body.idcivilite, req.body.idparti).then(data => res.json(data))
});

router.put("/", (req, res) => {
    cand.updateCandidat(req.body.idcand, req.body.nomcand, req.body.nomusuel, req.body.nomliste, req.body.idcivilite, req.body.idparti).then(data => res.json(data))
});

router.delete("/:id", (req, res) => {
    cand.deleteCandidat(req.params.id).then((data) => res.json(data))
});

router.get("/civilites/all", (req, res) => {
    cand.getAllCivilites().then((data) => res.json(data))
});

module.exports = router;