import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()
    const { user: IoggedUser, login } = useAuthContext()

    useEffect(() => {
        if (IoggedUser) {
            navigate('/');
        }
    }, [IoggedUser])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prey) => ({ ...prey, [name]: value }));
    };


    const handleSubmit = async () => {
        try {
            const currentUser = await AuthService.login(user.email, user.password);
            console.log(currentUser.data);

            login(currentUser.data);
            if (currentUser.status === 200) {
                alert("200")
            }
            setUser({
                username: "",
                password: "",
            });
            login(currentUser);
            navigate("/");
        } catch (error) {
            // alert("Err")
            console.log("err login");

        }
    };

    const handleCancel = () => {
        setUser({ username: '', email: '', password: '' });
    };
    return (
        <div>
            <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md ">
                <div className="my-12">
                    <h1 className="mb-8 text-2xl font-semibold text-center text-white">
                        <span className="text-cyan-300">Login</span> Page
                    </h1>
                    <label>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-5 w-5 text-gray-400"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-5 w-5 text-gray-400"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        type="password"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </label>

                        </div>
                        <div className="space-y-4">
                            <button
                                type="submit"
                                className="w-full btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className="w-full btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        <a href='/signup' className="block text-left underline underline-offset-1 text-cyan-300">
                            Register Now
                        </a>

                    </label>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
