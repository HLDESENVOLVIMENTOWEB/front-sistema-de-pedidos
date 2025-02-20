<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-4">
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
            <th>ID do Cliente</th>
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
                  {{ item.qtde }}x Produto {{ item.nome_produto }} - R$ {{ item.preco }}
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
import { ref, onMounted, computed, watch } from 'vue';
import { usePedidoStore } from '../store/pedidoStore';
import PedidoForm from '../components/PedidoForm.vue';

const store = usePedidoStore();
const dialog = ref(false);
const pedidos = computed(() => store.pedidos);
const totalPages = computed(() => store.totalPages);
const page = computed(() => store.page);

const pedidoEditando = ref(null);

watch(dialog, (newValue) => {
  if (newValue === true && !pedidoEditando.value) {
    pedidoEditando.value = { id_cliente: null, itens: [] };
  }
});

onMounted(() => {
  store.fetchPedidos();
});

const handleSave = async (pedido) => {
  if (pedido.id_pedido) {
    await store.updatePedido(pedido.id_pedido, pedido);
  } else {
    await store.addPedido(pedido);
  }

  pedidoEditando.value = null;
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
};

const setPage = (newPage: number) => {
  store.setPage(newPage);
};
</script>
