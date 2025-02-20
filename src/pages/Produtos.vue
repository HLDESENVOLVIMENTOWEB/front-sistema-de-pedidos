<template>
  <v-container>
    <v-row align="center" justify="start" class="mb-4">
      <v-text-field
        v-model="search"
        label="Filtrar por nome"
        prepend-icon="mdi-magnify"
        clearable
        dense
        @keyup.enter="filtrarProdutos"
        class="mr-4"
      ></v-text-field>

      <v-btn color="primary" @click="filtrarProdutos" prepend-icon="mdi-magnify" class="mr-4">
        Buscar
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary" prepend-icon="mdi-plus" @click="dialog = true">
        Adicionar Produto
      </v-btn>
    </v-row>


    <v-dialog v-model="dialog" max-width="500">
      <ProdutoForm :produtoEdicao="produtoEditando" @save="handleSave" @close="dialog = false" />
    </v-dialog>

    <v-card>
      <v-table dense>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.id_produto">
            <td>{{ produto.nome }}</td>
            <td>{{ produto.preco }}</td>
            <td class="text-center">
              <v-btn icon="mdi-pencil" size="small" @click="editarProduto(produto)"></v-btn>
              <v-btn icon="mdi-delete" color="red" size="small" @click="removerProduto(produto.id_produto)"></v-btn>
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
import { useProdutoStore } from '../store/produtoStore';
import ProdutoForm from '../components/ProdutoForm.vue';

const store = useProdutoStore();
const dialog = ref(false);
const search = ref('');
const produtoEditando = ref(null);

const produtos = computed(() => store.produtos);
const totalPages = computed(() => store.totalPages);
const page = computed(() => store.page);

onMounted(() => {
  store.fetchProdutos();
});

const filtrarProdutos = () => {
  store.fetchProdutos(1, 10, search.value);
};

const abrirCadastro = () => {
  produtoEditando.value = null;
  dialog.value = true;
};

const handleSave = async (produto) => {
  if (produto.id_produto) {
    await store.updateProduto(produto.id_produto, produto);
  } else {
    await store.addProduto(produto);
  }
  filtrarProdutos();
  dialog.value = false;
};

const editarProduto = (produto) => {
  produtoEditando.value = { ...produto };
  dialog.value = true;
};

const removerProduto = async (id: number) => {
  await store.removeProduto(id);
  filtrarProdutos();
};

const setPage = (newPage: number) => {
  store.fetchProdutos(newPage, 10, search.value);
};
</script>
