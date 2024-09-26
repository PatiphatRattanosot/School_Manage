import api from "./api"

const API_URL = import.meta.env.VITE_API_AUTH_URL;

const register = async (email, firstname, lastname, password) => {
    return api.post(`${API_URL}/signup`, { email, firstname, lastname, password })
}

const login = async (email, password) => {

    const response = await api.post(`${API_URL}/signin`, { email, password });
    console.log("AuthService", response);

    if (response.data.accessToken) {
        localStorage.setItem(
            "x-access-token",
            JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
}

const logout = async () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user");
}

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;