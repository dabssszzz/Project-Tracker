import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    projectService,
    categoryService,
    mainTaskService,
    subtaskService,
    subtaskCategoryService,
    assigneeService,
    statusService,
    reportService
} from '../services/projectTrackerService';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            return await projectService.getAll();
        },
    });
};

export const useCategories = (projectId) => {
    return useQuery({
        queryKey: ['categories', projectId],
        queryFn: async () => {
            if (!projectId) return [];
            return await categoryService.getByProject(projectId);
        },
        enabled: !!projectId,
    });
};

export const useMainTasks = (categoryId) => {
    return useQuery({
        queryKey: ['mainTasks', categoryId],
        queryFn: async () => {
            if (!categoryId) return [];
            return await mainTaskService.getByCategory(categoryId);
        },
        enabled: !!categoryId,
    });
};

export const useSubtasks = (mainTaskId) => {
    return useQuery({
        queryKey: ['subtasks', mainTaskId],
        queryFn: async () => {
            if (!mainTaskId) return [];
            return await subtaskService.getByMainTask(mainTaskId);
        },
        enabled: !!mainTaskId,
    });
};

export const useSubtaskCategories = (subtaskId) => {
    return useQuery({
        queryKey: ['subtaskCategories', subtaskId],
        queryFn: async () => {
            if (!subtaskId) return [];
            return await subtaskCategoryService.getBySubtask(subtaskId);
        },
        enabled: !!subtaskId,
    });
};

export const useAssignees = () => {
    return useQuery({
        queryKey: ['assignees'],
        queryFn: async () => {
            return await assigneeService.getAll();
        },
    });
};

export const useStatuses = () => {
    return useQuery({
        queryKey: ['statuses'],
        queryFn: async () => {
            return await statusService.getAll();
        },
    });
};

export const useTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            // Now fetching from the Reports API which provides the flat structure needed for the tables
            return await reportService.getAll();
        },
    });
};


export const useTaskMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (data) => reportService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => reportService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => reportService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return { createMutation, updateMutation, deleteMutation };
};
