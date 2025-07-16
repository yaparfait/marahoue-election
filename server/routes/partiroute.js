const express = require("express");
const router = express.Router();
const parti = require("../dao/partipolitique.js");

router.get("/", (req, res) => {
    parti.getAllPartiPolitics().then((data) => res.json(data))
});

router.get("/:id", (req, res) => {
    parti.getPartiPoliticByID(req.params.id).then((data) => res.json(data))
});

router.post("/", (req, res) => {
    parti.createPartiPolitic(req.body.libparti, req.body.sigle).then(data => res.json(data))
});

module.exports = router;