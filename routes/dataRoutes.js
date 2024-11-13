const express = require("express");
const { getData, createData } = require("../controllers/dataController.js");

const router = express.Router();

router.get("/api/obter-dados", getData);
router.post("/api/salvar-dados", createData);

module.exports = router; // Certifique-se de usar module.exports
