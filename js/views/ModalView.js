import { modal, closeModalBtn, modalCategoriesContainer, modalImg, modalTitle, modalPrice, modalDesc, modalContact } from '../utils/dom.js';
import { formatCurrency } from '../utils/Formatters.js';

export function openModal(product) {
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

export function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

export function setupModal() {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  closeModalBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}
