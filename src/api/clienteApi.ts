import api from './api';


export const listarClientes = async (page: number, limit: number, searchTerm = '') => {
  const { data } = await api.get(`/clientes?page=${page}&limit=${limit}&search=${searchTerm}`);
  return data;
};

export const criarCliente = async (cliente: { nome: string; email: string }) => {
  const { data } = await api.post('/clientes', cliente);
  return data;
};

export const atualizarCliente = async (id: number, cliente: { nome: string; email: string }) => {
  const { data } = await api.put(`/clientes/${id}`, cliente);
  return data;
};

export const deletarCliente = async (id: number) => {
  const { data } = await api.delete(`/clientes/${id}`);
  return data;
};
