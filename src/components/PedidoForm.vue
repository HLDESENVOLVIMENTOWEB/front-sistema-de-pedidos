<template>
  <v-card class="pa-4">
    <v-card-title class="text-h6">
      {{ isEditing ? 'Editar Pedido' : 'Adicionar Pedido' }}
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-container>
          <!-- Seleção do Cliente -->
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="pedido.id_cliente"
                :items="clientes"
                item-title="nome"
                item-value="id_cliente"
                label="Selecione um Cliente"
                prepend-icon="mdi-account"
                variant="outlined"
                density="compact"
                clearable
                autocomplete
                persistent-hint
                hide-details
                return-object
                filterable
                :menu-props="{ closeOnContentClick: false }"
                :search="searchCliente"
              >
                <template v-slot:append-item>
                  <v-text-field
                    v-model="searchCliente"
                    placeholder="Pesquisar cliente..."
                    clearable
                    dense
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    autofocus
                  />
                </template>
              </v-select>

            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <!-- Lista de Itens do Pedido -->
          <v-row v-for="(item, index) in pedido.itens" :key="index" class="align-center">
            <v-col cols="7">
              <v-select
              v-model="item.id_produto"
              :items="produtos"
              item-title="nome"
              item-value="id_produto"
              label="Selecione um Produto"
              prepend-icon="mdi-package-variant"
              variant="outlined"
              density="compact"
              clearable
              autocomplete
              persistent-hint
              hide-details
              return-object
              filterable
              :menu-props="{ closeOnContentClick: false }"
              :search="searchProduto"
            >
              <template v-slot:append-item>
                <v-text-field
                  v-model="searchProduto"
                  placeholder="Pesquisar produto..."
                  clearable
                  dense
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  autofocus
                />
              </template>
            </v-select>

            </v-col>

            <v-col cols="5">
              <v-text-field
                v-model.number="item.qtde"
                label="Quantidade"
                type="number"
                prepend-icon="mdi-plus-box"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model.number="item.preco"
                label="Preço"
                type="number"
                prepend-icon="mdi-cash"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>


          </v-row>

          <v-btn color="blue" class="mt-4" variant="tonal" @click="adicionarItem">
            <v-icon start>mdi-plus</v-icon> Adicionar Item
          </v-btn>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn color="red" variant="tonal" @click="$emit('close')">
        <v-icon left>mdi-close</v-icon> Cancelar
      </v-btn>

      <v-btn color="green" variant="flat" @click="handleSubmit">
        <v-icon left>mdi-check</v-icon> {{ isEditing ? 'Atualizar' : 'Salvar' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch, onMounted, computed } from 'vue';
import { useClienteStore } from '../store/clienteStore';
import { useProdutoStore } from '../store/produtoStore';

const emit = defineEmits(['save', 'close']);
const clienteStore = useClienteStore();
const produtoStore = useProdutoStore();
const clientes = ref([]);
const produtos = ref([]);
const searchCliente = ref('');
const searchProduto = ref('');


onMounted(async () => {
  await clienteStore.fetchClientes();
  await produtoStore.fetchProdutos();
  clientes.value = clienteStore.clientes;
  produtos.value = produtoStore.produtos;
});

const props = defineProps({
  pedidoEdicao: {
    type: Object as () => { id_pedido?: number; id_cliente: number; itens: { id_produto: number; qtde: number; preco: number }[] },
    default: () => ({ id_cliente: null, itens: [] }),
  },
});

const pedido = ref({
  id_pedido: null,
  id_cliente: null,
  itens: [],
});

const isEditing = computed(() => !!pedido.value.id_pedido);

watch(
  () => props.pedidoEdicao,
  (newVal) => {
    pedido.value = {
      id_pedido: newVal?.id_pedido ?? null,
      id_cliente: newVal?.id_cliente ?? null,
      itens: newVal?.itens?.map(item => ({ ...item })) ?? [],
    };
  },
  { deep: true, immediate: true }
);

const adicionarItem = () => {
  pedido.value.itens.push({ id_produto: null, qtde: 1, preco: 0 });
};

const removerItem = (index: number) => {
  pedido.value.itens.splice(index, 1);
};

const handleSubmit = () => {
  emit('save', pedido.value);
  emit('close');
};
</script>
