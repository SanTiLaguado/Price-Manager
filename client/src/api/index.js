import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getProducts = async () => {
  try {
    const response = await api.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProviders = async () => {
  try {
    const response = await api.get('/api/providers');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProvider = async (id, nombre, formula_id) => {
  try {
    const response = await api.post('/api/createProvider', { id, nombre, formula_id });
    return response.data;
  } catch (error) {
    console.error('Error creating provider:', error);
    throw error;
  }
};

export const uploadProducts = async (provider_id, csvData) => {
  try {
    const response = await api.post('/api/upload', { provider_id, csvData });
    return response.data;
  } catch (error) {
    console.error('Error uploading products:', error);
    throw error;
  }
};


export default api;
