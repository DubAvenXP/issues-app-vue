import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
    return data;
};

const useCounter = () => {
    const labelsQuery = useQuery(['labels'], getLabels, {
        staleTime: 1000 * 60 * 60,
    });
    return {
        labelsQuery,
    };
};

export default useCounter;
