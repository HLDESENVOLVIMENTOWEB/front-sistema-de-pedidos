<template>
  <v-card class="pa-4">
    <v-card-title class="text-h6">
      {{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="produto.nome"
                label="Nome do Produto"
                prepend-icon="mdi-package-variant"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="produto.preco"
                label="Preço"
                type="number"
                prepend-icon="mdi-cash"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
          </v-row>
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
import { ref, defineEmits, defineProps, watch, computed } from 'vue';

const emit = defineEmits(['save', 'close']);

const props = defineProps({
  produtoEdicao: {
    type: Object as () => { id_produto?: number; nome: string; preco: number },
    default: () => ({ nome: '', preco: 0 }),
  },
});

const produto = ref({ id_produto: null, nome: '', preco: 0 });

const isEditing = computed(() => !!produto.value.id_produto);

watch(
  () => props.produtoEdicao,
  (newVal) => {
    if (newVal) {
      produto.value = {
        id_produto: newVal.id_produto ?? null,
        nome: newVal.nome ?? '',
        preco: newVal.preco ?? 0
      };
    } else {
      produto.value = { id_produto: null, nome: '', preco: 0 };
    }
  },
  { deep: true, immediate: true }
);


const handleSubmit = () => {
  emit('save', produto.value);
  emit('close');
};
</script>
