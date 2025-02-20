<template>
  <v-container>
    <v-row align="center" justify="start" class="mb-4">
      <v-text-field
        v-model="search"
        label="Filtrar por nome"
        prepend-icon="mdi-magnify"
        clearable
        dense
        @keyup.enter="filtrarClientes"
        class="mr-4"
      ></v-text-field>

      <v-btn color="primary" @click="filtrarClientes" prepend-icon="mdi-magnify" class="mr-4">
        Buscar
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click="abrirCadastro" prepend-icon="mdi-plus">
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
          <tr v-for="cliente in clientes" :key="cliente.id_cliente">
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
const search = ref('');
const clienteEditando = ref(null);

const clientes = computed(() => store.clientes);
const totalPages = computed(() => store.totalPages);
const page = computed(() => store.page);

// Buscar clientes ao carregar o componente
onMounted(() => {
  store.fetchClientes();
});

// Filtrar clientes chamando a API
const filtrarClientes = () => {
  store.fetchClientes(1, 10, search.value);
};

// Função para abrir modal de cadastro
const abrirCadastro = () => {
  clienteEditando.value = null;
  dialog.value = true;
};

// Manipulação de clientes
const handleSave = async (cliente) => {
  if (cliente.id_cliente) {
    await store.updateCliente(cliente.id_cliente, cliente);
  } else {
    await store.addCliente(cliente);
  }
  filtrarClientes();
  dialog.value = false;
};

const editarCliente = (cliente) => {
  clienteEditando.value = { ...cliente };
  dialog.value = true;
};

const removerCliente = async (id: number) => {
  await store.removeCliente(id);
  filtrarClientes();
};

const setPage = (newPage: number) => {
  store.fetchClientes(newPage, 10, search.value);
};
</script>
