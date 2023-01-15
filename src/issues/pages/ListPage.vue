<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
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
                    <LoaderSpinner />
                    <IssueList />
                </div>
            </div>
        </div>
    </q-page>
</template>
<style scoped></style>
