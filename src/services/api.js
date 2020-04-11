import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/1/',
});

export default api;
