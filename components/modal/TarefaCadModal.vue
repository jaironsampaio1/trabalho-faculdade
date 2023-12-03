<script setup lang="ts">
import "../../assets/css/components/modal.scss";

const emit = defineEmits(["refresh"]);

const isOpen = ref(false);

let form = {
  title: "",
  content: "",
  status: 1,
};

async function submit() {
  var { data } = await useFetch("/api/tasks/create", {
    method: "POST",
    body: JSON.stringify(form),
  });

  if (data.value?.statusCode == 200) {

    isOpen.value = false;
  }
  form = {
    title: "",
    content: "",
    status: 1,
  };
  emit("refresh");
}

</script>

<template>
  <div>
    <UButton class="btn btn-primary" @click="isOpen = true">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </UButton>

    <UModal :ui="{
      'background': 'bg-transparent',
      'border': '2px solid rgba(255,255,255, .2)'
    }" class="modalCad" v-model="isOpen">
      <div class="modalCad">
        <h2 class="mt-4">Nova Tarefa</h2>
        <form @submit.prevent="submit">
          <div class="modalBody">
            <input type="text" placeholder="Título" v-model="form.title" required class="input-text" />
            <textarea placeholder="Descrição" v-model="form.content" required class="input-area"></textarea>
            <select class="select-modal" required v-model="form.status">
              <option selected :value="1">Iniciado</option>
              <option :value="2">Em Andamento</option>
              <option :value="3">Concluído</option>
            </select>
          </div>
          <div class="modalFooter">
            <UButton class="btn btn-primary mb-4" type="submit">
              Criar
            </UButton>
          </div>
        </form>
      </div>
    </UModal>
  </div>
</template>