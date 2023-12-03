<script setup lang="ts">
import "../../assets/css/components/modal.scss";

const emit = defineEmits(["refresh"]);

const props = defineProps({
  id: Number,
})

const isOpen = ref(false);

let form = {
  id: props.id,
  title: "",
  content: "",
  status: 1,
};

async function submit() {
  var { data } = await useFetch("/api/tasks/update", {
    method: "PUT",
    body: JSON.stringify(form),
  });

  if (data.value?.statusCode == 200) {

    isOpen.value = false;
  }

  emit("refresh")
}

async function open() {

  const { data } = await useFetch(`/api/tasks/${props.id}`, {
    method: "GET",
  });

  form.title = data.value!.title;
  form.content = data.value!.content;
  form.status = data.value!.status;

  isOpen.value = true;
}

</script>

<template>
    <div>
      <UButton class="btn btn-primary" @click="open">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
      </UButton>
      
      <UModal :ui="{
        'background': 'bg-transparent',
        'border': '2px solid rgba(255,255,255, .2)'
        }" class="modalCad" v-model="isOpen">
        <div class="modalCad">
          <h2 class="mt-4">Atualizar</h2>
            <form @submit.prevent="submit">
              <div class="modalBody">
                <input type="text" placeholder="Título" v-model="form.title" required class="input-text"/>
                <textarea placeholder="Descrição" v-model="form.content" required class="input-area"></textarea>
                <select class="select-modal" required v-model="form.status">
                  <option selected :value="1">Iniciado</option>
                  <option :value="2">Em Andamento</option>
                  <option :value="3">Concluído</option>
                </select>
              </div>
              <div class="modalFooter">
                <UButton class="btn btn-primary mb-4" type="submit">
                  Atualizar
                </UButton>
              </div>
          </form>
        </div>
      </UModal>
    </div>
  </template>