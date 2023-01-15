<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';
const route = useRoute();
const { id } = route.params;
</script>
<template>
    <q-page>
        <LoaderSpinner />
        <router-link class="text-white" to="/">Go Back</router-link>
        <IssueCard />

        <!-- Comentarios -->
        <LoaderSpinner :thickness="1" :show-text="false" />
        <div class="column">
            <span>Comments (5)</span>
            <IssueCard v-for="comment in 5" :key="comment" />
        </div>
    </q-page>
</template>
<style scoped></style>
