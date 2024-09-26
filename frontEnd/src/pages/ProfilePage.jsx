import React from 'react';
import { FaFacebook, FaDiscord, FaGithub, FaCog } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';

function UserProfile() {
  const { user } = useAuthContext();

  return (
    <div className="p-5 border rounded-lg text-center text-gray-500 max-w-sm mx-auto bg-white shadow-lg relative">
      <a href='/profile/edit' className="absolute top-4 right-4" size="sm" variant="ghost">
        <FaCog className="text-xl hover:text-blue-500" />
      </a>
      <img className="w-40 h-40 rounded-full mx-auto" src={user.ImageUrl} alt="Profile" />

      <div className="">
        <div className="flex flex-col text-left space-y-4">
          <div className="text-lg font-bold" id="username">
            Username: <span className="font-medium">{user.username}</span>
          </div>
          <div className="text-lg font-bold" id="id">
            ID: <span className="font-medium">{user.id}</span>
          </div>
          <div className="text-lg font-bold flex space-x-2" id="roles">
            Roles: <span className="font-medium inline-flex">
              {user.roles.map((role, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 text-lg font-semibold me-2 px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 hidden sm:flex"
                >
                  {role}
                </div>
              ))}
            </span>
          </div>
          <div className="text-lg font-bold" id="email">
            Email: <span className="font-medium">{user.email}</span>
          </div>
          <div className="text-lg font-bold" id="accessToken">
            AccessToken: <span className="font-medium">{`${user.accessToken.slice(0, 4)}****${user.accessToken.slice(-4)}`}</span>
          </div>
        </div>

        <div className="flex mt-4 justify-end space-x-3">
          <a href="#" className="w-6">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="#" className="w-6">
            <FaDiscord className="text-2xl" />
          </a>
          <a href="#" className="w-6">
            <FaGithub className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
