import { createContext, useContext, useEffect, useState } from "react";
import NewsServices from '../services/news.service';
import Swal from "sweetalert2";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [allNews, setAllNews] = useState([]);
    const [swap, setSwap] = useState(false);

    const fetchAllNews = async () => {
        try {
            const response = await NewsServices.getNews()
            if (response.status === 200) {
                setAllNews(response.data)

            }
        } catch (error) {
            console.log("Fetch News Fail");
        }
    }

    useEffect(() => {
        fetchAllNews()
    }, [swap])

    const fetchNewsById = async (id) => {
        try {
            const response = await NewsServices.getById(id)
            if (response.status === 200) {
                return response.data

            }
        } catch (error) {
            console.log("Fetch NewsById Fail");
        }
    }

    const fetchNewsByType = async (type) => {
        try {
            const response = await NewsServices.getByType(type)
            if (response.status === 200) {
                return response.data

            }
        } catch (error) {
            console.log("Fetch NewsByType Fail");
        }
    }
    const addNews = async (newNews) => {
        try {
            const response = await NewsServices.addNews(newNews)
            setAllNews((news) => [...news, response.data]);
            setSwap(!swap)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เพิ่มข่าวสารสำเร็จ!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log("addNews Fail");
        }
    }

    const updateNews = async (id, newNews) => {
        try {
            const response = await NewsServices.updateNews(id, newNews)

            if (response.status === 200) {
                setAllNews((prev) =>
                    prev.map((News) => {
                        if (News.id === id) {
                            return newNews;
                        } else {
                            return News;
                        }
                    })
                );
                setSwap(!swap)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "อับเดตข่าวสารสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error(error?.response?.data?.message)
            console.log("updateNews Fail");
        }
    }

    const deleteNews = (id) => {
            try {
                const del = async () => {
                    const response = await NewsServices.deleteNews(id);
                        if (response.status === 200) {
                            setSwap(!swap);
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
                            text: "ข้อมูลข่าวสารถูกลบเรียบร้อยแล้ว.",
                            icon: "success"
                        });
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire({
                            title: "ยกเลิก",
                            text: "ยกเลิกการลบข้อมูลข่าวสาร :)",
                            icon: "error"
                        });
                    }
                });
                
           
            } catch (error) {
                console.log("Delete Fail");
            }
    }

    return (
        <NewsContext.Provider
            value={{ allNews, fetchNewsById, fetchNewsByType, addNews, updateNews, deleteNews }}
        >
            {children}
        </NewsContext.Provider>
    )
};

export const useNewsContext = () => useContext(NewsContext);