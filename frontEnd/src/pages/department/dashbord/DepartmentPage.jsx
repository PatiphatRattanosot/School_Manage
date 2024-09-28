import React from "react";
import AddDepartment from "../AddDepartmentPage"; 
import Table from "../TableDepartmentPage"; 

function DepartmentIndex() {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="items-center justify-center">
        <div className="text-4xl md:text-3xl md:leading-snug font-bold my-2 text-center">
          Welcome! Here are your departments
        </div>
      </div>

      <div className="overflow-x-auto mr-4 space-x-4">
        <AddDepartment />
        <Table />
      </div>

    </div>
  );
}

export default DepartmentIndex;
