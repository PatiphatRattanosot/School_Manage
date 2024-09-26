import React from 'react'
import { useAuthContext } from '../context/AuthContext'
function Profile() {
    const {user,logout} = useAuthContext()
    
    const handleLogout = () =>{
        logout()
    }
    
    return (
        <div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt={user.firstname}
                                src={user.ImageUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a href='/profile' className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile
