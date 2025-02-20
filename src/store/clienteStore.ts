import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { listarClientes, criarCliente, atualizarCliente, deletarCliente } from '../api/clienteApi';

export const useClienteStore = defineStore('cliente', () => {
  const clientes = ref([]);
  const totalClientes = ref(0);
  const page = ref(1);
  const limit = ref(10);
  const totalPages = computed(() => Math.ceil(totalClientes.value / limit.value));

  const fetchClientes = async (newPage = 1, newLimit = 10, searchTerm = '') => {
    try {
      const response = await listarClientes(newPage, newLimit, searchTerm);
      clientes.value = response.clientes;
      totalClientes.value = response.total;
      page.value = response.page;
      limit.value = newLimit;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const addCliente = async (cliente) => {
    await criarCliente(cliente);
    await fetchClientes(page.value, limit.value);
  };

  const updateCliente = async (id, cliente) => {
    await atualizarCliente(id, cliente);
    await fetchClientes(page.value, limit.value);
  };

  const removeCliente = async (id) => {
    await deletarCliente(id);
    await fetchClientes(page.value, limit.value);
  };

  return {
    clientes,
    totalClientes,
    page,
    limit,
    totalPages,
    fetchClientes,
    addCliente,
    updateCliente,
    removeCliente,
  };
});
