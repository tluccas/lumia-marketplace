# Lumina Store (Imersão Dev Gemini)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

---

## 🔹 Descrição

**Lumina Store** é uma aplicação web de Marketplace moderna e responsiva, desenvolvida para concorrer a melhores projetos na **Imersão Dev com Google Gemini**. O projeto simula uma loja virtual de eletrônicos e acessórios, oferecendo funcionalidades como catálogo dinâmico, filtros avançados, modo escuro e um assistente virtual inteligente integrado.

O frontend é construído com **HTML5, CSS3 e JavaScript** puro (Vanilla JS), focando em performance e boas práticas. A grande inovação é a integração com a **API do Google Gemini**, que alimenta o chatbot "Astra", capaz de responder dúvidas sobre produtos e interagir com o usuário.

> [!IMPORTANT]  
> Este projeto é apenas um exemplo demonstrativo e não representa um produto final ou um projeto para produção.

> [!NOTE]  
> O chatbot é uma implementação simples e representa uma forma mínima sem estrutra correta para produção, foi feito de uma maneira simples para que atenda aos requisitos do desafio

> [!WARNING]  
> O ponto do chatbot é opcional pois não tenho certeza se é um parâmetro válido para desqualificação da seleção de melhores projetos apesar de se tratar de uma implementação simples

---

## 🔹 Funcionalidades

- **Catálogo Dinâmico**: Renderização de produtos a partir de um arquivo JSON local.
- **Filtros Avançados**: Busca por nome, filtragem por categorias e faixa de preço.
- **Modo Escuro (Dark Mode)**: Alternância de tema com persistência de preferência do usuário.
- **Modal de Detalhes**: Visualização expandida do produto com opção de contato via WhatsApp.
- **Gestão de Produtos**: Interface para adicionar novos produtos (simulação com LocalStorage/Array).
- **Chatbot IA (Astra)**: Assistente virtual integrado via API do Google Gemini.
- **Design Responsivo**: Layout adaptável para mobile, tablet e desktop.



---

## 🔹 Tecnologias utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript
- FontAwesome, Bootstrap Icons 

### Requisição ao Gemini (Opcional)
- Node.js (Runtime Environment)
- Camada simples com Node.js para intermediar a comunicação com a API do Google Gemini. Essa camada simplificada gerencia o fluxo de mensagens do chatbot.

> [!WARNING]  
> Essa etapa é opcional pois não tenho certeza se encaixa-se para desqualificação da seleção de melhores projetos

### Integrações
- Google Gemini API (Inteligência Artificial)
- Unsplash (Imagens ilustrativas do site)

---

## 📂 Estrutura do Projeto
```text
projeto_imersao_dev_gemini/
├─ api-imersao-dev/     # Req API do Gemini (Node.js)
│    ├─ .env            # Variáveis de ambiente (API Key)
│    ├─ index.js        # Servidor e rotas da API
│    └─ package.json    # Dependências do backend
├─ assets/              # Icone e Background
├─ app.js               # Todo código JavaScript
├─ data.json            # Base de dados dos produtos
├─ index.html           # Estrutura principal
├─ style.css            # Estilos globais da aplicação
└─ README.md            # Documentação do projeto
```

---

## 🚀 Como Utilizar

### Pré-requisitos (Opcionais)
- **Node.js** instalado (versão 16 ou superior recomendada).
- Uma chave de API do **Google Gemini**.

### 1. Configurando as requisições ao Gemini (Opcional)
O projeto utiliza um servidor Node.js simples para intermediar a comunicação segura com a API do Gemini, esse funcionamento é opcional e só afeta as respostas recebidas do Gemini no chat.

1. Abra o terminal e navegue até a pasta onde encontra-se o node:
   ```bash
   cd node-imersao-dev
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Crie um arquivo chamado `.env` dentro da pasta `node-imersao-dev` e adicione sua chave de API do Gemini:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

4. Inicie o Node.js:
   ```bash
   node index.js
   ```
   *O terminal exibirá: "API Gemini rodando em http://localhost:3000"*

### 2. Executando o Frontend
1. Volte para a raiz do projeto (onde está o `index.html`).
2. Abra o projeto utilizando o **Live Server** do VS Code ou outro servidor HTTP local.
   - **Dica:** Não abra o arquivo `index.html` diretamente pelo duplo clique, pois isso pode gerar erros de CORS ao tentar conectar com a API. Use sempre um servidor local.

3. A aplicação estará disponível (geralmente em `http://127.0.0.1:5500` ou similar).

---
## Preview
- O botão de chat é fixo, porém no preview é possível visualiza-lo no footer
<img src="assets/img/lumia-marketplace.png">

Desenvolvido por **Lucas Alves** durante a Imersão Dev Gemini.
