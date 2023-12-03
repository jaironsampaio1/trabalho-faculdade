<script setup lang="ts">
import TarefaUpdateModal from "../components/modal/TarefaUpdateModal.vue";
import TarefaCadModal from "../components/modal/TarefaCadModal.vue";
import CalendarioModal from "../components/modal/CalendarioModal.vue";

var { data, refresh } = await useFetch("/api/tasks/all", {
    method: "GET",
});

async function deletetask(id: number) {

    await useFetch(`/api/tasks/delete/${id}`)

    refresh();
}


</script>
<template>
    <NuxtLayout name="default">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <NuxtLink to="/" class="btn btn-primary">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                </NuxtLink>
                <h2 class="card-title">Tarefas</h2>
                <div>
                    <CalendarioModal :tasks="data" />
                    <TarefaCadModal @refresh="refresh" />
                </div>
            </div>
            <div class="card-body justify-content-between align-items-center">
                <div class="card tarefa-card" v-for="task in data">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h3 class="card-title ">{{ task.title }}</h3>
                        <div>
                            <TarefaUpdateModal :id="task.id" @refresh="refresh" />
                            <button class="btn btn-danger" @click="deletetask(task.id)">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </button>
                        </div>
                    </div>
                    <div class="card-body text-left m-3">
                        <p class="card-text">{{ task.content }}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <p class="card-text" v-if="task.status == 1">Status: Iniciado</p>
                        <p class="card-text" v-else-if="task.status == 2">Status: Em andamento</p>
                        <p class="card-text" v-else-if="task.status == 3">Status: Concluido</p>
                        <p class="card-text">Data: {{ new Date(task.createdAt).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
