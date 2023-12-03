<script setup>
import 'v-calendar/style.css';
import { Calendar } from 'v-calendar';

const isOpen = ref(false);

var { data } = await useFetch("/api/tasks/all", {
    method: "GET",
});

const attrs = ref([
    ...data.value.map((task) => {
        return {
            key: task.id,
            highlight: 'blue',
            popover: {
                label: task.title,
            },
            dates: new Date(task.createdAt),
        };
    }),
]);

</script>
<template>
    <UButton class="btn btn-primary" @click="isOpen = true">
        <font-awesome-icon :icon="['fas', 'calendar-days']" />
    </UButton>
    <UModal :ui="{
        'background': 'bg-transparent',
        'border': '2px solid rgba(255,255,255, .2)'
    }" class="modalCad" v-model="isOpen">
        <div class="modalCad m-10">

            <Calendar :attributes="attrs" />

        </div>
    </UModal>
</template>