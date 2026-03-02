import api from './api';

export const projectService = {
    getAll: () => api.get('/projects'),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
};

export const categoryService = {
    getAll: () => api.get('/categories'),
    getByProject: (projectId) => api.get(`/categories/project/${projectId}`),
    create: (data) => api.post('/categories', data),
};

export const mainTaskService = {
    getAll: () => api.get('/maintasks'),
    getByCategory: (categoryId) => api.get(`/maintasks/category/${categoryId}`),
    create: (data) => api.post('/maintasks', data),
};

export const subtaskService = {
    getAll: () => api.get('/subtasks'),
    getByMainTask: (mainTaskId) => api.get(`/subtasks/maintask/${mainTaskId}`),
    create: (data) => api.post('/subtasks', data),
};

export const subtaskCategoryService = {
    getAll: () => api.get('/subtaskcategories'),
    getBySubtask: (subtaskId) => api.get(`/subtaskcategories/subtask/${subtaskId}`),
    create: (data) => api.post('/subtaskcategories', data),
};

export const assigneeService = {
    getAll: () => api.get('/assignees'),
};

export const statusService = {
    getAll: () => api.get('/statuses'),
};

export const reportService = {
    getAll: () => api.get('/reports'),
    create: (data) => api.post('/reports', data),
    update: (id, data) => api.put(`/reports/${id}`, data),
    delete: (id) => api.delete(`/reports/${id}`),
};
