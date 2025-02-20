<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-4">
      <v-text-field
        v-model="search"
        label="Filtrar por Cliente"
        prepend-icon="mdi-magnify"
        clearable
        dense
        @keyup.enter="filtrarPedidos"
        class="mr-2"
      ></v-text-field>

      <v-btn color="primary" @click="filtrarPedidos" prepend-icon="mdi-magnify" class="mr-2">
        Buscar
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary" prepend-icon="mdi-plus" @click="novoPedido">
        Adicionar Pedido
      </v-btn>
    </v-row>


    <v-dialog v-model="dialog" max-width="500">
      <PedidoForm :pedidoEdicao="pedidoEditando" @save="handleSave" @close="dialog = false" />
    </v-dialog>

    <v-card>
      <v-table dense>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Itens</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.id_pedido">
            <td>{{ pedido.nome_cliente }}</td>
            <td>
              <ul>
                <li v-for="item in pedido.itens" :key="item.id_produto">
                  {{ item.qtde }}x {{ item.nome_produto }} - R$ {{ item.preco }}
                </li>
              </ul>
            </td>
            <td class="text-center">
              <v-btn icon="mdi-pencil" size="small" @click="editarPedido(pedido)"></v-btn>
              <v-btn icon="mdi-delete" color="red" size="small" @click="removerPedido(pedido.id_pedido)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-pagination
      v-model="page"
      :length="totalPages"
      @update:modelValue="setPage"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePedidoStore } from '../store/pedidoStore';
import PedidoForm from '../components/PedidoForm.vue';

const store = usePedidoStore();
const dialog = ref(false);
const search = ref('');
const pedidos = computed(() => store.pedidos);
const totalPages = computed(() => store.totalPages);
const page = computed(() => store.page);

const pedidoEditando = ref(null);

onMounted(() => {
  store.fetchPedidos();
});

const filtrarPedidos = () => {
  store.fetchPedidos(1, 10, search.value);
};

const handleSave = async (pedido) => {
  if (pedido.id_pedido) {
    await store.updatePedido(pedido.id_pedido, pedido);
  } else {
    await store.addPedido(pedido);
  }
  filtrarPedidos();
  dialog.value = false;
};

const novoPedido = () => {
  pedidoEditando.value = { id_cliente: null, itens: [] };
  dialog.value = true;
};

const editarPedido = (pedido) => {
  pedidoEditando.value = { ...pedido, itens: pedido.itens.map(item => ({ ...item })) };
  dialog.value = true;
};

const removerPedido = async (id: number) => {
  await store.removePedido(id);
  filtrarPedidos();
};

const setPage = (newPage: number) => {
  store.fetchPedidos(newPage, 10, search.value);
};

</script>
