import api from './api';

export const listarProdutos = async (page: number, limit: number, searchTerm = '') => {
  const { data } = await api.get(`/produtos?page=${page}&limit=${limit}&search=${searchTerm}`);
  return data;
};

export const criarProduto = async (produto: { nome: string; preco: number }) => {
  const { data } = await api.post('/produtos', produto);
  return data;
};

export const atualizarProduto = async (id: number, produto: { nome: string; preco: number }) => {
  const { data } = await api.put(`/produtos/${id}`, produto);
  return data;
};

export const deletarProduto = async (id: number) => {
  const { data } = await api.delete(`/produtos/${id}`);
  return data;
};
