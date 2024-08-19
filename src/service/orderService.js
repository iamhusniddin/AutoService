import axios from './api'

export const OrderService = {
    async getProduct() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`stats/order-services/`);
            return response.data.results
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    async deleteProduct(id) {
        try {
            const response = await axios.delete(`stats/order-services/${id}/`)
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknow error')
        }
    },
    async postProduct(item) {
        try {
            const { data } = await axios.post('stats/order-services/', item);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async getProductById(id) {
        try {
            const { data } = await axios.get(`stats/order-services/${id}/`);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async putProductById(id, item) {
        try {
            const { data } = await axios.patch(`stats/order-services/${id}/`, item);
            return data;
        } catch (error) {
            throw error;
        }
    },
}
