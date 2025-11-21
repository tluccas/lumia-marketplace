import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Função que lê produtos
async function loadProdutos() {
  const data = await fs.readFile("../data.json", "utf-8");
  return data;
}

// Função que gera conteúdo usando Gemini
async function gerarConteudo(promptCustom) {
  const produtosText = await loadProdutos();
  //https://www.linkedin.com/in/lucasalvesz/
  const prompt = `Atue como Astra, a assistente virtual especialista da 'Lumina Store'.
    Sua missão: Atender clientes buscando eletrônicos e utilitários com cordialidade e eficiência.

    DADOS DOS PRODUTOS: ${produtosText}

    INSTRUÇÕES DE RESPOSTA:
    1. Responda à pergunta do cliente: "${promptCustom}".
    2. Seja breve (máximo 500 caracteres).
    3. FORMATO: NÃO use Markdown (como ** ou ##). Use tags HTML simples para formatar: use <br> para pular linhas e <b> para destacar nomes de produtos ou preços.
    4. VENDAS: Se relevante, sugira produtos da lista acima resumindo seus benefícios.
    5. CONTATO: Se o cliente mencionar "contato", "orçamento" ou quiser falar com humano, responda EXATAMENTE com: Para atendimento personalizado, fale comigo no <a href="https://www.linkedin.com/in/lucasalvesz/" target="_blank">LinkedIn</a>.

    Mantenha o tom leve, profissional, descontraído e direto.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

// Rota HTTP para o frontend
app.post("/gerar", async (req, res) => {
  try {
    const { prompt } = req.body;
    const texto = await gerarConteudo(prompt);
    res.json({ response: texto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar conteúdo" });
  }
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log("API Gemini rodando em http://localhost:3000");
});
