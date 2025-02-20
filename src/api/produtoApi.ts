import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const listarProdutos = async (page: number, limit: number) => {
  const { data } = await api.get(`/produtos?page=${page}&limit=${limit}`);
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
