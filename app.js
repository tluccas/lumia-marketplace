
/* ==========================================================================
   1. UTILS & DOM
   ========================================================================== */
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const noResults = document.getElementById("noResults");
const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalContact = document.getElementById("modalContact");
const modalCategoriesContainer = document.getElementById("modalCategories");

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/* ==========================================================================
   2. STATE
   ========================================================================== */
let products = [];
let currentCategory = "all";
let currentSearch = "";
let minPrice = 0;
let maxPrice = Infinity;

function setProducts(list) {
  products = list;
}
function setCategory(cat) {
  currentCategory = cat;
}
function setSearch(q) {
  currentSearch = q;
}
function setMinPrice(v) {
  minPrice = v ?? 0;
}
function setMaxPrice(v) {
  maxPrice = v ?? Infinity;
}

/* ==========================================================================
   3. SERVICES
   ========================================================================== */
async function fetchProdutos() {
  const response = await fetch("data.json");
  if (!response.ok) throw new Error(`Falha ao carregar dados: ${response.status}`);
  return await response.json();
}

/* ==========================================================================
   4. VIEWS
   ========================================================================== */
// --- ModalView ---
function openModal(product) {
  const categoriesArray = product.category.split(";");
  const categoryTagsHTML = categoriesArray
    .map((cat) => `<span class="modal__tag-item">${cat.trim()}</span>`)
    .join("");

  modalCategoriesContainer.innerHTML = categoryTagsHTML;

  modalImg.src = product.image;
  modalTitle.textContent = product.title;
  modalPrice.textContent = formatCurrency(product.price);
  modalDesc.textContent = product.description;
  
  modalContact.innerHTML = ` ${product.numero || "Contato indisponível"}`;

  modal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function setupModal() {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  closeModalBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

// --- ProductView ---
function renderProducts(list) {
  productsGrid.innerHTML = '';

  if (list.length === 0) {
    noResults.classList.remove('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
  }

  list.forEach((product, index) => {
    const card = document.createElement('article');
    card.classList.add('card', 'animate__animated', 'animate__fadeInUp');

    const delayInMs = index * 80;
    card.style.animationDelay = `${delayInMs}ms`;
    card.dataset.id = product.id;

    const categoriesArray = product.category.split(';');
    const categoryTags = categoriesArray
      .map((cat) => `<span class="card__cat">${cat.trim()}</span>`)
      .join(' ');

    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="card__image" loading="lazy">
            <div class="card__content">
                <span class="card__cat-container">${categoryTags}</span>
                <h3 class="card__title">${product.title}</h3>
                <p class="card__price">${formatCurrency(product.price)}</p>
            </div>
        `;

    card.addEventListener('click', () => openModal(product));

    productsGrid.appendChild(card);
  });
}

/* ==========================================================================
   5. COMPONENTS (Filters)
   ========================================================================== */
function applyFilters() {
  const filtered = products.filter((product) => {
    const productCategories = product.category.split(';').map((c) => c.trim());
    const matchCat = currentCategory === 'all' || productCategories.includes(currentCategory);
    const matchSearch = product.title.toLowerCase().includes(currentSearch.toLowerCase());
    const matchPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchCat && matchSearch && matchPrice;
  });
  renderProducts(filtered);
}

function setupFilters() {
  minPriceInput.addEventListener('input', (e) => {
    const v = e.target.value ? parseFloat(e.target.value) : 0;
    setMinPrice(v);
    applyFilters();
  });

  maxPriceInput.addEventListener('input', (e) => {
    const v = e.target.value ? parseFloat(e.target.value) : Infinity;
    setMaxPrice(v);
    applyFilters();
  });

  searchInput.addEventListener('input', (e) => {
    setSearch(e.target.value);
    applyFilters();
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      setCategory(btn.dataset.category);
      applyFilters();
    });
  });
}

/* ==========================================================================
   6. CONTROLLERS
   ========================================================================== */
// --- ThemeController ---
function setupTheme() {
  const savedTheme = localStorage.getItem('theme');
  // Padrão Dark Mode se não houver preferência salva
  if (savedTheme === 'dark' || !savedTheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeToggle.innerHTML = newTheme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
}

// --- ChatController ---
const CHAT_DEBUG = false;
const NODE_API_URL = "http://localhost:3000/gerar"; // rota para req

function chatbot() {
  const chatButton = document.getElementById("chat-button");
  const chatWidget = document.getElementById("chat-widget");
  const closeChat = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatMessages = document.getElementById("chat-messages");

  if (chatButton && chatWidget && closeChat) {
    chatButton.addEventListener("click", () => {
      chatWidget.classList.toggle("hidden");
      if (!chatWidget.classList.contains("hidden") && chatInput) {
        setTimeout(() => chatInput.focus(), 0);
      }
    });

     let isFirstMessage = false; // Flag para simular contexto

    closeChat.addEventListener("click", () => {
      chatWidget.classList.add("hidden");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !chatWidget.classList.contains("hidden")) {
        chatWidget.classList.add("hidden");
      }
    });

    if (chatInput && sendBtn && chatMessages) {
      function addMessage(text, who = "user") {
        const div = document.createElement("div");
        div.className =
          (who === "user" ? "msg-user" : "msg-bot") + " msg-animated";

        if (who === "msg-bot") {
          div.innerHTML = text;
        } else {
          div.textContent = text;
        }

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
      }

      function showTyping() {
        const typing = document.createElement("div");
        typing.className = "typing-indicator msg-animated";
        typing.innerHTML = "<span></span><span></span><span></span>";
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typing;
      }

      async function handleSend() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        addMessage(userText, "user");
        chatInput.value = "";
        chatInput.disabled = true;

        const typingDiv = showTyping();

        try {
          
          const promptAddon = isFirstMessage
            ? " Não se apresente, a conversa já está em andamento, aja como se a conversa já tivesse um contexto, sem incluir palavras como oi, olá, tudo bem?."
            : "";

          const response = await fetch(NODE_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userText + promptAddon }),
          });

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }

          const data = await response.json();
          typingDiv.remove();

          const botResponseText =
            data.response ||
            "Desculpe, não consegui obter uma resposta do servidor.";

          addMessage(botResponseText, "msg-bot");

          isFirstMessage = true; // Marca a simulação de contexto
        } catch (error) {
          typingDiv.remove();
          console.error("Erro na comunicação com o backend:", error);
          addMessage(
            "Ops! Houve um erro de conexão. Tente novamente mais tarde.",
            "msg-bot"
          );
        } finally {
          chatInput.disabled = false;
          chatInput.focus();
        }
      }

      sendBtn.addEventListener("click", handleSend);
      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSend();
        }
      });

      setTimeout(() => {
        addMessage(
          "Olá! Sou seu assistente virtual. Em que posso te ajudar hoje?",
          "msg-bot"
        );
      }, 1000);
    }
  }
}

// --- ProductController ---
function criarProduto(produtos) {
  const btnOpenModal = document.querySelector("#openNewProductBtn button");

  const form = document.getElementById("new-product-form");
  const newProductModal = document.getElementById("newProductModal");
  const closeModalBtn = document.getElementById("closeProductModalBtn");
  const cancelBtn = document.getElementById("cancelProductFormBtn");

  if (!Array.isArray(produtos)) {
    console.warn("[newProduct] Lista de produtos inválida.");
    return;
  }

  if (!form || !newProductModal || !closeModalBtn || !cancelBtn) {
    console.warn(
      "[newProduct] Elementos do formulário/modal não encontrados. Ignorando setup."
    );
    return;
  }

  btnOpenModal.addEventListener("click", () => {
    newProductModal.classList.remove("hidden");
     newProductModal.classList.add("active");
    document.body.classList.add("no-scroll");
  });

  // Fechar modal
  closeModalBtn.addEventListener("click", () => {
    newProductModal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

  cancelBtn.addEventListener("click", () => {
    newProductModal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

  // Listener de submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.body.classList.remove("no-scroll");

    const formData = new FormData(form);

    const novoProduto = {
      id: produtos.length + 1,
      title: formData.get("nomeProduto"),
      image: formData.get("imagemProduto"),
      category: Array.from(formData.getAll("categoria")).join(";"),
      description: formData.get("descricao"),
      price: parseFloat(formData.get("preco")) || 0,
      numero: formData.get("numero") || "",
    };

    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    form.reset();
    newProductModal.classList.add("hidden");

    if (typeof renderProducts === "function") {
      renderProducts(produtos);
    }

    console.log("Novo produto criado:", novoProduto);
  });
}

/* ==========================================================================
   7. MAIN INIT
   ========================================================================== */
async function init() {
  setupTheme();
  setupModal();
  setupFilters();
  
  // Inicializa o chatbot
  chatbot();

  const data = await fetchProdutos();
  setProducts(data);

  criarProduto(data);
  renderProducts(data);
}

init();
