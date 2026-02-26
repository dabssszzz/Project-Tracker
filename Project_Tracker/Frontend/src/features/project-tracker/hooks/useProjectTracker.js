import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, categoryService, mainTaskService, taskService } from '../services/projectTrackerService';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => projectService.getAll(),
    });
};

export const useCategories = (projectId) => {
    return useQuery({
        queryKey: ['categories', projectId],
        queryFn: () => projectId ? categoryService.getByProject(projectId) : categoryService.getAll(),
        enabled: !!projectId || projectId === undefined,
    });
};

export const useMainTasks = () => {
    return useQuery({
        queryKey: ['mainTasks'],
        queryFn: () => mainTaskService.getAll(),
    });
};

export const useTasks = (filters = {}) => {
    return useQuery({
        queryKey: ['tasks', filters],
        queryFn: () => Object.keys(filters).length > 0 ? taskService.getFiltered(filters) : taskService.getAll(),
    });
};

export const useTaskMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (data) => taskService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => taskService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => taskService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return { createMutation, updateMutation, deleteMutation };
};
