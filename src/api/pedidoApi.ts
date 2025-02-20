import api from './api';

export const listarPedidos = async (page: number, limit: number, search = '') => {
  const { data } = await api.get(`/pedidos?page=${page}&limit=${limit}&search=${search}`);
  return data;
};

export const criarPedido = async (pedido: { id_cliente: number; itens: { id_produto: number; qtde: number; preco: number }[] }) => {
  const { data } = await api.post('/pedidos', pedido);
  return data;
};

export const atualizarPedido = async (id: number, pedido: { id_cliente: number; itens: { id_produto: number; qtde: number; preco: number }[] }) => {
  const { data } = await api.put(`/pedidos/${id}`, pedido);
  return data;
};

export const deletarPedido = async (id: number) => {
  const { data } = await api.delete(`/pedidos/${id}`);
  return data;
};
