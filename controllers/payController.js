const fs = require("fs/promises");
const path = require("path");

const dataFilePath = path.join(__dirname, "..", "data", "pay.json");

// Função para salvar um novo pagamento
const createPay = async (req, res) => {
  const { meioPagamento, valor, mesaId } = req.body;
  const novoPagamento = { meioPagamento, valor, mesaId };

  try {
    console.log("Recebendo dados:", novoPagamento);
    let data = await fs.readFile(dataFilePath, "utf-8");
    let pagamentos = [];

    if (data.trim()) {
      pagamentos = JSON.parse(data);
    }

    pagamentos.push(novoPagamento);

    await fs.writeFile(dataFilePath, JSON.stringify(pagamentos, null, 2));

    res.status(201).json(novoPagamento);
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    res.status(500).json({ message: "Erro ao processar o pagamento" });
  }
};

// Função para obter todos os pagamentos
const getPayments = async (req, res) => {
  try {
    let data = await fs.readFile(dataFilePath, "utf-8");
    let pagamentos = [];

    if (data.trim()) {
      pagamentos = JSON.parse(data);
    }

    res.status(200).json(pagamentos);
  } catch (error) {
    console.error("Erro ao obter pagamentos:", error);
    res.status(500).json({ message: "Erro ao obter os pagamentos" });
  }
};

module.exports = {
  createPay,
  getPayments,
};
