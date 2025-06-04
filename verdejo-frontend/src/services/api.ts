// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ou IP se for externo
  withCredentials: true, // para sessões
});

export default api;
