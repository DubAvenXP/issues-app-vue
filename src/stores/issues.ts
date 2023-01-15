import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
    const state = ref('');
    const labels = ref<string[]>([]);

    return {
        state,
        labels,

        toggleLabel: () => {
            // ...
        },
    };
});
