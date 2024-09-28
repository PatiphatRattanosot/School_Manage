import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: ''
    });
    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const register = await AuthService.register(
                user.email,
                user.firstname,
                user.lastname,
                user.password
            );
            console.log(register);
            
            if (register.status === 200) {
                navigate("/signin")
            }
        } catch (error) {

        }
    };

    const handleCancel = () => {
        setUser({ email: '', firstname: '', lastname: '', password: '' });

    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-lg w-full p-6 bg-gray-800 rounded-lg shadow-md">
                <h1 className="mb-8 text-2xl font-semibold text-center text-white">
                    <span className="text-cyan-300">Register</span> Page
                </h1>
                <label >
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-white">
                            Email
                            <input
                                type="email"
                                className="block w-full mt-1 input input-bordered input-primary text-black"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                                required
                                aria-label="Email"
                            />
                        </label>
                        <label className="block text-sm font-medium text-white">
                            Firstname
                            <input
                                type="text"
                                className="block w-full mt-1 input input-bordered input-primary text-black"
                                placeholder="Firstname"
                                name="firstname"
                                onChange={handleChange}
                                value={user.firstname}
                                required
                                aria-label="Firstname"
                            />
                        </label>
                        <label className="block text-sm font-medium text-white">
                            Lastname
                            <input
                                type="text"
                                className="block w-full mt-1 input input-bordered input-primary text-black"
                                placeholder="Lastname"
                                name="lastname"
                                onChange={handleChange}
                                value={user.lastname}
                                required
                                aria-label="Lastname"
                            />
                        </label>
                        <label className="block text-sm font-medium text-white">
                            Password
                            <input
                                type="password"
                                className="block w-full mt-1 input input-bordered input-primary text-black"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                                required
                                aria-label="Password"
                            />
                        </label>
                    </div>
                    <div className="my-8 space-y-4">
                        <button
                            type="submit"
                            className="w-full btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            className="w-full btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default RegisterPage;
