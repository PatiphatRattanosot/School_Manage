import api from "./api";

const API_URL = import.meta.env.VITE_API_NEWS_URL;

const getNews = () => {
    return api.get(API_URL)};

const getByType = (type) => (api.post(`${API_URL}/type`,type));

const getById = (id) => api.get(`${API_URL}/${id}`);

const addNews = (newNews) => api.post(`${API_URL}/`,newNews)

const updateNews = (id,newNews) => api.put(`${API_URL}/${id}`,newNews);

const deleteNews = (id) => api.delete(`${API_URL}/${id}`);

const NewsServices = {
    getNews,
    getByType,
    getById,
    addNews,
    updateNews,
    deleteNews,
}

export default NewsServices;