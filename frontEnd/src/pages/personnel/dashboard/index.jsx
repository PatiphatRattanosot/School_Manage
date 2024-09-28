import React, { useState, useEffect } from "react";
import TablePersonnel from "../TablePersonnel.jsx";
import Resgister from "../../RegisterPage.jsx";

function Index() {
  const [selectedRole, setSelectedRole] = useState("");

  

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="items-center justify-center">
        <div className="text-4xl md:text-3xl md:leading-snug font-bold my-2 text-center">
          Welcome! Here are your personnel
        </div>
      </div>
      <div className="overflow-x-auto mr-4 space-x-4">
        <Resgister/>
        <div className="mb-4">
        <label htmlFor="role-select" className="block text-lg font-medium">
          Select Role:
        </label>
        <select
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
        >
          <option value="">All</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
        <TablePersonnel selectedRole={selectedRole} /> 
      </div>
    </div>
  );
}

export default Index;
