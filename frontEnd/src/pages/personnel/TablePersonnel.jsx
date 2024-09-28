import { useEffect, useState } from "react";
import { usePersonnelContext } from "../../context/PersonnelContext";
import { useAuthContext } from "../../context/AuthContext";
import { useDepartmentContext } from "../../context/DepartmentContext";

function TablePersonnelPage({ selectedRole }) {
  const { fetchByRole, deletePerson,personnel } = usePersonnelContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedPersonnel, setFetchedPersonnel] = useState([]);
  const [swap,setSwap] = useState(false)
  const { user } = useAuthContext();
  const { departments } = useDepartmentContext();

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPersonnel = fetchedPersonnel.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(fetchedPersonnel.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  

  const fetchPersonnelByRole = async (role) => {
    try {
      const response = await fetchByRole(role);
      setFetchedPersonnel(response);
    } catch (error) {
      console.error("Error fetching personnel:", error);
    }
  };
  const handleDelete = async (id) => {
    await deletePerson(id);
  };

  useEffect(() => {
    fetchPersonnelByRole(selectedRole);
  }, [selectedRole,swap]);

  const columns = [
    { label: "ID", key: "Id" },
    { label: "Image URL", key: "ImageUrl" },
    { label: "Prefix", key: "prefix" },
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Roles", key: "roles" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Department Name", key: "department" },
    
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
              {currentPersonnel.length > 0 ? (
                currentPersonnel.map((person) => {
                  const department = departments.find(dep => dep.id === person.departmentId);
                  const departmentName = department ? department.name : "N/A";
                  return (
                    <tr key={person.Id}>
                      {columns.map((col) => (
                        <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {col.key === "ImageUrl" ? (
                            <img src={person.ImageUrl} alt={person.firstname} className="w-16 h-16 rounded-full" />
                          ) : (
                            col.key === "department" ? departmentName :
                            col.key === "roles" ? person.roles[0].name :
                                person[col.key] || "N/A"
                          )}
                        </td>
                      ))}
                      {user.roles.includes("ROLE_ADMIN") && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href={`/dashboard/personnel/edit/${person.Id}`} className="btn btn-info">
                            Edit
                          </a>
                          <a onClick={() => handleDelete(person.Id)} className="btn btn-error ml-4">
                            Delete
                          </a>
                        </td>
                      )}
                    </tr>
                  );
                })
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

export default TablePersonnelPage;
