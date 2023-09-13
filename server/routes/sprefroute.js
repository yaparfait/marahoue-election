const express = require("express");
const router = express.Router();
const  spref  = require("../dao/sprefcommune.js");

router.get("/", (req, res) => {
    spref.getSprefCommune().then((data) => res.json(data))
});

router.get("/depts/:id", (req, res) => {
    spref.getSprefComByDepartement(req.params.id).then((data) => res.json(data))
});

router.post("/", (req, res) => {
    spref.createSprefCom(req.body.libsprefcom, req.body.spref, req.body.iddept).then(data => res.json(data));
});

module.exports = router;