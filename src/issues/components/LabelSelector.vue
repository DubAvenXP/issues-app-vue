<script setup lang="ts">
import { ref } from 'vue';
const model = ref(null);
</script>
<template>
    <q-btn-toggle
        v-model="model"
        toggle-color="primary"
        push
        spread
        :options="[
            { label: 'All', value: 'all' },
            { label: 'Open', value: 'open' },
            { label: 'Close', value: 'closed' },
        ]"
    />
</template>

<style scoped></style>
