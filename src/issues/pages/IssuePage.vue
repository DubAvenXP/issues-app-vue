<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';
import { useIssue } from '../composables/useIssue';

const route = useRoute();
const { id } = route.params;

const { issueQuery, issueCommentsQuery } = useIssue(+id);
</script>
<template>
    <q-page>
        <router-link class="text-white" to="/">Go Back</router-link>

        <LoaderSpinner
            v-if="issueQuery.isLoading.value"
            color="white"
            :thickness="1"
            size="1.5rem"
            :show-text="false"
        />
        <IssueCard
            v-else-if="issueQuery.data.value"
            :issue="issueQuery.data.value!"
        />
        <p v-else>Issue with ID {{ id }}not found</p>

        <!-- Comentarios -->
        <LoaderSpinner
            v-if="issueCommentsQuery.isLoading.value"
            :thickness="1"
            size="1.5rem"
            :show-text="false"
        />
        <div v-else-if="issueCommentsQuery.data.value?.length" class="column">
            <span>Comments {{ issueCommentsQuery.data.value.length }}</span>
            <IssueCard
                v-for="issue in issueCommentsQuery.data.value"
                :key="issue.id"
                :issue="issue"
            />
        </div>
        <p v-else>No comments found</p>
    </q-page>
</template>
<style scoped></style>
