<template>
  <v-app>
    <!-- Barra de Navegação -->
    <v-app-bar app color="primary" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon class="mdi mdi-menu"></v-icon>
      </v-btn>
      <v-app-bar-title>Sistema de Pedidos de Vendas</v-app-bar-title>
    </v-app-bar>


    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.to"
            link
            class="pa-2 listItemFlex"
          >
            <v-list-item-icon class="listIcon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="pa-2 listItemTitleFlex">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <!-- Conteúdo Principal -->
    <v-main>
      <v-container class="mt-5">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);

const menuItems = [
  { title: 'Clientes', icon: 'mdi-account-group', to: '/clientes' },
  { title: 'Produtos', icon: 'mdi-package-variant', to: '/produtos' },
  { title: 'Pedidos', icon: 'mdi-cart', to: '/pedidos' },
];
</script>
