import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { Issue } from 'src/issues/interfaces/issue';
import { githubApi } from 'src/api/githubApi';
import { computed } from 'vue';

const getIssue = async (issueNumber: number): Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    const params = new URLSearchParams();
    params.append('per_page', '10');

    const { data } = await githubApi.get<Issue[]>(
        `/issues/${issueNumber}/comments`,
        {
            params,
        }
    );
    return data;
};

interface Options {
    // autoload issues and comments
    autoload?: boolean;
}

export const useIssue = (issueNumber: number, options?: Options) => {
    const { autoload = true } = options || {};
    const queryClient = useQueryClient();

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssue(issueNumber),
        {
            staleTime: 1000 * 60,
            enabled: autoload,
        }
    );

    const issueCommentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueQuery.data.value?.number || 0),
        {
            staleTime: 1000 * 15,
            enabled: computed(() => !!issueQuery.data?.value) && autoload,
        }
    );

    const prefetchIssue = () => {
        queryClient.prefetchQuery(
            ['issue', issueNumber],
            () => getIssue(issueNumber),
            {
                staleTime: 1000 * 60,
            }
        );
        queryClient.prefetchQuery(
            ['issue', issueNumber, 'comments'],
            () => getIssueComments(issueQuery.data.value?.number || 0),
            {
                staleTime: 1000 * 15,
            }
        );
    };

    const setIssueCacheData = (issue: Issue) => {
        queryClient.setQueryData(['issue', issueNumber], issue);
    };

    return {
        issueQuery,
        issueCommentsQuery,
        prefetchIssue,
        setIssueCacheData,
    };
};
