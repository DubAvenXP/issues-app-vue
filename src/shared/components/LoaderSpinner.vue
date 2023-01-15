<script setup lang="ts">
interface Props {
    color?: string;
    size?: string;
    thickness?: number;
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
    size: '3.5rem',
    thickness: 5,
});
</script>

<template>
    <div>
        <div class="column items-center">
            <q-spinner-gears
                :color="props.color"
                :size="props.size"
                :thickness="props.thickness"
            />
            <span class="q-mt-sm">Loading</span>
        </div>
    </div>
</template>
