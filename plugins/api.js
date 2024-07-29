import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://43582820cabae20b.mokky.dev', // базовый URL вашего API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            api: apiClient,
        },
    };
});