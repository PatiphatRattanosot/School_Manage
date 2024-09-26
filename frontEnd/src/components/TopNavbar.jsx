import React from 'react'
import { useAuthContext } from '../context/AuthContext'
function TopNavbar() {
    const { user, logout } = useAuthContext()

    const handleLogout = () => {
        logout()
    }
    return (
        <div className="bg-red-500">
            <div className="flex items-center justify-between max-h-10 p-2">
                <div className="flex items-center">
                    {user && (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER")) ? (
                        <div className="text-white">ระบบจัดการบุคลากร</div>
                    ) : (

                        <div className="flex space-x-2">
                            <a href="#" className="text-white">
                                {/* ใส่ไอคอน Facebook ที่นี่ */}
                                FB
                            </a>
                            <a href="#" className="text-white">
                                {/* ใส่ไอคอน Github ที่นี่ */}
                                GitHub
                            </a>
                            {/* ใส่ไอคอน Line ที่นี่ */}
                            <a href="#" className="text-white">
                                Line
                            </a>
                        </div>
                    )}
                </div>
                <div>
                    <ul className="menu menu-horizontal">
                        {user ? (
                            <div className="flex items-center">
                            <span className="mr-2">Welcome, <strong>{user.firstname}</strong></span>
                            <ul className="flex space-x-2">
                                {user.roles.map((role) => (
                                    <li key={role} className="badge badge-outline">{role}</li>
                                ))}
                            </ul>
                        </div>
                        
                        ) : (

                            <li><a href="/signin" className="text-white">ส่วนเจ้าหน้าที่</a></li>
                        )}




                    </ul>
                </div>
            </div>
        </div>

    )
}

export default TopNavbar
