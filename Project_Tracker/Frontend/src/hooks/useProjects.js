import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../api/projects';

export function useProjects() {
    return useQuery({
        queryKey: ['projects'],
        queryFn: projectsApi.getAll,
    });
}

export function useProject(id) {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => projectsApi.getById(id),
        enabled: !!id,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: projectsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
}
