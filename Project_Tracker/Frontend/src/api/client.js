import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:5211/api', // Matches backend port from launchSettings.json
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
