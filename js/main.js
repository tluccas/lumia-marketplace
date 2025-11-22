import { fetchProdutos } from "./services/DataService.js";
import { setProducts } from "./components/state.js";
import { renderProducts } from "./views/ProductView.js";
import { setupFilters, applyFilters } from "./components/filters.js";
import { setupModal } from "./views/ModalView.js";
import { setupTheme } from "./controllers/ThemeController.js";
import { criarProduto } from "./controllers/ProductController.js";

async function init() {
  setupTheme();
  setupModal();
  setupFilters();

  // Carregar chatbot de forma opcional, se o arquivo existir
  try {
    const mod = await import("./controllers/ChatController.js");
    if (typeof mod.default === "function") {
      mod.default();
    }
  } catch (err) {
    console.warn("[main] Chatbot opcional não carregado:", err?.message || err);
  }

  const data = await fetchProdutos();
  setProducts(data);

  criarProduto(data);
  renderProducts(data);
}
init();
