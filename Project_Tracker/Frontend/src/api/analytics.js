import client from './client';

export const analyticsApi = {
    getDashboard: async () => {
        const response = await client.get('/analytics');
        return response.data.data;
    },
};
