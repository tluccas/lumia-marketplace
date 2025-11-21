export let products = [];
export let currentCategory = "all";
export let currentSearch = "";
export let minPrice = 0;
export let maxPrice = Infinity;

export function setProducts(list) {
  products = list;
}
export function setCategory(cat) {
  currentCategory = cat;
}
export function setSearch(q) {
  currentSearch = q;
}
export function setMinPrice(v) {
  minPrice = v ?? 0;
}
export function setMaxPrice(v) {
  maxPrice = v ?? Infinity;
}
