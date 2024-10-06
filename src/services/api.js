// services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default API;
