import { renderProducts } from "../views/ProductView.js";

export function criarProduto(produtos) {
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
