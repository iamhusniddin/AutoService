import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from './tokenService';  // Toksin xizmatini import qiling

// Axios instansiyasini yaratish
const api = axios.create({
  baseURL: 'https://autoservicefassco.pythonanywhere.com', // O'zingizning backend URL manzilingiz bilan almashtiring
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - har bir so'rovda tokenni qo'shish
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - token muddati tugaganini qayta yangilash va xatolarni boshqarish
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 (Unauthorized) xato qaytsa, tokenni yangilashga harakat qilish
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      try {
        const response = await api.post('/refresh-token', { token: refreshToken });
        const { accessToken } = response.data;
        setTokens(accessToken, refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        removeTokens();
        window.location.href = '/sign-in'; // Foydalanuvchini login sahifasiga yo'naltirish
      }
    }

    return Promise.reject(error);
  }
);

export default api;
