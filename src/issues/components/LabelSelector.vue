<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from '../composables/useLabels';

const { labelsQuery, selectedLabels, toggleLabel } = useLabels();
</script>
<template>
    <LoaderSpinner
        v-if="labelsQuery.isLoading.value"
        size="50px"
        :thickness="1"
        :show-text="false"
    />
    <template v-else>
        <q-chip
            v-for="label of labelsQuery.data.value"
            :key="label.id"
            :outline="!selectedLabels.includes(label.name)"
            :style="{
                color: `#${label.color}`,
            }"
            clickable
            @click="toggleLabel(label.name)"
        >
            {{ label.name }}
        </q-chip>
    </template>
</template>

<style scoped></style>
