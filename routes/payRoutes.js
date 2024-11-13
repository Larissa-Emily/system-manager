const express = require("express");
const { createPay, getPayments } = require('../controllers/payController');
const router = express.Router();

router.post("/api/salvar-pagamentos", createPay);
router.get("/api/obter-pagamentos", getPayments);

module.exports = router;
