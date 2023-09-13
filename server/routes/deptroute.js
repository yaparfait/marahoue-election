const express = require("express");
const router = express.Router();
const  dept  = require("../dao/departement.js");
const  envParam  = require("../dao/param.js");

// Les departements de la region de Bouaflé
router.get("/regions", (req, res) => {
    dept.getDepartementsByRegion(envParam.region.id).then((data) => res.json(data))
});
// Les departements par region
router.get("/regions/:id", (req, res) => {
    dept.getDepartementsByRegion(req.params.id).then((data) => res.json(data))
});
// Tous les departements
router.get("/", (req, res) => {
    dept.getDepartements().then((data) => res.json(data))
});

router.get("/:id", (req, res) => {
    dept.getDepartementById(req.params.id).then((data) => res.json(data))
});

router.post("/", (req, res) => {
    dept.createDepartement(req.body.libdepartement, req.body.idregion).then(data => res.json(data));
});

router.put("/", (req, res) => {
    dept.updateDepartement(req.body.iddepartement, req.body.libdepartement).then(data => res.json(data));
});

router.delete("/:id", (req, res) => {
    dept.deleteDepartement(req.params.id).then((data) => res.json(data))
});

module.exports = router;