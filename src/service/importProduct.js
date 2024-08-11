import axios from './api'

export const ImportProduct = {
    async getProduct() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`/main/import-products/`);
            return response.data.results
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
    async deleteProduct(id) {
        try {
            const response = await axios.delete(`/main/import-products/${id}/`)
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknow error')
        }
    },
    async postProduct(item) {
        try {
            const { data } = await axios.post('/main/import-products/', item);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async getProductById(id) {
        try {
            const { data } = await axios.get(`/main/import-products/${id}/`);
            return data;
        } catch (error) {
            throw error;
        }
    },
    async putProductById(id, item) {
        try {
            const { data } = await axios.patch(`/main/import-products/${id}/`, item);
            console.log(item, id);
            
            return data;
        } catch (error) {
            throw error;
        }
    },
}





