import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Clientes from '@/pages/Clientes.vue';
import Produtos from '@/pages/Produtos.vue';
import Pedidos from '@/pages/Pedidos.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/clientes' },
  { path: '/clientes', component: Clientes },
  { path: '/produtos', component: Produtos },
  { path: '/pedidos', component: Pedidos }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
