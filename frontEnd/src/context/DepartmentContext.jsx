import { useContext, useState, useEffect, createContext } from "react";
import DepartmentServices from "../services/department.service";
import Swal from "sweetalert2";

export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
    const [departments, setDepartments] = useState([]);
    const [swap, setSwap] = useState(false);

    const fetchDepatments = async () => {
        try {
            const response = await DepartmentServices.getAllDPM();
            setDepartments(response.data);
        } catch (error) {
            console.log("Fetch Departments Failed");

        }
    }

    useEffect(() => {
        fetchDepatments();
    }, [swap]);

    const fetchById = async (id) => {
        try {
            const response = await DepartmentServices.getDPM_ById(id);
            
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("Fetch Department By Id Failed");

        }
    }

    const addDepartment = async (department) => {
        try {
            const response = await DepartmentServices.addDepartment(department);
            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "เพิ่มสาขาวิชาสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSwap(!swap);
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เพิ่มสาขาวิชาไม่สำเร็จ",
                text: error?.response?.data?.message || error.message,
                showConfirmButton: false,
                timer: 1500,
              });

        }
    }

    const updateDepartment = async (id, newDepartment) => {
        try {
            const response = await DepartmentServices.updateDPM(id, newDepartment);
            if (response.status === 200) {
                setDepartments((prev) =>
                    prev.map((department) => {
                        if (department.id === id) {
                            return newDepartment;
                        } else {
                            return department;
                        }
                    })
                );
                setSwap(!swap);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "แก้ไขสาขาวิชาสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "แก้ไขสาขาวิชาไม่สำเร็จ!",
                text: error?.response?.data?.message || error.message,
                showConfirmButton: false,
                timer: 1500,
              });
           
        }
    }

    const deleteDepartment = async (id) => {
        try {
            const del = async () => {
                const response = await DepartmentServices.deleteDPM(id);
                
                if (response.status === 200) {
                    setSwap(!swap);
                }else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "ลบสาขาวิชาไม่สำเร็จ!",
                        text: error?.response?.data?.message || error.message,
                        showConfirmButton: false,
                        timer: 1500,
                      });
                }
            }
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons.fire({
                title: "คุณแน่ใจหรือไม่?",
                text: "คุณจะไม่สามารถย้อนกลับได้!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ใช่, ลบเลย!",
                cancelButtonText: "ไม่, ยกเลิก!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    del()
                    swalWithBootstrapButtons.fire({
                        title: "ลบแล้ว!",
                        text: "ข้อมูลข้อมูลสาขาวิชาถูกลบเรียบร้อยแล้ว.",
                        icon: "success"
                    });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "ยกเลิก",
                        text: "ยกเลิกการลบข้อมูลข้อมูลสาขาวิชา :)",
                        icon: "error"
                    });
                }
            });


        } catch (error) {
            console.log("Delete Fail");
        }
    }


    return (
        <DepartmentContext.Provider value={{ departments, fetchById, addDepartment, updateDepartment, deleteDepartment }}>
            {children}
        </DepartmentContext.Provider>
    )
};



export const useDepartmentContext = () => useContext(DepartmentContext);