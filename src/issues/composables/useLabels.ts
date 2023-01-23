import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { githubApi } from 'src/api/githubApi';
import { Label } from '../interfaces/label';
import { useIssuesStore } from 'src/stores/issues';

const getLabels = async (): Promise<Label[]> => {
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100', {
        headers: {
            Authorization: null,
        },
    });
    return data;
};

export const useLabels = () => {
    const issuesStore = useIssuesStore();
    const { labels } = storeToRefs(issuesStore);

    const labelsQuery = useQuery(['labels'], getLabels, {
        staleTime: 1000 * 60 * 60,
    });

    return {
        labelsQuery,
        selectedLabels: labels,
        toggleLabel: issuesStore.toggleLabel,
    };
};
