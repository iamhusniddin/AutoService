import axios from './api'

export const  Provider = {
    async getProvider() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`main/providers/`);
            return response.data.results
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    async deleteProvider(id) {
        try {
            const response = await axios.delete(`main/providers/${id}/`)
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknow error')
        }
    },
    async postProvider(item) {
        try {
            const { data } = await axios.post('main/providers/', item);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async getProviderById(id) {
        try {
            const { data } = await axios.get(`main/providers/${id}/`);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async putProviderById(id, item) {
        try {
            const { data } = await axios.patch(`main/providers/${id}/`, item);
            return data;
        } catch (error) {
            throw error;
        }
    },
}
