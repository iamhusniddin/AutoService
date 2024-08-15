import axios from './api'

export const Order = {
    async getProduct() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`stats/orders/`);
            return response.data.results
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    async deleteProduct(id) {
        try {
            const response = await axios.delete(`stats/orders/${id}/`)
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknow error')
        }
    },
    async postProduct(item) {
        try {
            const { data } = await axios.post('stats/orders/', item);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async getProductById(id) {
        try {
            const { data } = await axios.get(`stats/orders/${id}/`);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async putProductById(id, item) {
        try {
            const { data } = await axios.patch(`stats/orders/${id}/`, item);
            return data;
        } catch (error) {
            throw error;
        }
    },
}
