import api from "./api";

const API_URL = import.meta.env.VITE_API_PERSON_URL;

const getById = (id) => api.get(`${API_URL}/${id}`);

const getAllPerson = () => api.get(`${API_URL}/`);

// const getPerson_ByDepartment = (role,department) => (api.post(`${API_URL}/department`,role,department));

const getPerson_ByRole = (role) => {
    const dataRole = { roles: role || ["teacher", "student"] };

    return api.post(`${API_URL}/role`, dataRole);
};


const addPerson = (newPerson) => api.post(`${API_URL}/`, newPerson);


const updatePerson = (id, newPerson) => api.put(`${API_URL}/${id}`, newPerson);

const deletePerson = (id) => {
    console.log(`${API_URL}/${id}`);

    return api.delete(`${API_URL}/${id}`);
};

const PersonServices = {
    getAllPerson,
    // getPerson_ByDepartment,
    getPerson_ByRole,
    addPerson,
    updatePerson,
    deletePerson,
    getById
}

export default PersonServices;