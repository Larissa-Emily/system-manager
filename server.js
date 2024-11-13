const express = require("express");
const cors = require("cors");
const pedidoRoutes = require("./routes/pedidoRoutes.js");
const dataRoutes = require("./routes/dataRoutes.js");
const payRouters = require("./routes/payRoutes.js");

const app = express();
const PORT = process.env.PORT || 5001; // Usar variável de ambiente para a porta

app.use(cors());
app.use(express.json()); // Para interpretar requisições JSON
app.use(pedidoRoutes); // Usando as rotas para pedidos
app.use(dataRoutes); // Usando as rotas para dados
app.use(payRouters); // Usando as rotas para dados

// Inicializa o servidor
const startServer = () => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

// Verifica se o arquivo está sendo executado diretamente
if (require.main === module) {
  startServer();
}

module.exports = app; // Para facilitar testes
