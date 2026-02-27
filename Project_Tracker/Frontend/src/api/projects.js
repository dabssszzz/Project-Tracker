import client from './client';

export const projectsApi = {
    getAll: async () => {
        const response = await client.get('/projects');
        return response.data.data;
    },
    getById: async (id) => {
        const response = await client.get(`/projects/${id}`);
        return response.data.data;
    },
    create: async (project) => {
        const response = await client.post('/projects', project);
        return response.data.data;
    },
    update: async (id, project) => {
        const response = await client.put(`/projects/${id}`, project);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await client.delete(`/projects/${id}`);
        return response.data.data;
    },
};
