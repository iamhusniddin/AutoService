import axios from './api'


export const TopCalculate = {
    async getCalculate() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`statistics/calculate/`);
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
}



export const TopMonthlyTotal = {
    async getMonthly() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`statistics/monthly-total/`);
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
}

export const TopCustomer = {
    async getTopCustomer() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`statistics/top-customers/`);
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
}

export const TopProduct = {
    async getTopProduct() {
        try {
            // Parametrlarni URL-encode qilib, so'rov yuborish
            const response = await axios.get(`statistics/top-sale-products/`);
            return response.data
        } catch (error) {
            throw error.response || new Error('Unknown error');
        }
    },
}