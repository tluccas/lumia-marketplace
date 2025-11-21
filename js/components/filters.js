import { searchInput, filterBtns, minPriceInput, maxPriceInput } from '../utils/dom.js';
import { products, currentCategory, currentSearch, minPrice, maxPrice, setCategory, setSearch, setMinPrice, setMaxPrice } from './state.js';
import { renderProducts } from '../views/ProductView.js';

export function applyFilters() {
  const filtered = products.filter((product) => {
    const productCategories = product.category.split(';').map((c) => c.trim());
    const matchCat = currentCategory === 'all' || productCategories.includes(currentCategory);
    const matchSearch = product.title.toLowerCase().includes(currentSearch.toLowerCase());
    const matchPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchCat && matchSearch && matchPrice;
  });
  renderProducts(filtered);
}

export function setupFilters() {
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
