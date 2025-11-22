export async function fetchProdutos() {
  const response = await fetch("data.json");
  if (!response.ok) throw new Error(`Falha ao carregar dados: ${response.status}`);
  return await response.json();
}
