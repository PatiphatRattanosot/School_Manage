import { useContext, useState, useEffect, createContext } from "react";
import PersonServices from "../services/personnel.service";
import Swal from "sweetalert2";

export const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
    const [personnel, setpersonnel] = useState([]);
    const [swap, setSwap] = useState(false);

    const fetchPersons = async () => {
        try {
            const response = await PersonServices.getAllPerson();
            setpersonnel(response.data);
        } catch (error) {
            console.log("Fetch Persons Failed");

        }
    }

    useEffect(() => {
        fetchPersons();
    }, [swap]);

    const fetchById = async (id) => {
        try {
            const response = await PersonServices.getById(id);
            
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("Fetch Person By Id Failed");
            
        }
    }

   

    const fetchByRole = async (role) => {
        try {
            const response = await PersonServices.getPerson_ByRole(role);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("Fetch Person By Role Failed");
            
        }
    }
    // const fetchByDepartmentAndRole = async (role, department) => {
    //     try {
    //         const response = await PersonServices.getPerson_ByDepartment(role, department);
    //         if (response.status === 200) {
    //             setPersonnel(response.data); 
    //         }
    //     } catch (error) {
    //         console.log("Fetch Person By Department Failed");
    //     }
    // };

    const addPerson = async (person) => {
        try {
            const response = await PersonServices.addPerson(person);
            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "เพิ่มบุคลากรสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSwap(!swap);
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เพิ่มบุคลากรไม่สำเร็จ!",
                text: error?.response?.data?.message || error.message,
                showConfirmButton: false,
                timer: 1500,
              });
            
        }
    }

    const updatePerson = async (id,newPerson) => {
        try {
            const response = await PersonServices.updatePerson(id,newPerson);
            
            
            if (response.status === 200) {
                
                setpersonnel((prev) =>
                    prev.map((person) => {
                        if (person.id === id) {
                            return newPerson;
                        } else {
                            return person;
                        }
                    })
                );
                setSwap(!swap);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `แก้ไขข้อมูลสำเร็จ!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "แก้ไขข้อมูลไม่สำเร็จ!",
                text: error?.response?.data?.message || error.message,
                showConfirmButton: false,
                timer: 1500,
              });
        }
    }

    const deletePerson = async (id) => {
        try {
            const del = async () => {
                try {
                    await PersonServices.deletePerson(id);
                    
                } catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "ลบบุคลากรไม่สำเร็จ!",
                        text: error?.response?.data?.message || error.message,
                        showConfirmButton: false,
                        timer: 1500,
                      });
                }
                return
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
                        text: "ข้อมูลข้อมูลบุคลากรถูกลบเรียบร้อยแล้ว.",
                        icon: "success"
                    });
                    
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "ยกเลิก",
                        text: "ยกเลิกการลบข้อมูลบุคลากร :)",
                        icon: "error"
                    });
                }
                window.location.reload();
            });
            
       
        } catch (error) {
            console.log("Delete Fail");
        }
    }

    return (
        <PersonContext.Provider value={{ personnel, fetchByRole, addPerson, updatePerson, deletePerson, fetchById }}>
            {children}
        </PersonContext.Provider>
    )


}

export const usePersonnelContext = () => useContext(PersonContext);