import { useQuery } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces/issue';

const getIssues = async (): Promise<Issue[]> => {
    const params = new URLSearchParams();
    params.append('per_page', '10');

    const { data } = await githubApi.get<Issue[]>('/issues', {
        params,
    });
    return data;
};

export const useIssues = () => {
    const issuesQuery = useQuery(['issues'], getIssues);
    return {
        issuesQuery,
    };
};
