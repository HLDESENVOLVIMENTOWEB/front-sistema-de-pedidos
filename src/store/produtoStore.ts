import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto } from '../api/produtoApi';

export const useProdutoStore = defineStore('produto', () => {
  const produtos = ref([]);
  const totalProdutos = ref(0);
  const page = ref(1);
  const limit = ref(10);
  const totalPages = computed(() => Math.ceil(totalProdutos.value / limit.value));

  const fetchProdutos = async (newPage = 1, newLimit = 10, searchTerm = '') => {
    try {
      const response = await listarProdutos(newPage, newLimit, searchTerm);
      produtos.value = response.produtos;
      totalProdutos.value = response.total;
      page.value = response.page;
      limit.value = newLimit;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const addProduto = async (produto) => {
    await criarProduto(produto);
    await fetchProdutos(page.value, limit.value);
  };

  const updateProduto = async (id, produto) => {
    await atualizarProduto(id, produto);
    await fetchProdutos(page.value, limit.value);
  };

  const removeProduto = async (id) => {
    await deletarProduto(id);
    await fetchProdutos(page.value, limit.value);
  };

  return {
    produtos,
    totalProdutos,
    page,
    limit,
    totalPages,
    fetchProdutos,
    addProduto,
    updateProduto,
    removeProduto,
  };
});
