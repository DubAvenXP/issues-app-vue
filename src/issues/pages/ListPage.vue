<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
</script>
<template>
    <q-page class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">Github Issues</span>
        </div>

        <div class="row">
            <div class="col-xs-12 col-md-4"></div>
            <div class="col-xs-12 col-md-8">
                <LoaderSpinner />
            </div>
        </div>
    </q-page>
</template>
<style scoped></style>
