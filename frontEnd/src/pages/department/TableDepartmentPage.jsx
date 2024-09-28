import { useEffect, useState } from "react";
import { useDepartmentContext } from "../../context/DepartmentContext"; 


function TableDepartmentPage() {
  const { departments, deleteDepartment } = useDepartmentContext(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = departments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    await deleteDepartment(id);
  };

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-h-screen flex flex-col">
        <div className="overflow-x-auto flex-grow">
          <table className="table w-full table-striped table-bordered">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentDepartments.length > 0 ? (
                currentDepartments.map((department) => (
                  <tr key={department.id}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      >
                        {department[col.key] || "N/A"}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={`/dashboard/department/edit/${department.id}`} className="btn btn-info">
                        Edit
                      </a>
                      <a
                        onClick={() => handleDelete(department.id)}
                        className="btn btn-error ml-4"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-4 text-center text-sm font-medium"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3"></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-secondary mr-2"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-secondary ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableDepartmentPage;
