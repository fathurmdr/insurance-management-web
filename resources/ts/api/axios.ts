import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.APP_URL || '',
});

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default api;
