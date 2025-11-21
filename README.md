# Lumina Store (Imersão Dev Gemini)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

---

## 🔹 Descrição

**Lumina Store** é uma aplicação web de e-commerce moderna e responsiva, desenvolvida durante a **Imersão Dev com Google Gemini**. O projeto simula uma loja virtual de eletrônicos e acessórios, oferecendo funcionalidades como catálogo dinâmico, filtros avançados, modo escuro e um assistente virtual inteligente integrado.

O frontend é construído com **HTML5, CSS3 e JavaScript** puro (Vanilla JS), focando em performance e boas práticas. A grande inovação é a integração com a **API do Google Gemini**, que alimenta o chatbot "Astra", capaz de responder dúvidas sobre produtos e interagir com o usuário.

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
- HTML5 Semântico
- CSS3 (Flexbox, Grid, CSS Variables)
- JavaScript (ES6 Modules)
- FontAwesome (Ícones)

### Integrações
- Google Gemini API (Inteligência Artificial)
- Unsplash (Imagens dos produtos)

---

## 📂 Estrutura do Projeto
```text
projeto_imersao_dev_gemini/
├─ js/
│    ├─ dom.js          # Seleção de elementos do DOM
│    ├─ main.js         # Ponto de entrada e inicialização
│    ├─ modal.js        # Lógica das janelas modais
│    ├─ newProduct.js   # Lógica de criação de produtos
│    ├─ render.js       # Renderização do grid de produtos
│    ├─ theme.js        # Controle do tema (Dark/Light)
│    └─ utils.js        # Funções utilitárias (formatação, etc)
├─ chat.css             # Estilos específicos do Chatbot
├─ data.json            # Base de dados dos produtos
├─ index.html           # Estrutura principal
├─ style.css            # Estilos globais da aplicação
└─ README.md            # Documentação do projeto
```

---

## 🚀 Como Utilizar

### Pré-requisitos
- **Node.js** instalado (versão 16 ou superior recomendada).
- Uma chave de API do **Google Gemini**.

### 1. Configurando o Backend (API)
O projeto utiliza um servidor Node.js simples para intermediar a comunicação segura com a API do Gemini.

1. Abra o terminal e navegue até a pasta da API:
   ```bash
   cd api-imersao-dev
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Crie um arquivo chamado `.env` dentro da pasta `api-imersao-dev` e adicione sua chave de API:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

4. Inicie o servidor Node.js:
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

Desenvolvido por **Lucas Alves** durante a Imersão Dev Gemini.
