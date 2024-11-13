const fs = require("fs/promises");
const dataFilePath = "./data/pedidos.json";

// Função para obter pedidos
const getPedidos = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    const pedidos = JSON.parse(data);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pedidos" });
  }
};

// Função para criar um novo pedido
const createPedido = async (req, res) => {
  const { mesaId, pedido, status, horario } = req.body;

  // Verificar se os campos obrigatórios estão presentes
  if (!mesaId || !pedido || !status || !horario) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios não enviados" });
  }

  // Criação do novo pedido
  const novoPedido = { mesaId, pedido, status, horario };

  // Garantir que o preço é um número
  novoPedido.pedido.forEach((item) => {
    item.preco = parseFloat(item.preco);
  });

  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    const pedidos = data ? JSON.parse(data) : [];
    pedidos.push(novoPedido);

    await fs.writeFile(dataFilePath, JSON.stringify(pedidos, null, 4));
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar pedido" });
  }
};

/// Função para deletar um pedido
const deletePedido = async (req, res) => {
  const { mesaId } = req.params; // Obtém o 'mesaId' dos parâmetros da requisição

  try {
    // 1. Carrega os dados do arquivo JSON
    const data = await fs.readFile(dataFilePath, "utf-8");
    const pedidos = JSON.parse(data); // Converte o JSON em um array de objetos

    // 2. Converte mesaId para número para garantir a comparação correta
    const mesaIdNum = Number(mesaId);

    // 3. Encontra o índice do pedido com o 'mesaId' fornecido
    const pedidoIndex = pedidos.findIndex((p) => p.mesaId === mesaIdNum);

    // 4. Verifica se o pedido foi encontrado
    if (pedidoIndex !== 1) {
      // Pedido encontrado
      const deletedPedido = pedidos[pedidoIndex]; // Opcional: armazena o pedido que será excluído para referência

      // 5. Remove o pedido encontrado do array 'pedidos'
      pedidos.splice(pedidoIndex, 1);

      // 6. Salva a atualização no arquivo JSON
      await fs.writeFile(dataFilePath, JSON.stringify(pedidos, null, 4));

      // 7. Retorna uma resposta de sucesso e os dados do pedido excluído
      res.status(200).json({
        message: "Pedido deletado com sucesso",
        deletedPedido,
      });
    } else {
      // Pedido não encontrado
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  } catch (error) {
    // 8. Em caso de erro, exibe no console e retorna uma mensagem de erro
    res.status(500).json({ message: "Erro ao deletar pedido" });
  }
};

// Função para atualizar o status de um pedido para "finalizado"
const putPedido = async (req, res) => {
  const { mesaId } = req.params;

  try {
    // captura erros

    const data = await fs.readFile(dataFilePath, "utf-8"); // lendo o arquivo pedidos.json
    const pedidos = JSON.parse(data); // transforma o conteudo do aquivo em um objeto json

    const pedidoIndex = pedidos.findIndex((p) => p.mesaId === Number(mesaId)); // Use mesaId aqui para encontrar o pedido correto

    if (pedidoIndex !== -1) {
      pedidos[pedidoIndex].status = "Finalizado"; // Atualiza o status
      await fs.writeFile(dataFilePath, JSON.stringify(pedidos, null, 4)); //reescreve o arquivo
      res.status(200).json({
        message: "Status do pedido atualizado para finalizado",
        pedido: pedidos[pedidoIndex],
      });
    } else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
};

// Exportando as funções corretamente
module.exports = {
  getPedidos,
  createPedido,
  deletePedido,
  putPedido,
};
