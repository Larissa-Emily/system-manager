const fs = require("fs").promises; // Usando a API de promessas do fs
const path = require("path"); // Certifique-se de importar o módulo path
const DATA_FILE = path.join(__dirname, "../data/data.json"); // Caminho ajustado

const createData = async (req, res) => {
  const newItem = req.body;

  if (!newItem || typeof newItem !== "object") {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    // Ler os dados existentes
    let data = await fs.readFile(DATA_FILE, "utf-8").catch((err) => {
      if (err.code === "ENOENT") {
        return JSON.stringify([]); // Retorna um array vazio se o arquivo não existir
      }
      throw err; // Lança erro para tratamento
    });

    // Parse dos dados e adiciona o novo item 
    const items = JSON.parse(data);
    items.push(newItem);

    // Escrever os dados atualizados de volta ao arquivo
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2));
    res.status(200).json({ message: "Item salvo com sucesso" });
  } catch (err) {
    console.error(err); // Log do erro no console para depuração
    res.status(500).json({ error: "Erro ao salvar o arquivo" });
  }
};

const getData = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const items = JSON.parse(data);
    res.status(200).json(items);
  } catch (err) {
    console.error(err); // Log do erro no console para depuração
    if (err.code === "ENOENT") {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }
    res.status(500).json({ error: "Erro ao ler o arquivo" });
  }
};

module.exports = { createData, getData };
