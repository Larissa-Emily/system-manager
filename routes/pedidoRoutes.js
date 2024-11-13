const express = require("express");
const router = express.Router();
const {
  getPedidos,
  createPedido,
  deletePedido,
  putPedido,
} = require("../controllers/pedidoController.js");

router.get("/api/obter-pedidos", getPedidos);
router.post("/api/salvar-pedidos", createPedido);
router.delete("/api/deletar-pedido/:mesaId", deletePedido);
router.put("/api/atualizar-pedido/:mesaId", putPedido);

module.exports = router; // Certifique-se de usar module.exports
