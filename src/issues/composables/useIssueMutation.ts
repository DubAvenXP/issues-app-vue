import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from 'src/api/githubApi';

interface Args {
    title: string;
    body?: string;
    labels?: string[];
}

const addIssue = async ({
    title,
    body = '',
    labels = [],
}: Args): Promise<Issue> => {
    const newIssueData = { title, body, labels };
    const { data } = await githubApi.post<Issue>('/issues', newIssueData);
    return data;
};

export const useIssueMutation = () => {
    const queryClient = useQueryClient();

    const issueMutation = useMutation(addIssue, {
        onSuccess: (issue) => {
            queryClient.invalidateQueries({
                queryKey: ['issues'],
                exact: false,
            });

            queryClient.refetchQueries({
                queryKey: ['issue', issue.number],
                exact: true,
            });

            queryClient.setQueryData(['issue', issue.number], issue);
        },
        onSettled: () => {
            //
        },
    });

    return {
        issueMutation,
    };
};
