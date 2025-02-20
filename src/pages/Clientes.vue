<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-4">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialog = true" prepend-icon="mdi-plus">
        Adicionar Cliente
      </v-btn>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <ClienteForm :cliente="clienteEditando" @save="handleSave" @close="dialog = false" />
    </v-dialog>

    <v-card>
      <v-table dense>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id_cliente || cliente.email">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td class="text-center">
              <v-btn icon="mdi-pencil" size="small" @click="editarCliente(cliente)"></v-btn>
              <v-btn icon="mdi-delete" color="red" size="small" @click="removerCliente(cliente.id_cliente)"></v-btn>
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
import { useClienteStore } from '../store/clienteStore';
import ClienteForm from '../components/ClienteForm.vue';

const store = useClienteStore();
const dialog = ref(false);
const clientes = computed(() => store.clientes);
const totalPages = computed(() => store.totalPages);
const page = computed(() => store.page);
const clienteEditando = ref(null);

onMounted(() => {
  store.fetchClientes();
});

const handleSave = async (cliente) => {
  if (cliente.id_cliente) {
    await store.updateCliente(cliente.id_cliente, cliente);
  } else {
    await store.addCliente(cliente);
  }

  clienteEditando.value = null;
  dialog.value = false;
};

const editarCliente = (cliente) => {
  clienteEditando.value = { ...cliente };
  dialog.value = true;
};

const removerCliente = (id: number) => {
  store.removeCliente(id);
};

const setPage = (newPage: number) => {
  store.setPage(newPage);
};
</script>
