import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { listarPedidos, criarPedido, atualizarPedido, deletarPedido } from '../api/pedidoApi';

export const usePedidoStore = defineStore('pedido', () => {
  const pedidos = ref([]);
  const totalPedidos = ref(0);
  const page = ref(1);
  const limit = ref(10);
  const searchTerm = ref('');
  const totalPages = computed(() => Math.ceil(totalPedidos.value / limit.value));

  const fetchPedidos = async (newPage = 1, newLimit = 10, search = '') => {
    try {
      const response = await listarPedidos(newPage, newLimit, search);
      pedidos.value = response.pedidos;
      totalPedidos.value = response.total;
      page.value = response.page;
      limit.value = newLimit;
      searchTerm.value = search;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const addPedido = async (pedido) => {
    await criarPedido(pedido);
    await fetchPedidos(page.value, limit.value, searchTerm.value);
  };

  const updatePedido = async (id, pedido) => {
    await atualizarPedido(id, pedido);
    await fetchPedidos(page.value, limit.value, searchTerm.value);
  };

  const removePedido = async (id) => {
    await deletarPedido(id);
    await fetchPedidos(page.value, limit.value, searchTerm.value);
  };

  return {
    pedidos,
    totalPedidos,
    page,
    limit,
    totalPages,
    searchTerm,
    fetchPedidos,
    addPedido,
    updatePedido,
    removePedido,
  };
});
