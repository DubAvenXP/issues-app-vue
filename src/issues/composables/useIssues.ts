import { useQuery } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces/issue';
import { useStore } from './useStore';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
    const params = new URLSearchParams();

    if (state) params.append('state', state);

    if (labels.length) {
        const labelsString = labels.join(',');
        params.append('labels', labelsString);
    }

    params.append('per_page', '10');

    const { data } = await githubApi.get<Issue[]>('/issues', {
        params,
    });
    return data;
};

export const useIssues = () => {
    const { labels, state } = useStore();

    const issuesQuery = useQuery(
        ['issues', { labels, state }],
        () => getIssues(labels.value, state.value),
        {
            // staleTime: 1000 * 60,
        }
    );
    return {
        issuesQuery,
    };
};
