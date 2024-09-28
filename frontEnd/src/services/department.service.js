import api from "./api";

const API_URL = import.meta.env.VITE_API_DEPARTMENT_URL;

const getAllDPM = () => api.get(`${API_URL}/`);

const getDPM_ById = (id) => api.get(`${API_URL}/${id}`);

const addDepartment = (newDepartment) => api.post(`${API_URL}/`,newDepartment);

const updateDPM = (id,newDepartment) => api.put(`${API_URL}/${id}`,newDepartment)

const deleteDPM = (id) => api.delete(`${API_URL}/${id}`);

const DepartmentServices = {
    getAllDPM,
    getDPM_ById,
    addDepartment,
    updateDPM,
    deleteDPM,
}

export default DepartmentServices;