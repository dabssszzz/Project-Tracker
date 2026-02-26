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
    create: (data) => api.post('/maintasks', data),
};

export const taskService = {
    getAll: () => api.get('/projecttasks'),
    getFiltered: (params) => api.get('/projecttasks/filter', { params }),
    getById: (id) => api.get(`/projecttasks/${id}`),
    create: (data) => api.post('/projecttasks', data),
    update: (id, data) => api.put(`/projecttasks/${id}`, data),
    delete: (id) => api.delete(`/projecttasks/${id}`),
};
