<template>
  <v-card class="pa-4">
    <v-card-title class="text-h6">
      {{ isEditando ? 'Editar Cliente' : 'Adicionar Cliente' }}
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Nome"
              v-model="form.nome"
              prepend-icon="mdi-account"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Email"
              v-model="form.email"
              prepend-icon="mdi-email"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn color="red" variant="tonal" @click="$emit('close')">
        <v-icon left>mdi-close</v-icon> Cancelar
      </v-btn>

      <v-btn color="green" variant="flat" @click="salvar">
        <v-icon left>mdi-check</v-icon> {{ isEditando ? 'Atualizar' : 'Salvar' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps({
  cliente: Object, // Cliente para edição (opcional)
});

const emit = defineEmits(['save', 'close']);

const form = ref({ id_cliente: null, nome: '', email: '' });

const isEditando = computed(() => !!form.value.id_cliente);

watch(
  () => props.cliente,
  (novoCliente) => {
    if (novoCliente) {
      form.value = {
        id_cliente: novoCliente.id_cliente ?? null,
        nome: novoCliente.nome ?? '',
        email: novoCliente.email ?? ''
      };
    } else {
      form.value = { id_cliente: null, nome: '', email: '' }; // Reseta ao adicionar novo cliente
    }
  },
  { immediate: true }
);

const salvar = () => {
  if (!form.value.nome || !form.value.email) return;
  emit('save', form.value);
};
</script>
