<script setup lang="ts">
interface Props {
    buttons: Button[];
}

interface Button {
    icon: string;
    color?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    action: () => void;
}

const props = defineProps<Props>();
</script>
<template>
    <div class="fab">
        <q-btn
            v-for="button in props.buttons"
            @click="button.action"
            :key="button.icon"
            :color="button.color"
            :icon="button.icon"
            round
            :size="button.size"
        />
    </div>
</template>

<style scoped>
.fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
}
</style>
