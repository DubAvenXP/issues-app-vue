<script setup lang="ts">
import { ref } from 'vue';

import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/FilterSelector.vue';
import FloatingButtons from 'src/issues/components/FloatingButtons.vue';
import NewIssueDialog from 'src/issues/components/NewIssueDialog.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';

import { useIssues, useLabels } from '../composables';

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();
const isOpen = ref<boolean>(false);

const openDialog = () => {
    isOpen.value = true;
};
</script>
<template>
    <q-page class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">Github Issues</span>
            <div class="row">
                <div class="col-xs-12 col-md-4">
                    <FilterSelector />
                </div>
                <div class="col-xs-12 col-md-8">
                    <LoaderSpinner v-if="issuesQuery.isLoading.value" />
                    <IssueList v-else :issues="issuesQuery.data?.value || []" />
                </div>
            </div>
        </div>

        <FloatingButtons
            :buttons="[
                {
                    icon: 'add',
                    color: 'primary',
                    size: 'lg',
                    action: openDialog,
                },
            ]"
        />
        <NewIssueDialog
            v-if="labelsQuery.data"
            :is-open="isOpen"
            :labels="labelsQuery.data.value?.map((label) => label.name) || []"
            @on-close="isOpen = false"
        />
    </q-page>
</template>
<style scoped></style>
