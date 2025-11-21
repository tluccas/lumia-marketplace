import { productsGrid, noResults } from '../utils/dom.js';
import { formatCurrency } from '../utils/Formatters.js';
import { openModal } from './ModalView.js';

export function renderProducts(list) {
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
