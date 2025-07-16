const express = require("express");
const router = express.Router();
const scrutin = require("../dao/scrutin.js");

router.get("/", (req, res) => {
    scrutin.getScrutins().then((data) => res.json(data))
});

router.get("/:id", (req, res) => {
    scrutin.getScrutinById(req.params.id).then((data) => res.json(data))
});

router.get("/:id/candidats", (req, res) => {
    scrutin.getCandidatsByScrutin(req.params.id).then((data) => res.json(data))
});

router.post("/candidats", (req, res) => {
    scrutin.getScrutinsWithCands().then((data) => res.json(data))
});

router.post("/", (req, res) => {
    scrutin.createScrutin(req.body.libscrutin, req.body.envergure).then(data => res.json(data))
});

router.put("/", (req, res) => {
    scrutin.updateScrutin(req.body.idscrutin, req.body.libscrutin, req.body.envergure).then(data => res.json(data))
});

router.delete("/:id", (req, res) => {
    scrutin.deleteScrutin(req.params.id).then((data) => res.json(data))
});

module.exports = router;